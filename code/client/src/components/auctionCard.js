import React from 'react'
import { Card, CardHeader, CardBody, CardFooter, Image, Stack, Heading, Text, Divider, ButtonGroup, Button } from '@chakra-ui/react'
import { useNavigate } from 'react-router-dom'
const AuctionCard = ({auction}) => {

    const navigate = useNavigate();

  return (<Card maxW='lg' bg='whiteAlpha.100'>
            <CardBody>
                <Image
                    src={`https://emerald-effective-scorpion-239.mypinata.cloud/ipfs/${auction.image}`}
                    alt={auction.title}
                    borderRadius='lg'
                />
                <Stack mt='6' spacing='3'>
                    <Heading size='xl' className='capitalize text-slate-400'>{auction.title}</Heading>
                    <Text className='text-yellow-800 font-bold'>By {auction.admin}</Text>
                    <Text className='text-slate-600'>
                        {
                            auction.description
                        }
                    </Text>
                    <Text color='whiteAlpha.700' fontSize='xl' className='font-bold'>
                        Base Price: {auction.minimum_price} eth
                    </Text>
                    <Text color='whiteAlpha.700' fontSize='xl' className='font-bold'>
                        Current Price: {auction.current_price} eth 
                    </Text>
                </Stack>
            </CardBody>
            <Divider />
            <CardFooter>
                <ButtonGroup spacing='2'>
                    <Button variant='solid' colorScheme='green'>
                        Bid
                    </Button>
                    <Button variant='ghost' colorScheme='green' onClick={()=>{
                        navigate("/auction");
                    }}>
                        Back
                    </Button>
                </ButtonGroup>
            </CardFooter>
        </Card>
    )
}

export default AuctionCard