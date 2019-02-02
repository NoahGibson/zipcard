import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
admin.initializeApp();
const bucket = admin.storage().bucket();

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

/**
 * Function triggered whenever a user's data in Firestore is created.
 *
 * Performs the following operations:
 * - adds the default profile picture to the user's data
 */
export const onCreateUserData = functions.firestore
    .document('users/{userId}')
    .onCreate((snap, context) => {
    try {
        const defaultProfilePhotoLoc = encodeURIComponent('resources/images/default_profile_photo.png');
        const token = '996cb23d-750d-4ad6-afc4-3be59d87a8aa';
        return snap.ref.set({
            photoUrl : 'https://firebasestorage.googleapis.com/v0/b/' + bucket.name +'/o/' + defaultProfilePhotoLoc + '?alt=media&token=' + token
        }, {merge: true});
    } catch (e) {
        return Promise.reject(e.message);
    }
});