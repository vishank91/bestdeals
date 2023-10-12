const router = new require("express").Router()
const [verifyBuyer, verifyAdmin] = require("../verify")
const [create, get, getUser, getSingle, update, deleteData,order,verifyOrder] = require("../Controller/CheckoutController")


router.post("/", verifyBuyer, create)
router.get("/", verifyAdmin, get)
router.get("/:userid", verifyBuyer, getUser)
router.get("/single/:_id", verifyAdmin, getSingle)
router.put("/:_id", verifyAdmin, update)
router.delete("/:_id", verifyAdmin, deleteData)
router.post("/order", verifyBuyer, order)
router.post("/order-verify", verifyBuyer, verifyOrder)

module.exports = router