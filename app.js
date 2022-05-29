require('dotenv').config();
const express = require('express');
const morgan = require('morgan');

const { connectDB } = require('./config/db');
const authRouter = require('./routes/auth');
const contactRouter = require('./routes/contact');

const app = express();

// connecting to database
connectDB();

//middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

if (process.env.ENV === 'development') {
	app.use(morgan('dev'));
}

app.use('/auth', authRouter);
app.use('/contact', contactRouter);

const port = process.env.PORT || 8000;

app.listen(port, () => {
	console.log(`Server running on port ${port}`);
});
