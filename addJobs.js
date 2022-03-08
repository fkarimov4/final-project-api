const { FieldValue } = require("firebase-admin/firestore");
const { connectDb } = require("./src/connectDb");
const jobsData = require("./jobs.json");

const db = connectDb();

for (let i = 0; i < jobsData.length; i++) {
  db.collection("jobs")
    .add({...jobsData[i], timestamp: FieldValue.serverTimestamp()})
    .then((doc) => {
        console.log(`Job added: ${doc.id}`)
    })
    .catch(err => console.error(err))
}