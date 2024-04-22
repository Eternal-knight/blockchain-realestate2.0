
// require("dotenv").config();

// const API_URL = process.env.API_URL;
// const PRIVATE_KEY = process.env.PRIVATE_KEY;
// const contractAddress = process.env.CONTRACT_ADDRESS;

const ApiPage = async () => {
    const {ethers} = require("ethers");
    const provider = new ethers.BrowserProvider(window.ethereum);
    // It will prompt user for account connections if it isnt connected
    const signer = await provider.getSigner();
    console.log("Account:", await signer.getAddress());
}

export default ApiPage

// const {
//   abi,
// } = require("./place.json");
// const contractInstance = new ethers.Contract(contractAddress, abi, signer);

// // contractInstance.transaction({ value: ethers.utils.parseEther("0.004")})
// contractInstance.setValue(1000000000000000*1).then(

//  )