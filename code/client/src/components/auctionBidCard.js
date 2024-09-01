import React, {useState} from 'react'
import { Card, CardHeader, CardBody, CardFooter, Stack, Heading, Text, Divider, ButtonGroup, Button } from '@chakra-ui/react';
import {
    Slider,
    SliderTrack,
    SliderFilledTrack,
    SliderThumb,
} from '@chakra-ui/react';
import { GetGlobalProps } from '../context';
import {toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const AuctionBidCard = ({auction}) => {
    console.log(auction);
    let current_price = Number(auction?.current_price) ? auction?.current_price : 0;
    current_price = current_price/1e18;
    const [sliderValue, setSliderValue] = useState(0)
    const {bidAuction} = GetGlobalProps();
    const castBid = async()=>{
        const id = toast.loading("Please Wait...");
        const bid = current_price + 0.01 + (sliderValue*0.01);
        const success = await bidAuction(auction.code, bid);
        if(success){
            toast.update(id, {render: 'Please Refresh the page....', type: 'success', isLoading: false, autoClose: 5000})
        }
        else{
            toast.update(id, {render: 'Something went wrong...', type: 'error', isLoading: false, autoClose: 5000})
        }
    }   
    return (<Card maxW='lg' bg='whiteAlpha.100'>
            <CardBody>
                <Stack mt='6' spacing='3'>
                    <Heading size='xl' className='capitalize text-slate-400'>Current Winner</Heading>
                    <Text className='text-slate-600'>
                        {
                            auction.highest_bidder
                        }
                    </Text>
                    <div className='flex flex-row items-center text-slate-500 font-bold gap-2'>
                        <Text>Time: </Text>
                        <Text>{auction.start_time} - {auction.end_time}</Text>
                    </div>
                    <div>
                        <Slider aria-label='slider-ex-1' defaultValue={0} orientation='vertical' minH='32' onChange={(val)=>{
                            setSliderValue(val);
                        }}>
                            <SliderTrack>
                                <SliderFilledTrack />
                            </SliderTrack>
                            <SliderThumb />
                        </Slider>
                    </div>
                    <div className='text-slate-200 font-bold'>
                        {current_price + 0.01 + (sliderValue*0.01)} eth
                    </div>
                </Stack>
            </CardBody>
            <Divider />
            <CardFooter>
                <ButtonGroup spacing='2'>
                    <Button variant='solid' colorScheme='green' onClick={castBid}>
                        Bid
                    </Button>
                </ButtonGroup>
            </CardFooter>
        </Card>
    )
}

export default AuctionBidCard