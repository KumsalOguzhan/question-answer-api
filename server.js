const express = require("express")
const dotenv = require("dotenv")
const connectDatabase = require("./helpers/database/connectDatabase")
const customErrorHandler = require("./middlewares/errors/customErrorHandler")
const routers = require("./routers")
const path = require("path")

//Environment Variables
dotenv.config({
    path: "./config/env/config.env"
})

//MongoDb Connection
connectDatabase()

const app = express()

//Express - Body Middleware
app.use(express.json())

const PORT = process.env.PORT

//Routers Middleware
app.use("/api", routers)

//Static Files
app.use(express.static(path.join(__dirname, "public")))

//Error Handler
app.use(customErrorHandler)

app.listen(PORT, () => {
    console.log(`App Started on ${PORT} : ${process.env.NODE_ENV}`)
})