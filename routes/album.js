const express = require("express");
const {check} = require("express-validator");
const {getAlbum, getAllAlbum, addAlbum, deleteAlbum, updateAlbum} = require("../controllers/album");
const {validateFields} = require("../middleware/validate-fields");
const{existNameAlbum} = require("../helpers/db-validators");

const router = express.Router();

router.route('/').get(getAllAlbum)
.post([
    check('name','Name is required').not().isEmpty(),
    check('name', 'Name should be a String').isString(),
    check('num_song', 'Song is required').notEmpty(),
    check('num_song', 'Num Song should be Numeric').isNumeric(),
    check('num_song', 'The num song have be more than 1').isFloat({min:1}),
    //check('name').custom(existNameAlbum),
    validateFields
],addAlbum)
router.route('/:id').get([
    check('id', 'The id is not valid').isMongoId(),
    validateFields
],getAlbum)
.delete([
    check('id', 'The id is not valid').isMongoId(),
    validateFields
],deleteAlbum)
.put([
    check('name','Name is required').not().isEmpty(),
    check('name', 'Name should be a String').isString(),
    check('num_song', 'Song is required').notEmpty(),
    check('num_song', 'Num Song should be Numeric').isNumeric(),
    check('num_song', 'The num song have be more than 1').isFloat({min:1}),
    check('id', 'The id is not valid').isMongoId(),
    //check('name').custom(existNameAlbum),
    validateFields
], updateAlbum);

module.exports = router;