import React from 'react'
import AuctionTable from '../components/auctionTable' 
export const Auction = () => {
  return (
    <div className='px-4 min-h-screen flex flex-row gap-4 items-center justify-center pt-[5.5rem]'>
        <div className='w-full px-16'>
            <div className='text-center text-4xl pb-16 text-slate-200 font-bold'>
                Active Auctions: Bid on Exclusive Items
            </div>
            <div>
                <AuctionTable/>
            </div>
        </div>
    </div>
  )
}

