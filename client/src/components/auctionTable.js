import React from 'react'
import {
    Table,
    Thead,
    Tbody,
    Tfoot,
    Tr,
    Th,
    Td,
    TableCaption,
    TableContainer,
} from '@chakra-ui/react';

const auctionBid = [
    {
        code: "5c7uu8",
        admin: "aryan satija",
        start_time: "19:07 30-08-2024",
        end_time: "19:37 30-08-2024",
        title: "lab equipments",
        minimum_price: 5000,
        current_price: 7000,
        highest_bidder: "0xc78fF2b7cF14E12513A7475146D69Db7818bb161"
    },
    {
        code: "8f4bx2",
        admin: "nidhi verma",
        start_time: "10:00 01-09-2024",
        end_time: "11:00 01-09-2024",
        title: "office furniture",
        minimum_price: 15000,
        current_price: 18000,
        highest_bidder: "0xaBc1234567890dEf1234567890dEf1234567890"
    },
    {
        code: "3a9zt5",
        admin: "raj patel",
        start_time: "14:30 02-09-2024",
        end_time: "15:30 02-09-2024",
        title: "computer accessories",
        minimum_price: 8000,
        current_price: 9500,
        highest_bidder: "0x1234567890abcdef1234567890abcdef12345678"
    },
    {
        code: "6l2rq9",
        admin: "megha sharma",
        start_time: "09:00 03-09-2024",
        end_time: "10:00 03-09-2024",
        title: "projectors",
        minimum_price: 12000,
        current_price: 14000,
        highest_bidder: "0x9F7aBcD1234567890dEf1234567890dEf1234567"
    }
]

const AuctionTable = () => {
  return (
    <div>
        <TableContainer>
            <Table className='text-slate-500'>
                <TableCaption>Recent Auctions</TableCaption>
                <Thead>
                    <Tr>
                        <Th>title</Th>
                        <Th>start_time</Th>
                        <Th>admin</Th>
                        <Th>highest bid</Th>
                        <Th>Visit</Th>
                    </Tr>
                </Thead>
                <Tbody>
                    {
                        auctionBid.map((bid)=>{
                            return (<Tr>
                                <Td>{bid.title}</Td>
                                <Td>{bid.start_time}</Td>
                                <Td>{bid.admin}</Td>
                                <Td>{bid.current_price}</Td>
                                <Td>
                                    <button className='bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded'>Visit</button>
                                </Td>
                            </Tr>)
                        })  
                    }
                    </Tbody>
                    <Tfoot>
                        <Tr>
                            <Th>title</Th>
                            <Th>start_time</Th>
                            <Th>admin</Th>
                            <Th>highest bid</Th>
                            <Th>Visit</Th>
                        </Tr>
                    </Tfoot>
            </Table>
            </TableContainer>
    </div>
  )
}

export default AuctionTable