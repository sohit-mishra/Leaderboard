const User = require("../models/User");
const bcrypt = require("bcrypt");
const crypto = require("crypto");
const generateToken  = require("../utils/generateToken");
const sendResetEmail = require("../services/mailService");
const env = require('../config/env');

const register = async(req,res)=>{
    try {
        const {name , email , password } = req.body;

        if(!name || !email || !password){
            return res.status(400).json({message:"All fields are required"});
        }

        const exists =  await User.findOne({email});

        if (exists){
            return res.status(400).json({message:"Email already registered"});
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await User.create({name, email, password: hashedPassword});

        const getToken = generateToken(user._id);
        console.log(getToken); 

        res.json({
            _id: user._id,
            name:user.name,
            email:user.email,
            token: getToken,
        });
    } catch (error) {
        res.status(500).json({message : error.message});
    }
}

const login = async(req,res)=>{
    try {
        const {email , password} = req.body;
        const exists = await User.findOne({email});

        if(!exists){
            return res.status({message:"Email ID already registered."})
        }

        const checkPassword = await bcrypt.compare(password, exists.password);
        if(!checkPassword){
            return res.status(400).json({message:"Password is incorrect"})
        }

        res.json({
            _id:exists._id,
            name:exists.name,
            email:exists.email,
            avatarUrl: exists.avatarUrl,
            token: generateToken(exists._id),
        })
    } catch (error) {
        res.status(500).json({message : error.message});
    }
}

const forgotPassword = async(req,res)=>{
    try {
        const {email} = req.body;

        const exists = await User.findOne({email});

        if(!exists){
            return res.status(400).json({message:'If email exists, reset link sent'})
        }

        const rawToken = crypto.randomBytes(32).toString("hex");
        const hashedToken = crypto.createHash("sha256").update(rawToken).digest('hex');

        exists.resetToken = hashedToken,
        exists.resetTokenExp = Date.now() + 15 * 60 *1000;

        await exists.save();

        const resetUrl = `${env.FRONTED_URL}/reset-password/${rawToken}`;

        await sendResetEmail(exists.email, exists.name, resetUrl);

        res.json({
            message:"If email exists, reset link sent"
        })

    } catch (error) {
        res.status(500).json({message : error.message});
    }
}

const resetPassword = async(req,res)=>{
    try {
        const {token} = req.params;
        const {password} = req.body;

        const hashed = crypto.createHash("sha256").update(token).digest('hex');

        const exists = await User.findOne({
            resetToken: hashed,
            resetToken: {$gt: Date.now()},
        });

        if(!exists) {
            return res.status(400).json({message: "Token invalid or expired"});
        }

        exists.password = await bcrypt.hash(password, 10);
        exists.resetToken = undefined;
        exists.resetTokenExp  = undefined;

        await exists.save();

        res.json({message: "Password reset Successfully"});
    } catch (error) {
        res.status(500).json({msg : error.message});
    }
}

module.exports = { register, login, forgotPassword, resetPassword };
