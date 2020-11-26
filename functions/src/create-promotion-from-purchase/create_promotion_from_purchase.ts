import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';

export const createPromotionFromPurchaseHandler = functions.firestore
    .document('regions/{regionId}/products/{productId}/purchases/{purchaseId}')
    .onCreate(async (snap, context) => {
        const regionId = context.params.regionId;
        const productId = context.params.productId;
        const purchase = snap.data();
        const productDoc = admin.firestore().collection('regions').doc(regionId).collection('products').doc(productId);
        const current = (await productDoc.get()).data();
        let sum: number;
        let count: number;
        if (current) {
            sum = current.sum + purchase.unitValue;
            count = current.count + 1;
        } else {
            sum = purchase.unitValue;
            count = 1;
        }
        await productDoc.set({ sum, count }, { merge: true }); // update dos totalizadores para calcular a média

        const average = sum / count;
        const discountThreshold = 0.8; // 20% de desconto
        if (purchase.unitValue / average <= discountThreshold) { // é uma promoção
            const promotions = admin.firestore().collection('regions').doc(regionId).collection('promotions');
            await promotions.add(purchase);
        }
    });