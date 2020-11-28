import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
// import { parseString } from 'xml2js';
import { PromotionInterface } from '../shared/models/invoice-model';
(global as any).XMLHttpRequest = require('xhr2');

export const addPromotionToUserHandler = functions.https.onRequest(async (_, res) => {
  const promotions: PromotionInterface[][] = [];
  const usersId: string[][] = [];


  await admin.firestore().collection('regions').get().then(regionsSnapshot => {
    regionsSnapshot.forEach(async regionsDoc => {
      const regionPromotionList: PromotionInterface[] = [];
      await regionsDoc.ref.collection('promotions').get().then(promotionsSnapshot => {
        promotionsSnapshot.forEach(promotionsDoc => {
          const promotion = promotionsDoc.data();
          const promotionObject: PromotionInterface = {
            promotionId: promotionsDoc.id,
            average: promotion.average,
            discount: promotion.discount,
            purchase: promotion.purchase
          }
          regionPromotionList.push(promotionObject);
        });
      });
      if(regionPromotionList) {
        await regionsDoc.ref.collection('users').get().then(regionUsers => {
          const regionUsersList: string[] = [];
          regionUsers.forEach(regionUser => {
            regionUsersList.push(regionUser.id);
          });
          usersId.push(regionUsersList);
        });
        promotions.push(regionPromotionList);
      }
    });
  });

  // Nesse momento eu tenho duas matrizes que contém listas de pessoas e listas de produtos por região


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
});


// Get em Regions OK
// Olhar cada promoção de cada region OK
// 
// Get em users
// Notificar cada user DO MAIS ALTO NÍVEL que tiver comprado o produto da promoção naquela região