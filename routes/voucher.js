const express = require('express');
const controller = require("../controllers/voucher");

const voucherRouter = express.Router();

// Route để lấy tất cả các voucher
voucherRouter.get('/get-vouchers', controller.getAllVouchers);

// Route để lấy một voucher theo ID
voucherRouter.get('/get-voucher/:id', controller.getVoucherById);

// Route để tạo một voucher mới
voucherRouter.post('/create-voucher', controller.createVoucher);

// Route để cập nhật một voucher theo ID
voucherRouter.put('/update-voucher/:id', controller.updateVoucher);

// Route để xóa một voucher theo ID
voucherRouter.delete('/delete-voucher/:id', controller.deleteVoucher);

module.exports = voucherRouter;
