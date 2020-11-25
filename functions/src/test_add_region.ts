import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';

export const addRegionHandler = functions.https.onRequest(async (req, res) => {
    const writeResult = await admin.firestore().collection('event_invoice_output');
    await writeResult.add({ region: 'boa viagem', userId: 'qualquer coisa' });
    res.send("Done!");
});