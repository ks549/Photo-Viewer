const functions = require('firebase-functions');
const express = require('express');
const cors = require('cors');
const app = express();
const galleryService = require('./service');

app.use(cors({ origin: true }));
app.use(express.static("build"));

app.get('/api/get-gallery-info', (req, res) => {
  console.log(req.query);
  galleryService.getGalleryInfo(req, res);
});
app.get('/api/filter-gallery', (req, res) => {
  console.log(req.query);
  galleryService.filterGallery(req, res);
});
app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname,  "build", "index.html"));
});
  
exports.app = functions.https.onRequest(app);


app.listen(process.env.PORT || 8080, () => console.log(`Listening on port ${process.env.PORT || 8080}!`));