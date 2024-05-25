const bcrypt = require("bcrypt");
const { pool } = require("../../database");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();

const generateToken = (id) => {
  const payload = {
    id: id,
  };
  const token = jwt.sign(payload, process.env.JWT_KEY, {
    expiresIn: "5hr",
  });

  return token;
};

const register = async (req, res, next) => {
  try {
    const username = req.body.username;
    const password = req.body.password;
    const hashedPass = await bcrypt.hash(password, 10);
    const [rows] = await pool.query(
      "INSERT INTO user (username, password) VALUES ( ?, ?)",
      [username, hashedPass]
    );
    const id = rows.insertId;
    const token = generateToken(id);
    res.status(201).json({ token });
  } catch (error) {
    next(error);
  }
};

const login = async (req, res, next) => {
  const user = req.user;
  const token = generateToken(user.id);
  return res.status(200).json({ token });
};

module.exports = { register, login };
