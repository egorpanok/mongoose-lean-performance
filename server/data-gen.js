const config = require('./config');
const mongoose = require('mongoose');
const Post = require('./models/post.model');


function getRandomInteger(min, max) {
	return Math.floor(Math.random() * (max - min)) + min;
}

function getRandomString(minLenght, maxLength) {

	const possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
	const length = getRandomInteger(minLenght, maxLength);
	let text = "";

	for (let i = 0; i < length; i++) {
		text += possible.charAt(Math.floor(Math.random() * possible.length));
	}

	return text;
}

function dropExistingData(){
	console.log('Dropping current data');
	return new Promise((resolve, reject) => {
		mongoose.connection.db.dropCollection('posts', function(err, result) {
			console.log("Current data dropped");
			return resolve(result);
		});
	});
}

function generateData(){
	console.log("Generating new data");

	return new Promise((resolve, reject) => {
		let counter = 0, post;

		for (let i = 0; i < config.postsNumber; i++) {
			post = new Post({
				title: getRandomString(20, 50),
				description: getRandomString(800, 2000),
				views: getRandomInteger(200, 1000),
				likes: getRandomInteger(10, 70),
				createdAt: new Date(),
				updatedAt: new Date()
			});

			post.save((err, pst) => {
				if(err) {
					console.log(err);
				}

				counter++;

				console.log(pst);

				if (counter === config.postsNumber) {
					return resolve("Data generated successfully");
				}
			});
		}



	});
}

mongoose.connect(config.dbUri) // connect to database
	.then(() => {
		console.log(`Connected to ${config.dbUri}`);

		dropExistingData().then(() => {
			return generateData();
		}).then((message) => {
			console.log(message);
		});
	});

