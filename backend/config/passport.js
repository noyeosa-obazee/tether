require("dotenv").config();
const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;
const prisma = require("./prisma.js");

const options = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),

  secretOrKey: process.env.JWT_SECRET,
};

module.exports = (passport) => {
  passport.use(
    new JwtStrategy(options, async (jwt_payload, done) => {
      try {
        const user = await prisma.user.findUnique({
          where: { id: jwt_payload.id },
        });

        if (user) {
          return done(null, user);
        }

        return done(null, false);
      } catch (err) {
        return done(err, false);
      }
    }),
  );
};
