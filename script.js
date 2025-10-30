// Function to generate a random username
function generateName() {
    return 'person' + Math.floor(Math.random() * 10000);
}

const username = generateName();

// Fetch the visitor's public IP
fetch("https://api.ipify.org?format=json")
  .then(res => res.json())
  .then(data => {
    const ip = data.ip;

    // Display IP on the page (requires an element with id="ip")
    const ipElement = document.getElementById("ip");
    if (ipElement) {
        ipElement.textContent = "Your public IP: " + ip;
    }

    // Send username + IP to the server
    fetch('https://your-app-name.onrender.com/save-info', { // <-- Replace with your Render server URL
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, ip })
    })
    .then(res => res.text())
    .then(console.log)  // Logs "Saved!" if successful
    .catch(err => console.error('Error saving info:', err));
  })
  .catch(() => {
    const ipElement = document.getElementById("ip");
    if (ipElement) {
        ipElement.textContent = "Could not fetch your IP.";
    }
  });
