const express = require("express");
const app = express();
const path = require("path");
const { Storage } = require("@google-cloud/storage");
const src = path.join(__dirname, "views");
app.use(express.static(src));
var uuid = require("uuid-random");

let projectId = " react-node-381416 "; // Get this from Google Cloud
let keyFilename = path.join(__dirname, "../google-cloud-stroage-key.json"); // Get this from Google Cloud -> Credentials -> Service Accounts
const storage = new Storage({
  projectId,
  keyFilename,
});
const bucket = storage.bucket("stroage-react-bucket"); // Get this from Google Cloud -> Storage

const upload = (req, res) => {
  try {
    if (req.file) {
      console.log("File found, trying to upload...");
      const randomUuid = uuid();
      const randomName = `${randomUuid}_project.jpeg`;
      const blob = bucket.file(randomName);
      const blobStream = blob.createWriteStream();
      blobStream.on("finish", () => {
        const url = `https://storage.googleapis.com/${bucket.name}/${blob.name}`;
        res.status(200).json({ url });
      });
      blobStream.end(req.file.buffer);
    } else throw "error with img";
  } catch (error) {
    res.status(500).send(error);
    console.log(error);
  }
};
exports.upload = upload;
