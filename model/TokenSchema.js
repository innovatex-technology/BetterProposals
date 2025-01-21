const mongoose = require('mongoose');

const TokenSchema = mongoose.Schema({
    token: {
        type: String,
        required: true
    }
});


module.exports = mongoose.model('token', TokenSchema);
