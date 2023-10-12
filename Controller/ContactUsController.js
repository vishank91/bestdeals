const ContactUs = require("../Models/ContactUs")

async function create(req, res) {
    try {
        let data = new ContactUs(req.body)
        data.date = new Date()
        await data.save()
        res.send({ result: "Done", message: "Record is Created", data: data })
    } catch (error) {
        console.log(error);
        if (error.errors.name)
            res.status(400).send({ result: "Fail", message: error.errors.name.message })
        else if (error.errors.email)
            res.status(400).send({ result: "Fail", message: error.errors.email.message })
        else if (error.errors.phone)
            res.status(400).send({ result: "Fail", message: error.errors.phone.message })
        else if (error.errors.subject)
            res.status(400).send({ result: "Fail", message: error.errors.subject.message })
        else if (error.errors.message)
            res.status(400).send({ result: "Fail", message: error.errors.message.message })
        else if (error.errors.date)
            res.status(400).send({ result: "Fail", message: error.errors.date.message })
        else
            res.status(500).send({ result: "Fail", message: "Internal Server Error" })
    }
}
async function get(req, res) {
    try {
        let data = await ContactUs.find().sort({ "_id": -1 })
        res.send({ result: "Done", count: data.length, data: data })
    } catch (error) {
        console.log(error);
        res.status(500).send({ result: "Fail", message: "Internal Server Error" })
    }
}
async function getSingle(req, res) {
    try {
        let data = await ContactUs.findOne({ _id: req.params._id })
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
        let data = await ContactUs.findOne({ _id: req.params._id })
        if (data) {
            data.status = req.body.status ?? data.status
            await data.save()
            res.send({ result: "Done", message: "Record is Updated" })
        }
        else
            res.send({ result: "Fail", message: "Record not Found" })
    } catch (error) {
        res.status(500).send({ result: "Fail", message: "Internal Server Error" })
    }
}
async function deleteData(req, res) {
    try {
        let data = await ContactUs.findOne({ _id: req.params._id })
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