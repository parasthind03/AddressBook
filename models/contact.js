const mongoose = require('mongoose');

const contactSchema = new mongoose.Schema(
	{
		firstname: {
			type: String,
			unique: true,
			required: [true, 'Please provide a name']
		},
		lastname: {
			type: String,
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
		phoneNo: {
			type: Number,
			required: [true, 'Please provide a phoneNo.']
		},
		address: {
			type: String,
			default: '',
			required: [true, 'Please provide an address']
		}
	},
	{
		timestamps: true
	}
);

module.exports = mongoose.model('Contact', contactSchema);
