package br.ufpe.cin.nuota.ui.scanner

import android.util.Log
import androidx.lifecycle.MutableLiveData
import androidx.lifecycle.ViewModel

class ScannerViewModel : ViewModel() {

    companion object {
        private const val TAG = "ScannerViewModel"
    }

    private val repository = ScannerRepository()

    private val _init = MutableLiveData<ScanModel>().apply {
        value = ScanModel.empty()
    }
    val model: MutableLiveData<ScanModel> = _init

    fun send() {
        Log.i(TAG, "M=sending_invoice, url=${model.value}")
        repository.sendInvoiceUrl(model.value!!)
    }
}