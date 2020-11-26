import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
import { InvoiceModel } from '../shared/models/invoice-model';

export const addProductToUserHistoryHandler = functions.firestore
    .document('event_invoice_output/{invoiceId}')
    .onCreate(async (snap, _) => {
        const invoice = snap.data() as InvoiceModel;
        const { products } = invoice;
        const { buyerId } = invoice;
        const user = admin.firestore().collection('users').doc(buyerId);
        await user.set({}, { merge: true });
        products.forEach(async (product) => {
            await user.collection('purchases').doc(product.cEAN).set({}, {merge: true});
        });
    });