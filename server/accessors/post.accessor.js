const Post = require('../models/post.model');

function getPosts(postsNumber) {
	return new Promise((resolve, reject) => {
		Post.find({}).limit(postsNumber).exec((err, posts) => {
			return resolve(posts);
		});
	});
}

function getPostsLean(postsNumber) {
	return new Promise((resolve, reject) => {
		Post.find({}).limit(postsNumber).lean().exec((err, posts) => {
			return resolve(posts);
		});
	});
}

module.exports = {
	getPosts,
	getPostsLean
};