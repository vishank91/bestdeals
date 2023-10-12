const mongoose = require("mongoose")

async function getConnect(){
    try {
        // mongoose.connect("mongodb://127.0.0.1:27017/server_4_pm_wd_sept_23")
        await mongoose.connect(process.env.DB_KEY)
        console.log("DataBase is Connected!!!")
    } catch (error) {
        console.log(error)
    }
}
getConnect()