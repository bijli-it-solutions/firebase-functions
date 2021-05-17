const functions = require("firebase-functions");
const axios = require('axios');

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//   functions.logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });

exports.helloworld = functions.https.onRequest((req, res) => {
    res.send(" Hello from firebase function....")
})

exports.api = functions.https.onRequest(async (req, res) => {
    switch (req.method) {
        case 'GET': 
           const response = await axios.get(
               'https://jsonplaceholder.typicode.com/users/1'
           )
          res.send(response.data)
          break;
        case 'POST': 
          const body = req.body;
          res.send(body);
          break;
        case 'DELETE': 
          res.send('It was a delete request');
          break;
        default:
            res.send('It was a default request..');

    }

})

exports.userAdded = functions.auth.user().onCreate(user => {
    console.log(`$(user.email) is created`)
    return Promise.resolve()
})

exports.userDeleted = functions.auth.user().onDelete(user => {
    console.log(`$(user.email) is deleted`)
    return Promise.resolve()
})

exports.fruitsAdded = functions.firestore.document('/fruits/{documentId}').onCreate((snapshot, context) => {
    console.log(snapshot.data());
    return Promise.resolve()
})

exports.fruitsDeleted = functions.firestore.document('/fruits/{documentId}').onDelete((snapshot, context) => {
    console.log(snapshot.data(), 'deleted');
    return Promise.resolve();
})

exports.fruitsUpdated = functions.firestore.document('/fruits/{documentId}').onUpdate((snapshot, context) => {
    console.log('before', snapshot.before.data());
    console.log('after', snapshot.after.data());
    return Promise.resolve();
})

exports.scheduleFunction = functions.pubsub.schedule('* * * * *').onRun(context => {
    console.log('I am running at every minute');
    return null;
})