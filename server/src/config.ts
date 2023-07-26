// TODO: Move this to support environment variables
import * as dotenv from "dotenv";
dotenv.config();

export default {
    jwtSecret: process.env.SECRET || "JWT Secret",
    jwtSession: { session: false }
};