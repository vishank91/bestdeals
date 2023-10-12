const router = new require("express").Router()
const [verifyBuyer, verifyAdmin] = require("../verify")
const [create,get,deleteData] = require("../Controller/NewsletterController")


router.post("/",create)
router.get("/",verifyAdmin,get)
router.delete("/:_id",verifyAdmin,deleteData)

module.exports = router