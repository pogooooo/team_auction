import { useState } from 'react'
import { ChevronDown, ChevronUp } from 'lucide-react'

const tierColor = (tier) => {
    if (!tier || tier === '') return 'text-gray-300'
    if (tier === 'X') return 'text-gray-400'
    if (tier.startsWith('Bronze')) return 'text-yellow-700'
    if (tier.startsWith('Silver')) return 'text-gray-500'
    if (tier.startsWith('Gold')) return 'text-yellow-500'
    if (tier.startsWith('Platinum')) return 'text-green-500'
    if (tier.startsWith('Emerald')) return 'text-emerald-500'
    if (tier.startsWith('Diamond')) return 'text-blue-400'
    if (tier.startsWith('Master')) return 'text-purple-600'
    return 'text-black'
}

const AuctionItemCard = ({ item }) => {
    if (!item) return null

    return (
        <div className="bg-white p-4 pb-1 rounded-xl shadow-md space-y-4 border border-gray-200">
            <div className="text-base font-semibold text-gray-800 truncate text-center">
                {item.summoner}
            </div>

            <div className="flex flex-wrap gap-1 justify-center">
                {item.champions?.length > 0 ? (
                    item.champions.map((ch, i) => (
                        <span
                            key={i}
                            className="bg-gray-100 text-xs px-2 py-0.5 rounded-full text-gray-600 border"
                        >
              {ch}
            </span>
                    ))
                ) : (
                    <p className="text-xs text-gray-400 italic">등록된 챔피언 없음</p>
                )}
            </div>

            <div className="grid grid-cols-1 gap-y-1 text-sm divide-y divide-gray-100">
                {['TOP', 'JUG', 'MID', 'ADC', 'SUP'].map((role) => (
                    <div key={role} className="flex justify-between items-center py-1 px-2">
                        <span className="font-medium text-gray-600 w-16">{role}</span>
                        <span className={`text-sm ${tierColor(item[role])}`}>
              {item[role] === '' ? '0' : item[role]}
            </span>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default AuctionItemCard
