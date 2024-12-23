import { DataSource } from "typeorm";

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
    host: "localhost",
    port: Number(process.env.db_port) || 3306,
    database: process.env.db_database || "db_server",
    username: process.env.db_username || "root",
    password: process.env.db_password || "root",
    synchronize: true,
    logging: false,
    dropSchema: false,
});

export const AppDataSource = co_sqlite;