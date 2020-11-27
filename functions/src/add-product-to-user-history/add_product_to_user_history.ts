import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
import { InvoiceModel, isInvalidCEAN } from '../shared/models/invoice-model';

export const addProductToUserHistoryHandler = functions.firestore
    .document('event_invoice_output/{invoiceId}')
    .onCreate(async (snap, _) => {
        const invoice = snap.data() as InvoiceModel;
        const { products } = invoice;
        const { buyerId } = invoice;
        const user = admin.firestore().collection('users').doc(buyerId);
        await user.set({}, { merge: true });
        products.forEach(async (product) => {
            if (isInvalidCEAN(product.cEAN)) {
                return;
            }
            await user.collection('purchases').doc(product.cEAN).set({}, { merge: true });
        });
    });