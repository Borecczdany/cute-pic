function generateName() {
    return 'person' + Math.floor(Math.random() * 10000);
}

const username = generateName();

fetch("https://api.ipify.org?format=json")
  .then(res => res.json())
  .then(data => {
    const ip = data.ip;
    const ipElement = document.getElementById("ip");
    if (ipElement) {
        ipElement.textContent = "Your public IP: " + ip;
    }

    fetch('https://cute-pic2.onrender.com/save-info', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, ip })
    })
    .then(res => res.text())
    .then(console.log)
    .catch(err => console.error('Error saving info:', err));
  })
  .catch(() => {
    const ipElement = document.getElementById("ip");
    if (ipElement) {
        ipElement.textContent = "Could not fetch your IP.";
    }
  });
