import { addUserToRegionHandler } from './add-user-to-region/add_user_to_region';
import { addProductToUserHistoryHandler } from './add-product-to-user-history/add_product_to_user_history';
import { downloadInvoiceHandler } from './download-invoice/download_invoice_handler';
import { mockDownloadInvoiceHandler } from './download-invoice-input-mock/mock_download_invoice_input'
import { addProductToRegionHistoryHandler } from './add-product-to-region-history/add_product_to_region_history'
import { createPromotionFromPurchaseHandler } from './create-promotion-from-purchase/create_promotion_from_purchase'
import { addInvoiceToUserHandler } from './add-invoice-to-user/add_invoice_to_user_handler';
import * as admin from 'firebase-admin';

admin.initializeApp();

export const downloadInvoiceMock = mockDownloadInvoiceHandler;
export const downloadInvoice = downloadInvoiceHandler;
export const addUserToRegion = addUserToRegionHandler;
export const addInvoiceToUser = addInvoiceToUserHandler;
export const addProductToUserHistory = addProductToUserHistoryHandler;
export const addProductToRegionHistory = addProductToRegionHistoryHandler;
export const createPromotionFromPurchase = createPromotionFromPurchaseHandler;
