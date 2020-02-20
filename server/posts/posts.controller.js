const express = require('express');
const router = express.Router();
const multer = require('multer')
const postService = require('../posts/post.service')
const uploadLocation = require('../../client/src/assets/uploads/uploadLocation')


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, uploadLocation);
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname);
    }
});

const upload = multer({
    storage: storage
});

//routes
router.post('/create', upload.fields([{
    name: 'imgURL'
}]), create);
router.get('/', getAll);
router.get('/:id', getById);
router.put('/v', updateViewCount);
router.put('/c', updateCommentsCount);
router.get('/user/:id', getByUserId);
router.put('/:id', upload.fields([{
    name: 'imgURL'
}]), update);
router.delete('/:id', _delete);

module.exports = router

function create(req, res, next) {
    postService.create(req.body, req.files.imgURL[0].filename)
        .then(() => res.json({}))
        .catch(err => next(err))
}

function getAll(req, res, next) {
    postService.getAll()
        .then(posts => res.send(posts))
        .catch(err => next(err))
}

function getByUserId(req, res, next) {
    postService.getByUserId(req.params.id)
        .then(posts => res.send(posts))
        .catch(err => next(err))
}

function getById(req, res, next) {
    postService.getById(req.params.id)
        .then(post => {
            post ? res.send(post) : res.sendStatus(404)
        })
        .catch(err => next(err))
}

function updateViewCount(req, res, next) {
    postService.updateViewCount(req.body.id, req.body)
        .then(() => res.json({}))
        .catch(err => next(err))
}

function updateCommentsCount(req, res, next) {
    // console.log('in controller:', req.body)
    postService.updateCommentsCount(req.body.id, req.body)
        .then(res.json({}))
        .catch(err => next(err))
}

function update(req, res, next) {
    // console.log('Id:', req.params.id)
    // console.log('Body', req.body)
    // console.log('in controller')
    postService.update(req.params.id, req.body, req.files.imgURL[0].filename)
        .then(() => res.json({}))
        .catch(err => next(err))
}

function _delete(req, res, next) {
    postService.delete(req.params.id)
        .then(() => res.json({}))
        .catch(err => next / (err))
}