const db = require('../models/index');
const Invoice = db.Invoice;
const Deal = db.Deal;

const { Op } = require('sequelize');

exports.getAll = async (req, res) => {
  try {
    const invoices = await Invoice.findAll({
      include: [{ model: Deal, as: 'deal' }],
    });
    res.json(invoices);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


exports.getOne = async (req, res) => {
  try {
    const invoice = await Invoice.findByPk(req.params.id, {
      include: [{ model: Deal, as: 'deal' }],
    });
    if (!invoice) return res.status(404).json({ error: 'Invoice not found' });
    res.json(invoice);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.create = async (req, res) => {
  try {
    const newInvoice = await Invoice.create({ ...req.body, created_by: req.user.id });
    res.status(201).json(newInvoice);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.update = async (req, res) => {
  try {
    const invoice = await Invoice.findByPk(req.params.id);
    if (!invoice) return res.status(404).json({ error: 'Invoice not found' });
    await invoice.update(req.body);
    res.json(invoice);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.delete = async (req, res) => {
  try {
    const invoice = await Invoice.findByPk(req.params.id);
    if (!invoice) return res.status(404).json({ error: 'Invoice not found' });
    await invoice.destroy();
    res.json({ message: 'Invoice deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// this code is for the search and filter functionality

exports.search = async (req, res) => {
    const { invoice_number, deal_id, status } = req.query;
    const where = {};
    
    if (invoice_number) where.invoice_number = { [Op.like]: `%${invoice_number}%` };
    if (deal_id) where.deal_id = deal_id;
    if (status) where.status = status;
    
    try {
        const invoices = await Invoice.findAll({
        where,
        include: [{ model: Deal, as: 'deal' }],
        });
        res.json(invoices);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
    }


exports.getByDealId = async (req, res) => {
  try {
    const { deal_id } = req.params;
    const invoices = await Invoice.findAll({
      where: { deal_id },
      include: [{ model: Deal, as: 'deal' }],
    });
    res.json(invoices);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

exports.getByStatus = async (req, res) => {
  try {
    const { status } = req.params;
    const invoices = await Invoice.findAll({
      where: { status },
      include: [{ model: Deal, as: 'deal' }],
    });
    res.json(invoices);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}