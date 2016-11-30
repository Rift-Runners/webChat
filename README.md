# inSight WebChat!

### Project objective
Make a webchat that can map the users and its respective messages.
inSight focus on making a secure and practical chat (general users),
and at the same time a powerful report generator (admin).

### Tech Stack

1. NodeJS
2. Express
3. Socket.io
4. Mongoose
5. Browserify
6. Gulp
7. Firebase (OAuth2)
8. Reveal.js
9. Heroku + mLabs (Paas and DBaaS)
10. Node-RED
11. Arduino (Wiring)

#### Running the project locally

1. Clone the project and install dependencies `npm install`;
2. Install Node-red `npm install -g node-red`;
3. Install Arduino IDE and its drivers;
4. On the root folder, run `npm start` and with another bash/cmd/pshell `node-red`. They should start on localhost:8080 and; localhost:1880, respectively;
5. With arduino wiring, you need to put the code found on: `webChat/public/resources/config/arduino-code-config`;
6. If you want to make changes, you need to run the command `gulp watch-default`, so gulp can instantly call browserify upon modifications;
7. n the node-red page (port 1880), you need to import the flow saved on: `webChat/public/resources/config/node-red-author-sentiment-config`. So you can send e-mails or change LEDs activation (arduino) upon sentiment evaluation.
8. {TBI -> ARDUINO WIRING PICTURE}
