const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = {
    name: {type:String, required:true},
    email: {type:String, required:true},
    login: {type:String, required:true},
    rol: {type:String, required:true},
    password: {type:String, required:true},
    active: {type:Boolean, required:true}
}

module.exports = mongoose.model("User", userSchema);