const mongoose = require("mongoose");

const Subcribers = new mongoose.Schema({
    email: String,
    phone_number:String,
    name:String,
    first_name: String,
    last_name: String,
    is_subscribe : {
        type: Boolean, default: true
    }
});

module.exports = mongoose.model("subcribers",Subcribers);