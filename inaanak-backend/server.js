require('dotenv').config();
const express = require('express');
const cors = require('cors');

const models = require('./src/models');
const sequelize = models && (models.sequelize || models); // support both export shapes
const inaanakRouter = require('./src/routes/inaanak');

const app = express();
app.use(cors());
app.use(express.json());

app.use('/inaanak', inaanakRouter);

// health
app.get('/', (req, res) => res.send({ ok: true }));

const PORT = process.env.PORT || 8000;

async function start() {
  try {
    if (!sequelize) {
      throw new Error('sequelize is not exported from ./src/models');
    }

    // If DB env vars are present, ensure the DB exists (optional)
    const { DB_NAME, DB_HOST, DB_USER, DB_PASS, DB_PORT } = process.env;
    if (DB_NAME && DB_HOST && DB_USER) {
      const mysql = require('mysql2/promise');
      const conn = await mysql.createConnection({
        host: DB_HOST,
        port: DB_PORT || 3306,
        user: DB_USER,
        password: DB_PASS,
      });
      await conn.query(`CREATE DATABASE IF NOT EXISTS \`${DB_NAME}\`;`);
      await conn.end();
    }

    await sequelize.authenticate();
    console.log('✅ Database connected');

    await sequelize.sync();
    console.log('✅ Tables synced');

    app.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}`));
  } catch (err) {
    console.error('❌ Failed to start:', err.message || err);
    process.exit(1);
  }
}

const router = express.Router();
const { Inaanak } = models;

start();