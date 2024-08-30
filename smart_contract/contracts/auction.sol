// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

contract Auction {
    event auctionCreated(uint256 code, string title, uint256 minimum_price, uint256 duration);
    event bidPlaced(uint256 code, string title, uint256 bid, address bidder);

    address public admin;
    
    constructor(){
        admin = msg.sender;
    }

    struct auction_structure {
        uint256 code;
        address admin;
        uint256 start_time;
        uint256 end_time;
        string title;
        string description;
        uint256 minimum_price;
        uint256 current_price;
        address highest_bidder;
        string image;
    }

    auction_structure[] public live_auctions;

    function auction_init(uint256 code, address auction_admin, uint256 duration, string memory title, string memory description, uint256 minimum_price) public {
        uint256 start_time = block.timestamp;
        uint256 end_time = start_time + duration;

        live_auctions.push(auction_structure({
            code: code,
            admin: auction_admin,
            start_time: start_time,
            end_time: end_time,
            title: title,
            description: description,
            minimum_price: minimum_price,
            current_price: 0,
            highest_bidder: address(0)
        }));
        

        emit auctionCreated(code, title, minimum_price, duration);
    }

    function auction_bid(uint256 code) public payable {
        uint256 tot = live_auctions.length;
        bool auctionFound = false;
        for(uint256 i = 0; i < tot; i++){
            if(live_auctions[i].code == code){
                auctionFound = true;
                require(msg.value > live_auctions[i].current_price, "Current bid should be greater than the previous one.");
                require(block.timestamp <= live_auctions[i].end_time, "Auction Closed");
                live_auctions[i].current_price = msg.value;
                live_auctions[i].highest_bidder = msg.sender;
                emit bidPlaced(code, live_auctions[i].title, msg.value, msg.sender);
                break;
            }
        }
        require(auctionFound, "Auction not found");
    }
}