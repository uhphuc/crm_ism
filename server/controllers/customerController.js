const db = require('../models');
const Customer = db.Customer;
const User = db.User;
const Deal = db.Deal;
const Invoice = db.Invoice;
const { Op, where } = require('sequelize');

exports.getAll = async (req, res) => {
  try {
    const customers = await Customer.findAll();
    res.json(customers);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getOne = async (req, res) => {
  try {
    const customer = await Customer.findByPk(req.params.id, {
      include: [{ model: Invoice, as: 'invoices' }, { model: Deal, as: 'deals' }], // include the user assigned to the customer
    });
    if (!customer) return res.status(404).json({ error: 'Customer not found' });
    res.json(customer);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.create = async (req, res) => {
  try {
    const newCustomer = await Customer.create({ ...req.body });
    res.status(201).json(newCustomer);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.update = async (req, res) => {
  try {
    const customer = await Customer.findByPk(req.params.id);
    if (!customer) return res.status(404).json({ error: 'Customer not found' });
    await customer.update(req.body);
    res.json(customer);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.delete = async (req, res) => {
  try {
    const customer = await Customer.findByPk(req.params.id);
    if (!customer) return res.status(404).json({ error: 'Customer not found' });
    await customer.destroy();
    res.json({ message: 'Customer deleted' });
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
    const customers = await Customer.findAll({ where });
    res.json(customers);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

exports.assignToUser = async (req, res) => {
  const { userId } = req.body; // Assuming userId is passed in the request body
  try {
    const customer = await Customer.findByPk(req.params.id);
    if (!customer) return res.status(404).json({ error: 'Customer not found' });
    await customer.update({ assignedTo: userId });
    res.json(customer);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

exports.getMyCustomers = async (req, res) => {
  const userId = parseInt(req.params.id, 10); // Assuming userId is passed in the request params
  if (isNaN(userId)) return res.status(400).json({ error: 'Invalid user ID' });
  
  try {
    const customers = await Customer.findAll(
      {
        where: { assignedTo: userId },
      }
    );
    const deals = await Deal.findAll(
      {
        where: { customerId: { [Op.in]: customers.map(customer => customer.id) } },
        include: [{ model: Customer, as: 'customer' }],
      }
    );
    //add deals to customers
    customers.forEach(customer => {
      customer.dataValues.deals = deals.filter(deal => deal.customerId === customer.id);
    });
    
    res.json(customers);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}