const Temple = require('../models/Temple');

// Add Temple
exports.addTemple = async (req, res) => {
  try {
    const newTemple = new Temple(req.body);
    await newTemple.save();
    res.status(201).json({ message: 'Temple added successfully', temple: newTemple });
  } catch (error) {
    res.status(500).json({ error: 'Failed to add temple' });
  }
};

// Delete Temple
exports.deleteTemple = async (req, res) => {
  try {
    const { id } = req.params;
    await Temple.findByIdAndDelete(id);
    res.status(200).json({ message: 'Temple deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete temple' });
  }
};

// Get All Temples
exports.getTemples = async (req, res) => {
  try {
    const temples = await Temple.find();
    res.status(200).json(temples);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch temples' });
  }
};
