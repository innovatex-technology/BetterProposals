const mongoose = require("mongoose");

const contactUs = new mongoose.Schema({
    first_name: String,
    last_name:String,
    created_date:Date,
    last_updated_date:Date,
    email:String,
    phone_number:String,
    service_id:String,
    subcribe:Boolean,
    message:String,
    position:String,
    experiance:Number,
    available_data:Date,
    page_c_key:String,
    resume_files_ckey:String

});

module.exports = mongoose.model("contactus",contactUs);