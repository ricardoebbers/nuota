import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';

export const addUserToRegionHandler = functions.firestore
    .document('event_invoice_output/{invoiceId}')
    .onCreate(async (snap, _) => {
        const invoice = snap.data();
        const regionId = invoice["region"];
        const userId = invoice["userId"];
        const region = admin.firestore().collection('regions').doc(regionId);
        await region.set({});
        await region.collection('users').doc(userId).set({});
    });