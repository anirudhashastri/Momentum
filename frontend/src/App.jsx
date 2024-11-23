import React, { useState, useEffect } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; // Import Toastify styles
import { useTimer } from "react-timer-hook"; // Import timer hook

function App() {
  const [websites, setWebsites] = useState([]);
  const [newWebsite, setNewWebsite] = useState("");

  // Default website to add initially
  const defaultWebsite = "http://localhost:5173/";

  // Fetch allowed websites from the backend
  const fetchWebsites = async () => {
    const response = await axios.get("http://127.0.0.1:5000/get_websites");
    const fetchedWebsites = response.data.websites;

    // Add default website if not already present
    if (!fetchedWebsites.includes(defaultWebsite)) {
      await axios.post("http://127.0.0.1:5000/add_website", { url: defaultWebsite });
      fetchedWebsites.push(defaultWebsite);
    }
    setWebsites(fetchedWebsites);
  };

  // Add a new website to the backend
  const addWebsite = async () => {
    if (newWebsite.trim()) {
      await axios.post("http://127.0.0.1:5000/add_website", { url: newWebsite });
      setNewWebsite("");
      fetchWebsites();
    }
  };

  // Timer setup
  const time = new Date();
  time.setSeconds(time.getSeconds() + 300); // 5 minutes from now

  const {
    seconds,
    minutes = 5, // Default to 5 minutes if undefined
    start,
    pause,
    reset,
  } = useTimer({
    expiryTimestamp: time,
    onExpire: () =>
      toast.info("Break over! Get back to work! 💪"),
  });

  // Monitor navigation and enforce restrictions
  useEffect(() => {
    const checkNavigation = () => {
      const currentURL = window.location.href;
      const isAllowed = websites.some((site) => currentURL.startsWith(site));

      // Redirect only if the current URL is unallowed and timer is running
      if (!isAllowed && minutes > 0) {
        toast.warn("This site is not allowed! Redirecting...");
        window.location.href = websites[0]; // Redirect to the first allowed site
      }
    };

    // Check navigation every second
    const interval = setInterval(checkNavigation, 1000);

    return () => clearInterval(interval); // Cleanup interval on component unmount
  }, [websites, minutes]);

  // Fetch websites on component mount
  useEffect(() => {
    fetchWebsites();
  }, []);

  return (
    <div>
      <h1>Focus App</h1>
      <div>
        <input
          type="text"
          value={newWebsite}
          onChange={(e) => setNewWebsite(e.target.value)}
          placeholder="Add a website to stay focused"
        />
        <button onClick={addWebsite}>Add Website</button>
      </div>
      <h2>Allowed Websites:</h2>
      <ul>
        {websites.map((site, index) => (
          <li key={index}>
            <a
              href={site}
              target="_blank"
              rel="noopener noreferrer"
            >
              {site}
            </a>
          </li>
        ))}
      </ul>

      {/* Break Timer */}
      <div>
        <h2>Break Timer</h2>
        <div>
          {minutes}:{seconds < 10 ? `0${seconds}` : seconds}
        </div>
        <button onClick={start}>Start Timer</button>
        <button onClick={pause}>Pause Timer</button>
        <button onClick={() => reset(time, false)}>Reset Timer</button>
      </div>

      {/* Toast notifications container */}
      <ToastContainer />
    </div>
  );
}

export default App;
