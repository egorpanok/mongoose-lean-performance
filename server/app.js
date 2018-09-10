const config = require('./config');
const port = config.port;
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const Post = require('./models/post.model');
const PostAccessor = require('./accessors/post.accessor');
mongoose.connect(config.dbUri); // connect to database

// getPosts regular
app.get('/posts', function (req, res) {
	PostAccessor.getPosts().then((posts) => {
		return res.json(posts);
	});
});

// getPosts lean
app.get('/posts-lean', function (req, res) {
	PostAccessor.getPostsLean().then((posts) => {
		return res.json(posts);
	});
});

app.listen(port, () => console.log("Listening on port ", port));