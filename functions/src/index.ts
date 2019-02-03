import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
admin.initializeApp();
const bucket = admin.storage().bucket();
import * as UUID from 'uuid/v4';

// // Start writing Firebase Functions
// // https://firebase.google.com/docs/functions/typescript

/**
 * Function triggered on a user deleting their account. This handler deletes
 * any data the user has in Firestore or storage.
 */
export const onDeleteAccount = functions.auth.user().onDelete(async (user) => {
    const deleteDataPromise = admin.firestore().collection('users').doc(user.uid).delete();
    const deleteFilesPromise = bucket.deleteFiles({
        prefix: 'users/' + user.uid
    });
    await deleteDataPromise;
    await deleteFilesPromise;
});

/**
 * Function to update the user's photoUrl to their uploaded photo.
 */
export const onUploadPhoto = functions.storage.object().onFinalize(async (object, context) => {

    // Getting user's uid
    let userId: string;
    if (context && context.auth && context.auth.uid) {
        userId = context.auth.uid;
    } else if (object && object.name) {
        const re = /users\/([\w-]+)\/photo\/profile_photo\.jpeg/;
        const matches = object.name.match(re);
        if (matches) {
            userId = matches[1];
        } else {
            return Promise.reject('Unable to get user id');
        }
    } else {
        return Promise.reject('Unable to get user id');
    }

    // Checking if file uploaded is profile photo
    if (object.name === 'users/' + userId + '/photo/profile_photo.jpeg') {
        const uuid = UUID();
        // Setting metadata for photo
        await bucket.file(object.name).setMetadata({
            contentType: 'image/jpeg',
            metadata: {
                firebaseStorageDownloadTokens: uuid
            }
        });
        const encodedPhoto = encodeURIComponent(object.name);
        // Updating user's photoUrl
        return admin.firestore().collection('users').doc(userId).set({
            photoUrl: 'https://firebasestorage.googleapis.com/v0/b/' + bucket.name + '/o/' + encodedPhoto + '?alt=media&token=' + uuid
        }, {merge: true});
    } else {
        return Promise.resolve();
    }

});