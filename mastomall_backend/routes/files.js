const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const fs = require('fs/promises');

const uploadDir = path.join(__dirname, '../uploads'); // Adjust the path to go one level back

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadDir);
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage: storage });

router.post('/upload', upload.single('file'), (req, res) => {
  res.json({ message: 'File uploaded successfully', filename: req.file.filename });
});

router.get('/uploads/:filename', (req, res) => {
  const filename = req.params.filename;
  const filePath = path.join(uploadDir, filename);
  res.sendFile(filePath);
});

router.get('/allFiles', async (req, res) => {
  try {
    const files = await fs.readdir(uploadDir);
    res.json({ files });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;
