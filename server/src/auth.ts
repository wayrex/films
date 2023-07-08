/// TODO: Move current passport configuration here.
import User from "./schemas/userSchema";
var passport = require("passport");
var passportJWT = require("passport-jwt");
import config from "./config";
var ExtractJwt = passportJWT.ExtractJwt;
var Strategy = passportJWT.Strategy;

var params = {
    secretOrKey: config.jwtSecret,
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken()
};

export default function () {
    var strategy = new Strategy(params, function (payload: any, done: any) {
        User.findById(payload.id, function (err: any, user: any) {
            if (err) {
                return done(new Error("UserNotFound"), null);
            } else if (payload.expire <= Date.now()) {
                return done(new Error("TokenExpired"), null);
            } else {
                return done(null, user);
            }
        });
    });

    passport.use(strategy);

    return { initialize: function () { return passport.initialize() } };
};