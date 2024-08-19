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
         id: response.id,
         username: response.username
      }

      const token = generateToken(payload)
      res.status(200).json({ response: response, token: token })

   } catch (error) {
      res.status(500).json({ error: "Internal server error" })
   }
})


router.post("/login", async (req, res) => {
   try {

      const { idCardNo, password } = req.body; 
      
      const user = await User.findOne({ idCardNo : idCardNo, password : password })

      if(!user) return res.status(401).json({error : "user not found"})

         const payload = {
           id :  user.id,
         }

         const token = generateToken(token)
         res.json({ token })

   } catch (error) {
      res.status(500).json({error : error.message})
   }
})

router.get("/profile", jwtAuthMiddleware , async(req,res)=>{
   try {
     const userData = req.user;
     const userId = userData.id;
   
     const user = await User.findById({ id : userId })
     res.status(200).json({ user })
   
  } catch (error) {
   res.status(400).json({ error : "Internal Server Error" })
  }
})

router.get("/",jwtAuthMiddleware, async(req,res)=>{

   try {

      const data = User.find();
      res.status(200).json(data);

   } catch (error) {
      
      res.status(500).json({erro : "Internal Server Error"})
   }

})

router.put("profile/password",jwtAuthMiddleware,async(req,res)=>{
   try {

      const id = req.user.id;

      const { currentPassword, newPassword } = req.body;
      
      const user = User.findById(id)

      if(!user || !await user.comparePassword(currentPassword)){
         return res.status(401).json({error : "Incorrect password"})
      }

       user.password = newPassword
       await user.save()
       
      

      if(!response) return res.status(401).json({error : "User Not Found"})

      res.status(200).json(response)
   } catch (error) {

      res.status(500).json({error : error.message})

   }
})

// const updatedUserData = req.body;

//       const response = await findByIdAndUpdate(id,updatedUserData,{
//          new : true,
//          runValidators : true
//       })