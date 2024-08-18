const express = require("express")
const User = require("../models/user")
const router = express.Router()
const { jwtAuthMiddleware, generateToken } = require("../authentication/auth")

router.post('/signup', async (req, res) => {
    const data = req.body
    try {
       const user = new User(data);

       const response = await user.save();

       const payload = {
        id : response.id,
        username : response.username
       }

       const token = generateToken(payload)
       res.status(200).json({response : response , token : token})
         
    } catch (error) {
       res.status(500).json({ error : "Internal server error" })
    }
})

