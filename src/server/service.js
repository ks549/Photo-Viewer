const admin = require('firebase-admin');

var serviceAccount = require("../../serviceAccountKey.json");
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://photo-viewer-ad1f7.firebaseio.com"
});

let total_record;
const db = admin.firestore();

const getGalleryInfo = async (req, res) => {
    let limit = req && req.query && req.query['limit'] || 10;
    let ending_id = req && req.query && req.query['ending_id'];
    let offSet = req && req.query && req.query['offSet'];
    if (Number.parseInt(offSet) == 0) {
        await getTotalRecords();
    }
    try {
        let query = ending_id ? db.collection('photo-viewer').orderBy('id').limit(Number.parseInt(limit)).startAfter(ending_id) : db.collection('photo-viewer').orderBy('id').limit(Number.parseInt(limit));
        let finalResponse = {};
        let response = [];
        let last = '';
        await query.get().then(querySnapshot => {
            let docs = querySnapshot.docs;
            last = docs[docs.length - 1]
            for (let doc of docs) {
                const selectedItem = {
                    url: doc.data().url
                };
                response.push(selectedItem);
            }
        });
        finalResponse.total_record = total_record;
        finalResponse.ending_id = last.data().id;
        finalResponse.data = response;
        return res.status(200).send(finalResponse);
    } catch (error) {
        console.log(error);
        return res.status(500).send(error);
    }
}

const getTotalRecords = async () => {
    await db.collection("photo-viewer").get().then(function (snapShot) {
        total_record = snapShot.docs.length;
    });
}

const filterGallery = async (req, res) => {
    let width = req && req.query && req.query['width'];
    let height = req && req.query && req.query['height'];
    try {
        let query = db.collection('photo-viewer').orderBy('id');
        let finalResponse = {};
        let response = [];
        await query.get().then(querySnapshot => {
            let docs = querySnapshot.docs;
            for (let doc of docs) {
                let url = doc.data().url;
                let urlArr = url.split('/');
                let ht = urlArr[urlArr.length - 1];
                let wd = urlArr[urlArr.length - 2];
                if (Number.parseInt(ht) == Number.parseInt(height) && Number.parseInt(wd) == Number.parseInt(width)) {
                    const selectedItem = {
                        url: doc.data().url
                    };
                    response.push(selectedItem);
                }
            }
        });
        finalResponse.data = response;
        return res.status(200).send(finalResponse);
    } catch (error) {
        console.log(error);
        return res.status(500).send(error);
    }
}

module.exports = {
    getGalleryInfo,
    getTotalRecords,
    filterGallery
};
