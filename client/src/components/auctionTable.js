import React, { useState } from 'react';
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
    Text,
    Input,
    FormControl,
    FormLabel,
    Textarea,
    NumberInput,
    NumberInputField,
    Box,
    Button,
    useDisclosure
} from '@chakra-ui/react';
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton
} from '@chakra-ui/react'
import { useNavigate } from 'react-router-dom';
import {toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {pinFileToIPFS} from '../utils/ipfsUploadHandler';

const auctionBid = [
    {
        code: "5c7uu8",
        admin: "aryan satija",
        start_time: "19:07 30-08-2024",
        end_time: "19:37 30-08-2024",
        title: "lab equipments",
        minimum_price: 5000,
        current_price: 7000,
        highest_bidder: "0xc78fF2b7cF14E12513A7475146D69Db7818bb161",
        description: "Get your hands on high-quality lab equipment perfect for any educational or research setting. These tools are essential for precision and accuracy in experiments, now available at a competitive price.",
        image: "https://res.cloudinary.com/dinouvzsz/image/upload/v1703593926/samples/cup-on-a-table.jpg"
    },
    {
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
    },
    {
        code: "3a9zt5",
        admin: "raj patel",
        start_time: "14:30 02-09-2024",
        end_time: "15:30 02-09-2024",
        title: "computer accessories",
        minimum_price: 8000,
        current_price: 9500,
        highest_bidder: "0x1234567890abcdef1234567890abcdef12345678",
        description: "Bid on essential computer accessories including keyboards, mice, and more. Perfect for tech enthusiasts and professionals looking to upgrade their setup at a great price.",
        image: "https://res.cloudinary.com/dinouvzsz/image/upload/v1703593926/samples/cup-on-a-table.jpg"
    },
    {
        code: "6l2rq9",
        admin: "megha sharma",
        start_time: "09:00 03-09-2024",
        end_time: "10:00 03-09-2024",
        title: "projectors",
        minimum_price: 12000,
        current_price: 14000,
        highest_bidder: "0x9F7aBcD1234567890dEf1234567890dEf1234567",
        description: "Enhance your presentations with top-of-the-line projectors. Ideal for both professional and personal use, these projectors offer exceptional clarity and brightness.",
        image: "https://res.cloudinary.com/dinouvzsz/image/upload/v1703593926/samples/cup-on-a-table.jpg"
    }
];


const AuctionTable = () => {
    const navigate = useNavigate();
    const { isOpen, onOpen, onClose } = useDisclosure();
    const finalRef = React.useRef(null);

    const [auctionData, setAuctionData] = useState({
        code: '',
        title: '',
        description: '',
        basePrice: 0,
    });
    const [image, setImage] =  useState(null);
    const [ipfsUrl, setIpfsUrl] = useState('');
    console.log(ipfsUrl);
    const handleChange = (e) => {
        const { name, value } = e.target;
        setAuctionData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleNumberChange = (value) => {
        setAuctionData((prevData) => ({
            ...prevData,
            basePrice: value,
        }));
    };

    const handleFileChange = (e) => {
        setImage(e.target.files[0]);
    };

    const handleSubmit = async() => {
        
        console.log(auctionData);

        if (!auctionData.code || !auctionData.title || !auctionData.description || !auctionData.basePrice || !image) {
            alert("Please fill in all fields.");
            return;
        }

        await uploadHandler();
      
    };
    const uploadHandler = async()=>{
        if(image){
            try{
                const id = toast.loading("uploading file to ipfs...");
                
                const formData = new FormData();
                
                formData.append("file", image);
                
                const data = await pinFileToIPFS(formData);

                toast.update(id, {render: 'File Uploaded to ipfs...', type: 'success', isLoading: false, autoClose: 5000})
                
                setIpfsUrl(data.IpfsHash);
            } catch(err){
                console.log(err);
            }
        }
    }
    return (
        <div>
            <TableContainer>
                <Table className='text-slate-500'>
                    <TableCaption>
                        <Text>Recent Auctions</Text>
                        <>
                            <Box ref={finalRef} tabIndex={-1} aria-label='Focus moved to this box'>
                                Some other content that'll receive focus on close.
                            </Box>

                            <Button mt={4} onClick={onOpen} bg='green.500'>
                                Create Auction
                            </Button>
                            <Modal finalFocusRef={finalRef} isOpen={isOpen} onClose={onClose}>
                                <ModalOverlay />
                                <ModalContent>
                                    <ModalHeader>Create Auction</ModalHeader>
                                    <ModalCloseButton />
                                    <ModalBody>
                                        <FormControl mb={4}>
                                            <FormLabel>Auction Code</FormLabel>
                                            <Input
                                                name="code"
                                                value={auctionData.code}
                                                onChange={handleChange}
                                                placeholder="Enter auction code"
                                            />
                                        </FormControl>
                                        <FormControl mb={4}>
                                            <FormLabel>Title</FormLabel>
                                            <Input
                                                name="title"
                                                value={auctionData.title}
                                                onChange={handleChange}
                                                placeholder="Enter auction title"
                                            />
                                        </FormControl>
                                        <FormControl mb={4}>
                                            <FormLabel>Description</FormLabel>
                                            <Textarea
                                                name="description"
                                                value={auctionData.description}
                                                onChange={handleChange}
                                                placeholder="Enter auction description"
                                            />
                                        </FormControl>
                                        <FormControl mb={4}>
                                            <FormLabel>Base Price</FormLabel>
                                            <NumberInput
                                                value={auctionData.basePrice}
                                                onChange={handleNumberChange}
                                                min={0}
                                            >
                                                <NumberInputField name="basePrice" placeholder="Enter base price" />
                                            </NumberInput>
                                        </FormControl>
                                        <FormControl mb={4}>
                                            <FormLabel>Image</FormLabel>
                                            <Box display="flex" alignItems="center">
                                                <Button
                                                    as="label"
                                                    htmlFor="file-upload"
                                                    cursor="pointer"
                                                    bg="green.500"
                                                    color="white"
                                                    _hover={{ bg: "green.600" }}
                                                    mr={2}
                                                >
                                                    Choose File
                                                </Button>
                                                <Input
                                                    id="file-upload"
                                                    type="file"
                                                    name="image"
                                                    accept='image/*'
                                                    onChange={handleFileChange}
                                                    display="none" 
                                                />
                                                <Box>{image?.name || 'No file chosen'}</Box>
                                            </Box>
                                        </FormControl>
                                    </ModalBody>
                                    <ModalFooter>
                                        <Button colorScheme='green' mr={3} onClick={handleSubmit}>
                                            Create
                                        </Button>
                                        <Button variant='ghost' onClick={onClose}>Close</Button>
                                    </ModalFooter>
                                </ModalContent>
                            </Modal>
                        </>
                    </TableCaption>
                    <Thead>
                        <Tr>
                            <Th>Title</Th>
                            <Th>Start Time</Th>
                            <Th>Admin</Th>
                            <Th>Highest Bid</Th>
                            <Th>Visit</Th>
                        </Tr>
                    </Thead>
                    <Tbody>
                        {auctionBid.map((auction) => (
                            <Tr key={auction.code}>
                                <Td>{auction.title}</Td>
                                <Td>{auction.start_time}</Td>
                                <Td>{auction.admin}</Td>
                                <Td>{auction.current_price}</Td>
                                <Td>
                                    <Button
                                        onClick={() => {
                                            navigate(`/auction/${auction.code}`);
                                        }}
                                        bg='green.500'
                                    >
                                        Visit
                                    </Button>
                                </Td>
                            </Tr>
                        ))}
                    </Tbody>
                    <Tfoot>
                        <Tr>
                            <Th>Title</Th>
                            <Th>Start Time</Th>
                            <Th>Admin</Th>
                            <Th>Highest Bid</Th>
                            <Th>Visit</Th>
                        </Tr>
                    </Tfoot>
                </Table>
            </TableContainer>
        </div>
    );
};

export default AuctionTable;