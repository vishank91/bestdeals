const Product = require("../Models/Product")
const fs = require("fs")

async function create(req, res) {
    try {
        let data = new Product(req.body)
        if (req.files.pic1) {
            data.pic1 = req.files.pic1[0].filename
        }
        if (req.files.pic2) {
            data.pic2 = req.files.pic2[0].filename
        }
        if (req.files.pic3) {
            data.pic3 = req.files.pic3[0].filename
        }
        if (req.files.pic4) {
            data.pic4 = req.files.pic4[0].filename
        }
        await data.save()
        res.send({ result: "Done", message: "Record is Created", data: data })
    } catch (error) {
        console.log(error);
        if (error.keyValue)
            res.status(400).send({ result: "Fail", message: "Name Must Be Unique" })
        else if (error.errors.name)
            res.status(400).send({ result: "Fail", message: error.errors.name.message })
        else if (error.errors.maincategory)
            res.status(400).send({ result: "Fail", message: error.errors.maincategory.message })
        else if (error.errors.subcategory)
            res.status(400).send({ result: "Fail", message: error.errors.subcategory.message })
        else if (error.errors.brand)
            res.status(400).send({ result: "Fail", message: error.errors.brand.message })
        else if (error.errors.color)
            res.status(400).send({ result: "Fail", message: error.errors.color.message })
        else if (error.errors.size)
            res.status(400).send({ result: "Fail", message: error.errors.size.message })
        else if (error.errors.baseprice)
            res.status(400).send({ result: "Fail", message: error.errors.baseprice.message })
        else if (error.errors.discount)
            res.status(400).send({ result: "Fail", message: error.errors.discount.message })
        else if (error.errors.finalprice)
            res.status(400).send({ result: "Fail", message: error.errors.finalprice.message })
        else
            res.status(500).send({ result: "Fail", message: "Internal Server Error" })
    }
}
async function get(req, res) {
    try {
        let data = await Product.find().sort({ "_id": -1 })
        res.send({ result: "Done", count: data.length, data: data })
    } catch (error) {
        console.log(error);
        res.status(500).send({ result: "Fail", message: "Internal Server Error" })
    }
}
async function getSingle(req, res) {
    try {
        let data = await Product.findOne({ _id: req.params._id })
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
        let data = await Product.findOne({ _id: req.params._id })
        if (data) {
            data.name = req.body.name ?? data.name
            data.maincategory = req.body.maincategory ?? data.maincategory
            data.subcategory = req.body.subcategory ?? data.subcategory
            data.brand = req.body.brand ?? data.brand
            data.color = req.body.color ?? data.color
            data.size = req.body.size ?? data.size
            data.stock = req.body.stock ?? data.stock
            data.description = req.body.description ?? data.description
            data.baseprice = req.body.baseprice ?? data.baseprice
            data.discount = req.body.discount ?? data.discount
            data.finalprice = req.body.finalprice ?? data.finalprice
            if (req.files.pic1) {
                try {
                    fs.unlinkSync("public/products/" + data.pic1)
                } catch (error) { }
                data.pic1 = req.files.pic1[0].filename
            }
            if (req.files.pic2) {
                try {
                    fs.unlinkSync("public/products/" + data.pic2)
                } catch (error) { }
                data.pic2 = req.files.pic2[0].filename
            }
            if (req.files.pic3) {
                try {
                    fs.unlinkSync("public/products/" + data.pic3)
                } catch (error) { }
                data.pic3 = req.files.pic3[0].filename
            }
            if (req.files.pic4) {
                try {
                    fs.unlinkSync("public/products/" + data.pic4)
                } catch (error) { }
                data.pic4 = req.files.pic4[0].filename
            }
            await data.save()
            res.send({ result: "Done", message: "Record is Updated",data:data })
        }
        else
            res.send({ result: "Fail", message: "Record not Found" })
    } catch (error) {
        console.log(error);
        if (error.keyValue)
            res.status(400).send({ result: "Fail", message: "Name Must Be Unique" })
        else if (error.errors.name)
            res.status(400).send({ result: "Fail", message: error.errors.name.message })
        else if (error.errors.maincategory)
            res.status(400).send({ result: "Fail", message: error.errors.maincategory.message })
        else if (error.errors.subcategory)
            res.status(400).send({ result: "Fail", message: error.errors.subcategory.message })
        else if (error.errors.brand)
            res.status(400).send({ result: "Fail", message: error.errors.brand.message })
        else if (error.errors.color)
            res.status(400).send({ result: "Fail", message: error.errors.color.message })
        else if (error.errors.size)
            res.status(400).send({ result: "Fail", message: error.errors.size.message })
        else if (error.errors.baseprice)
            res.status(400).send({ result: "Fail", message: error.errors.baseprice.message })
        else if (error.errors.discount)
            res.status(400).send({ result: "Fail", message: error.errors.discount.message })
        else if (error.errors.finalprice)
            res.status(400).send({ result: "Fail", message: error.errors.finalprice.message })
        else
            res.status(500).send({ result: "Fail", message: "Internal Server Error" })
    }
}
async function deleteData(req, res) {
    try {
        let data = await Product.findOne({ _id: req.params._id })
        if (data) {
            try {
                fs.unlinkSync("public/Products/" + data.pic1)
            } catch (error) { }
            try {
                fs.unlinkSync("public/Products/" + data.pic2)
            } catch (error) { }
            try {
                fs.unlinkSync("public/Products/" + data.pic3)
            } catch (error) { }
            try {
                fs.unlinkSync("public/Products/" + data.pic4)
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
module.exports = [create, get, getSingle, update, deleteData]