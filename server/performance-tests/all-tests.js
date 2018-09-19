const config = require('./../config');
const mongoose = require('mongoose');
const PostPerfTests = require('./post.performance');

mongoose.connect(config.dbUri) // connect to database
	.then(() => {

		doPerfTests().then((results) => {
			console.log('Results');
		});
	});

function doPefTest(postsNumber) {
	return new Promise((resolve, reject) => {
		const result = {};

		PostPerfTests.getPostsPerformanceTest(postsNumber).then((res) => {
			result.postsNumber = res.postsNumber;
			result.regularTime = res.ms;
			return PostPerfTests.getPostsLeanPerformanceTest(postsNumber);
		}).then((res) => {
			result.leanTime = res.ms;
			return resolve(result);
		});
	});
}

function doPerfTests() {
	return new Promise((resolve, reject) => {
		let results = [],
			counter = 0,
			endCounterState = Math.floor((config.performanceTests.max - config.performanceTests.min) / config.performanceTests.step);

		for (let i = config.performanceTests.min; i <= config.performanceTests.max; i += config.performanceTests.step) {
			doPefTest(i).then((res) => {
				counter++;
				console.log(`Posts: ${res.postsNumber}. Regular: ${res.regularTime}. Lean: ${res.leanTime}`);
				results.push(res);

				if (counter > endCounterState) {

					results.sort((a, b) => { return a.postsNumber - b.postsNumber; });

					return resolve(results);
				}
			});
		}
	});
}