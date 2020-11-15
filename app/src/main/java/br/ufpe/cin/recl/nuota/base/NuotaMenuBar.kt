package br.ufpe.cin.recl.nuota.base

import androidx.compose.animation.animate
import androidx.compose.animation.animateContentSize
import androidx.compose.animation.core.LinearEasing
import androidx.compose.animation.core.tween
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.selection.selectable
import androidx.compose.material.Icon
import androidx.compose.material.MaterialTheme
import androidx.compose.material.Surface
import androidx.compose.material.Text
import androidx.compose.material.ripple.RippleIndication
import androidx.compose.runtime.Composable
import androidx.compose.runtime.remember
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.graphics.vector.VectorAsset
import androidx.compose.ui.unit.dp

@Composable
fun NuotaMenuBar(
    screens: List<NuotaScreen>,
    onTabSelected: (NuotaScreen) -> Unit,
    currentScreen: NuotaScreen
) {
    Surface(Modifier.preferredHeight(56.dp).fillMaxWidth()) {
        Row {
            screens.forEach { screen ->
                NuotaTab(
                    text = screen.name.toUpperCase(),
                    icon = screen.icon,
                    onSelected = { onTabSelected(screen) },
                    selected = currentScreen == screen
                )
            }
        }
    }
}

@Composable
private fun NuotaTab(
    text: String,
    icon: VectorAsset,
    onSelected: () -> Unit,
    selected: Boolean
) {
    val color = MaterialTheme.colors.onSurface
    val durationMillis = if (selected) 150 else 100
    val animSpec = remember {
        tween<Color>(
            durationMillis = durationMillis,
            easing = LinearEasing,
            delayMillis = 100
        )
    }
    val tabTintColor = animate(
        target = if (selected) color else color.copy(alpha = 0.60f),
        animSpec = animSpec
    )
    Row(
        modifier = Modifier
            .padding(16.dp)
            .animateContentSize()
            .preferredHeight(56.dp)
            .selectable(
                selected = selected,
                onClick = onSelected,
                indication = RippleIndication(bounded = false)
            )
    ) {
        Icon(asset = icon, tint = tabTintColor)
        if (selected) {
            Spacer(Modifier.preferredWidth(12.dp))
            Text(text, color = tabTintColor)
        }
    }
}