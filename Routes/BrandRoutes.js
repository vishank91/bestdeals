const router = new require("express").Router()
const multer = require("multer")


const [verifyBuyer, verifyAdmin] = require("../verify")

const [create, get, getSingle, update, deleteData] = require("../Controller/BrandController")

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'public/brands')
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + file.originalname)
    },
    fieldSize: 100000000
})

const upload = multer({ storage: storage })


router.post("/", verifyAdmin, upload.single('pic'), create)
router.get("/", get)
router.get("/:_id", getSingle)
router.put("/:_id", verifyAdmin, upload.single('pic'), update)
router.delete("/:_id", verifyAdmin, deleteData)

module.exports = router