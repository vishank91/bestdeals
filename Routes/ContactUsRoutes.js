const router = new require("express").Router()
const [verifyBuyer, verifyAdmin] = require("../verify")
const [create,get,getSingle,update,deleteData] = require("../Controller/ContactUsController")


router.post("/",create)
router.get("/",verifyAdmin,get)
router.get("/:_id",verifyAdmin,getSingle)
router.put("/:_id",verifyAdmin,update)
router.delete("/:_id",verifyAdmin,deleteData)

module.exports = router