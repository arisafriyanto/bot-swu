const express = require('express');
const wppconnect = require('@wppconnect-team/wppconnect');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 8080;

app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname));
app.use(cors());
app.use(express.json());

const sessionName = 'token-swu';
let client = null;

app.get('/', (req, res) => {
    if (client && client.isLogged) {
        return res.status(200).json({ message: 'Sudah terhubung ke WhatsApp' });
    }

    wppconnect
        .create({
            session: sessionName,
            headless: true,
            puppeteerOptions: {
                args: ['--disable-setuid-sandbox', '--no-sandbox', '--single-process', '--no-zygote'],
                executablePath:
                    process.env.NODE_ENV === 'production'
                        ? process.env.PUPPETEER_EXECUTABLE_PATH
                        : '/usr/bin/google-chrome-stable',
            },
            autoClose: 0,
            catchQR: (base64Qr, asciiQR) => {
                res.setHeader('Content-Type', 'text/html');
                res.send(`<img src="${base64Qr}" alt="WhatsApp QR Code">`);
            },
            logQR: false,
            statusFind: (statusSession, session) => {
                //return isLogged || notLogged || browserClose || qrReadSuccess || qrReadFail || autocloseCalled || desconnectedMobile || deleteToken

                if (statusSession === 'isLogged') {
                    return res.status(200).json({ message: 'Sudah terhubung ke WhatsApp nih' });
                }
            },
        })
        .then((_client) => {
            client = _client;
            start(client);
            console.log(client);
        })
        .catch((error) => {
            console.log(error);
        });
});

function start(client) {
    client.onMessage((message) => {
        if (message.body === 'location') {
            const recipientNumber = message.from;

            // -7.4393462, 109.2663856
            const kampusLatitude = '-7.4393462'; // koordinat lintang kampus
            const kampusLongitude = '109.2663856'; // koordinat bujur kampus

            const location = {
                latitude: kampusLatitude,
                longitude: kampusLongitude,
                name: 'STMIK Widya Utama',
            };

            try {
                client.sendLocation(recipientNumber, location.latitude, location.longitude, location.name);
                console.log('Location sent successfully!');
            } catch (error) {
                console.error('Error sending location:', error);
            }
        } else {
            client
                .sendText(message.from, 'Halo, salam kenal yah aku bot')
                .then((result) => {
                    console.log('Result: ', result);
                })
                .catch((error) => {
                    console.error('Error when sending: ', error);
                });
        }
    });
}

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
