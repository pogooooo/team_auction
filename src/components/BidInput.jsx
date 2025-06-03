import { useState } from 'react'

const BidInput = ({ onNewBid, highestBid, bidLogs, currentUser }) => {
    const [bidAmount, setBidAmount] = useState('')
    const [userPoints, setUserPoints] = useState(currentUser.points)

    const handleBid = () => {
        const amount = Number(bidAmount)

        if (!amount || isNaN(amount)) return
        if (amount > userPoints) {
            alert('포인트가 부족합니다.')
            return
        }

        if (amount <= highestBid.amount) {
            alert(`현재 최고 입찰액 ${highestBid.amount}P 보다 높은 금액만 입찰할 수 있습니다.`)
            return
        }

        // 포인트 차감 및 상위 입찰 등록
        setUserPoints(prev => prev - amount)
        onNewBid(currentUser.name, amount)
        setBidAmount('')
    }

    return (
        <section className="bg-white border rounded-xl p-4 shadow space-y-4">
            <div className="flex items-center justify-between">
                <h2 className="text-xl font-bold">입찰하기</h2>
                <span className="text-sm text-gray-500">
          남은 포인트: <span className="font-semibold text-gray-800">{userPoints}P</span>
        </span>
            </div>
            <div className="flex gap-2">
                <input
                    type="number"
                    value={bidAmount}
                    onChange={(e) => setBidAmount(e.target.value)}
                    placeholder="입찰 금액"
                    className="flex-1 border px-4 py-2 rounded-xl text-sm"
                />
                <button
                    onClick={handleBid}
                    className="bg-blue-600 text-white px-6 py-2 rounded-xl shadow text-sm"
                >
                    입찰
                </button>
            </div>
            {bidLogs.length > 0 && (
                <div className="border-t pt-3">
                    <h3 className="text-sm font-semibold text-gray-700 mb-2">최근 입찰 내역</h3>
                    <ul className="text-sm text-gray-600 space-y-1">
                        {bidLogs.map((log, i) => (
                            <li key={i} className="flex justify-between">
                                <span>{`${i + 1}위: ${log.name}`}</span>
                                <span className="font-medium">{log.amount}P</span>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </section>
    )
}

export default BidInput
