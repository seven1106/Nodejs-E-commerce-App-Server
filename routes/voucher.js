const express = require('express');
const controller = require("../controllers/voucher");

const router = express.Router();

// Route để lấy tất cả các voucher
router.get('/get-vouchers', controller.getAllVouchers);

// Route để lấy một voucher theo ID
router.get('/get-voucher/:id', controller.getVoucherById);

// Route để tạo một voucher mới
router.post('/create-voucher', controller.createVoucher);

// Route để cập nhật một voucher theo ID
router.put('/update-voucher/:id', controller.updateVoucher);

// Route để xóa một voucher theo ID
router.delete('/delete-voucher/:id', controller.deleteVoucher);

module.exports = router;
