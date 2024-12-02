const fs = require('fs');
const speech = require('@google-cloud/speech');

async function transcribeAudio() {
    // Initialize the Google Cloud client
    const client = new speech.SpeechClient();

    // Read the audio file
    const audioBytes = fs.readFileSync('audio2.mp3').toString('base64');

    // Configure the request
    const audio = { content: audioBytes };
    const config = {
        encoding: 'MP3', // Adjust based on your audio format
        sampleRateHertz: 16000, // Ensure it matches your audio sample rate
        languageCode: 'en-US',
    };
    const request = { audio, config };

    // Perform speech-to-text
    const [response] = await client.recognize(request);
    const transcription = response.results
        .map(result => result.alternatives[0].transcript)
        .join('\n');
    console.log('Transcription:', transcription);

    // const formData = new FormData();
    // formData.append('audio', transcription);

    // try {
    //     const response = await fetch('http://localhost:3000/process-audio', {
    //         method: 'POST',
    //         body: formData,
    //     });
    //     const data = await response.json();

    //     if (data.response) {
    //         responseElement.textContent = `AI: ${data.response}`;
    //     } else {
    //         responseElement.textContent = "Error: Unable to process audio.";
    //     }
    // } catch (err) {
    //     console.error('Error during transcription and processing:', err);
    //     responseElement.textContent = "Error: Unable to process audio.";
    // }
}

// Run the function
transcribeAudio().catch(console.error);
