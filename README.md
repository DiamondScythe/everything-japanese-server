# everything-japanese

## Project setup

```
npm install with a command prompt opened inside this folder

if there are still module errors, delete package-lock.json files and retry the above step(s)
```

### Installing MongoDB

```
The backend requires MongoDB to be installed and running locally on the machine with this connection string:

"mongodb://localhost:27017/everything-japanese"

If MongoDB isn't installed ,go to the MongoDB website (https://www.mongodb.com/download-center/community) and download the appropriate version of MongoDB for your operating system. Then, follow instructions to start the mongodb server. You can check if the backend has connected to MongoDB successfully by seeing "connected to mongodb db" logged into the server console.

If MongoDB is installed, and Mongod service is running (connecting to MongoDB with MongoDB Compass is possible), but you still can't connect, try changing the connection string "dbURI" in server/src/app.js from "mongodb://localhost:27017/everything-japanese" to "mongodb://127.0.0.1:27017/everything-japanese"

```

### Compiles and hot-reloads for development

```
Run this while in server folder:

nodemon src/app.js

Install nodemon to server folder with npm if nodemdon hasn't been installed.

npm install nodemon

Make sure the server is running on port 3000. If it isn't, change the port number in src/server.js

```

### Google's TTS API

```
The backend uses Google's TTS API to convert Japanese text to speech. To use this API, you need to have a Google Cloud account and a Google Cloud API key.

Then, you need to replace the filepath with your own filepath inside helpers/gg-tts-api.js :

const client = new textToSpeech.TextToSpeechClient({
  projectId: "your-project-id",
  keyFilename: "C:/path/to/your/keyfile.json",
});

for more information, contact the owner of this repository
```

```

```
