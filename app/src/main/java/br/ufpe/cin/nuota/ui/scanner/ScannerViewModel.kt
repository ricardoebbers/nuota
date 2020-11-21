package br.ufpe.cin.nuota.ui.scanner

import androidx.lifecycle.MutableLiveData
import androidx.lifecycle.ViewModel

class ScannerViewModel : ViewModel() {

    private val repository = ScannerRepository()

    private val _init = MutableLiveData<ScanModel>().apply {
        value = ScanModel.empty()
    }
    val model: MutableLiveData<ScanModel> = _init

    fun send() {
        repository.sendInvoiceUrl(model.value!!)
    }
}