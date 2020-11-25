import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
import { v4 as uuid } from 'uuid';

export const addInvoiceHandler = functions.https.onRequest(async (req, res) => {
    const invoice = {
        region: 'boa viagem',
        userId: uuid(),
        products: [
            { cEAN: uuid() },
            { cEAN: uuid() },
            { cEAN: uuid() },
            { cEAN: uuid() }
        ]
    };
    const writeResult = await admin.firestore().collection('event_invoice_output');
    await writeResult.add(invoice);
    res.send(invoice);
});