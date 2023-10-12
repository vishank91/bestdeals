const mongoose = require("mongoose")

const BrandSchema = mongoose.Schema({
    name:{
        type:String,
        unique:true,
        required:[true,"Brand Name Must Required"]
    },
    pic:{
        type:String,
        default:""
    }
})
const Brand = new mongoose.model("Brand",BrandSchema)

module.exports = Brand