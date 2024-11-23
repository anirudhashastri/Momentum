let allowedWebsites = ["http://localhost:5173/",
  "chrome://extensions/"
]; // Default allowed website
let socket;

// Function to initialize WebSocket connection
function initializeWebSocket() {
  socket = new WebSocket("ws://127.0.0.1:5000/websocket");

  socket.onopen = () => {
    console.log("WebSocket connected to backend.");
    fetchAllowedWebsites(); // Fetch initial data on connection
  };

  socket.onmessage = (event) => {
    allowedWebsites = JSON.parse(event.data).websites || [];
    console.log("Allowed websites updated via WebSocket:", allowedWebsites);
  };

  socket.onerror = (error) => {
    console.error("WebSocket error:", error);
  };

  socket.onclose = () => {
    console.warn("WebSocket connection closed. Retrying in 5 seconds...");
    setTimeout(initializeWebSocket, 5000); // Retry connection
  };
}

// Fetch allowed websites manually as a fallback
async function fetchAllowedWebsites() {
  try {
    const response = await fetch("http://127.0.0.1:5000/get_websites");
    const data = await response.json();
    allowedWebsites = data.websites || [];
    console.log("Allowed websites fetched manually:", allowedWebsites);
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
    // Redirect to the default website
    chrome.tabs.update(tabId, { url: "http://localhost:5173/" });
    chrome.notifications.create({
      type: "basic",
      iconUrl: "icon.png",
      title: "Focus App Alert",
      message: `This site is not allowed. Redirecting to ${allowedWebsites[0]}`,
    });
  }
});

// Initialize WebSocket connection
initializeWebSocket();
