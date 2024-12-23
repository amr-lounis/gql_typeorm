import { DataSource } from "typeorm";

const co_sqlite = new DataSource({
    type: "sqlite",
    database: "database-typeorm.sqlite",
    entities: ["src/entities/**.ts", "src/entities/**.js"],
    synchronize: true,
    logging: false,
    dropSchema: false,

});

const co_mysql = new DataSource({
    type: "mysql",
    host: "localhost",
    entities: ["src/entities/**.ts", "src/entities/**.js"],
    port: 3306,
    username: "root",
    password: "root",
    database: "typeorm",
    synchronize: true,
    logging: false,
    dropSchema: false,
});

export const AppDataSource = co_sqlite;