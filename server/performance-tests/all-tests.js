const config = require('./../config');
const mongoose = require('mongoose');
const PostPerfTests = require('./post.performance');

mongoose.connect(config.dbUri) // connect to database
	.then(() => {
		console.log('Perf testing started...');

		doPerfTests(config.performanceTests.delay).then((results) => {
			console.log('Perf testing ended.');
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
			console.log(`Posts: ${result.postsNumber} | Regular: ${result.regularTime} | Lean: ${result.leanTime}`);
			return resolve(result);
		});
	});
}

function doPerfTests(delay) {
	return new Promise((resolve, reject) => {
		let results = [],
			counter = 0,
			currentStep,
			steps = Math.floor((config.performanceTests.max - config.performanceTests.min) / config.performanceTests.step);

		for (let i = 0; i <= steps; i++) {
			currentStep = config.performanceTests.min + i * config.performanceTests.step;

			((cs) => {
				setTimeout(() => {
					doPefTest(cs).then((res) => {
						counter++;
						results.push(res);

						if (counter > steps) {

							results.sort((a, b) => { return a.postsNumber - b.postsNumber; });

							return resolve(results);
						}
					});
				}, delay * i);
			})(currentStep);
		}
	});
}