const mongoose = require("mongoose")
const Schema = mongoose.Schema
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const crypto = require("crypto")


const UserSchema = new Schema({
        username: {
            type: String,
            require: [true, "Please enter a username"]
        },

        email: {
            type: String,
            required: [true, "please provide a email"],
            unique: true,
            match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, "Please provide a valide email"]

        },
        password: {
            type: String,
            required: [true, "Please enter a password"],
            select: false,
            minlength: 6 //minimum password length is 6
        },
        resetPasswordToken: String,
        resetPasswordExpire: Date

    })
    //this is for register route
UserSchema.pre("save", async function(next) {
        if (!this.isModified("password")) {
            next()
        }
        const salt = await bcrypt.genSalt(10)
        this.password = await bcrypt.hash(this.password, salt)

        next()

    })
    //this is for login
UserSchema.methods.matchPasswords = async function(password) {
        return await bcrypt.compare(password, this.password)
    }
    //for register json web token
UserSchema.methods.getSignedToken = function() {
    return jwt.sign({ id: this._id }, process.env.jwt_SECRET, { expiresIn: process.env.jwt_EXPIRE })

}
const User = mongoose.model("User", UserSchema)
module.exports = User