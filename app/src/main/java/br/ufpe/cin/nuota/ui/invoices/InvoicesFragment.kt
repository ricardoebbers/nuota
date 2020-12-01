package br.ufpe.cin.nuota.ui.invoices

import android.os.Bundle
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import androidx.fragment.app.Fragment
import androidx.lifecycle.ViewModelProvider
import androidx.recyclerview.widget.LinearLayoutManager
import br.ufpe.cin.nuota.databinding.FragmentInvoicesBinding

class InvoicesFragment : Fragment() {

    private lateinit var invoicesViewModel: InvoicesViewModel
    private lateinit var _binding: FragmentInvoicesBinding
    private var _invoices = mutableListOf<InvoiceModel>()

    override fun onCreateView(
        inflater: LayoutInflater,
        container: ViewGroup?,
        savedInstanceState: Bundle?
    ): View {
        invoicesViewModel =
            ViewModelProvider(this).get(InvoicesViewModel::class.java)
        _binding = FragmentInvoicesBinding.inflate(inflater, container, false)
        _binding.invoicesList.layoutManager = LinearLayoutManager(context)
        _binding.invoicesList.adapter = InvoicesAdapter(_invoices)
        invoicesViewModel.invoices.observe(viewLifecycleOwner, {
            _invoices.removeAll(_invoices)
            _invoices.addAll(it)
            _binding.invoicesList.adapter?.notifyDataSetChanged()
        })
        return _binding.root
    }
}