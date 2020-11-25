import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';

export const addRegionHandler = functions.https.onRequest(async (req, res) => {
    const writeResult = await admin.firestore().collection('event_invoice_output');
    await writeResult.doc('boa viagem').set({ region: 'boa viagem', userId: 'qualquer coisa' });
    res.send("Done!");
});