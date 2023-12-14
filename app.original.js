// const wppconnect = require('@wppconnect-team/wppconnect');

// function createClient() {
//     wppconnect
//         .create()
//         .then((client) => start(client))
//         .catch((error) => {
//             console.log(error);
//             setTimeout(createClient, 1);
//         });
// }

// function start(client) {
//     // Fungsi untuk memulai sesuatu dengan client yang dibuat
//     // Contoh: melakukan sesuatu dengan client WhatsApp yang sudah dibuat
//     console.log('Client started:', client);
// }

// createClient(); // Memanggil createClient pertama kali

// const express = require('express');
// const wppconnect = require('@wppconnect-team/wppconnect');

// const app = express();
// const PORT = process.env.PORT || 3000;

// const sessionName = 'swu-token';
// let client = null;
// let loggedIn = false;

// function createClient(req, res) {
//     wppconnect
//         .create({
//             session: sessionName,
//             catchQR: (base64Qr, asciiQR) => {
//                 res.setHeader('Content-Type', 'text/html');
//                 res.send(`<img src="${base64Qr}" alt="WhatsApp QR Code">`);
//             },
//             logQR: false,
//         })
//         .then((_client) => {
//             client = _client;
//             start(client);
//             checkConnectionStatus(res);
//         })
//         .catch((error) => {
//             console.log(error);
//             // setTimeout(createClient, 1);
//         });
// }

// app.get('/', (req, res) => {
//     createClient(req, res);
// });

// function checkConnectionStatus(res) {
//     // setTimeout(() => {
//     if (client && client.isLogged) {
//         console.log(client.isLogged);
//         res.status(200).json({ message: 'Sudah terhubung ke WhatsApp' });
//     }

//     return false;
//     // }, 1);
// }

// function start(client) {
//     loggedIn = true;
//     client.onMessage((message) => {
//         if (message.body === 'location') {
//             const recipientNumber = message.from;

//             // -7.4393462, 109.2663856
//             const kampusLatitude = '-7.4393462'; // koordinat lintang kampus
//             const kampusLongitude = '109.2663856'; // koordinat bujur kampus

//             const location = {
//                 latitude: kampusLatitude,
//                 longitude: kampusLongitude,
//                 name: 'STMIK Widya Utama',
//             };

//             try {
//                 client.sendLocation(recipientNumber, location.latitude, location.longitude, location.name);
//                 console.log('Location sent successfully!');
//             } catch (error) {
//                 console.error('Error sending location:', error);
//             }
//         } else {
//             client
//                 .sendText(message.from, 'Halo, salam kenal yah aku bot')
//                 .then((result) => {
//                     console.log('Result: ', result);
//                 })
//                 .catch((error) => {
//                     console.error('Error when sending: ', error);
//                 });
//         }
//     });
// }

// app.listen(PORT, () => {
//     console.log(`Server is running on http://localhost:${PORT}`);
// });

// FROM node:latest

// # Install dependencies needed for Puppeteer and your application
// RUN apt-get update \
//   && apt-get install -y \
//   gconf-service \
//   libgbm-dev \
//   libasound2 \
//   libatk1.0-0 \
//   libc6 \
//   libcairo2 \
//   libcups2 \
//   libdbus-1-3 \
//   libexpat1 \
//   libfontconfig1 \
//   libgcc1 \
//   libgconf-2-4 \
//   libgdk-pixbuf2.0-0 \
//   libglib2.0-0 \
//   libgtk-3-0 \
//   libnspr4 \
//   libpango-1.0-0 \
//   libpangocairo-1.0-0 \
//   libstdc++6 \
//   libx11-6 \
//   libx11-xcb1 \
//   libxcb1 \
//   libxcomposite1 \
//   libxcursor1 \
//   libxdamage1 \
//   libxext6 \
//   libxfixes3 \
//   libxi6 \
//   libxrandr2 \
//   libxrender1 \
//   libxss1 \
//   libxtst6 \
//   ca-certificates \
//   fonts-liberation \
//   libappindicator1 \
//   libnss3 \
//   lsb-release \
//   xdg-utils \
//   wget \
//   && rm -rf /var/lib/apt/lists/*

// # Set the working directory
// WORKDIR /app

// # Copy your application files into the container
// COPY package.json package-lock.json ./
// RUN npm install

// # Install Chrome in the container
// RUN wget -q -O - https://dl-ssl.google.com/linux/linux_signing_key.pub | apt-key add - \
//   && sh -c 'echo "deb [arch=amd64] http://dl.google.com/linux/chrome/deb/ stable main" >> /etc/apt/sources.list.d/google.list' \
//   && apt-get update && apt-get install -y google-chrome-stable

// # Copy the rest of your application files
// COPY . .

// # Expose the port your application runs on
// EXPOSE 3000

// # Start your Node.js application
// CMD ["node", "app.js"]
