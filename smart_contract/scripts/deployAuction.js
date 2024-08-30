const hre = require('hardhat');

(async()=>{
    const auction = await hre.ethers.deployContract('Auction');
    await auction.waitForDeployment();
    console.log(`Contract deployed to ${auction.target}`)
})()
.then(()=>{
    console.log('Contract deployed successfully');
    process.exit(0);
})
.catch((err)=>{
    console.log('Something went wrong');
    console.log(err);
    process.exit(1);   
})