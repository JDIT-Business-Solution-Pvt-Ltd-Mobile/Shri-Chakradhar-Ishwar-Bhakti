const express = require('express');
const multer = require('multer');
const { bucket, db } = require('../firebase-config');
const router = express.Router();

const upload = multer({ storage: multer.memoryStorage() });

router.post('/upload', upload.single('file'), async (req, res) => {
  const file = req.file;
  const metadata = {
    contentType: file.mimetype,
  };

  try {
    const blob = bucket.file(`uploads/${file.originalname}`);
    const blobStream = blob.createWriteStream({
      metadata,
    });

    blobStream.on('error', (err) => {
      res.status(400).json({ error: err.message });
    });

    blobStream.on('finish', async () => {
      const publicUrl = `https://storage.googleapis.com/${bucket.name}/${blob.name}`;
      await db.collection('uploads').add({
        fileName: file.originalname,
        url: publicUrl,
        timestamp: new Date(),
      });
      res.status(200).json({ message: 'File uploaded successfully', url: publicUrl });
    });

    blobStream.end(file.buffer);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get('/content', async (req, res) => {
  try {
    const snapshot = await db.collection('uploads').orderBy('timestamp', 'desc').get();
    const uploads = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    res.status(200).json(uploads);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
