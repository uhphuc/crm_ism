const db = require('../models/index');
const Activity = db.Activity;
const Customer = db.Customer;
const User = db.User;
const { Op } = require('sequelize');


exports.getAll = async (req, res) => {
  try {
    const activities = await Activity.findAll({
      include: [
        { model: Customer, as: 'customer' },
        { model: User, as: 'user' },
      ],
    });
    res.json(activities);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}


exports.getOne = async (req, res) => {
  try {
    const activity = await Activity.findByPk(req.params.id, {
      include: [
        { model: Customer, as: 'customer' },
        { model: User, as: 'user' },
      ],
    });
    if (!activity) return res.status(404).json({ error: 'Activity not found' });
    res.json(activity);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


exports.create = async (req, res) => {
  const { userId } = req.params;
  try {
    const { title, type, description, startDate, endDate, status, customerId, dealId } = req.body;
    if (!customerId || customerId === '') {
      const numericDealId = Number(dealId);
      const activity = await Activity.create({
        title,
        type,
        description,
        startDate,
        endDate,
        status,
        dealId: numericDealId,
        userId
      });
      res.status(201).json(activity);
    } else if (!dealId || dealId === '') {
      const numericCustomerId = Number(customerId);
      const activity = await Activity.create({
        title,
        type,
        description,
        startDate,
        endDate,
        status,
        customerId: numericCustomerId,
        userId
      });
      res.status(201).json(activity);
    } else {
      const numericCustomerId = Number(customerId);
      const numericDealId = Number(dealId);
      const activity = await Activity.create({
        title,
        type,
        description,
        startDate,
        endDate,
        status,
        customerId: numericCustomerId,
        dealId: numericDealId,
        userId
      });
      res.status(201).json(activity);
    }
  
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.update = async (req, res) => {
  try {
    const activity = await Activity.findByPk(req.params.id);
    if (!activity) return res.status(404).json({ error: 'Activity not found' });
    await activity.update(req.body);
    res.json(activity);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.delete = async (req, res) => {
  try {
    const activity = await Activity.findByPk(req.params.id);
    if (!activity) return res.status(404).json({ error: 'Activity not found' });
    await activity.destroy();
    res.json({ message: 'Activity deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// this code is for the search and filter functionality

exports.search = async (req, res) => {
    const { name, email, phone, company } = req.query;
    const where = {};
    
    if (name) where.name = { [Op.like]: `%${name}%` };
    if (email) where.email = { [Op.like]: `%${email}%` };
    if (phone) where.phone = { [Op.like]: `%${phone}%` };
    if (company) where.company = { [Op.like]: `%${company}%` };
    
    try {
        const activities = await Activity.findAll({ where });
        res.json(activities);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
    }


exports.filter = async (req, res) => {
  const { startDate, endDate, status } = req.query;
  const where = {};

  if (startDate) where.startDate = { [Op.gte]: new Date(startDate) };
  if (endDate) where.endDate = { [Op.lte]: new Date(endDate) };
  if (status) where.status = status;

  try {
    const activities = await Activity.findAll({ where });
    res.json(activities);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

exports.getByCustomerId = async (req, res) => {
  try {
    const { customer_id } = req.params;
    const activities = await Activity.findAll({
      where: { customer_id },
      include: [{ model: Customer, as: 'customer' }],
    });
    res.json(activities);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getByUserId = async (req, res) => {
  try {
    const user_id = req.params.userId;
    const activities = await Activity.findAll({
      where: { userId: user_id },
      include: [
        { model: User, as: 'user' },
        { model: Customer, as: 'customer' },
      ],
    });
    res.json(activities);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getByStatus = async (req, res) => {
  try {
    const { status } = req.params;
    const activities = await Activity.findAll({
      where: { status },
      include: [{ model: Customer, as: 'customer' }],
    });
    res.json(activities);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getByType = async (req, res) => {
  try {
    const { type } = req.params;
    const activities = await Activity.findAll({
      where: { type },
      include: [{ model: Customer, as: 'customer' }],
    });
    res.json(activities);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.updateActivityStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    const activity = await Activity.findByPk(id);
    if (!activity) return res.status(404).json({ error: 'Activity not found' });
    await activity.update({ status });
    res.json(activity);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}