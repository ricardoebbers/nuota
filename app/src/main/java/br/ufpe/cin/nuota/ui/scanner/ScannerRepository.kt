package br.ufpe.cin.nuota.ui.scanner

import com.google.firebase.auth.FirebaseAuth
import com.google.firebase.firestore.FirebaseFirestore

class ScannerRepository {
    private val firestore = FirebaseFirestore.getInstance()
    private val userId = FirebaseAuth.getInstance().currentUser?.uid ?: "default"

    fun sendInvoiceUrl(scanModel: ScanModel) {
        firestore.collection("event_invoice_input").add(scanModel.copy(userId = userId))
    }
}