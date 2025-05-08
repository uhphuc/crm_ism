const db = require('../models/index');
const Invoice = db.Invoice;
const Deal = db.Deal;
const Customer = db.Customer;

const { Op } = require('sequelize');

exports.getAll = async (req, res) => {
  try {
    const invoices = await Invoice.findAll({
      include: [
        { model: Deal, as: 'deal' },
        { model: Customer, as: 'customer' },
      ],

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
  const { amount, status, currency, dueDate, customerId, dealId} = req.body;
  const tax = 0.1; // 10% tax
  const totalAmount = Number(amount) + (Number(amount) * Number(tax));
  const issueDate = new Date(); 
  // Generate a unique invoice number base on the date and time but just 5 numbers
  const invoiceNumber = `INV-${dealId}-${Math.floor(Math.random() * 1000)}`;
  

  try {
    const newInvoice = await Invoice.create({ 
      invoiceNumber,
      amount,
      customerId,
      status,
      currency,
      dueDate,
      tax,
      totalAmount,
      issueDate,
      dealId,
    });
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

exports.getInvoicesByCustomerId = async (req, res) => {
  try {
    const { customerId } = req.params;
    const invoices = await Invoice.findAll({
      where: { customerId },
      include: [{ model: Customer, as: 'customer' }],
    });
    res.json(invoices);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}