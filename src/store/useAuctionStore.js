// store/useAuctionStore.js
import { create } from 'zustand'

const useAuctionStore = create((set) => ({
    highestBid: { name: '', amount: 0 },
    bidLogs: [],
    setHighestBid: (name, amount) => set(() => ({
        highestBid: { name, amount }
    })),
    addBidLog: (name, amount) => set((state) => ({
        bidLogs: [{ name, amount }, ...state.bidLogs.slice(0, 4)]
    }))
}))
