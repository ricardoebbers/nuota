import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
import invoiceBvSmallPrices from './resources/invoice-mock-small-prices.json';
import invoiceBvBigPrices from './resources/invoice-mock-bv-bigger-prices.json';
import invoiceCasaForte from './resources/invoice-mock-casa-forte-region.json';
import invoiceEstanciaBigPrices from './resources/invoice-mock-estancia-big-prices.json';
import invoiceEstancia from './resources/invoice-mock-estancia-clone.json';
import invoiceEstanciamMedium from './resources/invoice-mock-estancia-medium-prices.json';
import invoiceEstanciaSmallPrices from './resources/invoice-mock-estancia-small-prices.json';
import { InvoiceModel } from '../shared/models/invoice-model';
(global as any).XMLHttpRequest = require('xhr2');

export const downloadInvoiceOutputMockHandler = functions.firestore
  .document('event_invoice_input/{invoiceId}')
  .onCreate(async (snap, context) => {
    const promises: Promise<FirebaseFirestore.WriteResult>[] = [];
    promises.push(createSetPromise('1', invoiceBvSmallPrices));
    promises.push(createSetPromise('2', invoiceBvBigPrices));
    promises.push(createSetPromise('3', invoiceCasaForte));
    promises.push(createSetPromise('4', invoiceEstanciaBigPrices));
    promises.push(createSetPromise('5', invoiceEstancia));
    promises.push(createSetPromise('6', invoiceEstanciamMedium));
    promises.push(createSetPromise('7', invoiceEstanciaSmallPrices));
    await Promise.all(promises);
});

const createSetPromise = (invoiceId: string, invoiceData: InvoiceModel): Promise<FirebaseFirestore.WriteResult> => {
  const writeResult = admin.firestore().collection('event_invoice_output').doc(invoiceId);
  return writeResult.set(JSON.parse(JSON.stringify(invoiceData)));
}