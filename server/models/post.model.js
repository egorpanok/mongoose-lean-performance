let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let PostSchema = new Schema({
	title: {
		type: String,
		required: true
	},
	description: {
		type: String,
		required: false
	},
	views: {
		type: Number,
		required: true
	},
	likes: {
		type: Number,
		required: true
	},
	createdAt: {
		type: Date,
		required: true
	},
	updatedAt: {
		type: Date,
		required: true
	}
});

module.exports = mongoose.model('Posts', PostSchema);
