import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';

export const addProductToRegionHistoryHandler = functions.firestore
    .document('event_invoice_output/{invoiceId}')
    .onCreate(async (snap, _) => {
        const invoice = snap.data();
        const products: Array<any> = invoice["products"];
        const regionId = invoice['region'];
        const region = admin.firestore().collection('regions').doc(regionId);
        await region.set({}, { merge: true });

        products.forEach(async (product) => {
            const productDoc = await region.collection('products').doc(product['cEAN']);
            productDoc.set({ description: product.description }, { merge: true });
            await productDoc.collection('purchases').add({ unitPrice: product.unitPrice, store: invoice.storeCNPJ, date: invoice.createDate })
        });
    });