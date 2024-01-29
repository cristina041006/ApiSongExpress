const Album = require("../models/album");

const getAllAlbum = async (req, res) =>{
    try {
        const album = await Album.find();
        res.status(200).json(album);
    } catch (error) {
        res.status(500).json({message: error});
    }
}

const getAlbum = async (req, res) =>{
    try {
        const album = await Album.findById(req.params.id);
        if(album!=null){
            res.status(201).json(album)
        }else{
            res.status(404).json({message: "not found"})
        }
    } catch (error) {
        res.status(500).json({message: error});
    }
}

const addAlbum = async (req, res) =>{
    const album = req.body;
    const newAlbum = new Album(album);
    try {
        await newAlbum.save();
        res.status(201).json(newAlbum);
    } catch (error) {
        res.status(500).json({message: error});
    }
}

const deleteAlbum = async (req, res) =>{
    try {
        console.log(req.params.id);
        const deleteAlbum = await Album.findOneAndDelete(req.params.id);
        res.status(204).json(deleteAlbum);
    } catch (error) {
        console.log(error)
        res.status(500).json({message:error});
    }
}

const updateAlbum = async (req, res) =>{
    try {
        const updateAlbum = await Album.findByIdAndUpdate(req.params.id, req.body);
        res.status(201).json(updateAlbum);
    } catch (error) {
        res.status(500).json({message: error});
    }
}

module.exports = {getAlbum, getAllAlbum, addAlbum, deleteAlbum, updateAlbum};