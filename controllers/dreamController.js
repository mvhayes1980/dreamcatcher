const router = require('express').Router();
const sequelize = require('../db');
const userModel = sequelize.import('../models/userModel');
const dreamModel = sequelize.import('../models/dreamModel');

//insert endpoints here

module.exports = router;