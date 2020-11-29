import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
import { PurchasesInterface } from '../shared/models/invoice-model';

export const createPromotionFromPurchaseHandler = functions.firestore
  .document('regions/{regionId}/products/{productId}/purchases/{purchaseId}')
  .onCreate(async (snap, context) => {
    const regionId = context.params.regionId;
    const purchase = snap.data() as PurchasesInterface;
    const parent = snap.ref.parent.parent;
    if (parent) {
      const productDoc = (await parent.get()).data();
      if (productDoc) {
        const sum = productDoc.sum;
        const count = productDoc.count;
        const average = sum / count;
        const discountThreshold = 0.8; // 20% de desconto
        if (purchase.product.unitValue / average <= discountThreshold) { // é uma promoção
          const discount = (average - purchase.product.unitValue) / average;
          const promotions = admin.firestore().collection('regions').doc(regionId).collection('promotions');
          const foundDocs = await promotions.where('purchase.product.cEAN', '==', purchase.product.cEAN).get();
          if (foundDocs.docs.length === 0) {
            await promotions.add({ purchase, average, discount });
          } else {
            const updateDocPromises = foundDocs.docs.map((promotionDoc) => {
              return promotionDoc.ref.update({ purchase, average, discount });
            });
            await Promise.all(updateDocPromises);
          }
        }
      }
    }
  });
