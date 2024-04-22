// 0.001ethers = 1000000000000000 wei
// value is 0.001 is mul by 1000
// import { BigNumber } from "@ethersproject/bignumber";
// import { parseUnits } from "@ethersproject/units";
const express = require('express')
const {ethers} = require("ethers");
const placeJson =  require("./artifacts/contracts/Lock.sol/place.json")
require("dotenv").config();
const cors = require("cors")

const app = express()
const port = 3000
app.use(cors(
  {
    origin: "*",
  
  }
))
const API_URL = process.env.API_URL;
const PRIVATE_KEY = process.env.PRIVATE_KEY;
const contractAddress = process.env.CONTRACT_ADDRESS;

const provider = new ethers.providers.JsonRpcProvider(API_URL);
const signer = new ethers.Wallet(PRIVATE_KEY, provider);
const {
  abi,
} = require("./artifacts/contracts/Lock.sol/DeployPlace.json");
const contractInstance = new ethers.Contract(contractAddress, abi, signer);
// contractInstance.transaction({ value: ethers.utils.parseEther("0.004")}).then()
// contractInstance.setValue(1000000000000000*2).then(
// )

// contractInstance.getPlaceValue().then((res)=>console.log({'Ether':Number(res["_hex"])/100000000000}))
// contractInstance.deploying("0x70Bd2e1610E0bB0C5EA91690dB53E65ea98794BC").then(()=>{

//   contractInstance.getContract(0).then((res)=>console.log(res))

// })

// contractInstance.getOwnerHistory().then((res)=>console.log(res))

app.get('/init/:address', async (req, res) => {
  const address_ = req.params.address;
  
 try {
   contractInstance.deploying(address_).then(
     contractInstance.getLatestIndex().then((val)=>{
       contractInstance.getContract(val).then((addr)=>{
          console.log("Success init/:address",addr)
           res.send(addr)
          
       })
     }) 
 
   )
 } catch (error) {
    console.log("init/:address",error)
 }
 
  

})

app.get("/getjson",(req,res)=>{
  res.send(placeJson)
})

app.listen(port,"0.0.0.0" ,() => {
  console.log(`Example app listening on port ${port}`)
})

function toChecksumAddress(address) {
  address = address.toLowerCase().replace("0x", "");
  var hash = createKeccakHash("keccak256").update(address).digest("hex");
  var ret = "0x";

  for (var i = 0; i < address.length; i++) {
    if (parseInt(hash[i], 16) >= 8) {
      ret += address[i].toUpperCase();
    } else {
      ret += address[i];
    }
  }

  return ret;
}
