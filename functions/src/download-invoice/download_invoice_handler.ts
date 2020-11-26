import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
import { parseString } from 'xml2js';
import { InvoiceModel } from '../shared/models/invoice-model';
(global as any).XMLHttpRequest = require('xhr2');

export const downloadInvoiceHandler = functions.firestore
    .document('event_invoice_input/{invoiceId}')
    .onCreate(async (snap, _) => {
        const invoiceData = snap.data();
        const { url } = invoiceData;
        const http = new XMLHttpRequest();
        http.open('GET', url);
        http.setRequestHeader('Accept', 'application/xml');

        http.send();

        http.onreadystatechange = async (response) => {
          if(http.responseText !== '') {
            parseString(http.responseText, async (err, result) => {
              const invoice: InvoiceModel = InvoiceModel.fromObject(result);
              const writeResult = admin.firestore().collection('event_invoice_output');
              await writeResult.add(JSON.parse(JSON.stringify(invoice)));
            });
          }
        }
    });