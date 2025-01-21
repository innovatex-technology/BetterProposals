const mongoose = require("mongoose");

const Consent = new mongoose.Schema({
    disclaimer_consent:Boolean,
    ip_address:String,
    created_date:{type: Date, default: new Date()},
    last_updated_date:{type: Date, default: new Date()},
    user_agent:String,
    platform:String,
    language:String
});

module.exports = mongoose.model("consent",Consent);