// Fetch and display allowed websites
async function fetchWebsites() {
    try {
      const response = await fetch("http://127.0.0.1:5000/get_websites");
      const data = await response.json();
      const websitesList = document.getElementById("websites");
      websitesList.innerHTML = ""; // Clear current list
      data.websites.forEach((website) => {
        const li = document.createElement("li");
        li.textContent = website;
        websitesList.appendChild(li);
      });
    } catch (error) {
      console.error("Error fetching websites:", error);
    }
  }
  
  // Refresh button handler
  document.getElementById("refresh").addEventListener("click", fetchWebsites);
  
  // Initial fetch
  fetchWebsites();
  