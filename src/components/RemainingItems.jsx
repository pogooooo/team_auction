import AuctionItemCard from './AuctionItemCard'
import { useState, useMemo } from 'react'

const tierRank = {
    'Iron': 0,
    'Bronze': 1,
    'Silver': 2,
    'Gold': 3,
    'Platinum': 4,
    'Emerald': 5,
    'Diamond': 6,
    'Master': 7,
    'Grandmaster': 8,
    'Challenger': 9,
}

const parseTier = (tierStr) => {
    if (!tierStr || tierStr === 'X') return -1
    const [tier, num] = tierStr.split(' ')
    const base = tierRank[tier] || 0
    return base * 10 + (5 - parseInt(num)) // 높은 숫자가 낮은 등수니까 뒤집기
}

const roles = ['ALL', 'TOP', 'JUG', 'MID', 'ADC', 'SUP']

const RemainingItems = ({ items = [] }) => {
    const [filterRole, setFilterRole] = useState('ALL')

    const filteredItems = useMemo(() => {
        let filtered = [...items]
        if (filterRole !== 'ALL') {
            filtered = filtered.filter(item => {
                const tier = item[filterRole]
                return tier && tier !== '' && tier !== 'X'
            }).sort((a, b) => parseTier(b[filterRole]) - parseTier(a[filterRole]))
        }
        return filtered
    }, [filterRole, items])

    return (
        <section>
            <div className="flex items-center justify-between mb-2">
                <h2 className="text-xl font-bold">남은 경매 아이템</h2>
                <div className="flex gap-2">
                    {roles.map(role => (
                        <button
                            key={role}
                            onClick={() => setFilterRole(role)}
                            className={`px-3 py-1 text-sm rounded-full border ${
                                filterRole === role ? 'bg-blue-500 text-white' : 'bg-white text-gray-700'
                            }`}
                        >
                            {role}
                        </button>
                    ))}
                </div>
            </div>
            <div className="grid grid-cols-2 xl:grid-cols-3 gap-4">
                {filteredItems.map((item, idx) => (
                    <AuctionItemCard key={idx} item={item} />
                ))}
            </div>
        </section>
    )
}

export default RemainingItems
