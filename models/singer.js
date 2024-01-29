const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const singerSchema = {
    name: {type:String, required:true},
    age: {type:Number, required:true, min:18},
    grammy: {type:String, required:true, minLength:2}
}

module.exports = mongoose.model("Singer", singerSchema);