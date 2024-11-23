# **Focus Extension Manager with Conversational Assistant**

A productivity-focused Chrome extension and web application designed to help users manage distractions by restricting websites and providing an AI-powered conversational assistant. The assistant is powered by Groq API and Meta's LLaMA model.

---

## **Table of Contents**

1. [Overview](#overview)
2. [Features](#features)
3. [Prerequisites](#prerequisites)
4. [Installation](#installation)
5. [Configuration](#configuration)
6. [Running the Application](#running-the-application)
7. [Using the Application](#using-the-application)
8. [Folder Structure](#folder-structure)
9. [Contributing](#contributing)
10. [Troubleshooting](#troubleshooting)
11. [License](#license)

---

## **Overview**

Focus Extension Manager is a tool that:
- Restricts access to distracting websites.
- Provides a timer-based "Critical Path" feature to limit user access to Chrome's extensions path.
- Includes a conversational assistant powered by Groq API to help users stay focused and answer productivity-related queries.

---

## **Features**

- **Website Management**:
  - Add and remove websites to/from the allowed list.
  - Default websites (like `chrome://extensions`) cannot be removed.

- **Critical Path Timer**:
  - Restricts immediate access to the Chrome extensions page to prevent users from disabling the extension.

- **Conversational Assistant**:
  - An AI assistant powered by Groq API to provide productivity tips and focused responses.

---

## **Prerequisites**

Before setting up the project, ensure you have the following installed:

1. **Python** (3.8 or later)
   - Download from [https://www.python.org/](https://www.python.org/).
2. **Node.js** (18 or later)
   - Download from [https://nodejs.org/](https://nodejs.org/).
3. **Google Chrome** (latest version)
   - Download from [https://www.google.com/chrome/](https://www.google.com/chrome/).
4. **Groq API Key**
   - Obtain your API key by signing up at the [Groq Developer Portal](https://www.groq.com/).

---

## **Installation**

Follow these steps to set up and run the project:

### **1. Clone the Repository**
Open a terminal/command prompt and run:
```bash
git clone https://github.com/anirudhashastri/Momentum.git
cd Momentum
```

---

### **2. Backend Setup**

#### **Step 2.1: Create a Python Virtual Environment**
# TODO:  explain using anaconda

#### **Step 2.2: Install Required Python Packages**
```bash
pip install flask flask-cors groq-sdk
```

---

### **3. Frontend Setup**

#### **Step 3.1: Install Node.js Dependencies**
Navigate to the frontend folder:
```bash
cd frontend
npm install
```

#### **Step 3.2: Build the Frontend**
```bash
npm run build
```

---

### **4. Configure Groq API**

#### **Step 4.1: Set Up the API Key**
# TODO: DO groq api set up




## **Running the Application**

### **Step 1: Start the Backend**
In the root folder:
```bash
python app.py
```
- This starts the Flask backend on `http://127.0.0.1:5000`.

### **Step 2: Start the Frontend**
Navigate to the frontend folder:
```bash
cd frontend
npm start
```
- This starts the frontend on `http://localhost:5173`.

---

## **Using the Application**

1. **Web Interface**:
   - Open the frontend in a browser: `http://localhost:5173`.
   - Add/remove websites and use the Critical Path Timer.

2. **Chrome Extension**:
   - Go to `chrome://extensions`.
   - Enable "Developer mode".
   - Click "Load unpacked" and select the `browser-extention` folder.

3. **Conversational Assistant**:
   - Toggle the assistant in the web interface.
   - Ask productivity-related questions, and the assistant will provide AI-powered responses.

---

## **Folder Structure**

```
<repository_folder>
├── backend/
│   ├── app.py                 # Backend Flask application
│   ├── requirements.txt       # Python dependencies
│
├── frontend/
│   ├── src/                   # Frontend source files
│   ├── public/                # Static files
│   ├── package.json           # Node.js dependencies
│   ├── index.html             # Main HTML file
│
├── browser-extention/
│   ├── manifest.json          # Chrome extension manifest
│   ├── background.js          # Background script
│   ├── content.js             # Content script
│   ├── popup.html             # Extension popup HTML
│   ├── popup.js               # js for the popup
│   ├── icon.png               # Icon for extention

│
├── README.md                  # Project documentation
```

---

## **Contributing**

If you'd like to contribute:
1. Fork the repository.
2. Create a new branch for your feature/bug fix.
3. Submit a pull request with a detailed description.

---

## **Troubleshooting**

### **Common Issues**

1. **Flask Server Not Starting**:
   - Ensure all dependencies are installed with `pip install -r requirements.txt`.

2. **Frontend Not Loading**:
   - Verify the backend is running on `http://127.0.0.1:5000`.

3. **Groq API Errors**:
   - Double-check the API key and ensure it is correctly set in `app.py`.

4. **Chrome Extension Not Working**:
   - Ensure the extension is loaded in `chrome://extensions`.

---

## **License**

This project is licensed under the MIT License. See `LICENSE` for details.
