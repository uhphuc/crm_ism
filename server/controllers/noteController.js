const db = require('../models/index');
const Note = db.Note;
const Customer = db.Customer;
const User = db.User;

const { Op } = require('sequelize');

exports.getAll = async (req, res) => {
  try {
    const notes = await Note.findAll({
      include: [
        { model: Customer, as: 'customer' },
        { model: User, as: 'user' },
      ],
    });
    res.json(notes);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

exports.getOne = async (req, res) => {
  try {
    const note = await Note.findByPk(req.params.id, {
      include: [
        { model: Customer, as: 'customer' },
        { model: User, as: 'user' },
      ],
    });
    if (!note) return res.status(404).json({ error: 'Note not found' });
    res.json(note);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getNotesByDealId = async (req, res) => {
  try {
    const { dealId } = req.params;
    const notes = await Note.findAll({
      where: { dealId },
      include: [
        { model: Customer, as: 'customer' },
        { model: User, as: 'user' },
      ],
    });
    res.json(notes);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


exports.create = async (req, res) => {
  const dealId = req.params.dealId;
  if (!dealId) return res.status(400).json({ error: 'Deal ID is required' });
  const { content, customerId, userId } = req.body;
  try {
    const newNote = await Note.create({
      content,
      customerId,
      userId,
      dealId
    });
    res.status(201).json(newNote);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.update = async (req, res) => {
  try {
    const note = await Note.findByPk(req.params.id);
    if (!note) return res.status(404).json({ error: 'Note not found' });
    await note.update(req.body);
    res.json(note);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.delete = async (req, res) => {
  try {
    const note = await Note.findByPk(req.params.id);
    if (!note) return res.status(404).json({ error: 'Note not found' });
    await note.destroy();
    res.json({ message: 'Note deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// this code is for the search and filter functionality

exports.search = async (req, res) => {
    const { title, content, customer_id, user_id } = req.query;
    const where = {};
    
    if (title) where.title = { [Op.like]: `%${title}%` };
    if (content) where.content = { [Op.like]: `%${content}%` };
    if (customer_id) where.customer_id = customer_id;
    if (user_id) where.user_id = user_id;
    
    try {
        const notes = await Note.findAll({
        where,
        include: [
            { model: Customer, as: 'customer' },
            { model: User, as: 'user' },
        ],
        });
        res.json(notes);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
    }


exports.getNotesByCustomerId = async (req, res) => {
  try {
    const { customerId } = req.params;
    const notes = await Note.findAll({
      where: { customer_id: customerId },
      include: [
        { model: Customer, as: 'customer' },
        { model: User, as: 'user' },
      ],
    });
    res.json(notes);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

exports.getNotesByUserId = async (req, res) => {
  try {
    const { userId } = req.params;
    const notes = await Note.findAll({
      where: { user_id: userId },
      include: [
        { model: Customer, as: 'customer' },
        { model: User, as: 'user' },
      ],
    });
    res.json(notes);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

exports.getNotesByDateRange = async (req, res) => {
  try {
    const { startDate, endDate } = req.query;
    const notes = await Note.findAll({
      where: {
        createdAt: {
          [Op.gte]: new Date(startDate),
          [Op.lte]: new Date(endDate),
        },
      },
      include: [
        { model: Customer, as: 'customer' },
        { model: User, as: 'user' },
      ],
    });
    res.json(notes);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}
