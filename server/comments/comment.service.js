const db = require('../_helpers/database');
const Comment = db.Comment

module.exports = {
    create,
    getAll,
    getById,
    getByUserId,
    getByPostId,
    update,
    delete: _delete
}

async function create(userParam) {
    const comment = new Comment(userParam)

    await comment.save()
}

async function getAll() {
    return await Comment.find()
}

async function getById(id) {
    return await Comment.findById(id)
}

async function getByPostId(id) {
    // console.log('in service.js')
    return await Comment.find({
        'postID': id
    })
}

async function getByUserId(id) {
    return await Comment.find({
        'userID': id
    })
}

async function update(id, userParam) {
    return await Comment.findByIdAndUpdate(id, userParam.comment)
}

async function _delete(id) {
    return await Comment.findByIdAndDelete(id)
}