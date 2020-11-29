import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
import { v4 as uuid } from 'uuid';

export const mockDownloadInvoiceHandler = functions.https.onRequest(async (_, res) => {
  const invoice = {
    url: 'http://nfce.sefaz.pe.gov.br/nfce/consulta?p=26201145543915041880650260002078521397002392|2|1|1|1A3E6DBAA7FC626D2FD2A9064EA2AA29B44847C9',
    userId: uuid()
  };
  const writeResult = admin.firestore().collection('event_invoice_input');
  await writeResult.add(invoice);
  res.send(invoice);
});