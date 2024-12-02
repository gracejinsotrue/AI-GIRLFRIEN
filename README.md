# My Skibidi Girlfriend

This project allows users to chat with a #kawaii girlfriend who is majoring in computer science. Works by transcribing voice input using Google Cloud Speech-to-Text, generate a response from GPT-3.5, and convert that response to speech using Google Text-to-Speech API. It involves both a Node.js backend and a JavaScript frontend. 

## Table of Contents

- [Installation](#installation)
- [Backend Setup](#backend-setup)
- [Frontend Setup](#frontend-setup)
- [Running the Project](#running-the-project)
- [File Descriptions](#file-descriptions)

## Installation

### Prerequisites

- Node.js and npm
- Running locally requires OpenAI API key (message me if you need one)

### 1. Install Backend Dependencies

1. Clone the repository or download the files.
   
2. Navigate to the backend directory and install Node.js dependencies:

   - `npm install`
3. Add OpenAI API key to a .env in your root directory. 

### 2. Install Frontend Dependencies

1. Go to the frontend directory (or where your `script.js` and `index.html` are stored).

2. Install Node.js dependencies:

   - `npm install`

3. Ensure that **CORS** is enabled in your Node.js backend (see backend setup) to allow requests from the frontend.

## Backend Setup

The backend is implemented using **Node.js** and handles the following tasks:

- Receives the uploaded audio file.
- Transcribes the audio file to text using Google Cloud Speech-to-Text.
- Sends the transcribed text to OpenAI GPT-3 for a response.
- Returns the GPT-3 response to the frontend.
- Converts the GPT-3 response to audio using Google Text-to-Speech.

### Run the Backend

1. Navigate to the backend directory and run the Node.js server:

   - `node server.js`

2. This will start the backend server at `http://localhost:5000`.

3. The server will listen for incoming requests from the frontend to upload audio files.

## Frontend Setup

The frontend consists of HTML, JavaScript, and CSS that handle the user interface. The user can upload an audio file, and the frontend will send it to the Node.js backend for processing.

### Frontend Workflow

1. **File Upload**: Users upload an audio file using the frontend interface.
2. **Transcription**: The frontend sends the audio to the backend, which processes it using Google Cloud Speech-to-Text and returns the transcription.
3. **GPT-3 Response**: The transcribed text is sent to OpenAI GPT-3.5, which generates a response.
4. **Text-to-Speech**: The backend sends the GPT-3 response to the frontend, where it is converted to speech using Google Text-to-Speech API.

### Run the Frontend

1. Navigate to the frontend directory and start a local server to serve the HTML:

   - `python -m http.server 8000`

2. Open your browser and go to `http://localhost:8000` to view the game.

## Running the Project

1. **Start the Node.js backend**:

   - `node server.js`

2. **Start the frontend**:

   1. Navigate to the frontend directory.
   2. Run `python -m http.server 8000`.
   3. Open `http://localhost:8000` in your browser to interact with the application. Send a text!, and the backend will process it to generate the GPT-3 response and convert it to speech.

## File Descriptions

- **backend/server.js**: The Node.js backend server that handles audio file upload, transcription, GPT-3 request, and text-to-speech conversion.
- **frontend/index.html**: The HTML file that serves as the user interface.
- **frontend/script.js**: The JavaScript file responsible for handling file uploads, making requests to the Node.js backend, and processing the response.
- **gptprompt.py**: The Python script that sends the transcribed text to OpenAI’s GPT API and retrieves the response.
- **text-to-speech.js**: The JavaScript file that uses the Google Text-to-Speech API to convert text to audio.

## Troubleshooting

- **CORS Error**: Ensure that CORS is enabled and that the frontend and backend are using compatible ports.
- **Audio Transcription Issues**: Double-check your Google Cloud credentials and ensure the Speech-to-Text API is properly configured.
- **API Key Errors**: Ensure your OpenAI API key is correctly set in your environment variables.
