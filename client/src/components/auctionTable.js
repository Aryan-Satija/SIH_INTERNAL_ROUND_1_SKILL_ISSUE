import React, { useState, useEffect } from 'react';
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
import { GetGlobalProps } from '../context';

const AuctionTable = () => {
    const navigate = useNavigate();
    const { isOpen, onOpen, onClose } = useDisclosure();
    const finalRef = React.useRef(null);
    const {createAuction, getAuctions} = GetGlobalProps();

    const [auctionData, setAuctionData] = useState({
        code: '',
        title: '',
        description: '',
        basePrice: 0,
        duration: 0
    });

    const [image, setImage] =  useState(null);

    const [auctions, setAuctions] = useState([]);

    useEffect(() => {
        const fetchAuctions = async () => {
            const auctionList = await getAuctions();
            console.log(auctionList);
            setAuctions(auctionList);
        };

        fetchAuctions();
    }, []);
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

    const handleDurationChange = (value) => {
        setAuctionData((prevData) => ({
            ...prevData,
            duration: value,
        }));
    };

    const handleFileChange = (e) => {
        setImage(e.target.files[0]);
    };
    

    const handleSubmit = async() => {
        
        const ipfsUrl = await uploadHandler();
        
        console.log(ipfsUrl);

        
        if (!auctionData.code || !auctionData.title || !auctionData.description || !auctionData.basePrice || !auctionData.duration || !ipfsUrl || !image) {
            alert("Please fill in all fields.");
            return;
        }

        const id = toast.loading("Creating Auction");
        await createAuction(auctionData.code, auctionData.duration, auctionData.title, auctionData.description, ipfsUrl, auctionData.basePrice);
        toast.update(id, {render: 'Auction Created', type: 'success', isLoading: false, autoClose: 5000})
    };
    const uploadHandler = async()=>{
        if(image){
            try{
                const id = toast.loading("uploading file to ipfs...");
                
                const formData = new FormData();
                
                formData.append("file", image);
                
                const data = await pinFileToIPFS(formData);

                toast.update(id, {render: 'File Uploaded to ipfs...', type: 'success', isLoading: false, autoClose: 5000})
                
                return data.IpfsHash;
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
                                            <FormLabel>Duration</FormLabel>
                                            <NumberInput
                                                value={auctionData.duration}
                                                onChange={handleDurationChange}
                                                min={0}
                                            >
                                                <NumberInputField name="duration" placeholder="Enter duration of the auction here" />
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
                        {auctions.map((auction) => (
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