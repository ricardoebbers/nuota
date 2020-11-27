package br.ufpe.cin.nuota.ui.scanner

data class ScanModel(val url: String = "", val userId: String = "") {
    companion object {
        fun empty(): ScanModel {
            return ScanModel("", "")
        }
    }
}