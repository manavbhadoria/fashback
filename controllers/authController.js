const User = require('../models/User')
const CryptoJS = require('crypto-js')
const jwt = require('jsonwebtoken')
const nodemailer = require('nodemailer');





let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth : {
        user: "manu.bhadoria@gmail.com",
        pass: "ybijhycbpazdxark"
    },
    tls: {
        rejectUnauthorized: false
    }
})


module.exports.register = async (req,res) => {
    const newUser = new User({
        email: req.body.email, 
        password: CryptoJS.AES.encrypt(req.body.password, "fashback"),
        isAdmin: req.body.isAdmin,
        confirmed: req.body.confirmed
    }
    )
    try {
        const user = await newUser.save();
        console.log(user);
        //sending an email
        let mailOptions = {
            from: 'Verify your email <manu.bhadoria@gmail.com>',
            to: user.email,
            subject: "Please sign up",
            html: `<h1>Email Verify Kar Behenchod </h1>
                    <a href = "http://${req.headers.host}/verify-email?token=${user._id}"> Click Here!</a>`
        }
        console.log(req.headers.host);
        //sending mail
        transporter.sendMail(mailOptions, (err,info) =>{
            if(err)
                console.log(err);
            else
                res.send("verification email sent succesfully");
        });
        res.send('User Registered!');
    }
    catch (err) {
        console.log(err);
    }
}

module.exports.emailverification = async (req,res) => {
    try{
        const token = req.query.token;
        const user = await User.findOne({ _id : token});
        if(user){
            user.confirmed = true,
            await user.save();
            res.redirect('/login');
        }
        else
        {
            res.send("email is not verified");
        }
    }
    catch(err){
        console.log(err);
    }
}
module.exports.login = async (req,res) => {
    try {
        const user = await User.findOne({email : req.body.email});
        if(!user || !user.confirmed)
            res.status(401).json("Credentials are not verified");
        const pass = CryptoJS.AES.decrypt(user.password, "fashback");
        const password  = pass.toString(CryptoJS.enc.Utf8);
        console.log();
        if(password != req.body.password)
            res.status(401).json("hello");
        const accessToken = jwt.sign({
            id: user._id,
            isAdmin: user.isAdmin
        }, "fashback", {expiresIn: "3d"}
        );
        const msg = "login succesful";
        res.status(200).json({msg, accessToken});
    }
    catch( err ){
        console.log(err);
    }
}
