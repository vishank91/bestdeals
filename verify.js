const jwt = require("jsonwebtoken")

function verifyBuyer(req, res, next) {
    jwt.verify(req.headers.authorization, process.env.SECRET_KEY_BUYER, (error) => {
        if (error)
            res.status(401).send({ result: "Fail", message: "You are Not an Authorized Person to Access This API" })
        else
            next()
    })
}
function verifyAdmin(req, res, next) {
    jwt.verify(req.headers.authorization, process.env.SECRET_KEY_ADMIN, (error) => {
        if (error)
            res.status(401).send({ result: "Fail", message: "You are Not an Authorized Person to Access This API" })
        else
            next()
    })
}
function verifyBoth(req, res, next) {
    jwt.verify(req.headers.authorization, process.env.SECRET_KEY_BUYER, (error) => {
        if (error) {
            jwt.verify(req.headers.authorization, process.env.SECRET_KEY_ADMIN, (error) => {
                if (error)
                    res.status(401).send({ result: "Fail", message: "You are Not an Authorized Person to Access This API" })
                else
                    next()
            })
        }
        else
            next()
    })
}
module.exports = [verifyBuyer,verifyAdmin,verifyBoth]
