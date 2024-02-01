const express = require("express");
const {check} = require("express-validator");
const {getAllUser, getUser, addUser, deleteUser, updateUser} = require("../controllers/user");
const {validateFields}= require("../middleware/validate-fields");
const{exitUserEmail, exitUserLogin} = require("../helpers/db-validators");

const router = express.Router();

router.route('/').get(getAllUser)
.post([
    check('name', 'Name is required').notEmpty(),
    check('name', 'Name should be a String').isString(),
    check('email', 'Email is required').notEmpty(),
    check('email', 'Email should be a String').isString(),
    check('email', 'Email should be a email format').isEmail(),
    check('login', 'Login is required').notEmpty(),
    check('login', 'Login should be a String').isString(),
    check('rol', 'Rol is required').notEmpty(),
    check('rol', 'Rol should be a String').isString(),
    check('password', 'Password is required').notEmpty(),
    check('password', 'Password should be a String').isString(),
    check('password', 'Password debe ser 8 caracteres, una mayuscula una minuscula, un numero y un caracter').matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()-_+=<>?])[A-Za-z\d!@#$%^&*()-_+=<>?]{8,}$/),
    check('email').custom(exitUserEmail),
    check('login').custom(exitUserLogin),
    validateFields
], addUser)
router.route('/:id').get([
    check('id', 'The id is not valid').isMongoId(),
    validateFields
],getUser)
.delete([
    check('id', 'The id is not valid').isMongoId(),
    validateFields
],deleteUser)
.put([
    check('name', 'Name is required').notEmpty(),
    check('name', 'Name should be a String').isString(),
    check('email', 'Email is required').notEmpty(),
    check('email', 'Email should be a String').isString(),
    check('login', 'Login is required').notEmpty(),
    check('login', 'Login should be a String').isString(),
    check('rol', 'Rol is required').notEmpty(),
    check('rol', 'Rol should be a String').isString(),
    check('password', 'Password is required').notEmpty(),
    check('password', 'Password should be a String').isString(),
    check('id', 'The id is not valid').isMongoId(),
    check('email').custom(exitUserEmail),
    check('login').custom(exitUserLogin),
    validateFields
], updateUser);

module.exports = router;