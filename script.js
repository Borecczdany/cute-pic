function generateName() {
    return 'person' + Math.floor(Math.random() * 10000);
}

const username = generateName();

fetch("https://api.ipify.org?format=json")
  .then(res => res.json())
  .then(data => {
    const ip = data.ip;
    document.getElementById("ip").textContent = "Your public IP: " + ip;

    // Send info to server
    fetch('/save-info', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, ip })
    })
    .then(res => res.text())
    .then(console.log)
    .catch(err => console.error('Error saving info:', err));
  })
  .catch(() => {
    document.getElementById("ip").textContent = "Could not fetch your IP.";
  });
