package br.ufpe.cin.recl.nuota.home

import androidx.compose.foundation.ScrollableColumn
import androidx.compose.foundation.layout.PaddingValues
import androidx.compose.foundation.layout.Spacer
import androidx.compose.foundation.layout.preferredHeight
import androidx.compose.runtime.Composable
import androidx.compose.ui.Modifier
import androidx.compose.ui.unit.dp

@Composable
fun HomeBody() {
    ScrollableColumn(contentPadding = PaddingValues(16.dp)) {
        Spacer(Modifier.preferredHeight(12.dp))
    }
}