import React, {createContext, useContext, useState} from 'react';
import {ethers} from 'ethers'; // ethers library is used to interact with the ethereum blockchains
import { toast } from 'react-toastify';
import { contractAddress, contractAbi, auctionContractAddress, auctionContractAbi } from '../constants'; // address of a smart contract on the Ethereum blockchain and the Application Binary Interface (ABI) for that contract
const myContext = createContext();
const { ethereum } = window; // The ethereum object is destructured from the window global object. 
const createContract = async()=>{
    const provider = new ethers.BrowserProvider(ethereum);
    const signer = await provider.getSigner();
    const contract = new ethers.Contract(contractAddress, contractAbi, signer);
    
    return contract;
}
const createAuctionContract = async()=>{
    const provider = new ethers.BrowserProvider(ethereum);
    const signer = await provider.getSigner();
    const auctioncontract = new ethers.Contract(auctionContractAddress, auctionContractAbi, signer);
    return auctioncontract;
}

export const MyProvider = ({children})=>{
    const [currentAccount, setCurrentAccount] = useState('');
    
    const connectToWallet = async()=>{
        try{
            if(!ethereum){
                toast('Please Install Metamask!', {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "dark",
                })
                return;
            }

            const accounts = await ethereum.request({method: 'eth_accounts'});

            if(accounts.length > 0) {
                setCurrentAccount(accounts[0])
            }
            else{
                await requestToConnectWallet()
            }
        } catch(err){
            console.log(err);
        }
    }

    const requestToConnectWallet = async()=>{
        try{
            if(!ethereum){
                toast('Please Install Metamask!', {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "dark",
                });
                return;
            }
            const accounts = await ethereum.request({method: 'eth_requestAccounts'});
            if(accounts.length > 0) setCurrentAccount(accounts[0]);
        } catch(err){
            console.log(err);
        }
    }

    const addPdfHash = async(pdfHash, name, publicKey)=>{
        if(!ethereum){
            toast('Please Install Metamask!', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
            });
            return;
        }

        try{
            const contract = await createContract();
            let account = await ethereum.request({
                method: 'eth_accounts'
            });
            
            if(account.length == 0){
                toast('Please Connect To Your MetaMask Wallet', {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "dark",
                });
                return;
            }
            account = account[0];
            const txHash = await contract.secureDocuments(pdfHash, name, publicKey);
            await txHash.wait();
            return txHash.hash;
        } catch(err){
            toast.error(`Something went wrong while uploading to blockchain`, {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
                // transition: Bounce,
            });
        }

    }

    const validateDoc = async(docHash, publicKey)=>{
        try{
            if(!ethereum){
                toast('Please Install Metamask!', {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "dark",
                });
                return;
            }
            const contract = await createContract();
            const verdict = (await contract.validateDocuments(docHash, publicKey)).toString()
            return verdict;
        } catch(err){
            console.log(err);
        }
    }

    const createAuction = async(code, duration, title, description, image, minimum_price)=>{
        try{
            if(!ethereum){
                toast('Please Install Metamask!', {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "dark",
                });
                return;
            }
            const contract = await createAuctionContract();
            let account = await ethereum.request({
                method: 'eth_accounts'
            });
            account = account[0];
            await contract.auction_init(code, account, duration, title, description, image, minimum_price)
            return true;
        } catch(err){
            console.log(err);
            return false;
        }
    }

    const bidAuction = async(code)=>{
        try{
            if(!ethereum){
                toast('Please Install Metamask!', {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "dark",
                });
                return;
            }
            const contract = await createAuctionContract();
            await contract.auction_bid(code);
            return true;
        } catch(err){
            console.log(err);
            return false;
        }
    }

    return (<myContext.Provider value={{
        currentAccount,
        connectToWallet,
        requestToConnectWallet,
        validateDoc,
        addPdfHash,
        createAuction,
        bidAuction
    }}>
    {
        children
    }
    </myContext.Provider>)
}

export const GetGlobalProps = ()=>{
    return useContext(myContext);
}