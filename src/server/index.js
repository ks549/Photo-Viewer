const functions = require('firebase-functions');
const express = require('express');
const cors = require('cors');
const app = express();
const galleryService = require('./service');
const path = require('path');

app.use(cors({ origin: true }));


// var distDir = __dirname + "/dist";
// app.use(express.static(distDir));
// app.get("*", (req, res) => {
//   res.sendFile(path.resolve("dist", "index.html"));
// });


const root = require('path').join(__dirname, '/dist')
app.use(express.static(root));
app.get("/*", (req, res) => {
    res.sendFile('index.html', { root });
})
// app.get('/*', (req, res)=>{
//   res.sendFile(path.join(__dirname, './index.html'));
// });

app.get('/api/get-gallery-info', (req, res) => {
  console.log(req.query);
  galleryService.getGalleryInfo(req, res);
});
app.get('/api/filter-gallery', (req, res) => {
  console.log(req.query);
  galleryService.filterGallery(req, res);
});

exports.app = functions.https.onRequest(app);


app.listen(process.env.PORT || 8080, () => console.log(`Listening on port ${process.env.PORT || 8080}!`));