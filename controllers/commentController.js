require('dotenv').config();
const router = require('express').Router();
const commentModel = require('../db-associations').commentModel;


// const commentModel = require('../models/commentModel')(sequelize);
// const userModel = require('../models/userModel')(sequelize);
// const dreamModel = require('../models/dreamModel')(sequelize);

// require('../db-associations')(userModel,dreamModel,commentModel);



//insert endpoints here
router.post('/create', (req, res) => {
    let commentFromRequest = {
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
    if (req.user.isAdmin) {
        commentModel.update({
            content: req.body.comment.content
        }, { where: { id: req.params.id }, returning: true})
            .then(comment => res.status(200).json(comment))
            .catch(err => res.json({
                error: err
            }))
    } else {
        commentModel.update({
            content: req.body.comment.content
        }, { where: { id: req.params.id, userId: req.user.id }, returning: true})
            .then(comment => res.status(200).json(comment))
            .catch(err => res.json({
                error: err
            }))
    }
});


router.delete('/delete/:id', (req, res) => {
    if (req.user.isAdmin) {
        commentModel.destroy({
            where: {
                id: req.params.id
            }, returning: true
        })
            .then(comment => res.status(200).json(comment))
            .catch(err => res.json({
                error: err
            }))
    } else {
        commentModel.destroy({
            where: {
                id: req.params.id,
                userId: req.user.id
            }, returning: true
        })
            .then(comment => res.status(200).json(comment))
            .catch(err => res.json({
                error: err
            }))
    }
});


module.exports = router;