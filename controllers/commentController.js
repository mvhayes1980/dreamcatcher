const router = require('express').Router();
const sequelize = require('../db');
const commentModel = sequelize.import('../models/commentModel');

//insert endpoints here
router.post('/create', (req, res) => {
    const commentFromRequest = {
        content: req.body.comment.content,
        owner: req.user.id,
        dreamID: req.body.comment.dreamID
    }
    commentModel.create(commentFromRequest)
        .then(comment => res.status(200).json(comment))
        .catch(err => res.status(500).json({
            error: err
        }))
});


router.put('/update', (req, res) => {
    commentModel.update(req.body.comment, { where: { id: req.params.id } })
        .then(comment => res.status(200).json(comment))
        .catch(err => res.json({
            error: err
        }))
});


router.delete('/delete', (req, res) => {
    commentModel.destroy({
        where: {
            id: req.params.id
        }
    })
        .then(review => res.status(200).json(review))
        .catch(err => res.json({
            error: err
        }))
});


module.exports = router;