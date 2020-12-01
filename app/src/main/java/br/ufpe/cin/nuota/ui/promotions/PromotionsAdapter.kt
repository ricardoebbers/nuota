package br.ufpe.cin.nuota.ui.promotions

import android.view.LayoutInflater
import android.view.ViewGroup
import android.widget.TextView
import androidx.recyclerview.widget.RecyclerView
import br.ufpe.cin.nuota.databinding.RowLayoutBinding

class PromotionsAdapter(
    private val promotions: List<PromotionModel>
) : RecyclerView.Adapter<PromotionsAdapter.PromotionViewHolder>() {

    override fun onCreateViewHolder(parent: ViewGroup, viewType: Int) = PromotionViewHolder(
        RowLayoutBinding.inflate(
            LayoutInflater.from(parent.context),
            parent,
            false
        )
    )

    override fun onBindViewHolder(holder: PromotionViewHolder, position: Int) =
        holder.updateInvoice(promotions[position])


    override fun getItemCount(): Int = promotions.size

    inner class PromotionViewHolder(binding: RowLayoutBinding) :
        RecyclerView.ViewHolder(binding.root) {

        private var title: TextView = binding.rowLayoutTitle

        fun updateInvoice(promotionModel: PromotionModel) {
            title.text = promotionModel.toString()
        }
    }
}