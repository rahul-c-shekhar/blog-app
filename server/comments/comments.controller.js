const express = require('express');
const router = express.Router();
const commentService = require('../comments/comment.service')

router.post('/create', create)
router.get('/', getAll)
router.get('/:id', getById)
router.get('/user/:id', getByUserId)
router.get('/post/:id', getByPostId)
router.put('/:id', update)
router.delete('/:id', _delete)

module.exports = router

function create(req, res, next) {
    commentService.create(req.body)
        .then(() => res.json({}))
        .catch(err => next(err))
}

function getAll(req, res, next) {
    commentService.getAll()
        .then((result) => res.send(result))
        .catch(err => next(err))
}

function getById(req, res, next) {
    commentService.getById(req.params.id)
        .then(comment => res.send(comment))
        .catch(err => next(err))
}

function getByPostId(req, res, next) {
    commentService.getByPostId(req.params.id)
        .then(comment => res.send(comment))
        .catch(err => next(err))
}

function getByUserId(req, res, next) {
    commentService.getByUserId(req.params.id)
        .then(comment => res.send(comment))
        .catch(err => next(err))
}

function update(req, res, next) {
    commentService.update(req.params.id, req.body)
        .then(() => res.json({}))
        .catch(err => next(err))
}

function _delete(req, res, next) {
    commentService.delete(req.params.id)
        .then(() => res.json({}))
        .catch(err => next(err))
}