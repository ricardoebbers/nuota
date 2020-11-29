import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
import { InvoiceModel, isInvalidCEAN, PurchasesInterface } from '../shared/models/invoice-model';

export const addProductToRegionHistoryHandler = functions.firestore
  .document('event_invoice_output/{invoiceId}')
  .onCreate(async (snap, _) => {
    const invoice = snap.data() as InvoiceModel;
    const { date, store, store: { addrNeighborhood }, products } = invoice;
    const regionDoc = admin.firestore().collection('regions').doc(addrNeighborhood);
    await regionDoc.set({}, { merge: true });

    products.forEach(async (product) => {
      if (isInvalidCEAN(product.cEAN)) {
        return;
      }
      const purchase: PurchasesInterface = { product, store, date };
      const productDoc = regionDoc.collection('products').doc(product.cEAN);
      const current = (await productDoc.get()).data();
      let count: number;
      let sum: number;
      if (current) {
        count = current.count += 1;
        sum = current.sum += product.unitValue;
      } else {
        count = 1;
        sum = product.unitValue;
      }
      await productDoc.set({ description: product.description, count, sum }, { merge: true });
      await productDoc.collection('purchases').add(purchase);
    });
  });