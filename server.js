const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 3000;

// Serve static files from 'public' so index.html and script.js are on same origin
app.use(express.static(path.join(__dirname, 'public')));

// Parse JSON bodies
app.use(express.json());

// Endpoint to save username + IP into babft.txt
app.post('/save-info', (req, res) => {
  const { username, ip } = req.body;
  if (!username || !ip) return res.status(400).send('Missing info');

  const content = `Username: ${username}, IP: ${ip}, Time: ${new Date().toISOString()}\n`;

  fs.appendFile(path.join(__dirname, 'babft.txt'), content, (err) => {
    if (err) {
      console.error('Failed to write file:', err);
      return res.status(500).send('Failed to save');
    }
    res.send('Saved!');
  });
});

app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
