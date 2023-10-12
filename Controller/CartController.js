const Cart = require("../Models/Cart")

async function create(req, res) {
    try {
        let data = new Cart(req.body)
        await data.save()
        res.send({ result: "Done", message: "Record is Created", data: data })
    } catch (error) {
        console.log(error);
        if (error.errors.userid)
            res.status(400).send({ result: "Fail", message: error.errors.userid.message })
        else if (error.errors.productid)
            res.status(400).send({ result: "Fail", message: error.errors.productid.message })
        else if (error.errors.name)
            res.status(400).send({ result: "Fail", message: error.errors.name.message })
        else if (error.errors.color)
            res.status(400).send({ result: "Fail", message: error.errors.color.message })
        else if (error.errors.size)
            res.status(400).send({ result: "Fail", message: error.errors.size.message })
        else if (error.errors.brand)
            res.status(400).send({ result: "Fail", message: error.errors.brand.message })
        else if (error.errors.price)
            res.status(400).send({ result: "Fail", message: error.errors.price.message })
        else if (error.errors.qty)
            res.status(400).send({ result: "Fail", message: error.errors.qty.message })
        else if (error.errors.total)
            res.status(400).send({ result: "Fail", message: error.errors.total.message })
        else
            res.status(500).send({ result: "Fail", message: "Internal Server Error" })
    }
}
async function get(req, res) {
    try {
        let data = await Cart.find({ userid: req.params.userid }).sort({ "_id": -1 })
        res.send({ result: "Done", count: data.length, data: data })
    } catch (error) {
        console.log(error);
        res.status(500).send({ result: "Fail", message: "Internal Server Error" })
    }
}
async function getSingle(req, res) {
    try {
        let data = await Cart.findOne({ _id: req.params._id })
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
        let data = await Cart.findOne({ _id: req.params._id })
        if (data) {
            data.qty = req.body.qty ?? data.qty
            data.total = req.body.total ?? data.total
            await data.save()
            res.send({ result: "Done", message: "Record is Updated" })
        }
        else
            res.send({ result: "Fail", message: "Record not Found" })
    } catch (error) {
        if (error.errors.qty)
            res.status(400).send({ result: "Fail", message: error.errors.qty.message })
        else if (error.errors.total)
            res.status(400).send({ result: "Fail", message: error.errors.total.message })
        else
            res.status(500).send({ result: "Fail", message: "Internal Server Error" })
    }
}
async function deleteData(req, res) {
    try {
        let data = await Cart.findOne({ _id: req.params._id })
        if (data) {
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
module.exports = [create, get, getSingle, update, deleteData]