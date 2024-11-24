// Listen for idle warning messages from the background script
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.type === "idle-warning") {
      const idleTime = message.idleTime; // Idle time in seconds
      displayIdlePopup(idleTime);
      sendResponse({ status: "Popup displayed" });
    }
  });
  
  // Display the idle pop-up on the webpage
  function displayIdlePopup(idleTime) {
    // Remove any existing pop-up
    const existingPopup = document.getElementById("idle-popup");
    if (existingPopup) {
      existingPopup.remove();
    }
  
    // Create the pop-up
    const popup = document.createElement("div");
    popup.id = "idle-popup";
    popup.style.position = "fixed";
    popup.style.top = "20px";
    popup.style.right = "20px";
    popup.style.padding = "15px";
    popup.style.backgroundColor = "rgba(255, 0, 0, 0.8)";
    popup.style.color = "white";
    popup.style.fontSize = "16px";
    popup.style.fontWeight = "bold";
    popup.style.borderRadius = "5px";
    popup.style.zIndex = "9999";
    popup.textContent = `You've been idle for ${idleTime} seconds!`;
  
    // Add a dismiss button
    const dismissButton = document.createElement("button");
    dismissButton.textContent = "Dismiss";
    dismissButton.style.marginLeft = "10px";
    dismissButton.style.padding = "5px 10px";
    dismissButton.style.backgroundColor = "white";
    dismissButton.style.color = "black";
    dismissButton.style.border = "none";
    dismissButton.style.cursor = "pointer";
    dismissButton.style.borderRadius = "3px";
  
    dismissButton.addEventListener("click", () => {
      popup.remove();
    });
  
    popup.appendChild(dismissButton);
  
    // Append the pop-up to the body
    document.body.appendChild(popup);
  
    // Automatically remove the pop-up after 3 seconds
    setTimeout(() => {
      popup.remove();
    }, 3000);
  }
  