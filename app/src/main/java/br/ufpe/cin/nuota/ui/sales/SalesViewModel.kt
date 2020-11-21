package br.ufpe.cin.nuota.ui.sales

import androidx.lifecycle.LiveData
import androidx.lifecycle.MutableLiveData
import androidx.lifecycle.ViewModel

class SalesViewModel : ViewModel() {

    private val _text = MutableLiveData<String>().apply {
        value = "Placeholder para a listagem de promoções na área do usuário"
    }
    val text: LiveData<String> = _text
}