import mongoose from "mongoose"
import { createError } from "../error.js";
import User from '../models/User.js';
import bcrypt from 'bcryptjs'
import jwt from "jsonwebtoken"
// import createError from '../error.js' 
export const signup = async (req, res, next) => {
    try {
        const newUser = new User(req.body);
        await newUser.save();

        res.status(200).send("user created")
    } catch (err) {
        next(err)
    }
}

export const login = async (req, res, next) => {
    try {
        const user = await User.findOne({ email: req.body.email });
        if (!user) return next(createError(404, "User not found"));

        const isCorrect = await bcrypt.compare(req.body.password, user.password)
        if (!isCorrect) return next(createError(404, "either email or password incorrect"));

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET)
        const { password, ...others } = user._doc
        res.cookie("access_token", token, {
            httpOnly: true
        }).status(200).json(others)
    } catch (err) {
        console.log(err);
    }
}