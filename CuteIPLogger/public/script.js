// small username generator
function generateName() {
  return 'person' + Math.floor(Math.random() * 10000);
}

const username = generateName();

// Use a public IP lookup then post to same-origin server endpoint
fetch("https://api.ipify.org?format=json")
  .then(res => res.json())
  .then(data => {
    const ip = data.ip || 'unknown';
    const status = document.getElementById('status');
    if (status) status.textContent = "Your public IP: " + ip;

    // Post to server (same origin, served by express)
    fetch('/save-info', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, ip })
    })
    .then(r => r.text())
    .then(txt => console.log('Server response:', txt))
    .catch(err => console.error('Error saving info:', err));
  })
  .catch(err => {
    console.error('Could not fetch IP:', err);
    const status = document.getElementById('status');
    if (status) status.textContent = "Could not fetch your IP.";
  });
