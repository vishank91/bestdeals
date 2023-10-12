const mongoose = require("mongoose")

const ContactUsSchema = mongoose.Schema({
    name:{
        type:String,
        required:[true,"Name Must Required"]
    },
    email:{
        type:String,
        required:[true,"Email Address Must Required"]
    },
    phone:{
        type:String,
        required:[true,"Phone Number Must Required"]
    },
    subject:{
        type:String,
        required:[true,"Subject Must Required"]
    },
    message:{
        type:String,
        required:[true,"Message Must Required"]
    },
    date:{
        type:String,
        required:[true,"Date Must Required"]
    },
    status:{
        type:String,
        default:"Active"
    }
})
const ContactUs = new mongoose.model("ContactUs",ContactUsSchema)

module.exports = ContactUs