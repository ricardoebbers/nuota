package br.ufpe.cin.nuota.ui.promotions

import android.content.ContentValues.TAG
import android.util.Log
import androidx.lifecycle.MutableLiveData
import com.google.firebase.auth.FirebaseAuth
import com.google.firebase.firestore.FirebaseFirestore

class PromotionsRepository {

    private val db = FirebaseFirestore.getInstance()
    private val userId = FirebaseAuth.getInstance().currentUser?.uid ?: "default"
    private val docRef = db.collection("users").document(userId).collection("promotions")

    fun listenToPromotions(promotions: MutableLiveData<List<PromotionModel>>) {
        docRef.addSnapshotListener { snapshot, e ->
            if (e != null) {
                Log.w(TAG, "Listen failed.", e)
                return@addSnapshotListener
            }
            if (snapshot != null) {
                val data = snapshot.toObjects(PromotionModel::class.java)
                Log.d(TAG, "Current data: $data")
                promotions.postValue(data)
            } else {
                Log.d(TAG, "Current data: null")
            }
        }
    }
}