const router = require('express').Router();
const sequelize = require('../db');
const commentModel = sequelize.import('../models/commentModel');

//insert endpoints here
router.post('/create', (req, res) => {
    const commentFromRequest = {
        content: req.body.comment.content,
        userId: req.user.id,
        dreamId: req.body.comment.dreamId
    }
    commentModel.create(commentFromRequest)
        .then(comment => res.status(200).json(comment))
        .catch(err => res.status(500).json({
            error: err
        }))
});


router.put('/update/:id', (req, res) => {
    commentModel.update({
        content: req.body.comment.content
    }, { where: { id: req.params.id }, returning: true})
        .then(comment => res.status(200).json(comment))
        .catch(err => res.json({
            error: err
        }))
});


router.delete('/delete/:id', (req, res) => {
    commentModel.destroy({
        where: {
            id: req.params.id
        }, returning: true
    })
        .then(comment => res.status(200).json(comment))
        .catch(err => res.json({
            error: err
        }))
});


module.exports = router;