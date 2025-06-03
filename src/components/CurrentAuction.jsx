import AuctionItemCard from './AuctionItemCard'

const CurrentAuction = ({ item }) => (
    <section>
        <h2 className="text-xl font-bold mb-2">현재 경매 중</h2>
        <AuctionItemCard item={item} />
    </section>
)

export default CurrentAuction
