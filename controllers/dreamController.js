const router = require('express').Router();
const sequelize = require('../db');

const userModel = require('../db-associations').userModel;
const dreamModel = require('../db-associations').dreamModel;
const commentModel = require('../db-associations').commentModel;

// const userModel = require('../models/userModel')(sequelize);
// const dreamModel = require('../models/dreamModel')(sequelize);
// const commentModel = require('../models/commentModel')(sequelize)

// require('../db-associations')(userModel,dreamModel,commentModel);

//insert endpoints here
router.post('/create', (req, res) => {
    dreamModel.create({
        userId: req.user.id,
        content: req.body.dream.content,
        category: req.body.dream.category,
        isNSFW: req.body.dream.isNSFW,
        title: req.body.dream.title
    })
    .then(response => {
        res.status(200).send({response: response})
    })
})

router.get('/:category', (req, res) => {
    dreamModel.findAll({
        where: {
            category: req.params.category
        },
        include: [{
            model: commentModel,
            include:[{
              model: userModel,
              attributes:["username", "profilePic"]
            }]
          }, {
              model: userModel,
              attributes: ["username", "profilePic"]
          }]
    })
    .then(response => {
        res.status(200).send({response: response})
    })
    .catch(err => {
        console.error(err);
        res.json({error: err});
    })
})

router.put('/update/:id', (req, res) => {
    if (req.user.isAdmin) {
        dreamModel.update({
            category: req.body.dream.category,
            content: req.body.dream.content,
            isNSFW: req.body.dream.isNSFW,
            title: req.body.dream.title
        }, {
            where: {
                id: req.params.id
            }
        })
        .then(response => {
            if (response > 0) {
                res.status(200).send({message: "Successfully updated!", response: {
                    category: req.body.dream.category,
                    content: req.body.dream.content,
                    isNSFW: req.body.dream.isNSFW
                }})
            } else {
                res.status(401).send({message: "Update failed."})
            }
        })
    } else {
        dreamModel.update({
            category: req.body.dream.category,
            content: req.body.dream.content,
            isNSFW: req.body.dream.isNSFW,
            title: req.body.dream.title
        }, {
            where: {
                id: req.params.id,
                userId: req.user.id
            }
        })
        .then(response => {
            if (response > 0) {
                res.status(200).send({message: "Successfully updated!", response: {
                    category: req.body.dream.category,
                    content: req.body.dream.content,
                    isNSFW: req.body.dream.isNSFW,
                    title: req.body.dream.title
                }})
            } else {
                res.status(401).send({message: "Update failed."})
            }
        })
    }
})

router.delete('/delete/:id', (req, res) => {
    if (req.user.isAdmin) {
        commentModel.destroy({where:{
            dreamId: req.params.id
        }}).then(commentDeleteCount => {
            dreamModel.destroy({where: {
                id: req.params.id,
            }})
            .then(response => {
                if (response > 0) {
                    res.status(200).send({message: "Successfully deleted!",
                    })
                } else {
                    res.status(401).send({message: "Delete failed."})
                }
            })

        })
    } else {
        dreamModel.findOne({
            where: !(req.user.isAdmin) ? {id:req.params.id, userId: req.user.id} : {id:req.params.id}
        }).then(dream => {
            if (dream) {
                commentModel.destroy({where: {
                    dreamId: req.params.id
                }}).then(commentDesroyCount =>{
                    dreamModel.destroy({
                        where: !(req.user.isAdmin) ? {id:req.params.id, userId: req.user.id} : {id:req.params.id}
                    }).then(dreamDestroyCount=> {
                        console.log(`Successfully deleted ${dreamDestroyCount} dreams and ${commentDesroyCount} comments.`);
                        res.status(200).send({message: `Successfully deleted ${dreamDestroyCount} dreams and ${commentDesroyCount} comments.`})  
                    })
                })
            } else {
                res.status(401).send({message: "Delete failed."})
            }
        })
        .catch(err => {
            console.error(err);
            res.status(500).send({error: err});
        })
    }
})

module.exports = router;