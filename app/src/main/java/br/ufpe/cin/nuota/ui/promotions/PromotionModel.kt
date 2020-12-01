package br.ufpe.cin.nuota.ui.promotions

import br.ufpe.cin.nuota.ui.invoices.ProductModel
import br.ufpe.cin.nuota.ui.invoices.StoreModel
import java.text.DecimalFormat

data class PromotionModel(
    var promotionId: String = "",
    var average: Double = 0.0,
    var purchase: PurchaseModel = PurchaseModel(),
    var discount: Double = 0.0
) {
    private fun discountPercentage(): String {
        val df = DecimalFormat("##.##%")
        return df.format(discount)
    }
    fun title(): String {
        return "${purchase.product.description} com desconto de ${discountPercentage()} em ${purchase.store.name}!"
    }

    fun subtitle(): String {
        return purchase.date
    }

    fun getAddress(): String {
        return purchase.getAddress()
    }
}

data class PurchaseModel(
    var product: ProductModel = ProductModel(),
    var date: String = "",
    var store: StoreModel = StoreModel()
) {
    fun getAddress(): String {
        return store.getAddress()
    }
}
