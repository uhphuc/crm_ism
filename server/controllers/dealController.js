const e = require('express');
const db = require('../models/index.js');
const Deal = db.Deal;
const Customer = db.Customer;
const User = db.User;
const Invoice = db.Invoice;

// Tạo một deal mới
exports.createDeal = async (req, res) => {
    try {
        const { title, customerId, value, stage, expectedCloseDate, salesRepId, probability } = req.body;
        // Kiểm tra thông tin khách hàng và sales
        const customer = await Customer.findByPk(customerId);
        const salesRep = await User.findByPk(salesRepId);

        if (!customer || !salesRep) {
            return res.status(400).json({ message: 'Khách hàng hoặc người bán không hợp lệ' });
        }

        // Tạo deal mới
        const newDeal = await Deal.create({
            title,
            customerId,
            value,
            stage,
            expectedCloseDate,
            probability,
            userId: salesRepId,
        });

        return res.status(201).json(newDeal);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Lỗi server khi tạo deal' });
    }
}
// Cập nhật thông tin deal

exports.updateDeal = async (req, res) => {
    try {
        const { id } = req.params;
        const { dealName, customerId, dealValue, status, startDate, endDate, salesRepId } = req.body;

        // Kiểm tra thông tin khách hàng và sales
        const customer = await Customer.findByPk(customerId);
        const salesRep = await User.findByPk(salesRepId);

        if (!customer || !salesRep) {
            return res.status(400).json({ message: 'Khách hàng hoặc người bán không hợp lệ' });
        }

        // Cập nhật deal
        const updatedDeal = await Deal.update(
            { dealName, customerId, dealValue, status, startDate, endDate, salesRepId },
            { where: { id } }
        );

        if (!updatedDeal[0]) {
            return res.status(404).json({ message: 'Deal không tồn tại' });
        }

        return res.status(200).json({ message: 'Deal đã được cập nhật' });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Lỗi server khi cập nhật deal' });
    }
}

exports.updateDealStage = async (req, res) => {
    try {
        const { id } = req.params;
        const { stage } = req.body;

        // Cập nhật giai đoạn deal
        const updatedDeal = await Deal.update(
            { stage },
            { where: { id } }
        );

        if (!updatedDeal[0]) {
            return res.status(404).json({ message: 'Deal không tồn tại' });
        }

        return res.status(200).json({ message: 'Giai đoạn deal đã được cập nhật' });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Lỗi server khi cập nhật giai đoạn deal' });
    }
}

// Xóa deal

exports.deleteDeal = async (req, res) => {
    try {
        const { id } = req.params;

        // Xóa deal
        const deletedDeal = await Deal.destroy({ where: { id } });

        if (!deletedDeal) {
            return res.status(404).json({ message: 'Deal không tồn tại' });
        }

        return res.status(200).json({ message: 'Deal đã được xóa' });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Lỗi server khi xóa deal' });
    }
}

// Lấy danh sách deal

exports.getDeals = async (req, res) => {
    try {
        const deals = await Deal.findAll({
            include: [
                { model: Customer, as: 'customer' },
                { model: User, as: 'user' },
                { model: Invoice, as: 'invoices' }, // Thêm Invoice vào include
            ],
        });

        return res.status(200).json(deals);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Lỗi server khi lấy danh sách deal' });
    }
}
// Lấy thông tin deal theo ID

exports.getDealById = async (req, res) => {
    try {
        const { id } = req.params;

        const deal = await Deal.findByPk(id, {
            include: [
                { model: Customer, as: 'customer' },
                { model: User, as: 'salesRep' },
            ],
        });

        if (!deal) {
            return res.status(404).json({ message: 'Deal không tồn tại' });
        }

        return res.status(200).json(deal);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Lỗi server khi lấy thông tin deal' });
    }
}

exports.getDealsByUserId = async (req, res) => {
    try {
        const { userId } = req.params;

        const deals = await Deal.findAll({
            where: { userId },
            include: [
                { model: Customer, as: 'customer' },
                { model: User, as: 'user' },
            ],
        });

        return res.status(200).json(deals);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Lỗi server khi lấy danh sách deal theo userId' });
    }
}

exports.getDealsByCustomerId = async (req, res) => {
    try {
        const { customerId } = req.params;

        const deals = await Deal.findAll({
            where: { customerId },
            include: [
                { model: Customer, as: 'customer' },
                { model: User, as: 'user' },
            ],
        });

        return res.status(200).json(deals);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Lỗi server khi lấy danh sách deal theo customerId' });
    }
}
