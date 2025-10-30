fetch("https://api.ipify.org?format=json")
  .then(res => res.json())
  .then(data => {
    document.getElementById("ip").textContent = "Your public IP: " + data.ip;
  })
  .catch(() => {
    document.getElementById("ip").textContent = "Could not fetch your IP.";
  });
