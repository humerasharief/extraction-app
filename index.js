const express = require('express');
const cors = require('cors');
const multer = require('multer');
const bodyParser = require('body-parser');

const app = express();
const upload = multer();

app.use(cors());
app.use(bodyParser.json());

let lastFileName = '';

app.post('/keyword', upload.single('file'), (req, res) => {
  lastFileName = req.file.originalname;
  console.log('Received file:', lastFileName);
  res.json({ message: 'File received', keywords: ['sample', 'test', 'keyword'] });
});

app.get('/filename', (req, res) => {
  res.json({ name: lastFileName || 'No file uploaded yet' });
});

const PORT = 3000;
app.listen(PORT, () => console.log(`✅ Server running on http://localhost:${PORT}`));
