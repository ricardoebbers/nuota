import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
import { parseString } from 'xml2js';
import { InvoiceModel } from '../shared/models/invoice-model';
(global as any).XMLHttpRequest = require('xhr2');

export const downloadInvoiceHandler = functions.firestore
  .document('event_invoice_input/{invoiceId}')
  .onCreate(async (snap, context) => {
    const invoiceId = context.params.invoiceId;
    const invoiceData = snap.data();
    const { url, userId } = invoiceData;
    const http = new XMLHttpRequest();
    http.open('GET', url);
    http.setRequestHeader('Accept', 'application/xml');

    http.send();

    http.onreadystatechange = async (_) => {
      if (http.responseText !== '') {
        parseString(http.responseText, async (err, result) => {
          const invoice: InvoiceModel = InvoiceModel.fromObject(result, userId);
          const writeResult = admin.firestore().collection('event_invoice_output').doc(invoiceId);
          await writeResult.set(JSON.parse(JSON.stringify(invoice)));
        });
      }
    }
  });
