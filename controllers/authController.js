const User = require('../models/user');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const signJwt = async user => {
	let token = await jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
		expiresIn: '1d'
	});

	return token;
};

const register = async (req, res, next) => {
	try {
		req.body.password = await bcrypt.hash(req.body.password, 12);
		const { name, email, password } = req.body;
		const user = new User({
			name,
			email,
			password
		});

		await user.save();
		const token = await signJwt(user);

		res.status(200).json({
			status: 'success',
			token,
			user
		});
	} catch (error) {
		res.status(400).json({
			status: 'fail',
			msg: error.message
		});
	}
};

// Login controller
const login = async (req, res, next) => {
	try {
		const { email, password } = req.body;
		const user = await User.findOne({ email });
		// console.log(user)

		// checking if user is present or not and if the password matches with that stored in db
		if (!user || !(await bcrypt.compare(password, user.password))) {
			throw new Error('Incorrect credentials!');
		}

		// signing jwt
		const token = await signJwt(user);

		// making password undefined so it is not shown in db
		user.password = undefined;

		res.status(200).json({
			status: 'success',
			token,
			user
		});
	} catch (error) {
		res.status(400).json({
			status: 'fail',
			msg: error.message
		});
	}
};

const protect = async (req, res, next) => {
	try {
		let token;

		// checking if the token is passed in the headers
		if (
			req.headers.authorization &&
			req.headers.authorization.startsWith('Bearer')
		) {
			token = req.headers.authorization.split(' ')[1];
		}

		if (!token) {
			throw new Error('You are not logged in! Please Log in again!');
		}

		// decoding user from the token
		const decodedUser = await jwt.verify(token, process.env.JWT_SECRET);

		const user = await User.findOne({ _id: decodedUser.id });

		if (!user) {
			throw new Error('The user belonging to this token no longer exist.');
		}

		req.user = user;
		next();
	} catch (error) {
		res.status(400).json({
			status: 'fail',
			msg: error.message
		});
	}
};

module.exports = {
	login,
	register,
	protect
};
