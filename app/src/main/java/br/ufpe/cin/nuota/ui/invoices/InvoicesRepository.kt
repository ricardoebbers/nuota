package br.ufpe.cin.nuota.ui.invoices

import android.content.ContentValues.TAG
import android.util.Log
import androidx.lifecycle.MutableLiveData
import com.google.firebase.auth.FirebaseAuth
import com.google.firebase.firestore.FirebaseFirestore

class InvoicesRepository {

    private val db = FirebaseFirestore.getInstance()
    private val userId = FirebaseAuth.getInstance().currentUser?.uid ?: "default"
    private val docRef = db.collection("users").document(userId).collection("invoices")

    fun listenToInvoices(invoices: MutableLiveData<List<InvoiceModel>>) {
        docRef.addSnapshotListener { snapshot, e ->
            if (e != null) {
                Log.w(TAG, "Listen failed.", e)
                return@addSnapshotListener
            }
            if (snapshot != null) {
                val data = snapshot.toObjects(InvoiceModel::class.java)
                Log.d(TAG, "Current data: $data")
                invoices.postValue(data)
            } else {
                Log.d(TAG, "Current data: null")
            }
        }
    }
}