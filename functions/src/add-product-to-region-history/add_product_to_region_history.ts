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
            const productDoc = region.collection('products').doc(product['cEAN']);
            const current = (await productDoc.get()).data();
            let count: number;
            let sum: number;
            if (current) {
                count = current.count++
                sum = current.sum += product.unitValue;
            } else {
                count = 1;
                sum = product.unitValue;
            }
            await productDoc.set({ description: product.description, count, sum }, { merge: true });
            await productDoc.collection('purchases').add({ unitValue: product.unitValue, store: invoice.storeCNPJ, date: invoice.createDate })
        });
    });