const PostAccessor = require('./../accessors/post.accessor');
const clock = require('./../helpers/clock');

function getPostsPerformanceTest(postsNumber) {

	return new Promise((resolve, reject) => {
		const perf = clock.clock();

		PostAccessor.getPosts(postsNumber).then((posts) => {
			const ms = clock.clock(perf);

			return resolve({
				message: `Getting ${posts.length} posts took ${ms} ms`,
				postsNumber: posts.length,
				ms: ms
			});
		});
	});
}

function getPostsLeanPerformanceTest(postsNumber) {

	return new Promise((resolve, reject) => {
		const perf = clock.clock();

		PostAccessor.getPostsLean(postsNumber).then((posts) => {
			const ms = clock.clock(perf);

			return resolve({
				message: `Getting ${posts.length} posts took ${ms} ms`,
				postsNumber: posts.length,
				ms: ms
			});
		});
	});
}

module.exports = {
	getPostsPerformanceTest,
	getPostsLeanPerformanceTest
};