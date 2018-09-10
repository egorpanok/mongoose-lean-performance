const PostAccessor = require('./../accessors/post.accessor');
const clock = require('./../helpers/clock');

function getPostsPerformanceTest() {

	return new Promise((resolve, reject) => {
		const perf = clock.clock();

		PostAccessor.getPosts().then((posts) => {
			const ms = clock.clock(perf);

			return resolve(`Getting ${posts.length} posts took ${ms} ms`);
		});
	});
}

function getPostsLeanPerformanceTest() {

	return new Promise((resolve, reject) => {
		const perf = clock.clock();

		PostAccessor.getPostsLean().then((posts) => {
			const ms = clock.clock(perf);

			return resolve(`Getting ${posts.length} lean posts took ${ms} ms`);
		});
	});
}

module.exports = {
	getPostsPerformanceTest,
	getPostsLeanPerformanceTest
};