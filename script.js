function generateName() {
    return 'person' + Math.floor(Math.random() * 10000);
}

const username = generateName();

fetch("https://api.ipify.org?format=json")
  .then(res => res.json())
  .then(data => {
    const ip = data.ip;

    fetch('http://localhost:3000/save-info', {  // local server
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, ip })
    })
    .then(res => res.text())
    .then(console.log)
    .catch(err => console.error('Error saving info:', err));
  })
  .catch(err => console.error('Could not fetch IP:', err));
