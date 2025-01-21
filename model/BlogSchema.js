const mongoose = require("mongoose");

const blogSchema = new mongoose.Schema({
    owner_id:{type: mongoose.Schema.Types.ObjectId},
    created_date:Date,
    last_updated_date:Date,
    published_date:Date,
    is_final:{type: Boolean, default: false},
    is_saved:{type: Boolean, default: false},
    published:{type: Boolean, default: false},
    createby:{type: String, default: null},
    is_deleted:{type: Boolean, default: false},
    tag_list:{type: String, default: null},
    description:{type: String, default: null},
    blog_header:{type: String, default: null},
    blog_details:{type: String, default: null},
    category:{type:Array, default: []},
    reviewed_submitted:{type: Boolean, default: false},
    reviewed_by:{type: String, default: null},
    reviewed:{type: Boolean, default: false},
    reviewed_comment: {type: Array, default: []}
});

module.exports = mongoose.model("blogs",blogSchema);