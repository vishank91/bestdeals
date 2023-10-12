const router = new require("express").Router()
const multer = require("multer")
const [verifyBuyer, verifyAdmin] = require("../verify")
const [create, get, getSingle, update, deleteData] = require("../Controller/ProductController")

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'public/products')
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + file.originalname)
    },
    fieldSize: 100000000
})

const upload = multer({ storage: storage })


router.post("/",verifyAdmin, upload.fields([
    { name: "pic1", maxCount: 1 },
    { name: "pic2", maxCount: 1 },
    { name: "pic3", maxCount: 1 },
    { name: "pic4", maxCount: 1 },
]), create)
router.get("/", get)
router.get("/:_id", getSingle)
router.put("/:_id",verifyAdmin, upload.fields([
    { name: "pic1", maxCount: 1 },
    { name: "pic2", maxCount: 1 },
    { name: "pic3", maxCount: 1 },
    { name: "pic4", maxCount: 1 },
]), update)
router.delete("/:_id",verifyAdmin, deleteData)

module.exports = router