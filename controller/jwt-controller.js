
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const Token = require('../model/TokenSchema.js');
dotenv.config();

//Verify Bearer Token
const authenticateToken = (request, response, next) => {
    try {
        const authHeader = request.headers['authorization'];
        const token = authHeader && authHeader.startsWith('Bearer ') && authHeader.split(' ')[1];
        if (token == null) {
            return response.status(400).json({ message: 'Bad Request' });
        }
        jwt.verify(token, process.env.ACCESS_SECRET_KEY, (error, user) => {
            if (error) {
                return response.status(401).json({ message: 'UnAuthorized' })
            }
            request.user = user;
            next();
        })
    } catch (err) {
        console.error(err);
        response.status(500).json({ error: 'Internal Server Error' });
    }
}


//Create New Token
const refreshAccessToken = async (request, response) => {
    try {
        const refreshToken = request.body.refreshToken.split('Bearer ')[1];
        if (!refreshToken) {
            return response.status(400).json({ message: 'Refresh token is missing' })
        }
        const token = await Token.findOne({ token: refreshToken });

        if (!token) {
            return response.status(404).json({ message: 'Refresh token is not valid' });
        }
        jwt.verify(token.token, process.env.REFRESH_SECRET_KEY, (error, user) => {
            if (error) {
                return response.status(500).json({ message: 'Invalid refresh token' });
            }
            user["current_time"] =  new Date().toISOString()
            user["exp"] = Math.floor(Date.now() / 1000) + (60 * 30);
            console.log(user)
            const accessToken = jwt.sign(user, process.env.ACCESS_SECRET_KEY);
            return response.status(200).json({ "Message": "Token Refresh Successfully", data: { accessToken: accessToken } })
        })
    } catch (err) {
        console.error(err);
        response.status(500).json({ error: 'Internal Server Error' });
    }
}


module.exports = {
    authenticateToken,
    refreshAccessToken,
}