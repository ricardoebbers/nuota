package br.ufpe.cin.recl.nuota.base

import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.Home
import androidx.compose.runtime.Composable
import androidx.compose.ui.graphics.vector.VectorAsset
import br.ufpe.cin.recl.nuota.home.HomeBody

enum class NuotaScreen(
    val icon: VectorAsset,
    private val body: @Composable ((NuotaScreen) -> Unit) -> Unit
) {
    Home(
        icon = Icons.Filled.Home,
        body = { HomeBody() }
    );

    @Composable
    fun content(onScreenChange: (NuotaScreen) -> Unit) {
        body(onScreenChange)
    }
}