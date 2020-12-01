package br.ufpe.cin.nuota.ui.promotions

import androidx.lifecycle.MutableLiveData
import androidx.lifecycle.ViewModel
import br.ufpe.cin.nuota.ui.invoices.InvoiceModel

class PromotionsViewModel : ViewModel() {
    private val repository = PromotionsRepository()

    val promotions = MutableLiveData<List<PromotionModel>>().apply {
        listOf<PromotionModel>()
    }

    init {
        repository.listenToPromotions(promotions)
    }

}