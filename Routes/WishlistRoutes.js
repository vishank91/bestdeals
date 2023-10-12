const router = new require("express").Router()
const [verifyBuyer] = require("../verify")

const [create,get,deleteData] = require("../Controller/WishlistController")


router.post("/",verifyBuyer,create)
router.get("/:userid",verifyBuyer,get)
router.delete("/:_id",verifyBuyer,deleteData)

module.exports = router