package br.ufpe.cin.nuota.ui.promotions

import android.os.Bundle
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import androidx.fragment.app.Fragment
import androidx.lifecycle.ViewModelProvider
import androidx.recyclerview.widget.LinearLayoutManager
import br.ufpe.cin.nuota.databinding.FragmentPromotionsBinding

class PromotionsFragment : Fragment() {

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
        _binding.promotionsList.adapter = PromotionsAdapter(_promotions)
        promotionsViewModel.promotions.observe(viewLifecycleOwner, {
            _promotions.removeAll(_promotions)
            _promotions.addAll(it)
            _binding.promotionsList.adapter?.notifyDataSetChanged()
        })
        return _binding.root
    }
}