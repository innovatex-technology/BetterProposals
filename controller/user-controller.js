const User = require("../model/UserSchema.js");
const OTP = require("../model/PasswordReset.js");
const dotenv = require('dotenv');
const Token = require('../model/TokenSchema.js')
const jwt = require('jsonwebtoken')
const nodemailer = require('nodemailer');
const bcrypt = require('bcrypt');
const { use } = require("../routes/route.js");
const Utility = require('../model/UtilityDetails.js')
dotenv.config();

//Register User API
const createUser = async (req, resp) => {
    try {
        let response;
        if (req.body.email && req.body.password) {
            let findExisting = await User.findOne({ "email": req.body.email });
            if (!findExisting) {
                const hashedPassword = await bcrypt.hash(req.body.password, 10);

                let user = new User(req.body);
                user["password"] = hashedPassword;
                user["created_date"] = new Date()
                user["last_updated_date"] = new Date()
                let result = await user.save();
                result.toObject();
                response = {
                    "message": "User Register Successfully",
                    data: {
                        "_id": result._id,
                        "name": result.name,
                        "email": result.email,
                        "age": result.age,
                    }
                }
            }
            else {
                response = {
                    "message": "User Already Exist with This Email",
                    data: req.body
                }
            }
        }
        else {
            response = {
                "message": "Requireed Fields Missing",
                data: {}
            }
        }
        resp.status(200).json(response);
    } catch (err) {
        resp.status(500).json({ error: 'Internal Server Error' });
    }
}


//Register User API
const updateUserDetails = async (req, resp) => {
    try {
        let response;
        if (req.body._id) {
            let findExisting = await User.findById(req.body._id)
            if (findExisting) {
                let userBody = req.body
                userBody["last_updated_date"] = new Date()
                const result = await User.updateOne({ _id: userBody._id }, userBody)
                let responseUserData = await User.findById(findExisting._id).select('-password')
                response = {
                    "message": "User Updated Successfully",
                    data: responseUserData
                }
            }
            else {
                response = {
                    "message": "User Not Found",
                    data: req.body
                }
            }
        }
        else {
            response = {
                "message": "Requireed Fields ['_Id'] Missing",
                data: {}
            }
        }
        resp.status(200).json(response);
    } catch (err) {
        resp.status(500).json({ error: 'Internal Server Error' });
    }
}

//Register User API
const resetPassword = async (req, resp) => {
    try {
        let response;
        if (req.body.email && req.body.password) {
            let findExistingOtp = await OTP.findOne({email: req.body.email, otp: req.body.otp, isverified: true})
            if(!findExistingOtp)
                resp.status(400).json({message: "Invalid Request"})

            let findExisting = await User.findOne({email: req.body.email})
            if (findExisting) {
                let userBody = {}
                const hashedPassword = await bcrypt.hash(req.body.password, 10);
                userBody["last_updated_date"] = new Date()
                userBody["password"]= hashedPassword

                const result = await User.updateOne({ _id: findExisting._id }, userBody)
                response = {
                    "message": "User Pasword Updated Successfully"
                }
                resp.status(200).json(response)
            }
            else {
                response = {
                    "message": "User Not Found"
                }
                resp.status(400).json(response)
            }
        }
        else {
            response = {
                "message": "Requireed Fields Missing"
            }
            resp.status(400).json(response)
        }
    } catch (err) {
        resp.status(500).json({ error: 'Internal Server Error' });
    }
}

//Login API
const loginUser = async (req, resp) => {
    const authHeader = req.headers.authorization;
    if (!authHeader)
        return resp.status(400).json({ message: "Missing Required Data" });

    const base64Credentials = atob(authHeader.split('Basic ')[1]);
    const credDetails = {
        email: base64Credentials.split(":")[0],
        password: base64Credentials.split(":")[1],
    }
    try {
        let response;
        if (credDetails.password && credDetails.email) {
            let user = await User.findOne({ "email": credDetails.email });

            if (!user) {
                response = {
                    message: "Invalid Username Or Password",
                    data: {}
                }
                resp.status(400).json(response);
            }
            else {
                try {
                    let match = await bcrypt.compare(credDetails.password, user.password);
                    if (match) {
                        let userdetails =
                        {
                            "_id": user._id,
                            "email": user.email,
                            "name": user.name,
                            'current_time': new Date().toISOString(),
                            "exp": Math.floor(Date.now() / 1000) + (60 * 30)
                        }
                        const refreshToken = jwt.sign(userdetails, process.env.REFRESH_SECRET_KEY);
                        userdetails["exp"] = Math.floor(Date.now() / 1000) + (60 * 30)
                        const accessToken = jwt.sign(userdetails, process.env.ACCESS_SECRET_KEY);
                        
                        const newToken = new Token({ token: refreshToken });
                        await newToken.save();
                        let mneuList = await Utility.findOne({c_key: "admin_menu_list"});
                        let responseUserData = await User.findById(user._id).select('-password')
                        const permissions = responseUserData?.permissions || [];
                        const requiredMenus = mneuList?.data_source?.filter(item => permissions.includes(item.c_key));
                        responseUserData.permissions = requiredMenus;
                        resp.status(200).json({ message: "User Login Successfully", data: { user_details: responseUserData, accessToken: accessToken, refreshToken: refreshToken } });

                    } else {
                        response.status(400).json({ message: 'Incorect Password' })
                    }
                } catch (error) {
                    resp.status(500).json({ message: 'error while login the user', data: {} })
                }
            }
        }
        else {
            response = {
                message: "Invalid login request please check input details",
                data: req.body
            }
            resp.status(400).json(response);
        }
    } catch (err) {
        resp.status(500).json({ error: 'Internal Server Error' });
    }
}

//send Email Service
const sendEmailOPTServie = async (req, resp) => {
    // Send email
    try {
        const email = req.body?.email;
        if (!email)
            return resp.status(400).json({ message: "Missing Required Field" })
        const user = await User.findOne({ "email": email });
        if (!user)
            return resp.status(204).json({ message: "Email Not Registered With Us" })
        if (user) {
            const generateotp = generateOTP();
            const emailBody = {
                'to': email,
                'from': mailOptions.from,
                'subject': mailOptions.subject,
                'text': "Your OTP  For Password Change Request Is : " + generateotp
            };
            await transporter.sendMail(emailBody, (error, info) => {
                if (error) {
                    console.log('Error occurred:', error);
                    return resp.status(500).json({ message: error })
                }
                console.log('Email sent:', info.response);
            });
            console.log(generateotp)
            const otpSave = new OTP({
                user_id: user._id,
                email: email,
                otp: generateotp,
                isverified: false,
                created_date: new Date()
            })
            await otpSave.save();
            resp.status(200).json({ message: "OPT Send Successfully" })
        }
    }
    catch (err) {
        console.log(err)
        resp.status(500).json({ error: 'Internal Server Error' });
    }
}

//verify Email Service
const verifyOtpService = async (req, resp) => {
    try {
        const email = req.body?.email;
        const opt = req.body?.otp;
        if (!email || !opt)
            return resp.status(400).json({ message: "Missing Required Field" })
        const user = await User.findOne({ "email": email });
        if (!user)
            return resp.status(204).json({ message: "Email Not Registered With Us" })
        if (user) {
            const findOtp = await OTP.findOne({ email: email }).sort({ _id: -1 })
            if (findOtp) {
                const optDate = new Date(findOtp.created_date)
                const currentDate = Date.now()
                const differenceMs = currentDate - optDate.getTime()
                console.log(differenceMs)
                if (differenceMs > (1000 * 60))
                    return resp.status(400).json({ message: "OTP Expired" })

                findOtp['isverified'] = true
                await OTP.updateOne({ _id: findOtp._id }, findOtp)
                return resp.status(200).json({ message: "OPT Verified Successfully" })
            }
            else{
                return resp.status(400).json({ message: "Invalid OTP" })
            }
        }
    }
    catch (err) {
        return resp.status(500).json({ error: 'Internal Server Error' });
    }
}


// Create a transporter object using SMTP transport
let transporter = nodemailer.createTransport({
    service: 'gmail',
    host: 'smtp.gmail.com',  // SMTP host of Gmail
    port: 587,  // TLS secured port for Gmail
    secure: true,
    auth: {
        user: 'kumar.arun199701@gmail.com',
        pass: 'mzvw ukcm abci qqdn'
    }
});
// Example email data
let mailOptions = {
    from: 'kumar.arun199701@gmail.com',
    subject: 'Password reset OTP Verification',
};

// Generate OTP
function generateOTP() {
    const otp = Math.floor(100000 + Math.random() * 900000);
    return otp.toString();
}

module.exports = {
    createUser,
    loginUser,
    updateUserDetails,
    sendEmailOPTServie,
    verifyOtpService,
    resetPassword
}