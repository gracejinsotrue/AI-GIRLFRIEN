// document.getElementById('audio-upload').addEventListener('submit', async function (event) {
//   event.preventDefault();

//   const file = document.getElementById('audioInput').files[0];
//   // const audioPlayer = document.getElementById('output-audio');

//   if (file) {
//     const formData = new FormData();
//     formData.append('audio', file);

//     try {
//       const response = await fetch('http://localhost:5000/upload-audio', {
//         method: 'POST',
//         body: formData,
//       });

//       if (response.ok) {
//         const audioUrl = URL.createObjectURL(await response.blob());
//         const audioElement = new Audio(audioUrl);
//         audioElement.play();
//       } else {
//         console.error('Error uploading audio:', response.statusText);
//       }
//     } catch (error) {
//       console.error('Error:', error);
//     }
//   }
// });
