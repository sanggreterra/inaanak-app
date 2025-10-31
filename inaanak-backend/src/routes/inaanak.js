const express = require('express');
const router = express.Router();
const { Inaanak } = require('../models');

// Create
router.post('/', async (req, res) => {
  try {
    const { name, pamasko } = req.body;
    if (typeof name !== 'string' || name.trim() === '') {
      return res.status(400).json({ error: 'name is required' });
    }
    const row = await Inaanak.create({ name, pamasko: Number(pamasko || 0) });
    res.status(201).json(row);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'server error' });
  }
});

// Read list with pagination, sorting, filtering
// GET /inaanak?page=1&limit=10&sort=name:asc&name=ann
router.get('/', async (req, res) => {
  try {
    let { page = 1, limit = 10, sort, name } = req.query;
    page = Math.max(1, parseInt(page) || 1);
    limit = Math.max(1, Math.min(100, parseInt(limit) || 10));
    const offset = (page - 1) * limit;

    // parse sort param like "name:asc" or "pamasko:desc"
    let order = [['id', 'ASC']];
    if (sort) {
      const [field, dir] = sort.split(':');
      const direction = (dir && dir.toUpperCase()) === 'DESC' ? 'DESC' : 'ASC';
      // validate field
      if (['id', 'name', 'pamasko', 'createdAt', 'updatedAt'].includes(field)) {
        order = [[field, direction]];
      }
    }

    const where = {};
    if (name) {
      // simple partial match
      where.name = { [require('sequelize').Op.like]: `%${name}%` };
    }

    const { count, rows } = await Inaanak.findAndCountAll({
      where,
      order,
      limit,
      offset,
    });

    res.json({
      meta: {
        total: count,
        page,
        limit,
        totalPages: Math.ceil(count / limit),
      },
      data: rows,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'server error' });
  }
});

// Read single
router.get('/:id', async (req, res) => {
  try {
    const r = await Inaanak.findByPk(req.params.id);
    if (!r) return res.status(404).json({ error: 'not found' });
    res.json(r);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'server error' });
  }
});

// Update (PATCH)
router.patch('/:id', async (req, res) => {
  try {
    const r = await Inaanak.findByPk(req.params.id);
    if (!r) return res.status(404).json({ error: 'not found' });
    const { name, pamasko } = req.body;
    if (name !== undefined) r.name = name;
    if (pamasko !== undefined) r.pamasko = Number(pamasko);
    await r.save();
    res.json(r);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'server error' });
  }
});

// Delete
router.delete('/:id', async (req, res) => {
  try {
    const r = await Inaanak.findByPk(req.params.id);
    if (!r) return res.status(404).json({ error: 'not found' });
    await r.destroy();
    res.json({ ok: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'server error' });
  }
});

module.exports = router;
