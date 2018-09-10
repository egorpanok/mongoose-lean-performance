const config = require('./../config');
const mongoose = require('mongoose');
const PostPerfTests = require('./post.performance');

mongoose.connect(config.dbUri) // connect to database
	.then(() => {
		PostPerfTests.getPostsPerformanceTest().then((message) => {
			console.log(message);
			return PostPerfTests.getPostsLeanPerformanceTest();
		}).then((message) => {
			console.log(message);
		});
	});

