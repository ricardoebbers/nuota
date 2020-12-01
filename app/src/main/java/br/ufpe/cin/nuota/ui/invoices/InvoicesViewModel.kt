package br.ufpe.cin.nuota.ui.invoices

import androidx.lifecycle.MutableLiveData
import androidx.lifecycle.ViewModel

class InvoicesViewModel : ViewModel() {

    val invoices = MutableLiveData<List<InvoiceModel>>().apply {
        listOf<InvoiceModel>()
    }

    private val repository = InvoicesRepository()

    init {
        repository.listenToInvoices(invoices)
    }
}