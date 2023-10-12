const Newsletter = require("../Models/Newsletter")

async function create(req, res) {
    try {
        let data = new Newsletter(req.body)
        await data.save()
        res.send({ result: "Done", message: "Thanks to Subscribe Our Newsletter Service", data: data })
    } catch (error) {
        console.log(error);
        if (error.keyValue)
            res.status(400).send({ result: "Fail", message: "Your Email Id is Already Registered with Us" })
        else if (error.errors.email)
            res.status(400).send({ result: "Fail", message: error.errors.email.message })
        else
            res.status(500).send({ result: "Fail", message: "Internal Server Error" })
    }
}
async function get(req, res) {
    try {
        let data = await Newsletter.find().sort({"_id":-1})
        res.send({ result: "Done", count: data.length, data: data })
    } catch (error) {
        console.log(error);
        res.status(500).send({ result: "Fail", message: "Internal Server Error" })
    }
}
async function deleteData(req, res) {
    try {
        let data = await Newsletter.findOne({_id:req.params._id})
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
module.exports = [create,get,deleteData]