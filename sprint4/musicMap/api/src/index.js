const express = require('express');
const env = require('dotenv').config();
const { MongoClient, ObjectId } = require('mongodb');
const checkSongcollectionField = require('./helpers/checkSongcollectionField.js');

const client = new MongoClient(process.env.DB);
const app = express();
const PORT = 3000;


// .json() & .urlencoded() needed for post and put requests
app.use(express.json());
// extended: true uses the qs library to stringify url-encoded data into objects (needed with forms)
app.use(express.urlencoded({ extended: true }));

const DATABASE = client.db("MusicMapApi");
const COLLECTION = DATABASE.collection("songCollection");

app.get('/songcollection/get', async (req, res) => {
    try {
        let all = await COLLECTION.find().toArray();
        res.send(all);
    }
    catch (err) {
        res.send(err);
    }
});

app.post("/songcollection/post", async (req, res) => {
    try {
        if (req.body) {
            if (checkSongcollectionField(req.body)) {
                console.log(req.body);
                let finalBody = req.body;

                dateNow = new Date();
                finalBody.date = dateNow;
                finalBody.dateOffset = dateNow.getTimezoneOffset();

                const result = COLLECTION.insertOne(finalBody);
                res.send(`Artist, song & location has been saved succesfully! \n ${req.body.artist} - ${req.body.song}`);
            }
        }
    }
    catch (err) {
        res.send(err);
    }
});

// app.delete("/message/delete", async (req, res) => {
//     try {
//         const database = client.db("portfolio");
//         const collection = database.collection("testData");

//         const deleted = await collection.findOneAndDelete({ "message": req.body.message });
//         console.log();
//         if (deleted.value !== null) {
//             res.send("Deleted message succesfully!");
//         }
//         else {
//             res.send("Message does not exist!");
//         }
//     }
//     catch (err) {
//         res.send(err);
//     }
// });

// app.put("/message/:message", async (req, res) => {
//     try {
//         const database = client.db("portfolio");
//         const collection = database.collection("testData");

//         const edited = await collection.updateOne({ "message": req.params.message }, { $set: { "message": req.body.message } });
//         console.log(edited);
//         if (edited.matchedCount > 0) {
//             res.send("Message edited succesfully!");
//         }
//         else {
//             res.send("Message does not exist!");
//         }
//     }
//     catch (err) {
//         res.send(err);
//     }
// });

app.listen(PORT, () => {
    console.log(`App started on port ${PORT}`);
});