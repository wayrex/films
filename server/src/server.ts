const LocalStrategy = require('passport-local');
import cors from "cors";
import express from "express";
import session from 'express-session';
import path from "path";
import logger from "./logger";
import config from "./config";
import bodyParser from 'body-parser';
import passport from "passport";

import { Film, User } from './routes';
import { connectToDatabase } from "./database";
import UserSchema from "./schemas/userSchema";

const JwtStrategy = require('passport-jwt').Strategy,
    ExtractJwt = require('passport-jwt').ExtractJwt;

let mongoDbConnection: string;
let serverPort: number;
if (process.env.NODE_ENV = 'development') {
    mongoDbConnection = 'mongodb://127.0.0.1:27017/films';
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
        app.use(cors({
            origin: ["http://localhost:3000"],
            methods: "GET,POST,PUT,DELETE,OPTIONS",
        }));
        app.use(bodyParser.json());
        app.use(bodyParser.urlencoded({ extended: true }));
        app.use(session({
            secret: 'keyboard cat',
            resave: false,
            saveUninitialized: true,
            cookie: { secure: true }
        }));

        let opts: any = {}
        opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
        opts.secretOrKey = config.jwtSecret;
        // opts.issuer = 'accounts.examplesoft.com';
        // opts.audience = 'yoursite.net';
        passport.use(new JwtStrategy(opts, async (jwt_payload: any, done: any) => {
            try {
                const foundUser = await UserSchema.findOne({ id: jwt_payload.sub }).exec();
                return done(null, foundUser);
            } catch (error) {

                return error ? done(error, false) : done(null, false);
            }
        }));

        passport.use(new LocalStrategy(UserSchema.authenticate()));
        passport.serializeUser(UserSchema.serializeUser());
        passport.deserializeUser(UserSchema.deserializeUser());
        app.use(passport.initialize());
        app.use(passport.session());
        app.use('/static', express.static(path.join(__dirname, 'public')))
        app.use("/films", passport.authenticate('jwt', config.jwtSession), Film);
        app.use("/user", User);
        // start the Express server
        app.listen(serverPort, () => {
            logger.info(`Server running at http://localhost:${serverPort}...`);
        });

    })
    .catch(error => logger.error(error));