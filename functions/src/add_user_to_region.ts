import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';

admin.initializeApp();

const db = admin.firestore();

export const addUserToRegionHandler = functions.firestore
    .document('event_invoice_output/{invoiceId}')
    .onCreate(async (snap, _) => {
        const invoice = snap.data();
        const regionId = invoice["region"];
        const userId = invoice["userId"];
        const region = db.collection('region').doc(regionId);
        await region.set({});
        await region.collection('users').doc(userId).set({});
    });