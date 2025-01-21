const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema({
    blog_id:{type: mongoose.Schema.Types.ObjectId,  ref: 'blogs', require: true},
    created_date:{type: Date, default: new Date()},
    last_updated_date: {type: Date, default: new Date()},
    comment_desc:String,
    name:String,
    email:String,
    is_verified: {type: Boolean, default: false},
    is_deleted: {type: Boolean, default: false},
    user_id:{type: mongoose.Schema.Types.ObjectId, ref: 'blogs', require: false}
});

module.exports = mongoose.model("comments",commentSchema);