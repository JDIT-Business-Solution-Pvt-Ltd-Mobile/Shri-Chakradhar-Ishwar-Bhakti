const express = require('express');
const { addTemple, deleteTemple, getTemples } = require('../controllers/adminController');

const router = express.Router();

// Admin Routes
router.post('/add-temple', addTemple);
router.delete('/delete-temple/:id', deleteTemple);
router.get('/get-temples', getTemples);

module.exports = router;
