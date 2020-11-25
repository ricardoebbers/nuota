import { addUserToRegionHandler } from './add-user-to-region/add_user_to_region';
import { addProductToUserHistoryHandler } from './add-product-to-user-history/add_product_to_user_history';
import { addInvoiceHandler } from './mock-invoice-output/mock_invoice_output';
import { addProductToRegionHistoryHandler } from './add-product-to-region-history/add_product_to_region_history'
import * as admin from 'firebase-admin';

admin.initializeApp();

export const addUserToRegion = addUserToRegionHandler;
export const addProductToUserHistory = addProductToUserHistoryHandler;
export const addProductToRegionHistory = addProductToRegionHistoryHandler;
export const addInvoice = addInvoiceHandler;