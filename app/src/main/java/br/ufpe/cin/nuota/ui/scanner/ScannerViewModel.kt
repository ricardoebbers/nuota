package br.ufpe.cin.nuota.ui.scanner

import androidx.lifecycle.MutableLiveData
import androidx.lifecycle.ViewModel

class ScannerViewModel : ViewModel() {

    private val _url = MutableLiveData<String>().apply {
        value = ""
    }
    val url: MutableLiveData<String> = _url
}