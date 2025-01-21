const mongoose = require("mongoose");

const newsLetterSchema = new mongoose.Schema({
    user_id:{type: mongoose.Schema.Types.ObjectId,},
    news_letter_month:String,
    newsletter_c_key: String,
    created_date: {type: Date, default: new Date()},
    last_updated_date: Date,
});

module.exports = mongoose.model("newsletter",newsLetterSchema);