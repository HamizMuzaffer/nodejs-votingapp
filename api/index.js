require('dotenv').config()
const express = require("express")
const PORT = process.env.PORT || 8000;
const app = express()
const cookieParser = require('cookie-parser')
// middlewares 

app.use(cookieParser())


// Server Listening
app.listen(PORT,()=>{
    console.log(`Server Listtening at ${PORT}`)
})