// models/Quotation.js
const mongoose = require('mongoose');

const ItemSchema = new mongoose.Schema({
  area: { type: Number, required: true },
  color: { type: String, required: true },
  glazing: { type: String, required: true },
  id: { type: String, required: true },
  image: { type: Object, required: false }, // Assuming image is an object
  imageHeight: { type: Number, required: true },
  imageWidth: { type: Number, required: true },
  name: { type: String, required: true },
  quantity: { type: Number, required: true },
  size: { type: String, required: true },
  total: { type: Number, required: true },
  type: { type: String, required: true },
  unitPrice: { type: Number, required: true },
});

const QuotationSchema = new mongoose.Schema({
  companyLogo: { type: Object, required: false },
  companyName: { type: String, required: true },
  cin: { type: String, required: true },
  companyAddress: { type: String, required: true },
  quotationNo: { type: String, required: true },
  date: { type: Date, required: true },
  clientName: { type: String, required: true },
  clientAddress: { type: String, required: true },
  quotationTitle: { type: String, default: "quotation" },
  items: { type: [ItemSchema], required: true },
  discount: { type: Number, required: false },
  totals: {
    totalArea: { type: Number, required: true },
    totalUnits: { type: Number, required: true },
    grandTotal: { type: Number, required: true },
  },
});

module.exports = mongoose.model('Quotation', QuotationSchema);
