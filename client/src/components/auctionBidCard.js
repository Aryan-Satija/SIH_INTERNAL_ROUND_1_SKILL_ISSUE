import React, {useState} from 'react'
import { Card, CardHeader, CardBody, CardFooter, Stack, Heading, Text, Divider, ButtonGroup, Button } from '@chakra-ui/react';
import {
    Slider,
    SliderTrack,
    SliderFilledTrack,
    SliderThumb,
} from '@chakra-ui/react'
const AuctionBidCard = ({auction}) => {
    const current_price = auction?.current_price;
    const [sliderValue, setSliderValue] = useState(0)
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
                    <Button variant='solid' colorScheme='green'>
                        Bid
                    </Button>
                </ButtonGroup>
            </CardFooter>
        </Card>
    )
}

export default AuctionBidCard