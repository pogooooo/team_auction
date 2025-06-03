import CurrentAuction from '../CurrentAuction'
import BidInput from '../BidInput'

const AuctionMain = ({ currentItem, onNewBid, highestBid, bidLogs, currentUser }) => {
    return (
        <main className="flex-1 bg-gray-50 flex flex-col overflow-hidden">
            <div className="flex-1 p-6 overflow-y-auto">
                <CurrentAuction item={currentItem} />
                <div className="mt-4">
                    <BidInput
                        onNewBid={onNewBid}
                        highestBid={highestBid}
                        bidLogs={bidLogs}
                        currentUser={currentUser}
                    />
                </div>
            </div>
        </main>
    )
}

export default AuctionMain
