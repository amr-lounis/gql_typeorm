import { DataSource } from "typeorm";
import dotenv from 'dotenv';
dotenv.config();

export const config_server: configServerType = {
    JWT_Secret: "jwtSecret aaaaabbbbbcccccdddddeeeeefffff",
    JWT_ExpiresDay: "7 days",
    PORT_HTTP: 80,
    PORT_HTTPS: 443,
    SERVER_SSL: false,
    path_ssl_crt: "./_utils/cert-gen/sub_file.crt",
    path_ssl_key: "./_utils/cert-gen/sub_file.key",
    myLog: true,
    graphql_path_url: "/graphql"
}

// -------------------------------------------------- database
const co_sqlite = new DataSource({
    entities: ["src/entities/**.ts", "src/entities/**.js"],
    type: "sqlite",
    database: "db_server.sqlite",
    synchronize: true,
    logging: false,
    dropSchema: true,
});

const co_mysql = new DataSource({
    entities: ["src/entities/**.ts", "src/entities/**.js"],
    type: "mysql",
    host: process.env.db_host || "localhost",
    port: Number(process.env.db_port) || 3306,
    database: process.env.db_database,
    username: process.env.db_username,
    password: process.env.db_password,
    synchronize: true,
    logging: false,
    dropSchema: true,
});

export const AppDataSource = process.env.db_database ? co_mysql : co_sqlite;
// -------------------------------------------------- types
type configServerType = {
    JWT_Secret: string,
    JWT_ExpiresDay: string,
    PORT_HTTP: number,
    PORT_HTTPS: number,
    SERVER_SSL: boolean,
    path_ssl_crt: string,
    path_ssl_key: string
    myLog: boolean,
    graphql_path_url: string
}