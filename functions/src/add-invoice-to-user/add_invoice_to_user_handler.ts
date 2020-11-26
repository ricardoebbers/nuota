import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
import { InvoiceModel } from '../shared/models/invoice-model';

export const addInvoiceToUserHandler = functions.firestore
    .document('event_invoice_output/{invoiceId}')
    .onCreate(async (snap, _) => {
        const invoice = snap.data() as InvoiceModel;
        const { buyerId } = invoice;
        const userRef = admin.firestore().collection('users').doc(buyerId);
        const doc = await userRef.get();

        if (!doc.exists) {
            await userRef.set({})
        }
    });