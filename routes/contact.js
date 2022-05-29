const router = require('express').Router();
const {
	addContact,
	addMultipleContact,
	updateContact,
	deleteContact,
	fetchSingleContact,
	fetchPaginatedContacts,
  fetchMatchingContacts
} = require('../controllers/contactController');

const {protect} = require('../controllers/authController')

// applying protect middleware to every request to make them only available to logged in users
router.use(protect);

router.post('/add', addContact);
router.post('/addMultiple', addMultipleContact);
router.post('/update/:id', updateContact);

router.get('/getSingle/:id', fetchSingleContact);
router.get('/getContacts', fetchPaginatedContacts);
router.get('/getMatch', fetchMatchingContacts);

router.delete('/delete/:id', deleteContact);

module.exports = router;
