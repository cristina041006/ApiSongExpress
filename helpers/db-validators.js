const Song = require('../models/song');
const Singer = require("../models/singer");
const Album = require("../models/album");

const existName = async(name)=>{
    const emailDb = await Song.findOne({name});
    if(emailDb){
        throw new Error(`Error`);
    }
}

const existNameUpdate = async(name, {req})=>{
    const emailDb = await Song.findOne({name})
    if(emailDb && emailDb.id != req.params.id){
        
        throw new Error(`Error`);
    
        
    }
}

const existNameSinger = async(name)=>{
    const emailDb = await Singer.findOne({name});
    if(emailDb){
        throw new Error(`Error`);
    }
}

const existNameAlbum = async(name)=>{
    const emailDb = await Album.findOne({name});
    if(emailDb){
        throw new Error(`Error`);
    }
}

module.exports = {existName, existNameSinger, existNameAlbum, existNameUpdate};