import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
import invoiceBvSmallPrices from './resources/invoice-mock-small-prices.json';
import invoiceBvBigPrices from './resources/invoice-mock-bv-bigger-prices.json';
import invoiceCasaForte from './resources/invoice-mock-casa-forte-region.json';
import { InvoiceModel } from '../shared/models/invoice-model';
(global as any).XMLHttpRequest = require('xhr2');

export const downloadInvoiceOutputMockHandler = functions.firestore
  .document('event_invoice_input/{invoiceId}')
  .onCreate(async (snap, context) => {
    const promises: Promise<FirebaseFirestore.WriteResult>[] = [];
    promises.push(createSetPromise('2', invoiceBvBigPrices));
    promises.push(createSetPromise('1', invoiceBvSmallPrices));
    promises.push(createSetPromise('3', invoiceCasaForte));
    await Promise.all(promises);
});

const createSetPromise = (invoiceId: string, invoiceData: InvoiceModel): Promise<FirebaseFirestore.WriteResult> => {
  const writeResult = admin.firestore().collection('event_invoice_output').doc(invoiceId);
  return writeResult.set(JSON.parse(JSON.stringify(invoiceData)));
}