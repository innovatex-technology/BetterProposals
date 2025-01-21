const mongoose = require("mongoose");

const likeSchema = new mongoose.Schema({
    blog_id:{type: mongoose.Schema.Types.ObjectId,},
    like_count:Number,
    created_date:Date,
    last_updated_date:Date,
});

module.exports = mongoose.model("likes",likeSchema);