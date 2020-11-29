import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
import { PromotionInterface } from '../shared/models/invoice-model';
(global as any).XMLHttpRequest = require('xhr2');

export const addPromotionToUserHandler = functions.https.onRequest(async (_, res) => {
  const promotions: PromotionInterface[][] = [];
  const usersId: string[][] = [];

  const regionsCollecion = await admin.firestore().collection('regions').get();
  const populatePromotionsAndUsersIdPromise = regionsCollecion.docs.map(async regionsDoc => {
    const regionPromotionList: PromotionInterface[] = [];
    const promotionsCollection = await regionsDoc.ref.collection('promotions').get();
  
    promotionsCollection.forEach(promotionsDoc => {
      const promotion = promotionsDoc.data();
      const promotionObject: PromotionInterface = {
        promotionId: promotionsDoc.id,
        average: promotion.average,
        discount: promotion.discount,
        purchase: promotion.purchase
      }

      regionPromotionList.push(promotionObject);
    });

    if(regionPromotionList) {
      const usersCollection = await regionsDoc.ref.collection('users').get();
      const regionUsersList: string[] = [];
      usersCollection.docs.map(regionUser => {
        regionUsersList.push(regionUser.id);
      });
      usersId.push(regionUsersList);
      promotions.push(regionPromotionList);
    }
  });
  await Promise.all(populatePromotionsAndUsersIdPromise);
  await setPromotionsToUsers(promotions, usersId, res);
});

const setPromotionsToUsers = async (promotions: PromotionInterface[][], usersId: string[][], res: functions.Response<any>): Promise<void> => {
  const usersCollection = await admin.firestore().collection('users').get();
  const promises: Promise<FirebaseFirestore.WriteResult>[] = [];

  usersCollection.forEach(async userDoc => {
    const userId = userDoc.id;
    const purchasesId: string[] = [];
    await userDoc.ref.collection('purchases').get().then(purchasesSnapshot => {
      purchasesSnapshot.forEach(purchasesDoc => {
        purchasesId.push(purchasesDoc.id);
      });
    });
    for (const [index, regionUserList] of usersId.entries()) {
      const userIndex = regionUserList.findIndex(regionUserId => regionUserId === userId);
      if(userIndex !== -1) {
        const userPromotionList = promotions[index].filter(promotion => {
          return purchasesId.findIndex(purchaseId => purchaseId === promotion.purchase.product.cEAN) !== -1;
        });
        for (const promotion of userPromotionList) {
          promises.push(userDoc.ref.collection('promotions').doc(promotion.promotionId).set(promotion));
        }
      }
    }
  });
  await Promise.all(promises)
  res.send('');
}