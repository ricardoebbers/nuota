package br.ufpe.cin.recl.nuota.home

import android.os.Bundle
import androidx.activity.ComponentActivity
import androidx.annotation.VisibleForTesting
import androidx.compose.foundation.layout.Box
import androidx.compose.runtime.Composable
import androidx.compose.ui.platform.setContent
import br.ufpe.cin.recl.nuota.base.NuotaScaffold
import dagger.hilt.android.AndroidEntryPoint

@AndroidEntryPoint
class MainActivity : ComponentActivity() {

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContent {
            MainScreen()
        }
    }
}

@VisibleForTesting
@Composable
fun MainScreen() {
    NuotaScaffold {
        Box {
        }
    }

}