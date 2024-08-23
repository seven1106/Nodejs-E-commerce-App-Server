const  Voucher = require("../models/voucher");


// Lấy tất cả các voucher
const getAllVouchers = async (req, res) => {
    try {
      const vouchers = await Voucher.find();
      res.status(200).json(vouchers);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
  
  // Lấy thông tin voucher bằng ID
  const getVoucherById = async (req, res) => {
    try {
      const voucher = await Voucher.findById(req.params.id);
      if (!voucher) {
        return res.status(404).json({ message: 'Voucher không tồn tại' });
      }
      res.status(200).json(voucher);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
  
  // Tạo mới voucher
  const createVoucher = async (req, res) => {
    const { code, description, discountType, discountValue, minOrderValue, maxDiscountAmount, startDate, endDate, usageLimit, active } = req.body;
  
    const newVoucher = new Voucher({
      code,
      description,
      discountType,
      discountValue,
      minOrderValue,
      maxDiscountAmount,
      startDate,
      endDate,
      usageLimit,
      active,
    });
  
    try {
      const savedVoucher = await newVoucher.save();
      res.status(201).json(savedVoucher);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  };
  
  // Cập nhật thông tin voucher
  const updateVoucher = async (req, res) => {
    try {
      const updatedVoucher = await Voucher.findByIdAndUpdate(req.params.id, req.body, { new: true });
      if (!updatedVoucher) {
        return res.status(404).json({ message: 'Voucher không tồn tại' });
      }
      res.status(200).json(updatedVoucher);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  };
  
  // Xóa voucher
  const deleteVoucher = async (req, res) => {
    try {
      const deletedVoucher = await Voucher.findByIdAndDelete(req.params.id);
      if (!deletedVoucher) {
        return res.status(404).json({ message: 'Voucher không tồn tại' });
      }
      res.status(200).json({ message: 'Xóa voucher thành công' });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
  
  module.exports = {
    getAllVouchers,
    getVoucherById,
    createVoucher,
    updateVoucher,
    deleteVoucher,
  };
  