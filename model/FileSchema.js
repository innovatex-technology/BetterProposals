const mongoose = require("mongoose");

const fileSchema = new mongoose.Schema({
  c_key: { type: String, require : true},
  filename: { type: String, require : true},
  contentType: { type: String, require : true},
  path: Buffer,
  blog_id:{type: mongoose.Schema.Types.ObjectId},
  page_id:{type: mongoose.Schema.Types.ObjectId,}
});

const Filess = mongoose.model('files', fileSchema);
module.exports = Filess;