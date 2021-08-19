const User = require("../models/user")
const ErrorResponse = require("../utils/errorResponse")
    //const sendEmail = require("../utils/sendEmail")
const crypto = require("crypto")

//when we use asynchrones function we need try catch block
exports.register = async(req, res, next) => {

    const { username, email, password } = req.body //destructure method

    try {
        const user = await User.create({
            username,
            email,
            password //this.password fild of user.js in models

        })
        sendToken(user, 200, res)

    } catch (error) {
        next(error)
    }
}
exports.login = async(req, res, next) => {
    const { email, password } = req.body
    if (!email || !password) {
        return next(new ErrorResponse("Please provide an email and password", 400))

    }
    try {
        const user = await User.findOne({ email }).select("+password")
        if (!user) {
            return next(new ErrorResponse("Invalid Credentials", 400))

        }
        const isMatch = await user.matchPasswords(password)

        if (!isMatch) {
            return next(new ErrorResponse("Invalid Credential", 401))

        }
        sendToken(user, 200, res)

    } catch (error) {
        res.status(500).json({
            success: false,
            error: error.massage

        })
    }
}
const sendToken = (user, statusCode, res) => { //JWT get
    const token = user.getSignedToken();
    res.status(200).json({ success: true, token });
}