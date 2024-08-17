const mongoose = require("mongoose")

const userSchema = mongoose.Schema({
    name: { type: String, required: true },
    age: { type: Number, required: true },
    number: { type: Number },
    address: { type: String, required: true },
    idCardNo : {type : String , required : true , unique: true},
    password : {type : String, required : true},
    role : {type : String , enum : ["voter","admin"], default : "voter"},
    isVoted : {type : Boolean , default : false}
})


const User = mongoose.model("User", userSchema)

module.exports = User;