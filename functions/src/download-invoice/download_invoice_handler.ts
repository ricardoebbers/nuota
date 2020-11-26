import * as functions from 'firebase-functions';
const jsdom = require("jsdom");
const { JSDOM } = jsdom;
(global as any).XMLHttpRequest = require('xhr2');

export const downloadInvoiceHandler = functions.firestore
    .document('event_invoice_input/{invoiceId}')
    .onCreate(async (snap, _) => {
        const invoice = snap.data();
        const { url } = invoice;
        const http = new XMLHttpRequest();
        http.open('GET', url);
        http.setRequestHeader('Accept', 'application/xml');

        http.send();

        http.onreadystatechange = (result) => {
          const dom = new JSDOM(http.responseText);
          const { window: { document }} = dom
          console.log(document.location);
        }
    });