const mongoose = require('mongoose');

const voucherSchema = mongoose.Schema({
  code: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  description: {
    type: String,
    required: true,
    trim: true,
  },
  discountType: {
    type: String,
    enum: ['percentage', 'fixed'],
    required: true,
  },
  discountValue: {
    type: Number,
    required: true,
  },
  minOrderValue: {
    type: Number,
    default: 0, // Giá trị đơn hàng tối thiểu để áp dụng voucher
  },
  maxDiscountAmount: {
    type: Number,
    default: null, // Số tiền giảm giá tối đa (chỉ áp dụng với 'percentage')
  },
  startDate: {
    type: Date,
    required: true,
  },
  endDate: {
    type: Date,
    required: true,
  },
  usageLimit: {
    type: Number,
    default: 1, // Số lần sử dụng voucher này có giới hạn
  },
  usageCount: {
    type: Number,
    default: 0, // Số lần voucher đã được sử dụng
  },
  active: {
    type: Boolean,
    default: true,
  },
}, {
  timestamps: true, // Tự động thêm createdAt và updatedAt
});

voucherSchema.methods.isValid = function() {
  // Kiểm tra nếu voucher vẫn còn hiệu lực (còn trong thời gian áp dụng và chưa hết số lượng sử dụng)
  const now = new Date();
  return this.active && this.usageCount < this.usageLimit && now >= this.startDate && now <= this.endDate;
};

const Voucher = mongoose.model('Voucher', voucherSchema);

module.exports = Voucher;
