package br.ufpe.cin.nuota

import android.os.Bundle
import android.util.Log
import androidx.appcompat.app.AppCompatActivity
import androidx.navigation.findNavController
import androidx.navigation.ui.AppBarConfiguration
import androidx.navigation.ui.setupActionBarWithNavController
import androidx.navigation.ui.setupWithNavController
import br.ufpe.cin.nuota.databinding.ActivityMainBinding
import br.ufpe.cin.nuota.ui.fcm.MyFirebaseMessagingService
import com.firebase.ui.auth.AuthUI
import com.google.android.material.bottomnavigation.BottomNavigationView
import com.google.firebase.auth.FirebaseAuth

class MainActivity : AppCompatActivity() {

    private lateinit var binding: ActivityMainBinding
    private var user = FirebaseAuth.getInstance().currentUser
    private var messagingService = MyFirebaseMessagingService()

    companion object {
        private const val RC_SIGN_IN = (Math.PI * 1000).toInt()
        private val providers = arrayListOf(
            AuthUI.IdpConfig.EmailBuilder().build(),
            AuthUI.IdpConfig.GoogleBuilder().build()
        )
    }

    override fun onCreate(savedInstanceState: Bundle?) {
        Log.i("MainActivity", "logged in user: ${user?.displayName}")
        if (user == null) {
            startAuthActivity()
        }
        messagingService.sendRegistrationTokenToServer()
        super.onCreate(savedInstanceState)
        startMainActivity()
    }

    private fun startMainActivity() {
        binding = ActivityMainBinding.inflate(layoutInflater)
        setContentView(binding.root)

        val navView: BottomNavigationView = binding.navView

        val navController = findNavController(R.id.nav_host_fragment_activity_main)
        // Passing each menu ID as a set of Ids because each
        // menu should be considered as top level destinations.
        val appBarConfiguration = AppBarConfiguration(
            setOf(
                R.id.navigation_invoices, R.id.navigation_scanner, R.id.navigation_sales
            )
        )
        setupActionBarWithNavController(navController, appBarConfiguration)
        navView.setupWithNavController(navController)
    }

    private fun startAuthActivity() {
        startActivityForResult(
            AuthUI.getInstance()
                .createSignInIntentBuilder()
                .setAvailableProviders(providers)
                .build(),
            RC_SIGN_IN
        )
    }
}