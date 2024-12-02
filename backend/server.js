// const express = require('express');
// const path = require('path');
// const multer = require('multer');
// const { spawn } = require('child_process');  // For calling Python script
// const fs = require('fs');

// const app = express();
// const port = 5000;

// // Middleware for handling multipart form data (file upload)
// const storage = multer.memoryStorage();
// const upload = multer({ storage: storage });

// app.use(express.static('public')); // Serve static files (like HTML)

// app.post('/upload-audio', upload.single('audio'), (req, res) => {
//   // Get the audio file from the request
//   const audioBuffer = req.file.buffer;

//   // Save the uploaded file to disk (optional, for later use)
//   const audioPath = path.join(__dirname, 'audio', 'uploaded_audio.mp3');
//   fs.writeFileSync(audioPath, audioBuffer);

//   // Call the transcription and processing scripts
//   transcribeAudio(audioPath).then((transcription) => {
//     // Pass transcription to GPT (via Python)
//     gptProcess(transcription).then((gptResponse) => {
//       // Convert GPT response to speech (Text-to-Speech)
//       textToSpeech(gptResponse).then((audioFilePath) => {
//         // Send the generated audio back to the frontend
//         res.sendFile(audioFilePath, (err) => {
//           if (err) {
//             console.error("Error sending audio file:", err);
//           }
//           // Cleanup audio files after sending
//           fs.unlinkSync(audioFilePath);
//           fs.unlinkSync(audioPath);
//         });
//       });
//     });
//   }).catch((error) => {
//     console.error('Error in audio processing:', error);
//     res.status(500).send('Internal Server Error');
//   });
// });

// // Endpoint to process user input
// app.post('/chat', (req, res) => {
//   const userInput = req.body.text;

//   if (!userInput) {
//     return res.status(400).json({ error: 'Text input is required.' });
//   }

//   // Spawn the Python script
//   const pythonProcess = spawn('python3', ['gptprompt.py', userInput]);

//   let pythonOutput = '';
//   pythonProcess.stdout.on('data', (data) => {
//     pythonOutput += data.toString();
//   });

//   pythonProcess.stderr.on('data', (data) => {
//     console.error(`Error: ${data}`);
//   });

//   pythonProcess.on('close', (code) => {
//     if (code === 0) {
//       // Send the GPT response back to the client
//       res.json({ response: pythonOutput.trim() });
//     } else {
//       res.status(500).json({ error: 'Failed to process GPT response.' });
//     }
//   });
// });

// // Function for audio transcription
// async function transcribeAudio(audioPath) {
//   // Use your existing transcription logic, e.g., Google Speech API
//   const { exec } = require('child_process');
//   return new Promise((resolve, reject) => {
//     exec(`python3 script.js ${audioPath}`, (error, stdout, stderr) => {
//       if (error) {
//         reject(`Error transcribing audio: ${stderr}`);
//       } else {
//         resolve(stdout.trim());  // Transcription result
//       }
//     });
//   });
// }

// // Function to call GPT-3 (Python script)
// async function gptProcess(text) {
//   return new Promise((resolve, reject) => {
//     const python = spawn('python3', ['gptprompt.py', text]);
//     let response = '';
//     python.stdout.on('data', (data) => {
//       response += data.toString();
//     });

//     python.stderr.on('data', (data) => {
//       console.error('Python error:', data.toString());
//     });

//     python.on('close', (code) => {
//       if (code === 0) {
//         resolve(response.trim());  // GPT-3 response
//       } else {
//         reject('GPT process failed');
//       }
//     });
//   });
// }

// // Function for text-to-speech conversion
// async function textToSpeech(text) {
//   return new Promise((resolve, reject) => {
//     // Call your text-to-speech API or script
//     const python = spawn('python3', ['text-to-speech.js', text]);
//     let audioPath = path.join(__dirname, 'audio', 'output_audio.mp3');

//     python.stdout.on('data', (data) => {
//       // Handle TTS audio generation (for example, save to file)
//       fs.writeFileSync(audioPath, data);
//     });

//     python.stderr.on('data', (data) => {
//       console.error('TTS error:', data.toString());
//     });

//     python.on('close', (code) => {
//       if (code === 0) {
//         resolve(audioPath);  // Path to the generated audio file
//       } else {
//         reject('TTS process failed');
//       }
//     });
//   });
// }

// // Start the server
// app.listen(port, () => {
//   console.log(`Server is running on http://localhost:${port}`);
// });

const express = require('express');
const { spawn } = require('child_process');
const app = express();
const port = 5000;

const cors = require('cors');
app.use(cors());

// Middleware to parse JSON bodies
app.use(express.json());

app.get('/', (req, res) => {
  res.json({ message: "hello world!" });
});


app.post('/chat', (req, res) => {
  const userMessage = req.body.message;

  // Ensure userMessage is present
  if (!userMessage) {
    return res.status(400).json({ error: "Message is required" });
  }

  // Spawn the Python process
  const pythonProcess = spawn("python3", ["gptprompt.py", userMessage]);

  console.log(pythonProcess);

  let response = "";

  // Collect data from the Python process
  pythonProcess.stdout.on("data", (data) => {
    response += data.toString();
  });

  pythonProcess.stderr.on("data", (data) => {
    console.error(`Error: ${data}`);
  });

  pythonProcess.on("close", (code) => {
    if (code === 0) {
      res.json({ girlfriendResponse: response.trim() });
    } else {
      res.status(500).json({ girlfriendResponse: "Error generating response." });
    }
  });
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
