const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const songSchema = {
    name: {type:String, required:true},
    duration: {type:Number, min:1, required:true}
}

module.exports = mongoose.model("Song", songSchema);