import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';

export const addProductToUserHistoryHandler = functions.firestore
    .document('event_invoice_output/{invoiceId}')
    .onCreate(async (snap, _) => {
        const invoice = snap.data();
        const products: Array<any> = invoice["products"];
        const userId = invoice["userId"];
        const user = admin.firestore().collection('users').doc(userId);
        await user.set({}, { merge: true });
        products.forEach(async (product) => {
            await user.collection('purchases').doc(product['cEAN']).set({});
        });
    });