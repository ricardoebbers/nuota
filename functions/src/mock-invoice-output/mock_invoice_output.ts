import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
import { v4 as uuid } from 'uuid';

export const addInvoiceHandler = functions.https.onRequest(async (req, res) => {
    const invoice = {
        region: 'boa viagem',
        userId: uuid(),
        storeCNPJ: uuid(),
        createDate: '2020-06-11T11:43:40-03:00',
        products: [
            { cEAN: 'abcd', unitValue: 123.45, description: "POLPA BRASFRUT" },
            { cEAN: 'efgh', unitValue: 234.56, description: "CEBOLINHA" },
            { cEAN: 'ijkl', unitValue: 345.67, description: "MACA NAC.GALA" },
            { cEAN: 'mnop', unitValue: 456.78, description: "QJO GORGONZOLA QUATA" }
        ]
    };
    const writeResult = await admin.firestore().collection('event_invoice_output');
    await writeResult.add(invoice);
    res.send(invoice);
});