let allowedWebsites = ["http://localhost:5173/"]; // Default websites

// Fetch allowed websites from the backend
async function fetchAllowedWebsites() {
  try {
    const response = await fetch("http://127.0.0.1:5000/get_websites");
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    allowedWebsites = data.websites || [];
    console.log("Allowed websites fetched successfully:", allowedWebsites);
  } catch (error) {
    console.error("Error fetching allowed websites:", error);
  }
}

// Check if a URL is allowed
function isAllowed(url) {
  return allowedWebsites.some((allowedUrl) => url.startsWith(allowedUrl));
}

// Monitor tabs for URL changes
chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  if (changeInfo.url && !isAllowed(changeInfo.url)) {
    chrome.tabs.update(tabId, { url: allowedWebsites[0] || "http://localhost:5173/" }); // Redirect to default
    chrome.notifications.create({
      type: "basic",
      iconUrl: "icon.png",
      title: "Focus App Alert",
      message: `This site is not allowed. Redirecting to ${allowedWebsites[0]}`,
    });
  }
});

// Fetch the initial list of allowed websites
fetchAllowedWebsites();

// Refresh allowed websites every 60 seconds
setInterval(fetchAllowedWebsites, 60000);
