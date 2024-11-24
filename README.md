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

1. **Python** (3.10)
   - Follow the steps below to set up an anaconda environment
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

#### **Step 2.1: Create an Anaconda Environment**
1. Open your terminal or Anaconda Prompt install [Anaconda](https://docs.anaconda.com/anaconda/install/) for your system .
2. Run the following command to create a new environment:

    ```bash
    conda create -n momentum python=3.10
    ```

3. Activate the environment:

    ```bash
    conda activate momentum
    ```


#### **Step 2.2: Install Required Python Packages**
```bash
pip install flask flask-cors groq dotenv
```
#### **Step 2.3: Section of environment in VS-Code**
1. Open the folder containing your project files (app.py, etc.).

2. Click on File > Open Folder and select the project directory.
Ensure you have your app.py or any Python file open in the editor.

3. Open the Command Palette:

Press Ctrl + Shift + P (or Cmd + Shift + P on macOS) to open the command palette.
Search for Interpreter:

Type 'Python: Select Interpreter' in the command palette and press Enter

4. Following this all your oython environments should be displayed. Selected the .momentum' environment we just created.


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

#### **Step 4.1: Obtain a Groq API Key**
1. Visit the [Groq API website](https://www.groq.com) and sign up for a developer account.
2. Generate a free API key from your dashboard under **API Keys**.
3. Copy this key for use in the next step.
4. I have also provided a key for ease of useage in the APIKEY.txt

#### **Step 4.2: Add Groq API key in `.env`**

- Add your Groq API key in the following format:

    ```plaintext
    GROQ_API_KEY=your_api_key_here
    ```

- For security, ensure `.env` is listed in `.gitignore` (included in this project) to avoid accidentally committing sensitive information.




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
