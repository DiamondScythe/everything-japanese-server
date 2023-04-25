const fs = require("fs");
const textToSpeech = require("@google-cloud/text-to-speech");
const crypto = require("crypto");

const client = new textToSpeech.TextToSpeechClient({
  projectId: "kinetic-catfish-384812",
  keyFilename: "C:/Keys/kinetic-catfish-ttskey.json",
});

const voice = {
  languageCode: "ja-JP",
  ssmlGender: "FEMALE",
};

const audioConfig = {
  audioEncoding: "MP3",
  pitch: 0,
  speakingRate: 1,
};

async function synthesizeText(text) {
  // Generate a random name for the audio file
  const randomName = crypto.randomBytes(8).toString("hex") + ".mp3";

  // Construct the request
  const request = {
    input: { text },
    voice,
    audioConfig,
  };

  // Call the API to synthesize speech
  return new Promise((resolve, reject) => {
    client
      .synthesizeSpeech(request)
      .then((response) => {
        const audioContent = response[0].audioContent;
        // Save the audio content to a file with the random name in the audio folder
        fs.writeFile(
          `./audio/${randomName}`,
          audioContent,
          "binary",
          (err, data) => {
            if (err) {
              reject(err);
            } else {
              console.log("Audio content written to file: " + randomName);
              resolve(randomName);
            }
          }
        );
      })
      .catch((error) => {
        console.error("Failed to synthesize speech:", error);
        reject(error);
      });
  });
}

//export the synthesizeText function
module.exports = synthesizeText;
