const Contact = require('../models/contact');

const createContact = async obj => {
	let contact = await Contact.create(obj);

	if (contact) {
		return contact;
	} else {
		return 'There was some error';
	}
};

// Adding a new contact
const addContact = async (req, res) => {
	try {
		let contact = await createContact(req.body);

		res.status(200).json({
			status: 'success',
			contact
		});
	} catch (error) {
		res.status(400).json({
			status: 'fail',
			msg: error.message
		});
	}
};

const addMultipleContact = async (req, res) => {
	try {
		// inserting all the contacts passed as array in req.body
		let contacts = await Contact.insertMany(req.body.contacts);

		res.status(200).json({
			status: 'success',
			contacts
		});
	} catch (error) {
		res.status(400).json({
			status: 'fail',
			msg: error.message
		});
	}
};

const fetchSingleContact = async (req, res) => {
	try {
		let contact = await Contact.findById(req.params.id);

		if (!contact) {
			throw new Error('There is no contact with this id');
		}

		res.status(200).json({
			status: 'success',
			contact
		});
	} catch (error) {
		res.status(400).json({
			status: 'fail',
			msg: error.message
		});
	}
};

const fetchPaginatedContacts = async (req, res) => {
	try {
		let { page } = req.query;

		let contacts = [];
		let contactCount = 0;
		let finalpage = isNaN(parseInt(page, 10)) ? 0 : parseInt(page, 10);
		if (finalpage < 0) {
			finalpage = 0;
		}

		// calculating total contact count
		contactCount = await Contact.find({});
		contactCount = contactCount ? contactCount.length : 0;

		// calculating total pagecount
		let pageCount = Math.ceil(contactCount / 10);

		// finding contacts as per the page number
		contacts = await Contact.find(
			{},
			{
				skip: finalpage * 10,
				limit: 10
			}
		);

		return res.status(200).json({
			status: 'success',
			contacts,
			contactCount,
			pageCount
		});
	} catch (error) {
		res.status(400).json({
			status: 'fail',
			message: error.message
		});
	}
};

const fetchMatchingContacts = async (req, res) => {
	try {
    // finding the contacts matching conditions given in request body
		let contacts = await Contact.aggregate([
			{
				$match: req.body
			}
		]);


		return res.status(200).json({
			status: 'success',
			contacts
		});
	} catch (error) {
		res.status(400).json({
			status: 'fail',
			msg: error.message
		});
	}
};

const updateContact = async (req, res) => {
	try {
		// finding the contact first and verifying if its there
		let contact = await Contact.findById(req.params.id);

		if (!contact) {
			throw new Error('There is no contact with this id');
		}

		// updating the contact
		let updatedContact = await Contact.findByIdAndUpdate(
			req.params.id,
			req.body,
			{
				new: true
			}
		);

		res.status(200).json({
			status: 'success',
			contact: updatedContact
		});
	} catch (error) {
		res.status(400).json({
			status: 'fail',
			msg: error.message
		});
	}
};

const deleteContact = async (req, res) => {
	try {
		let contact = await Contact.findByIdAndDelete(req.params.id);

		if (!contact) {
			throw new Error('There is no contact with this id');
		}

		res.status(200).json({
			status: 'success'
		});
	} catch (error) {
		res.status(400).json({
			status: 'fail',
			msg: error.message
		});
	}
};

module.exports = {
	addContact,
	addMultipleContact,
	updateContact,
	deleteContact,
	fetchSingleContact,
	fetchPaginatedContacts,
  fetchMatchingContacts
};
