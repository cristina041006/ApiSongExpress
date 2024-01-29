const Song = require("../models/song");
const{existName, existNameUpdate} = require("../helpers/db-validators");

const getAllSong = async (req, res) =>{
    try {
        const allSong = await Song.find();
        res.status(200).json(allSong);
    } catch (error) {
        res.status(500).json({message: error});
    }
}

const getSong = async (req, res) => {
    try {
        const song = await Song.findById(req.params.id);
        if(song!=null){
            res.status(200).json(song);
        }else{
            res.status(404).json({message: "not found"})
        }
    } catch (error) {
        res.status(500).json({message: error});
    }
}

const addSong = async (req, res)=>{
    const song = req.body;
    const newSong = new Song(song);
    try{
        await newSong.save();
        res.status(201).json(song);
    }catch(error){
        res.status(500).json({message: error});
    }
}

const deleteSong = async (req, res) =>{
    try {
        console.log("hola", req.params.id);
        const deleteSong = await Song.findByIdAndDelete(req.params.id);
        res.status(204).json(deleteSong);
    } catch (error) {
        console.log(error);
        res.status(500).json({message: error});        
    }
}

const updateSong = async (req, res) => {
    try {
        const updateSong = await Song.findByIdAndUpdate(req.params.id, req.body);
        res.status(201).json(updateSong);
    } catch (error) {
        res.status(500).json({message: error});
    }
}

const updateSongBeta = async (req, res) => {
    try {
        const temp = Song.findById(req.params.id);
        const song = req.body;
        if(temp.name!=song.name){
            const name = song.name
            const emailDb = await Song.findOne({name});
            if(!emailDb){
                const updateSong = await Song.findByIdAndUpdate(req.params.id, req.body);
                res.status(201).json(updateSong);
            }else{
                throw new Error(`Error`);
            }
            
        }else{
            const updateSong = await Song.findByIdAndUpdate(req.params.id, req.body);
                res.status(201).json(updateSong);
        }
    } catch (error) {
        res.status(500).json({message: error});
    }
}

module.exports = {getAllSong, getSong, addSong, deleteSong, updateSong, updateSongBeta};