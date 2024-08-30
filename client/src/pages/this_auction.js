import React from 'react'
import AuctionCard from '../components/auctionCard'
export const MyAuction = () => {
    const auction = {
        code: "8f4bx2",
        admin: "nidhi verma",
        start_time: "10:00 01-09-2024",
        end_time: "11:00 01-09-2024",
        title: "office furniture",
        minimum_price: 15000,
        current_price: 18000,
        highest_bidder: "0xaBc1234567890dEf1234567890dEf1234567890",
        description: "Upgrade your workspace with our premium office furniture auction. From ergonomic chairs to modern desks, elevate your office environment with these stylish and functional pieces.",
        image: "https://res.cloudinary.com/dinouvzsz/image/upload/v1703593926/samples/cup-on-a-table.jpg"
    }
    return (
        <div className='px-4 min-h-screen flex flex-row gap-4 items-center justify-center pt-[5.5rem]'>
            <div>
                <AuctionCard auction={auction}/>
            </div>
        </div>
    )
}