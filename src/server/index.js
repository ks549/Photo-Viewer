const functions = require('firebase-functions');
const express = require('express');
const path = require('path');
const cors = require('cors');
const app = express();
const galleryService = require('./service');

app.use(cors({ origin: true }));

app.use(express.static(path.join(__dirname, 'dist')));

app.get('/', function(req, res) {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});
app.get('/api/get-gallery-info', (req, res) => {
  console.log(req.query);
  galleryService.getGalleryInfo(req, res);
});
app.get('/api/filter-gallery', (req, res) => {
  console.log(req.query);
  galleryService.filterGallery(req, res);
});

exports.app = functions.https.onRequest(app);

if(process.env.NODE_ENV === 'production') {
  app.use(express.static('dist'));
}
app.listen(process.env.PORT || 8080, () => console.log(`Listening on port ${process.env.PORT || 8080}!`));