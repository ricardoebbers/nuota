import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';

export const mockDownloadInvoiceHandler = functions.https.onRequest(async (req, res) => {
  const invoice = {
      url: 'http://nfce.sefaz.pe.gov.br/nfce/consulta?p=26201145543915041880650260002078521397002392|2|1|1|1A3E6DBAA7FC626D2FD2A9064EA2AA29B44847C9'
  };
  const writeResult = await admin.firestore().collection('event_invoice_input');
  await writeResult.add(invoice);
  res.send(invoice);
});