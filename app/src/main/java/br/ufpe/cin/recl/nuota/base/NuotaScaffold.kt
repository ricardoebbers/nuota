package br.ufpe.cin.recl.nuota.base

import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.padding
import androidx.compose.material.Scaffold
import androidx.compose.runtime.Composable
import androidx.compose.runtime.getValue
import androidx.compose.runtime.savedinstancestate.savedInstanceState
import androidx.compose.runtime.setValue
import androidx.compose.ui.Modifier
import br.ufpe.cin.recl.nuota.ui.NuotaTheme

@Composable
fun NuotaScaffold() {
    NuotaTheme {
        val screens = NuotaScreen.values().toList()
        var currentScreen by savedInstanceState { NuotaScreen.Home }
        Scaffold(
            bottomBar = {
                NuotaMenuBar(
                    screens = screens,
                    onTabSelected = { screen -> currentScreen = screen },
                    currentScreen = currentScreen
                )
            }
        ) { innerPadding ->
            Box(Modifier.padding(innerPadding)) {
                currentScreen.content(onScreenChange = { screen -> currentScreen = screen })
            }

        }
    }
}