const db = require('../_helpers/database');
const Post = db.Post

module.exports = {
    getAll,
    getById,
    getByUserId,
    updateViewCount,
    create,
    updateCommentsCount,
    update,
    delete: _delete
}

async function getAll() {
    return await Post.find()
}

async function getByUserId(id) {
    return await Post.find({
        'userID': id
    })
}

async function getById(id) {
    return await Post.find({
        '_id': id
    })
}

async function create(userParam, imgURL) {
    const post = new Post(userParam)
    post.comments = 0
    post.views = 0
    post.imgURL = imgURL

    await post.save()
}

async function updateViewCount(id, userParam) {
    return await Post.findByIdAndUpdate(id, {
        views: userParam.views
    })
}

async function updateCommentsCount(id, userParam) {
    return await Post.findByIdAndUpdate(id, {
        comments: userParam.comments
    })
}

async function update(id, userParam, imgURL) {
    const post = await Post.findById(id)
    post.title = userParam.title
    post.body = userParam.body
    post.imgURL = imgURL
    // console.log(imgURL)

    await post.save()
}

async function _delete(id) {
    await Post.findByIdAndRemove(id)
}