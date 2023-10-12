const mongoose = require("mongoose")

const WishlistSchema = mongoose.Schema({
    userid:{
        type:String,
        required:[true,"User Id Must Required"]
    },
    productid:{
        type:String,
        required:[true,"Product Id Must Required"]
    },
    name:{
        type:String,
        required:[true,"Product Name Must Required"]
    },
    brand:{
        type:String,
        required:[true,"Brand Must Required"]
    },
    color:{
        type:String,
        required:[true,"Color Must Required"]
    },
    size:{
        type:String,
        required:[true,"Size Must Required"]
    },
    price:{
        type:Number,
        required:[true,"Price Must Required"]
    },
    pic:{
        type:String
    },
})
const Wishlist = new mongoose.model("Wishlist",WishlistSchema)

module.exports = Wishlist