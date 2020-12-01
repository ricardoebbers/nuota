package br.ufpe.cin.nuota.ui.invoices

import java.math.BigDecimal

data class InvoiceModel(var buyerId: String = "", var date: String = "", var products: List<ProductModel> = listOf(), var store: StoreModel = StoreModel()) {
    override fun toString(): String {
        return "$date - ${store.name} (${products.size})"
    }
}

data class ProductModel(var cEAN: String = "", var description: String = "", var quantity: Int = 0, var unitValue: Double = 0.0)

data class StoreModel(var addrNeighborhood: String = "", var addrNumber: String = "", var addrStreet: String = "", var cnpj: String = "", var name: String = "")
