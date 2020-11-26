import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
import { ProductsInterface } from '../shared/models/invoice-model';

export const addProductToUserHistoryHandler = functions.firestore
    .document('event_invoice_output/{invoiceId}')
    .onCreate(async (snap, _) => {
        const invoice = snap.data();
        const { products } = invoice;
        const { buyerId } = invoice;
        const user = admin.firestore().collection('users').doc(buyerId);
        await user.set({}, { merge: true });
        products.forEach(async (product: ProductsInterface) => {
            await user.collection('purchases').doc(product.cEAN).set({});
        });
    });