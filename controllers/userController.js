const express = require('express');
const router = express.Router();
const sequelize = require('../db');
const userModel = sequelize.import('../models/userModel');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

/* *************************
 *** GET USER ***
************************** */

router.get('/:id', (req, res) => {
    User.findOne({
        where: { id: req.params.id }
    })
    .then(user => res.status(200).json(user))
    .catch(err => res.status(500).json({error: err}))
});

/* *************************
 *** USER SIGNUP ***
************************** */

router.post('/create', (req, res) => {
    let username = req.body.username;
    let password = req.body.password;
    let isAdmin = false;
    let nsfwOk = req.body.nsfwOk;
  
    User.create({
      username: username,
      passwordhash: bcrypt.hashSync(pass, 13),
      isAdmin: false,
      nsfwOk: nsfwOk
    }).then(
      function createSuccess(user) {
        let token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: 60 * 60 * 24 });
  
        res.json({
          user: user,
          message: 'Dreamer Created!',
          sessionToken: token
        });
      },
      function createError(err) {
        res.send(500, err.message);
      }
    );
  });
  
  
  
  /* *************************
   *** USER LOGIN ***
  ************************** */
  
  router.post('/login', (req, res) => {
    User.findOne({ 
        where: { username: req.body.username } 
    }).then(
      function (user) {
        if (user) {
          bcrypt.compare(req.body.password, passwordhash, function (err, matches) {
            if (matches) {
              let token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: 60 * 60 * 24 });
              res.json({
                user: user,
                message: "Dreamer successfully authenticated!",
                sessionToken: token
              });
            } else {
              res.status(502).send({ error: "Login failed" });
            }
          });
        } else {
          res.status(500).send({ error: "Failed to authenticate" });
        }
      },
      function (err) {
        res.status(501).send({ error: "Login unsuccessful" });
      }
    );
  });
  
  /* *************************
   *** DELETE USER ***
  ************************** */

 router.delete("/delete/:id", validateSession, (req, res) => {
    User.destroy({where: { 
      id: req.params.id
    },
    returning: true 
  })
    .then(user => res.status(200).json(user))
    .catch(err => res.status(500).json({ error: err }))
  });

  /* *************************
   *** UPDATE USER ***
  ************************** */

router.put('/update/:id', validateSession, (req, res) => {
    User.update(req.body.user, {
        where: { 
          id: req.params.id
        }, 
        returning:true 
    })
        .then(log => res.status(200).json(log))
        .catch(err => res.status(500).json({ error: err }))
  });

module.exports = router;