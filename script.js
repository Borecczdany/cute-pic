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
    // Display IP on the page
    document.getElementById("ip").textContent = "Your public IP: " + ip;

    // Send username + IP to your Node.js server
    fetch('https://your-app-name.onrender.com/save-info', { // <-- Replace with your server URL
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, ip })
    })
    .then(res => res.text())
    .then(console.log)  // Logs "Saved!" from the server
    .catch(err => console.error('Error saving info:', err));
  })
  .catch(() => {
    document.getElementById("ip").textContent = "Could not fetch your IP.";
  });
