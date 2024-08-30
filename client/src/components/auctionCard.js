import React from 'react'
import { Card, CardHeader, CardBody, CardFooter, Image, Stack, Heading, Text, Divider, ButtonGroup, Button } from '@chakra-ui/react'
const AuctionCard = ({auction}) => {
  return (<Card maxW='lg' bg='whiteAlpha.100'>
            <CardBody>
                <Image
                    src={auction.image}
                    alt={auction.title}
                    borderRadius='lg'
                />
                <Stack mt='6' spacing='3'>
                    <Heading size='xl' className='capitalize text-slate-400'>{auction.title}</Heading>
                    <Text className='text-slate-600'>
                        {
                            auction.description
                        }
                    </Text>
                    <Text color='green.600' fontSize='xl' className='font-bold'>
                        Base Price: ₹ {auction.minimum_price}
                    </Text>
                    <Text color='green.600' fontSize='xl' className='font-bold'>
                        Current Price: ₹ {auction.current_price}
                    </Text>
                </Stack>
            </CardBody>
            <Divider />
            <CardFooter>
                <ButtonGroup spacing='2'>
                    <Button variant='solid' colorScheme='green'>
                        Bid
                    </Button>
                    <Button variant='ghost' colorScheme='green'>
                        Back
                    </Button>
                </ButtonGroup>
            </CardFooter>
        </Card>
    )
}

export default AuctionCard