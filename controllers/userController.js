const express = require('express');
const router = express.Router();
const sequelize = require('../db');

// const userModel = require('../models/userModel')(sequelize);
// const dreamModel = require('../models/dreamModel')(sequelize);
// const commentModel = require('../models/commentModel')(sequelize);
const userModel = require('../db-associations').userModel;
const dreamModel = require('../db-associations').dreamModel;
const commentModel = require('../db-associations').commentModel;

// require('../db-associations')(userModel,dreamModel,commentModel);

const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const validateSession = require('../middleware/validate-session');

/* *************************
 *** GET USER ***
************************** */

router.get('/get', validateSession, (req, res) => {
    userModel.findOne({
        where: { id: req.user.id },
        include: [
          {
            model: dreamModel,
            include: [
              {
                model: userModel,
                attributes: ["username", "profilePic"]
              },
              {
                model: commentModel,
                include:[
                  {
                    model: userModel,
                    attributes:["username", "profilePic"]
                  }]
              }
            ]
          }, 
          {
            model: commentModel,
            include:[dreamModel]
          }
        ]
    })
    .then(user => res.status(200).json({
      id: user.id,
      username: user.username,
      email: user.email,
      isAdmin: user.isAdmin,
      nsfwOk: user.nsfwOk,
      profilePic: user.profilePic,
      dreams: user.dreams,
      comments: user.comments
    }

    ))
    .catch((err) => res.status(500).json({error: err}))
});

/* *************************
 *** USER SIGNUP ***
************************** */

router.post('/create', (req, res) => {
    let username = req.body.username;
    let email = req.body.email;
    let password = req.body.password;
    let nsfwOk = req.body.nsfwOk;
    let profilePic = req.body.profilePic;
  
    userModel.create({
      username: username,
      email: email,
      passwordhash: bcrypt.hashSync(password, 13),
      isAdmin: false,
      nsfwOk: nsfwOk,
      profilePic: profilePic
    }).then(
      function createSuccess(user) {
        let token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: 60 * 60 * 24 });
  
        res.json({
          user: user.username,
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
    userModel.findOne({ 
        where: { username: req.body.username } 
    }).then(
      function (user) {
        if (user) {
          bcrypt.compare(req.body.password, user.passwordhash, function (err, matches) {
            if (matches) {
              let token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: 60 * 60 * 24 });
              res.json({
                user: user.username,
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

 router.delete("/delete", validateSession, (req, res) => {
    commentModel.destroy({where: {userId: req.user.id}})
      .then(()=> {
        dreamModel.destroy({where: {userId: req.user.id}})
        .then(()=> {
          userModel.destroy({where: {id: req.user.id}, returning: true})
            .then(user => res.status(200).json(user))
            .catch(err => res.status(500).json({ error: err }))
        });
      })
  })

  /* *************************
   *** UPDATE USER ***
  ************************** */

router.put('/update', validateSession, (req, res) => {
    userModel.update(req.body, {
        where: { 
          id: req.user.id
        }, 
        returning:true 
    })
        .then(user => res.status(200).json(user))
        .catch(err => res.status(500).json({ error: err }))
  });

module.exports = router;