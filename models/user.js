const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
	{
		name: {
			type: String,
			unique: true,
			required: [true, 'Please provide a name']
		},
		email: {
			type: String,
			unique: true,
			match: [
				/^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i,
				'Please enter a valid email address'
			],
			required: [true, 'Please provide an email']
		},
		password: {
			type: String,
			minlength: 8,
			required: [true, 'Please provide a password']
		}
	},
	{
		timestamps: true
	}
);

module.exports = mongoose.model('User', userSchema);
