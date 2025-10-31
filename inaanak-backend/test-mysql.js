const mysql = require('mysql2/promise');
require('dotenv').config();

(async () => {
  try {
    const conn = await mysql.createConnection({
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASS,
      database: process.env.DB_NAME,
      port: process.env.DB_PORT,
    });
    console.log('✅ MySQL connected!');
    await conn.end();
  } catch (err) {
    console.error('❌ MySQL connection failed:', err.message);
  }
})();
