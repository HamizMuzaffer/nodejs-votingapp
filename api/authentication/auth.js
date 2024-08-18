const jwt = require("jsonwebtoken")

const jwtAuthMiddleware = (req, res, next) => {
    const authorization = req.headers.authorization
    if (!authorization) return res.status(401).json({ error: "Token not found" })

    const token = req.headers.authorization.split(" ")[1]
    if (!token) return res.status(401).json({ error: "Unauthorized" })

    try {
         const decoded = jwt.verify(token,process.env.SECRET_KEY)
         req.user = decoded 
         next()
    } catch (error) {
          console.error(err)
          res.status(401).json({error : "Invalid Token"})
    }
}

const generateToken = (userData) => {
    return jwt.sign(userData, local.env.SECRET_KEY, { expiresIn: 30000 })
}


module.exports = { generateToken,jwtAuthMiddleware }