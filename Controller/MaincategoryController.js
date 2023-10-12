const Maincategory = require("../Models/Maincategory")

async function create(req, res) {
    try {
        let data = new Maincategory(req.body)
        await data.save()
        res.send({ result: "Done", message: "Record is Created", data: data })
    } catch (error) {
        console.log(error);
        if (error.keyValue)
            res.status(400).send({ result: "Fail", message: "Name Must Be Unique" })
        else if (error.errors.name)
            res.status(400).send({ result: "Fail", message: error.errors.name.message })
        else
            res.status(500).send({ result: "Fail", message: "Internal Server Error" })
    }
}
async function get(req, res) {
    try {
        let data = await Maincategory.find().sort({"_id":-1})
        res.send({ result: "Done", count: data.length, data: data })
    } catch (error) {
        console.log(error);
        res.status(500).send({ result: "Fail", message: "Internal Server Error" })
    }
}
async function getSingle(req, res) {
    try {
        let data = await Maincategory.findOne({_id:req.params._id})
        if(data)
        res.send({ result: "Done", data: data })
        else
        res.send({ result: "Fail", message:"Record not Found" })
    } catch (error) {
        console.log(error);
        res.status(500).send({ result: "Fail", message: "Internal Server Error" })
    }
}
async function update(req, res) {
    try {
        let data = await Maincategory.findOne({_id:req.params._id})
        if(data){
            data.name = req.body.name??data.name
            await data.save()
            res.send({ result: "Done", message:"Record is Updated" })
        }
        else
        res.send({ result: "Fail", message:"Record not Found" })
    } catch (error) {
        if (error.keyValue)
            res.status(400).send({ result: "Fail", message: "Name Must Be Unique" })
        else if (error.errors.name)
            res.status(400).send({ result: "Fail", message: error.errors.name.message })
        else
        res.status(500).send({ result: "Fail", message: "Internal Server Error" })
    }
}
async function deleteData(req, res) {
    try {
        let data = await Maincategory.findOne({_id:req.params._id})
        if(data){
            await data.deleteOne()
            res.send({ result: "Done", message:"Record is Deleted" })
        }
        else
        res.send({ result: "Fail", message:"Record not Found" })
    } catch (error) {
        console.log(error);
        res.status(500).send({ result: "Fail", message: "Internal Server Error" })
    }
}
module.exports = [create,get,getSingle,update,deleteData]