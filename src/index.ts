import express from 'express';
import serveIndex from 'serve-index';
import { ApolloServer } from 'apollo-server-express';
import { ApolloServerPluginDrainHttpServer } from 'apollo-server-core';
import { applyMiddleware } from 'graphql-middleware'
import { makeSchema } from 'nexus';
import * as types_gql from './gql';
import { MyToken, myLog, https_server, middleware_01, http_server, db_init, AppDataSource, config_server, ws_server } from './utils';
// --------------------------------------------------
const main = async () => {
  if (!AppDataSource.isInitialized) {
    await AppDataSource.initialize()
      .then(async () => {
        console.log(AppDataSource.options)
        myLog(`Database connected!`);
      })
      .catch((error) => { myLog(error); })
  }
  // -----------------------
  const schema = makeSchema({
    types: types_gql,
  });
  const listOperationName = [...Object.keys(schema.getMutationType()['_fields']), ...Object.keys(schema.getQueryType()['_fields'])]
  await db_init(listOperationName)
  // -----------------------
  const app = express();
  // ----------------------- static files
  app.use(
    '/public',
    express.static('public')
  );
  app.use(
    '/files',
    express.static('files'),
    serveIndex('files', { icons: true, view: 'details' })
  );
  //
  const schemaWithMiddleware = applyMiddleware(schema, middleware_01)
  // ----------------------- https or http
  const server = config_server.SERVER_SSL ? https_server(app, config_server.path_ssl_crt, config_server.path_ssl_key) : http_server(app);
  // ----------------------- ws
  const serverCleanup = ws_server(server, schema)
  // ----------------------- ApolloServer
  const apolloServer = new ApolloServer({
    schema: schemaWithMiddleware,
    csrfPrevention: false,
    formatError(err) {
      return new Error(err.message);
    },
    context: (ctx) => {
      const headerToken = ctx?.req?.headers?.token || '';
      return { jwt: MyToken.Token_Verifay(headerToken) };
    },
    plugins: [
      ApolloServerPluginDrainHttpServer({ httpServer: server }),
      {
        async serverWillStart() {
          return {
            async drainServer() {
              await serverCleanup.dispose();
            },
          };
        },
      },
    ],
  });
  await apolloServer.start();
  apolloServer.applyMiddleware({ app, path: config_server.graphql_path_url })
  // ------------------------------------------------ listen
  if (config_server.SERVER_SSL) {
    server.listen(config_server.PORT_HTTPS, () => {
      myLog(`https://localhost:${config_server.PORT_HTTPS}${config_server.graphql_path_url}`);
    });
  } else {
    server.listen(config_server.PORT_HTTP, () => {
      myLog(`http://localhost:${config_server.PORT_HTTP}${config_server.graphql_path_url}`);
    });
  }
};
// --------------------------------------------------
main()