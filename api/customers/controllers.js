const { pool } = require("../../database");

const getAllCustomers = async (req, res, next) => {
  try {
    const [rows] = await pool.query("SELECT * FROM customer;");
    return res.json(rows);
  } catch (err) {
    next(err);
  }
};

const addNewCustomer = async (req, res, next) => {
  try {
    const { name, number, dateOfBirth, gender } = req.body;
    await pool.query(
      "INSERT INTO customer (name, number, dateOfBirth, gender) VALUES (?,?,?,?)",
      [name, number, dateOfBirth, gender]
    );
    return res.json("Customer added sucessfully");
  } catch (err) {
    next(err);
  }
};

const updateCustomer = async (req, res, next) => {
  try {
    const customerId = req.params.id;
    const { name, dateOfBirth, gender, number } = req.body;

    await pool.query(
      "UPDATE customer SET name = ?, number = ?, dateOfBirth = ?, gender = ? WHERE id = ?",
      [name, number, dateOfBirth, gender, customerId]
    );
    return res.json("Customer updated successfully!");
  } catch (err) {
    next(err);
  }
};

const getOneCustomer = async (req, res, next) => {
  try {
    const customerId = req.params.id;
    const [rows] = await pool.query("SELECT * FROM customer WHERE id = ?", [
      customerId,
    ]);
    if (rows.length === 0) {
      return res.status(404).json(`Customer with ID ${customerId} not found.`);
    } else {
      return res.status(200).json({ Customer: rows[0] });
    }
  } catch (err) {
    next(err);
  }
};

module.exports = {
  getAllCustomers,
  addNewCustomer,
  updateCustomer,
  getOneCustomer,
};
