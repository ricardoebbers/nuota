import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';

admin.initializeApp();

export const downloadInvoiceHandler = functions.firestore
    .document('event_invoice_input/{invoiceId}')
    .onCreate(async (snap, _) => {
        const invoice = snap.data();
        console.log(invoice);
    });