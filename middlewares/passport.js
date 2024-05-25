const { pool } = require("../database");
const bcrypt = require("bcrypt");
const PassportLocal = require("passport-local").Strategy;
const PassportJWT = require("passport-jwt").Strategy;
const { fromAuthHeaderAsBearerToken } = require("passport-jwt").ExtractJwt;

const passportLocal = new PassportLocal(
  {
    usernameField: "username",
    passwordField: "password",
  },
  async (username, password, next) => {
    const [rows] = await pool.query("SELECT * FROM user WHERE username = ?", [
      username,
    ]);

    if (rows.length === 0) {
      next({ message: "username or password is wrong!" });
    } else {
      const isPasswordMatch = await bcrypt.compare(password, rows[0].password);
      if (isPasswordMatch) {
        next(null, rows[0]); // req.user = rows[0]
      } else {
        next({ message: "username or password is wrong!" });
      }
    }
  }
);

const passportJwt = new PassportJWT(
  {
    jwtFromRequest: fromAuthHeaderAsBearerToken(),
    secretOrKey: "ladjhfdskhf",
  },
  async (payload, next) => {
    try {
      const id = payload.id;
      const [rows] = await pool.query("SELECT * FROM user WHERE id = ?", [id]);

      next(null, rows[0]);
    } catch (error) {
      next(error);
    }
  }
);

module.exports = { passportLocal, passportJwt };
