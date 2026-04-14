const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const UserModel = require("../Models/User.js");
const userModel = require('../Models/User.js');

const signup = async (req, res) =>{
    try {
        const {name, email, password} = req.body;
        const user = await UserModel.findOne({email});
        if(user){
            return res.status(400)
            .json({message: "User already exists, you can login", success: false});
        }
        const userModel = new UserModel({ name, email, password });
        userModel.password = await bcrypt.hash(password, 10);
        await userModel.save();
        res.status(201).json({
            message: "Signup successfully",
            success: true
        })
    } catch (error) {
        res.status(500).json({
            message: "Internal server error",
            success: false
        })        
    }
}

const login = async (req, res) =>{
    try {
        const { email, password} = req.body;
        const user = await UserModel.findOne({email});
        const error_msg = "Authentication failed, email or password is wrong";
        if(!user){
            return res.status(403)
            .json({message: error_msg, success: false});
        }
        const isPassEq = await bcrypt.compare(password, user.password);
        if(!isPassEq){
               return res.status(403)
            .json({message: error_msg, success: false});
        }

        const jwtToken = jwt.sign({email: user.email, _id: user._id},
            process.env.JWT_SECRET,
            {expiresIn: '24h'}
        )

        res.status(200).json({
            message: "Login successfully",
            success: true,
            jwtToken,
            email,
            name: user.name
        })
    } catch (error) {
        res.status(500).json({
            message: "Internal server error",
            success: false
        })        
    }
}
//...........................=>34:21

module.exports = {signup, login};