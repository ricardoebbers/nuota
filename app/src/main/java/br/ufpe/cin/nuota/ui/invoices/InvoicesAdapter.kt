package br.ufpe.cin.nuota.ui.invoices

import android.view.LayoutInflater
import android.view.ViewGroup
import android.widget.TextView
import androidx.recyclerview.widget.RecyclerView
import br.ufpe.cin.nuota.databinding.RowLayoutBinding

class InvoicesAdapter(
    private val invoices: List<InvoiceModel>
) : RecyclerView.Adapter<InvoicesAdapter.InvoicesViewHolder>() {

    override fun onCreateViewHolder(parent: ViewGroup, viewType: Int) = InvoicesViewHolder(
        RowLayoutBinding.inflate(
            LayoutInflater.from(parent.context),
            parent,
            false
        )
    )

    override fun onBindViewHolder(holder: InvoicesViewHolder, position: Int) =
        holder.updateInvoice(invoices[position])


    override fun getItemCount(): Int = invoices.size

    inner class InvoicesViewHolder(binding: RowLayoutBinding) :
        RecyclerView.ViewHolder(binding.root) {

        private var title: TextView = binding.rowLayoutTitle

        fun updateInvoice(invoiceModel: InvoiceModel) {
            title.text = invoiceModel.toString()
        }
    }
}