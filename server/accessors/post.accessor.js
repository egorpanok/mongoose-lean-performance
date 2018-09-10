const Post = require('../models/post.model');

function getPosts() {
	return new Promise((resolve, reject) => {
		Post.find({}, (err, posts) => {
			return resolve(posts);
		});
	});
}

function getPostsLean() {
	return new Promise((resolve, reject) => {
		Post.find({}).lean().exec((err, posts) => {
			return resolve(posts);
		});
	});
}

module.exports = {
	getPosts,
	getPostsLean
};