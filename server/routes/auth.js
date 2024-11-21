const express = require('express');
const { admin } = require('../firebase-config');
const router = express.Router();

router.post('/signup', async (req, res) => {
  const { email, password, displayName } = req.body;

  try {
    const user = await admin.auth().createUser({
      email,
      password,
      displayName,
    });
    res.status(201).json({ message: 'User created successfully', user });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.post('/login', async (req, res) => {
  const { idToken } = req.body;

  try {
    const decodedToken = await admin.auth().verifyIdToken(idToken);
    res.status(200).json({ message: 'Login successful', userId: decodedToken.uid });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;
