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

userSchema.pre("save", function(next){
    const user = this;
    if(!user.isModified) return
    const salt = randomBytes(16).toString();
    const createHashedPassoword = createHmac("sha256",salt).update(user.password).digest("hex");
    this.salt = salt;
    this.password = createHashedPassoword;
    next()

})

userSchema.static("matchPasswordAndGenerateToken", async function (idCardNo, password) {
    console.log(`Searching for email: ${email}`); // Log the email being searched

    const user = await this.findOne({idCardNo: new RegExp(`^${idCardNo}$`, 'i')});
    if (!user) throw new Error("User Not Found");

    const salt = user.salt;
    const hashedPassword = user.password;

    const userProvidedPassword = createHmac("sha256", salt).update(password).digest("hex");

    if (userProvidedPassword !== hashedPassword) throw new Error("Incorrect Password");

    return user;
});



const User = mongoose.model("User", userSchema)

module.exports = User;