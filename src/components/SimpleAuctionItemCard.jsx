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

const SimpleAuctionItemCard = ({ item, onRoleChange }) => {
    const [selectedRole, setSelectedRole] = useState(
        ['TOP', 'JUG', 'MID', 'ADC', 'SUP'].find(role => item[role] && item[role] !== 'X' && item[role] !== '') || 'TOP'
    )
    const [dropdownOpen, setDropdownOpen] = useState(false)
    const tier = item[selectedRole]

    const handleChange = (role) => {
        setSelectedRole(role)
        setDropdownOpen(false)
        if (onRoleChange) onRoleChange(role)
    }

    return (
        <div className="w-full h-full min-h-[80px] max-h-[80px] flex flex-col justify-between bg-white rounded-xl shadow-sm border border-gray-200 text-sm relative">
            <div className="flex justify-between items-center">
                <div className="font-semibold text-gray-800 text-xs truncate px-2 pt-2 w-full text-center">
                    {item.summoner}
                </div>
            </div>

            <div className="flex justify-between items-end px-2 pb-2">
                <div className="relative w-1/2">
                    <button
                        onClick={() => setDropdownOpen(prev => !prev)}
                        className="w-full flex justify-center items-center gap-1 text-xs text-gray-600"
                    >
                        {dropdownOpen ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
                    </button>
                    {dropdownOpen && (
                        <div className="absolute bottom-full left-0 w-full bg-white border rounded-md shadow z-10 text-xs">
                            {['TOP', 'JUG', 'MID', 'ADC', 'SUP'].map((role) => (
                                <div
                                    key={role}
                                    onClick={() => handleChange(role)}
                                    className="px-2 py-1 hover:bg-gray-100 cursor-pointer text-center"
                                >
                                    {role}
                                </div>
                            ))}
                        </div>
                    )}
                </div>
                <div className="text-xs text-right w-1/2">
                    <span className="text-gray-400">{selectedRole}</span>{' '}
                    <span className={`${tierColor(tier)} font-semibold`}>{tier || '0'}</span>
                </div>
            </div>
        </div>
    )
}

export default SimpleAuctionItemCard
