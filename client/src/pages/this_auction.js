import React, {useState, useEffect} from 'react';
import AuctionCard from '../components/auctionCard';
import AuctionBidCard from '../components/auctionBidCard';
import { GetGlobalProps } from '../context';
import { useParams } from 'react-router-dom';
import { Spinner } from '@chakra-ui/react'

export const MyAuction = () => {
    const [auction, setAuction] = useState(null);
    const {getAuctions} = GetGlobalProps();
    const {auctionid} = useParams();

    useEffect(() => {
        const fetchAuctions = async () => {
            const auctionList = await getAuctions();
            const target = auctionList.find((auc)=>{
                return auc.code == auctionid
            });
            setAuction(target);
        };

        fetchAuctions();
    }, []);

    return (
        <div className='px-4 min-h-screen flex flex-row gap-24 items-center justify-center pt-[5.5rem]'>
            <div>
                {
                    !auction &&
                    <div>
                        <Spinner/>
                    </div>
                }
            </div>
            <div>{
                auction && 
                <AuctionCard auction={auction}/>
            }
            </div>
            <div>
            {
                auction && 
                <AuctionBidCard auction={auction}/>
            }
            </div>
        </div>
    )
}