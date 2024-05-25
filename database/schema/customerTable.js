async function createCustomerTable(connection) {
  const sql = `
      CREATE TABLE IF NOT EXISTS customer (
          id INT AUTO_INCREMENT PRIMARY KEY,
          name VARCHAR(255) NOT NULL UNIQUE,
          number VARCHAR(255) NOT NULL,
          dateOfBirth DATE NOT NULL,
          gender ENUM ('female','male') NOT NULL
      )`;
  await connection.query(sql);
}

module.exports = createCustomerTable;
