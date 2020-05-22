const express = require('express');
const router = express.Router();
const sequelize = require('../db');
const userModel = sequelize.import('../models/userModel');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

//add endpoints here


module.exports = router;