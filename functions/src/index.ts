import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
admin.initializeApp();

// // Start writing Firebase Functions
// // https://firebase.google.com/docs/functions/typescript

/**
 * Function triggered on a user deleting their account. This handler deletes
 * any data the user has in Firestore or storage.
 */
export const onDeleteAccount = functions.auth.user().onDelete((user) => {
 return admin.firestore().collection('users').doc(user.uid).delete();
 // TODO - delete files in storage
 // return admin.storage().bucket().deleteFiles({
 //  prefix: '/users/' + user.uid
 // });
});
