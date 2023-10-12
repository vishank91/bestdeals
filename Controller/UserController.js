const User = require("../Models/User")
const fs = require("fs")
const passwordValidator = require('password-validator')
const bcrypt = require('bcrypt')
const nodemailer = require("nodemailer")
const jwt = require("jsonwebtoken")

// const client = require('twilio')(process.env.ACCOUNT_SID, process.env.AUTH_TOKEN);

var transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    tls: true,
    auth: {
        user: "karmadjango@gmail.com",
        pass: "ctopjtbhfpkialac"
    }
})

// Create a schema
var schema = new passwordValidator();

// Add properties to it
schema
    .is().min(8)                                    // Minimum length 8
    .is().max(100)                                  // Maximum length 100
    .has().uppercase(1)                              // Must have uppercase letters
    .has().lowercase(1)                              // Must have lowercase letters
    .has().digits(1)                                // Must have at least 2 digits
    .has().not().spaces()                           // Should not have spaces
    .is().not().oneOf(['Passw0rd', 'Password123', 'Admin@123', 'Admin@12345', 'Admin@123456789']); // Blacklist these values



async function create(req, res) {
    if (schema.validate(req.body.password)) {
        bcrypt.hash(req.body.password, 12, async (error, hash) => {
            if (error)
                res.status(500).send({ result: "Fail", message: "Internal Server Error" })
            else {
                try {
                    let data = new User(req.body)
                    data.password = hash
                    await data.save()
                    res.send({ result: "Done", message: "Record is Created", data: data })
                } catch (error) {
                    console.log(error);
                    if (error.keyValue)
                        res.status(400).send({ result: "Fail", message: "User Name Must Be Unique" })
                    else if (error.errors.name)
                        res.status(400).send({ result: "Fail", message: error.errors.name.message })
                    else if (error.errors.username)
                        res.status(400).send({ result: "Fail", message: error.errors.username.message })
                    else if (error.errors.email)
                        res.status(400).send({ result: "Fail", message: error.errors.email.message })
                    else if (error.errors.phone)
                        res.status(400).send({ result: "Fail", message: error.errors.phone.message })
                    else if (error.errors.password)
                        res.status(400).send({ result: "Fail", message: error.errors.password.message })
                    else
                        res.status(500).send({ result: "Fail", message: "Internal Server Error" })
                }
            }
        })
    }
    else
        res.status(400).send({ result: "Fail", message: "Invalid Password!!! Password Must Contains min 8 Characters and Max 100 Characters and it must contains atleast 1 Digit, Atleast 1 Upper Case Character, Atleast 1 Lower Case Character!!!" })
}
async function get(req, res) {
    try {
        let data = await User.find().sort({ "_id": -1 })
        res.send({ result: "Done", count: data.length, data: data })
    } catch (error) {
        console.log(error);
        res.status(500).send({ result: "Fail", message: "Internal Server Error" })
    }
}
async function getSingle(req, res) {
    try {
        let data = await User.findOne({ _id: req.params._id })
        if (data)
            res.send({ result: "Done", data: data })
        else
            res.send({ result: "Fail", message: "Record not Found" })
    } catch (error) {
        console.log(error);
        res.status(500).send({ result: "Fail", message: "Internal Server Error" })
    }
}
async function update(req, res) {
    try {
        let data = await User.findOne({ _id: req.params._id })
        if (data) {
            data.name = req.body.name ?? data.name
            data.email = req.body.email ?? data.email
            data.phone = req.body.phone ?? data.phone
            data.address = req.body.address ?? data.address
            data.pin = req.body.pin ?? data.pin
            data.city = req.body.city ?? data.city
            data.state = req.body.state ?? data.state
            if (req.file) {
                try {
                    fs.unlinkSync("public/users/" + data.pic)
                } catch (error) { }
                data.pic = req.file.filename
            }
            await data.save()
            res.send({ result: "Done", message: "Record is Updated" })
        }
        else
            res.send({ result: "Fail", message: "Record not Found" })
    } catch (error) {
        if (error.keyValue)
            res.status(400).send({ result: "Fail", message: "Name Must Be Unique" })
        else if (error.errors.name)
            res.status(400).send({ result: "Fail", message: error.errors.name.message })
        else if (error.errors.email)
            res.status(400).send({ result: "Fail", message: error.errors.email.message })
        else if (error.errors.phone)
            res.status(400).send({ result: "Fail", message: error.errors.phone.message })
        else if (error.errors.password)
            res.status(400).send({ result: "Fail", message: error.errors.password.message })
        else
            res.status(500).send({ result: "Fail", message: "Internal Server Error" })
    }
}
async function deleteData(req, res) {
    try {
        let data = await User.findOne({ _id: req.params._id })
        if (data) {
            try {
                fs.unlinkSync("public/users/" + data.pic)
            } catch (error) { }
            await data.deleteOne()
            res.send({ result: "Done", message: "Record is Deleted" })
        }
        else
            res.send({ result: "Fail", message: "Record not Found" })
    } catch (error) {
        console.log(error);
        res.status(500).send({ result: "Fail", message: "Internal Server Error" })
    }
}
async function login(req, res) {
    try {
        let data = await User.findOne({ username: req.body.username })
        if (data) {
            if (await bcrypt.compare(req.body.password, data.password)) {
                let key = data.role=="Admin"?process.env.SECRET_KEY_ADMIN:process.env.SECRET_KEY_BUYER
                jwt.sign({data},key,(error,token)=>{
                    if(error)
                    res.status(500).send({ result: "Fail", message: "Internal Server Error" })
                    else
                    res.send({result:"Done",data:data,token:token})
                })
            }
            else
                res.send({ result: "Fail", message: "Invalid Username or Password" })
        }
        else
            res.send({ result: "Fail", message: "Invalid Username or Password" })
    } catch (error) {
        console.log(error);
        res.status(500).send({ result: "Fail", message: "Internal Server Error" })
    }
}

async function forgetPassword1(req, res) {
    try {
        var data = await User.findOne({ username: req.body.username })
        if (data) {
            let otp = parseInt(Math.random() * 1000000);
            data.otp = otp
            await data.save()

            let mailOptions = {
                to: data.email,
                from: "karmadjango@gmail.com",
                subject: "OTP for Password Reset : Team BestDeals",
                text: `
                            Hello ${data.name}
                            OTP for Password Reset is ${otp}
                            Never Share OTP With Anyone
                            Team : BestDeals
                        `
            }
            transporter.sendMail(mailOptions, (error) => {
                if (error)
                    console.log(error)
            })

            // client.messages
            //     .create({
            //         body: `
            //                 Hello ${data.name}
            //                 OTP for Password Reset is ${otp}
            //                 Never Share OTP With Anyone
            //                 Team : BestDeals
            //             `,
            //         to: `+91${data.phone}`, // Text your number
            //         from: '+12569523830', // From a valid Twilio number
            //     })
            //     .then((message) => {});
            // res.send({ result: "Done", message: "OTP Sent on Registered Email Id" })
        }
        else
            res.status(401).send({ result: "Fail", message: "Username is Invalid" })
    } catch (error) {
        res.status(500).send({ result: "Fail", message: "Internal Server Error" })
    }
}
async function forgetPassword2(req, res) {
    try {
        var data = await User.findOne({ username: req.body.username })
        if (data) {
            if (data.otp == req.body.otp)
                res.send({ result: "Done" })
            else
                res.status(401).send({ result: "Fail", message: "Invalid OTP" })
        }
        else
            res.status(401).send({ result: "Fail", message: "Anauthorized Activity" })
    } catch (error) {
        res.status(500).send({ result: "Fail", message: "Internal Server Error" })
    }
}
async function forgetPassword3(req, res) {
    try {
        var data = await User.findOne({ username: req.body.username })
        if (data) {
            bcrypt.hash(req.body.password, 12, async(error, hash) => {
                if (error) {
                    console.log(error)
                    res.status(500).send({ result: "Fail", message: "Internal Server Error" })
                }
                else{
                    data.password = hash
                    await data.save()
                    res.send({ result: "Done" })
                }
            })
        }
        else
            res.status(401).send({ result: "Fail", message: "Anauthorized Activity" })
    } catch (error) {
        res.status(500).send({ result: "Fail", message: "Internal Server Error" })
    }
}

module.exports = [create, get, getSingle, update, deleteData, login, forgetPassword1,forgetPassword2,forgetPassword3]