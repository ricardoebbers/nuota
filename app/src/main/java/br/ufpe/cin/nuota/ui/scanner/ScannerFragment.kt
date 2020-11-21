package br.ufpe.cin.nuota.ui.scanner

import android.content.Intent
import android.os.Bundle
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.widget.TextView
import android.widget.Toast
import androidx.fragment.app.Fragment
import androidx.lifecycle.ViewModelProvider
import br.ufpe.cin.nuota.databinding.FragmentScannerBinding
import com.google.zxing.integration.android.IntentIntegrator


class ScannerFragment : Fragment() {

    private lateinit var scannerViewModel: ScannerViewModel
    private var _binding: FragmentScannerBinding? = null

    // This property is only valid between onCreateView and
    // onDestroyView.
    private val binding get() = _binding!!

    override fun onCreateView(
        inflater: LayoutInflater,
        container: ViewGroup?,
        savedInstanceState: Bundle?
    ): View? {
        scannerViewModel =
            ViewModelProvider(this).get(ScannerViewModel::class.java)
        _binding = FragmentScannerBinding.inflate(inflater, container, false)
        val root: View = binding.root

        val textView: TextView = binding.textScanner

        if (scannerViewModel.model.value == ScanModel.empty()) {
            scanQrCode()
        }
        scannerViewModel.model.observe(viewLifecycleOwner, {
            textView.text = it.url
        })
        binding.button.setOnClickListener { scannerViewModel.send() }
        return root
    }

    private fun scanQrCode() {
        val integrator = IntentIntegrator.forSupportFragment(this)
        integrator.setPrompt("Escanear QR Code da Nota Fiscal")
        integrator.setBeepEnabled(false)
        integrator.setDesiredBarcodeFormats(IntentIntegrator.QR_CODE)
        integrator.initiateScan()
    }

    override fun onDestroyView() {
        super.onDestroyView()
        _binding = null
    }

    override fun onActivityResult(requestCode: Int, resultCode: Int, data: Intent?) {
        val result = IntentIntegrator.parseActivityResult(requestCode, resultCode, data)
        if (result != null) {
            if (result.contents == null) {
                Toast.makeText(context, "Scan Cancelado", Toast.LENGTH_LONG).show()
            } else {
                scannerViewModel.model.value = ScanModel(result.contents)
            }
        }
    }
}