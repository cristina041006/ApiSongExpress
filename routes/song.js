const express = require("express");
const {check} = require("express-validator");
const {getAllSong, getSong, addSong, deleteSong, updateSong, updateSongBeta} = require("../controllers/song");
const {validateFields}= require("../middleware/validate-fields");
const{existName, existNameUpdate} = require("../helpers/db-validators");

const router = express.Router();

router.route('/').get(getAllSong)
.post([
    check('name', 'Name is required').notEmpty(),
    check('name', 'Name should be a String').isString(),
    check('duration', 'Duration is required').notEmpty(),
    check('duration', 'Duration should be numeric').isNumeric(),
    check('duration', 'Duration have be more than 1').isFloat({min:1}),
    check('name').custom(existName),
    validateFields
], addSong)
router.route('/:id').get([
    check('id', 'The id is not valid').isMongoId(),
    validateFields
],getSong)
.delete([
    check('id', 'The id is not valid').isMongoId(),
    validateFields
],deleteSong)
.put([
    check('name', 'Name is required').notEmpty(),
    check('name', 'Name should be a String').isString(),
    check('duration', 'Duration is required').notEmpty(),
    check('duration', 'Duration should be numeric').isNumeric(),
    check('duration', 'Duration have be more than 1').isFloat({min:1}),
    check('id', 'The id is not valid').isMongoId(),
    check('name').custom(existNameUpdate),
    validateFields
], updateSong);

module.exports = router;
