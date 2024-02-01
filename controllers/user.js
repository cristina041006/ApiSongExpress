const User = require("../models/user");
const{exitUserLogin, exitUserEmail} = require("../helpers/db-validators");
const bcryptjs = require('bcryptjs')

const getAllUser = async (req, res) =>{
    try {
        const allUser = await User.find()
        res.status(200).json(allUser);
    } catch (error) {
        res.status(500).json({message: error});
    }
}

const getUser = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if(user!=null){
            res.status(200).json(user);
        }else{
            res.status(404).json({message: "not found"})
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({message: error});
    }
}

const addUser = async (req, res)=>{
    
    const salt = bcryptjs.genSaltSync();
    const encryptedPassword = bcryptjs.hashSync(req.body.password, salt)
    const user = req.body;
    user.password = encryptedPassword
    const newUser = new User(user)
    try{
        await newUser.save();
        res.status(201).json(user);
    }catch(error){
        res.status(500).json({message: error});
    }
}

const deleteUser = async (req, res) =>{
    try {
        const deleteUser = await User.findByIdAndUpdate(req.params.id, {active: false});
        res.status(204).json(deleteUser);
    } catch (error) {
        console.log(error);
        res.status(500).json({message: error});        
    }
}

const updateUser = async (req, res) => {
    try {
        const updateUser = await User.findByIdAndUpdate(req.params.id, req.body);
        res.status(201).json(updateUser);
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

module.exports = {getAllUser, getUser, addUser, deleteUser, updateUser};