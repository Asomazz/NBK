async function createUserTable(connection) {
  const sql = `
    CREATE TABLE IF NOT EXISTS user (
        id INT AUTO_INCREMENT PRIMARY KEY,
        username VARCHAR(255) NOT NULL UNIQUE,
        password VARCHAR(255) NOT NULL
    )`;
  await connection.query(sql);
}

module.exports = createUserTable;
