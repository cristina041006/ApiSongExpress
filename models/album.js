const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const albumSchema = {
    name:{type: String, required:true},
    num_song:{type: Number, min:1, required:true}
}

module.exports = mongoose.model("Album", albumSchema);