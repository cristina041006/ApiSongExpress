const Singer = require("../models/singer");

const getAllSinger = async (req, res) =>{
    try {
        const singer = await Singer.find();
        res.status(200).json(singer);
    } catch (error) {
        res.status(500).json({message: error});
    }
}

const getSinger = async (req, res) =>{
    try {
        const singer = await Singer.findById(req.params.id);
        if(singer!=null){
            res.status(201).json(singer);
        }else{
            res.status(404).json({message: "not found"})
        }
        
    } catch (error) {
        res.status(500).json({message: error});
    }
}

const addSinger = async (req, res) =>{
    console.log('singer')
    const singer = req.body;
    const newSinger = new Singer(singer);
    try {
        await newSinger.save();
        res.status(201).json(newSinger);
    } catch (error) {
        res.status(500).json({message: error});
    }
}

const deleteSinger = async (req, res) =>{
    try {
        const deleteSinger = await Singer.findOneAndDelete(req.params.id);
        res.status(204).json(deleteSinger);
    } catch (error) {
        console.log(error);
        res.status(500).json({message:error});
    }
}

const updateSinger = async (req, res) =>{
    try {
        const updateSinger = Singer.findByIdAndUpdate(req.params.id, req.body);
        res.status(201).json(updateSinger);
    } catch (error) {
        res.status(500).json({message: error});
    }
}

module.exports = {getAllSinger, getSinger, deleteSinger, updateSinger, addSinger};