import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
import { InvoiceModel } from '../shared/models/invoice-model';

export const addUserToRegionHandler = functions.firestore
  .document('event_invoice_output/{invoiceId}')
  .onCreate(async (snap, _) => {
    const invoice = snap.data() as InvoiceModel;
    const { store: { addrNeighborhood } } = invoice;
    const { buyerId } = invoice;
    const region = admin.firestore().collection('regions').doc(addrNeighborhood);
    await region.set({}, { merge: true });
    await region.collection('users').doc(buyerId).set({}, { merge: true });
  });