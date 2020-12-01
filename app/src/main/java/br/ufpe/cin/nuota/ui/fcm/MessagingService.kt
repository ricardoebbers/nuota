package br.ufpe.cin.nuota.ui.fcm

import com.google.firebase.auth.FirebaseAuth
import com.google.firebase.firestore.FirebaseFirestore
import com.google.firebase.messaging.FirebaseMessaging
import com.google.firebase.messaging.FirebaseMessagingService
import com.google.firebase.messaging.RemoteMessage


class MyFirebaseMessagingService : FirebaseMessagingService() {

    override fun onNewToken(token: String) {
        sendRegistrationTokenToServer();

    }

    override fun onMessageReceived(remoteMessage: RemoteMessage) {
        super.onMessageReceived(remoteMessage)
    }

    fun sendRegistrationTokenToServer() {
        var token = FirebaseMessaging.getInstance().token
        var userId = FirebaseAuth.getInstance().currentUser?.uid
        if (userId != null && token != null) {
            var firestore = FirebaseFirestore.getInstance()
            firestore.collection("user_tokens").document(userId).set(
                    {
                        token
                    }
            )
        }
    }
}