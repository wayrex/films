import * as express from "express";
import jwt from "jwt-simple";
import passport from "passport";
import User from "../schemas/userSchema";
import config from "../config";
import logger from "../logger";

const userRouter = express.Router();
userRouter.post('/login', passport.authenticate('local'), async (req: express.Request, res: express.Response) => {
    try {
        const user = await User.findOne({ username: req.body.username }).exec();
        var payload = {
            id: user.id,
            expire: Date.now() + 1000 * 60 * 60 * 24 * 7
        }

        var token = jwt.encode(payload, config.jwtSecret)

        res.json({ token: token });
    } catch (error) {
        logger.warn("Failed retrieving user", req.originalUrl);
        res.statusCode = 400;
        res.send(error);
    }

});

userRouter.post('/register', async (req: express.Request, res: express.Response) => {
    User.register(
        new User({
            email: req.body.email,
            username: req.body.username
        }), req.body.password, function (error: any, msg: string) {
            if (error) {
                res.send(error);
            } else {
                res.send({ message: "Successful" });
            }
        }
    );
});

export default userRouter;
