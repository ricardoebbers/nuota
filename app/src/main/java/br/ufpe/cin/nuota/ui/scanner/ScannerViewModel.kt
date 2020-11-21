package br.ufpe.cin.nuota.ui.scanner

import androidx.lifecycle.LiveData
import androidx.lifecycle.MutableLiveData
import androidx.lifecycle.ViewModel

class ScannerViewModel : ViewModel() {

    private val _text = MutableLiveData<String>().apply {
        value = "Placeholder para o qr code scanner"
    }
    val text: LiveData<String> = _text
}