const express = require('express');
const router = express.Router();
const invoiceController = require('../controllers/invoiceController');

// Route to get all invoices
router.get('/', invoiceController.getAll); // Get all invoices
router.get('/:id', invoiceController.getOne); // Get a single invoice by ID
router.post('/', invoiceController.create); // Create a new invoice
router.get('/customer/:customerId', invoiceController.getInvoicesByCustomerId); // Get invoices by customer ID
router.put('/status/:invoiceId', invoiceController.updateInvoiceStatus);

module.exports = router;