const router = new require("express").Router()
const [verifyBuyer, verifyAdmin] = require("../verify")
const [create,get,getSingle,update,deleteData] = require("../Controller/MaincategoryController")


router.post("/",verifyAdmin,create)
router.get("/",get)
router.get("/:_id",getSingle)
router.put("/:_id",verifyAdmin,update)
router.delete("/:_id",verifyAdmin,deleteData)

module.exports = router