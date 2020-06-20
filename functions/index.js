// initialize Firebase SDK.
const admin = require('firebase-admin');
const functions = require('firebase-functions');

admin.initializeApp();

let db = admin.firestore();


// insert inserts data into database.
// public DNS(IPv4): https://us-central1-finding-hidden-dog.cloudfunctions.net/insert
exports.insert = functions.https.onRequest((request, response) => {
  const user = request.body.user_name;
  const timeSpent = parseFloat(request.body.time_spent);

  // add new data into database.
  db.collection('scores')
    .doc()
    .set({
      user_name: user,
      time_spent: timeSpent
    });
})  // end insert.

// get gets top ten score datas from database.
// public DNS(IPv4): https://us-central1-finding-hidden-dog.cloudfunctions.net/get
exports.get = functions.https.onRequest((request, response) => {
  response.send(
    db.collection('scores')
      .where('time_spent', '>', 0)
      .orderBy('time_spent')
      .limit(10));
})  // end get.
