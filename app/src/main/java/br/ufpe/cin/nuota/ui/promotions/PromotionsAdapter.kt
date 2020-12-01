package br.ufpe.cin.nuota.ui.promotions

import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.widget.TextView
import androidx.recyclerview.widget.RecyclerView
import br.ufpe.cin.nuota.databinding.RowLayoutBinding

class PromotionsAdapter(
    private val promotions: List<PromotionModel>,
    private val onPromotionClickListener: OnPromotionClickListener,
) : RecyclerView.Adapter<PromotionsAdapter.PromotionViewHolder>() {

    override fun onCreateViewHolder(parent: ViewGroup, viewType: Int) = PromotionViewHolder(
        RowLayoutBinding.inflate(LayoutInflater.from(parent.context), parent, false),
        onPromotionClickListener
    )

    override fun onBindViewHolder(holder: PromotionViewHolder, position: Int) =
        holder.updateInvoice(promotions[position])


    override fun getItemCount(): Int = promotions.size

    inner class PromotionViewHolder(
        binding: RowLayoutBinding,
        private val onPromotionClickListener: OnPromotionClickListener
    ) :
        RecyclerView.ViewHolder(binding.root), View.OnClickListener {

        private var title: TextView = binding.rowLayoutTitle

        init {
            this.itemView.setOnClickListener(this)
        }

        fun updateInvoice(promotionModel: PromotionModel) {
            title.text = promotionModel.toString()
        }

        override fun onClick(view: View?) {
            onPromotionClickListener.onPromotionClick(adapterPosition)
        }
    }

    interface OnPromotionClickListener {
        fun onPromotionClick(position: Int)
    }
}