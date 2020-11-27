export function isInvalidCEAN(cEAN: string): boolean {
    return isNaN(parseInt(cEAN));
}

export interface StoreInterface {
    cnpj: string,
    name: string,
    addrStreet: string,
    addrNumber: string,
    addrNeighborhood: string,
}

export interface ProductsInterface {
    cEAN: string,
    description: string,
    unitValue: number,
    quantity: number
}

export interface PurchasesInterface {
    product: ProductsInterface,
    date: string,
    store: StoreInterface
}

export class InvoiceModel {

    constructor(
        public date: string,
        public store: StoreInterface,
        public products: ProductsInterface[],
        public buyerId: string
    ) { }

    public static fromObject(json: any, BuyerId: string): InvoiceModel {
        const root = json.nfeProc.proc[0].nfeProc[0].NFe[0].infNFe[0];
        const storeData = root.emit[0];
        const productsData = root.det;

        const date = root.ide[0].dhEmi[0];
        const store: StoreInterface = {
            cnpj: storeData.CNPJ[0],
            name: storeData.xNome[0],
            addrStreet: storeData.enderEmit[0].xLgr[0],
            addrNumber: storeData.enderEmit[0].nro[0],
            addrNeighborhood: storeData.enderEmit[0].xBairro[0]
        }
        const products = this.getProducts(productsData);

        return new InvoiceModel(date, store, products, BuyerId);
    }

    private static getProducts(products: any[]): ProductsInterface[] {
        const productsList = [];

        for (const product of products) {
            const newProduct: ProductsInterface = {
                cEAN: product.prod[0].cEAN[0],
                description: product.prod[0].xProd[0],
                unitValue: Number(product.prod[0].vUnCom[0]),
                quantity: Number(product.prod[0].qCom[0]),
            };
            productsList.push(newProduct);
        }
        return productsList;
    }
}