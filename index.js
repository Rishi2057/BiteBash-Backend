require("dotenv").config()
// 1
const express = require("express")

// 5
const cors = require("cors")

// 8
const routes = require("./routes")

// 10
require("./connection")

// 2
const fooddeliveryserver = express()

// 6
fooddeliveryserver.use(cors())

// 7
fooddeliveryserver.use(express.json())

// 9
fooddeliveryserver.use(routes)

fooddeliveryserver.use("/upload",express.static("./imgUpload"))

// 3
const PORT = 4000 || process.env.PORT

// 4
fooddeliveryserver.listen(PORT,()=>{
    console.log(`server running succesfully at port : ${PORT}`);
    
})