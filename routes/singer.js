const express = require("express");
const {check} = require("express-validator");
const {getAllSinger, getSinger, addSinger, updateSinger, deleteSinger} = require("../controllers/singer");
const {validateFields} = require("../middleware/validate-fields");
const{existNameSinger} = require("../helpers/db-validators");

const router = express.Router();
router.route('/')
.get(getAllSinger)
.post([
    check('name','Name is required').not().isEmpty(),
    check('name', 'Name should be a String').isString(),
    check('age', 'Age is required').notEmpty(),
    check('age', 'Age should be Numeric').isNumeric(),
    check('age', 'The age have be more than 18').isFloat({min:18}),
    //check('name').custom(existNameSinger),
    validateFields
], addSinger)
router.route('/:id').get([
    check('id', 'The id is not valid').isMongoId(),
    validateFields
],getSinger)
.delete([
    check('id', 'The id is not valid').isMongoId(),
    validateFields
],deleteSinger)
.put([
    check('name','Name is required').not().isEmpty,
    check('name', 'Name should be a String').isString(),
    check('age', 'Age is required').notEmpty(),
    check('age', 'Age should be Numeric').isNumeric(),
    check('age', 'The age have be more than 18').isFloat({min:18}),
    check('id', 'The id is not valid').isMongoId(),
    //check('name').custom(existNameSinger),
    validateFields
], updateSinger);

module.exports = router;