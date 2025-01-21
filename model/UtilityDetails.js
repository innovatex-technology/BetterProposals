const mongoose = require("mongoose");

const dynamicSchema = new mongoose.Schema({}, { strict: false });
module.exports = mongoose.model("utility",dynamicSchema);