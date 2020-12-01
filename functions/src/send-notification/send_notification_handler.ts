import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
(global as any).XMLHttpRequest = require('xhr2');

export const sendNotificationHandler = functions.firestore
  .document('notifications/{notification}')
  .onCreate(async (snap) => {
    const data = snap.data();
    const { token, message} = data;
    const notification = {
      data: {
        message
      },
      notification: {
        title: message,
        body: "Abre o app e dá uma conferida!"
      },
      token
    }
    await admin.messaging().send(notification)
  });
