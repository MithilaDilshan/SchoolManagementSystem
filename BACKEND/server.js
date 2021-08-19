const express = require("express")
const mongoose = require("mongoose")
const cors = require("cors")
const app = express()
const errorHandler = require("./middleware/error.js")
const dotenv = require("dotenv").config()
app.use((cors()))

const PORT = process.env.PORT || 8070
app.use(express.json())
app.listen(PORT, () => {
    console.log(`Server is up and running on port number ${PORT}`)
})
const URL = process.env.MONGODB_URL;

mongoose.connect(URL, { //define connection
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true
});

const connection = mongoose.connection //assign database connection for a constant variable

connection.once("open", () => { //open connection for one time
    console.log("MongoDB connection was successful") //display message in console when the connection was successful
});

const studentRouter = require("./routes/student.js")

app.use("/users", studentRouter)

app.use("/api/auth", require("./routes/auth"))
    //app.use("/api/private", requre("./routes/private"))


//Error Handler (Should be the last piece of middleware)
app.use(errorHandler);