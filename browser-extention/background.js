let allowedWebsites = ["http://localhost:5173/"]; // Default allowed websites
let idleThreshold = 20000; // 20 seconds(for testing purposes) in milliseconds
let lastActivityTime = Date.now();
let currentTabId = null;

// Fetch allowed websites from the backend
async function fetchAllowedWebsites() {
  try {
    const response = await fetch("http://127.0.0.1:5000/get_websites");
    const data = await response.json();
    allowedWebsites = data.websites || [];
    console.log("Allowed websites fetched successfully:", allowedWebsites);
  } catch (error) {
    console.error("Error fetching websites:", error);
  }
}

// Check if a URL is allowed
function isAllowed(url) {
  return allowedWebsites.some((allowedUrl) => url.startsWith(allowedUrl));
}

// Monitor user activity
function resetIdleTimer() {
  lastActivityTime = Date.now();
  console.log("Activity detected. Timer reset.");
}

// Notify content script to display the idle pop-up
function notifyContentScriptIdle(tabId, idleTime) {
  chrome.tabs.get(tabId, (tab) => {
    if (tab && tab.url && tab.url.startsWith("http")) {
      console.log("Tab URL detected:", tab.url); // Debug log

      // Check if the URL is in the allowed list
      if (isAllowed(tab.url)) {
        // URL is allowed, send the idle-warning message
        console.log("URL is allowed. Sending idle warning...");
        chrome.tabs.sendMessage(tabId, { type: "idle-warning", idleTime }, (response) => {
          if (chrome.runtime.lastError) {
            console.warn("Could not send message to content script:", chrome.runtime.lastError.message);
          } else {
            console.log("Content script acknowledged idle message:", response);
          }
        });
      } else {
        // URL is not allowed, redirect to the default website
        console.warn("URL is not allowed. Redirecting...");
        if (allowedWebsites.length > 0) {
          const defaultWebsite = allowedWebsites[0] || "http://localhost:5173/";
          console.log(`Redirecting to default website: ${defaultWebsite}`);
          chrome.tabs.update(tabId, { url: defaultWebsite });
        }
      }
    } else {
      // Invalid or restricted URL
      console.warn("Invalid tab or restricted URL detected:", tab.url);

      // Redirect to the default allowed website
      if (allowedWebsites.length > 0) {
        const defaultWebsite = allowedWebsites[0] || "http://localhost:5173/";
        console.log(`Redirecting to default website: ${defaultWebsite}`);
        chrome.tabs.update(tabId, { url: defaultWebsite });
      }
    }
  });
}


// Monitor active tabs
chrome.tabs.onActivated.addListener(async (activeInfo) => {
  try {
    const tab = await chrome.tabs.get(activeInfo.tabId);
    currentTabId = activeInfo.tabId;
    if (isAllowed(tab.url)) {
      console.log(`Active tab is allowed: ${tab.url}`);
      resetIdleTimer();
    } else {
      console.log(`Active tab is not allowed: ${tab.url}`);
    }
  } catch (error) {
    console.error("Error getting tab info:", error);
  }
});

// Monitor tab updates (e.g., navigation within the same tab)
chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  if (tabId === currentTabId && changeInfo.url) {
    if (isAllowed(changeInfo.url)) {
      console.log(`Navigated to allowed URL: ${changeInfo.url}`);
      resetIdleTimer();
    } else {
      console.log(`Navigated to unallowed URL: ${changeInfo.url}`);
    }
  }
});

// Set up event listeners for user activity
chrome.runtime.onMessage.addListener((message, sender) => {
  if (message.type === "user-activity") {
    resetIdleTimer();
  }
});

// Check for inactivity
setInterval(() => {
  if (Date.now() - lastActivityTime > idleThreshold) {
    console.log("User has been idle for too long.");
    notifyContentScriptIdle(currentTabId, Math.floor((Date.now() - lastActivityTime) / 1000));
    resetIdleTimer(); // Reset timer after notification
  }
}, 2000); // Check every 10 seconds

// Fetch allowed websites on startup
fetchAllowedWebsites();
setInterval(fetchAllowedWebsites, 3000); // Refresh every 3 seconds
