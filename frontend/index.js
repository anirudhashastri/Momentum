const apiBase = "http://127.0.0.1:5000";

// Fetch and display websites
async function fetchWebsites() {
  try {
    const response = await fetch(`${apiBase}/get_websites`);
    const data = await response.json();
    populateTable(data.websites);
  } catch (error) {
    console.error("Error fetching websites:", error);
  }
}

// Populate table with websites
function populateTable(websites) {
  const tableBody = document.querySelector("#websites-table tbody");
  tableBody.innerHTML = ""; // Clear table
  websites.forEach((website) => {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>
        <a href="${website}" target="_blank">${website}</a> <!-- Hyperlinked -->
      </td>
      <td>
        <button class="delete-btn" onclick="removeWebsite('${website}')">Delete</button>
      </td>
    `;
    tableBody.appendChild(row);
  });
}

// Add a website
document.querySelector("#add-website-form").addEventListener("submit", async (e) => {
  e.preventDefault();
  const urlInput = document.querySelector("#website-url");
  const url = urlInput.value.trim();
  if (!url) return;
  try {
    await fetch(`${apiBase}/add_website`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ url }),
    });
    urlInput.value = ""; // Clear input
    fetchWebsites(); // Refresh table
  } catch (error) {
    console.error("Error adding website:", error);
  }
});

// Remove a website
async function removeWebsite(url) {
  try {
    await fetch(`${apiBase}/remove_website`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ url }),
    });
    fetchWebsites(); // Refresh table
  } catch (error) {
    console.error("Error removing website:", error);
  }
}

// Critical Path Timer
let timer = 60; // 1 minute for testing
const timerElement = document.querySelector("#timer");
const criticalPathButton = document.querySelector("#access-critical-path");

// Disable the button initially
criticalPathButton.disabled = false;

// Start the timer when the button is clicked
criticalPathButton.addEventListener("click", () => {
  criticalPathButton.disabled = true; // Prevent multiple clicks
  updateTimer();
});

function updateTimer() {
  if (timer > 0) {
    timerElement.textContent = `You can access in ${timer} seconds.`;
    timer--;
    setTimeout(updateTimer, 1000);
  } else {
    criticalPathButton.disabled = false; // Re-enable the button
    timerElement.textContent = "You can access now.";
  }
}

// Initially display the default message
timerElement.textContent = "Click the button to start the timer.";

// Assistant Feature
const assistantContainer = document.getElementById("assistant-container");
const assistantToggle = document.getElementById("assistant-toggle");
const assistantMessages = document.getElementById("assistant-messages");
const assistantInput = document.getElementById("assistant-input");
const assistantSend = document.getElementById("assistant-send");

// Toggle Assistant Visibility
assistantToggle.addEventListener("click", () => {
  if (assistantContainer.style.display === "none") {
    assistantContainer.style.display = "block";
  } else {
    assistantContainer.style.display = "none";
  }
});

// Handle Assistant Input
assistantSend.addEventListener("click", async () => {
  const userMessage = assistantInput.value.trim();
  if (!userMessage) return;

  // Display user message in the chat
  addAssistantMessage(userMessage, "user-message");

  // Send the message to the AI API
  try {
    const response = await fetch(`${apiBase}/assistant`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ query: userMessage }),
    });
    const data = await response.json();

    // Display assistant response in the chat
    if (data.response) {
      addAssistantMessage(data.response, "assistant-response");
    } else {
      addAssistantMessage("Sorry, I couldn't process your request.", "assistant-response");
    }
  } catch (error) {
    console.error("Error communicating with assistant:", error);
    addAssistantMessage("An error occurred while processing your query.", "assistant-response");
  } finally {
    assistantInput.value = ""; // Clear input
  }
});

// Add message to chat
function addAssistantMessage(message, className) {
  const messageDiv = document.createElement("div");
  messageDiv.className = `assistant-message ${className}`;
  messageDiv.textContent = message;
  assistantMessages.appendChild(messageDiv);
  assistantMessages.scrollTop = assistantMessages.scrollHeight; // Scroll to the latest message
}

// Initialize
fetchWebsites();
