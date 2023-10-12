const mongoose = require("mongoose")

const CheckoutSchema = mongoose.Schema({
    userid: {
        type: String,
        required: [true, "User Id Must Required"]
    },
    paymentmode: {
        type: String,
        default: "COD"
    },
    paymentstatus: {
        type: String,
        default: "Pending"
    },
    orderstatus: {
        type: String,
        default: "Order Placed"
    },
    subtotal: {
        type: Number,
        required: [true, "Subtotal Must Required"]

    },
    shipping: {
        type: Number,
        required: [true, "Shipping Amount Must Required"]
    },
    total: {
        type: Number,
        required: [true, "Total Must Required"]
    },
    rppid: {
        type: String,
        default: ""
    },
    date:{
        type:String,
        default:""
    },
    products: [
        {
            productid: {
                type: String,
                required: [true, "Product Id Must Required"]
            },
            name: {
                type: String,
                required: [true, "Product Name Must Required"]
            },
            brand: {
                type: String,
                required: [true, "Brand Must Required"]
            },
            color: {
                type: String,
                required: [true, "Color Must Required"]
            },
            size: {
                type: String,
                required: [true, "Size Must Required"]
            },
            price: {
                type: Number,
                required: [true, "Price Must Required"]
            },
            qty: {
                type: Number,
                required: [true, "Quantity Must Required"]
            },
            total: {
                type: Number,
                required: [true, "Total Must Required"]
            },
            pic: {
                type: String
            },
        }
    ]
})
const Checkout = new mongoose.model("Checkout", CheckoutSchema)

module.exports = Checkout