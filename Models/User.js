const mongoose = require("mongoose")

const UserSchema = mongoose.Schema({
    name:{
        type:String,
        required:[true,"Name Must Required"]
    },
    username:{
        type:String,
        unique:true,
        required:[true,"User Name Must Required"]
    },
    email:{
        type:String,
        required:[true,"Email Address Must Required"]
    },
    phone:{
        type:String,
        required:[true,"Phone Number Must Required"]
    },
    password:{
        type:String,
        required:[true,"Password Must Required"]
    },
    address:{
        type:String,
        default:""
    },
    pin:{
        type:String,
        default:""
    },
    city:{
        type:String,
        default:""
    },
    state:{
        type:String,
        default:""
    },
    pic:{
        type:String,
        default:""
    },
    role:{
        type:String,
        default:"Buyer"
    },
    otp:{
        type:Number,
        default:-1
    }
})
const User = new mongoose.model("User",UserSchema)

module.exports = User