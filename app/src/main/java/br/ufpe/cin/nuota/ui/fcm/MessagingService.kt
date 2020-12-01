package br.ufpe.cin.nuota.ui.fcm

import android.content.ContentValues.TAG
import android.util.Log
import com.google.firebase.auth.FirebaseAuth
import com.google.firebase.firestore.FirebaseFirestore
import com.google.firebase.messaging.FirebaseMessaging
import com.google.firebase.messaging.FirebaseMessagingService


class MyFirebaseMessagingService : FirebaseMessagingService() {

    override fun onNewToken(token: String) {
        sendRegistrationTokenToServer()

    }

    fun sendRegistrationTokenToServer() {
        val userId = FirebaseAuth.getInstance().currentUser?.uid
        val firestore = FirebaseFirestore.getInstance()
        if (userId != null) {
            FirebaseMessaging.getInstance().token.addOnCompleteListener {
                if (!it.isSuccessful) {
                    Log.w(TAG, "Fetching FCM registration token failed", it.exception)
                    return@addOnCompleteListener
                }
                val token = it.result
                firestore.collection("user_tokens").document(userId).set({ token })
            }
        }
    }
}