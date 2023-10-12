const mongoose = require("mongoose")

const NewsletterSchema = mongoose.Schema({
    email:{
        type:String,
        unique:true,
        required:[true,"Email Address Must Required"]
    }
})
const Newsletter = new mongoose.model("Newsletter",NewsletterSchema)

module.exports = Newsletter