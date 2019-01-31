import * as functions from 'firebase-functions';
import * as cors from 'cors';
const corsHandler = cors({origin: true});

// // Start writing Firebase Functions
// // https://firebase.google.com/docs/functions/typescript

const helloWorldFn = (request: functions.Request, response: functions.Response) => {
 response.send("Hello from Firebase!");
}

export const helloWorld = functions.https.onRequest((request, response) => {
 corsHandler(request, response, () => { helloWorldFn(request, response) });
});
