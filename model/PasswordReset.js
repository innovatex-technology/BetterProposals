const mongoose = require("mongoose");

const Otps = new mongoose.Schema({
    created_date: {type: String, default: new Date()},
    user_id:{type: mongoose.Schema.Types.ObjectId},
    email:String,
    otp:String,
    isverified: Boolean
});

module.exports = mongoose.model("otps",Otps);