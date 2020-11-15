package br.ufpe.cin.recl.nuota.base

import androidx.compose.material.MaterialTheme
import androidx.compose.material.Surface
import androidx.compose.runtime.Composable
import br.ufpe.cin.recl.nuota.ui.NuotaTheme

@Composable
fun NuotaScaffold(children: @Composable () -> Unit) {
    NuotaTheme {
        Surface(color = MaterialTheme.colors.primary) {
            children()
        }
    }
}