const router = new require("express").Router()
const [verifyBuyer] = require("../verify")
const [create,get,getSingle,update,deleteData] = require("../Controller/CartController")


router.post("/",verifyBuyer,create)
router.get("/:userid",verifyBuyer,get)
router.get("/single/:_id",verifyBuyer,getSingle)
router.put("/:_id",verifyBuyer,update)
router.delete("/:_id",verifyBuyer,deleteData)

module.exports = router