import * as dotenv from "dotenv";
import cors from "cors";
import express from "express";
import { connectToDatabase } from "./database";
import { Film } from './routes';


import logger from "./logger";

dotenv.config();

let mongoDbConnection: string;
let serverPort: number;
if (process.env.NODE_ENV = 'development') {
    mongoDbConnection = 'mongodb://127.0.0.1:27017';
    serverPort = 1337;
} else {
    mongoDbConnection = process.env.MONGODB;
    if (!mongoDbConnection) {
        logger.error("No MONGODB environment variable has been defined in config.env");
        process.exit(1);
    }
    serverPort = +process.env.PORT || 8080;
}

connectToDatabase(mongoDbConnection)
    .then(() => {
        const app = express();
        app.use(cors());
        app.use("/films", Film);
        // start the Express server
        app.listen(serverPort, () => {
            logger.info(`Server running at http://localhost:${serverPort}...`);
        });

    })
    .catch(error => logger.error(error));