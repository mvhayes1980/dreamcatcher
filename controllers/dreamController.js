const router = require('express').Router();
const sequelize = require('../db');
const userModel = sequelize.import('../models/userModel');
const dreamModel = sequelize.import('../models/dreamModel');

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
        include: "comments"
    })
    .then(response => {
        res.status(200).send({response: response})
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
    } else {
        dreamModel.destroy({where: {
            id: req.params.id,
            userId: req.user.id
        }})
        .then(response => {
            if (response > 0) {
                res.status(200).send({message: "Successfully deleted!",
                })
            } else {
                res.status(401).send({message: "Delete failed."})
            }
        })
    }
})

module.exports = router;