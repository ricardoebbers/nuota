package br.ufpe.cin.nuota.ui.promotions

import android.content.Intent
import android.net.Uri
import android.os.Bundle
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import androidx.fragment.app.Fragment
import androidx.lifecycle.ViewModelProvider
import androidx.recyclerview.widget.LinearLayoutManager
import br.ufpe.cin.nuota.databinding.FragmentPromotionsBinding

class PromotionsFragment : Fragment(), PromotionsAdapter.OnPromotionClickListener {

    private lateinit var promotionsViewModel: PromotionsViewModel
    private lateinit var _binding: FragmentPromotionsBinding
    private var _promotions = mutableListOf<PromotionModel>()

    override fun onCreateView(
        inflater: LayoutInflater,
        container: ViewGroup?,
        savedInstanceState: Bundle?
    ): View {
        promotionsViewModel =
            ViewModelProvider(this).get(PromotionsViewModel::class.java)
        _binding = FragmentPromotionsBinding.inflate(inflater, container, false)
        _binding.promotionsList.layoutManager = LinearLayoutManager(context)
        _binding.promotionsList.adapter = PromotionsAdapter(_promotions, this)
        promotionsViewModel.promotions.observe(viewLifecycleOwner, {
            _promotions.removeAll(_promotions)
            _promotions.addAll(it)
            _binding.promotionsList.adapter?.notifyDataSetChanged()
        })
        return _binding.root
    }

    override fun onPromotionClick(position: Int) {
        val promotion = _promotions[position]
        val address = promotion.getAddress()
        val gmmIntentUri =
            Uri.parse("google.navigation:q=\"$address\"")
        val mapIntent = Intent(Intent.ACTION_VIEW, gmmIntentUri)
        mapIntent.setPackage("com.google.android.apps.maps")
        startActivity(mapIntent)
    }
}