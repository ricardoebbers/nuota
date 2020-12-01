package br.ufpe.cin.nuota.ui.invoices

data class InvoiceModel(
    var buyerId: String = "",
    var date: String = "",
    var products: List<ProductModel> = listOf(),
    var store: StoreModel = StoreModel()
) {
    fun title(): String {
        return "${products.size} produtos em ${store.name}"
    }

    fun subtitle(): String {
        return date
    }
}

data class ProductModel(
    var cEAN: String = "",
    var description: String = "",
    var quantity: Int = 0,
    var unitValue: Double = 0.0
)

data class StoreModel(
    var addrNeighborhood: String = "",
    var addrNumber: String = "",
    var addrStreet: String = "",
    var cnpj: String = "",
    var name: String = ""
) {
    fun getAddress(): String {
        return "$addrStreet, $addrNumber - $addrNeighborhood"
    }
}
