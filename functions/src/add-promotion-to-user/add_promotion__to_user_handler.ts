import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
import { PromotionInterface } from '../shared/models/invoice-model';
(global as any).XMLHttpRequest = require('xhr2');

export const addPromotionToUserHandler = functions.https.onRequest(async (_, res) => {
  const promotions: PromotionInterface[][] = [];
  const usersId: string[][] = [];

  const regions = await admin.firestore().collection('regions').get();
  const populatePromotionsAndUsersIdPromise = regions.docs.map(async regionsDoc => {
    const regionPromotionList: PromotionInterface[] = [];
    const promotionsDocList = await regionsDoc.ref.collection('promotions').get();
  
    promotionsDocList.forEach(promotionsDoc => {
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
      const usersDocList = await regionsDoc.ref.collection('users').get();
      const regionUsersList: string[] = [];
      usersDocList.docs.map(regionUser => {
        regionUsersList.push(regionUser.id);
      });
      usersId.push(regionUsersList);
      promotions.push(regionPromotionList);
    }
  });
  await Promise.all(populatePromotionsAndUsersIdPromise);
  // Nesse momento eu tenho duas matrizes que contém listas de pessoas e listas de produtos por região
  await setPromotionsToUsers(promotions, usersId, res);
});

const setPromotionsToUsers = async (promotions: PromotionInterface[][], usersId: string[][], res: functions.Response<any>): Promise<void> => {
  await admin.firestore().collection('users').get().then(async usersSnapshot => {
    const promises: Promise<FirebaseFirestore.WriteResult>[] = [];
    usersSnapshot.forEach(async userDoc => {
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
  });
  res.send('');
}

// Get em Regions OK
// Olhar cada promoção de cada region OK
// 
// Get em users
// Notificar cada user DO MAIS ALTO NÍVEL que tiver comprado o produto da promoção naquela região