const router = new require("express").Router()
const multer = require("multer")
const [verifyBuyer, verifyAdmin,verifyBoth] = require("../verify")
const [create, get, getSingle, update, deleteData,login,forgetPassword1,forgetPassword2,forgetPassword3] = require("../Controller/UserController")

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'public/users')
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + file.originalname)
    },
    fieldSize: 100000000
})

const upload = multer({ storage: storage })


router.post("/", create)
router.get("/",verifyAdmin, get)
router.get("/:_id",verifyBoth, getSingle)
router.put("/:_id",verifyBoth, upload.single('pic'), update)
router.delete("/:_id",verifyAdmin, deleteData)
router.post("/login", login)
router.post("/forget-password-1", forgetPassword1)
router.post("/forget-password-2", forgetPassword2)
router.post("/forget-password-3", forgetPassword3)

module.exports = router