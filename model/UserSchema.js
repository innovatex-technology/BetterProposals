const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    first_name:String,
    last_name:String,
    name:String,
    profile_image: {type: mongoose.Schema.Types.ObjectId},
    address: String,
    permanent_address: String,
    position: String,
    position_desc: String,
    graduation: String,
    university:String,
    phone_number:Number,
    whatsapp_number:Number,
    description:String,
    email:String,
    country:String,
    zipcode:String,
    city:String,
    p_city:String,
    username:String,
    p_country:String,
    p_zipcode:String,
    dob:Date,
    doj:Date,
    password:String,
    created_date:Date,
    created_by: {type: mongoose.Schema.Types.ObjectId},
    last_updated_by:{type: mongoose.Schema.Types.ObjectId},
    last_updated_date: Date,
    role:String,
    permissions: {type: Array, default: []}
});

module.exports = mongoose.model("users",userSchema);