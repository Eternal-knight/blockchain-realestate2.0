const express = require('express')
const app = express()

app.use(express.json());
const cors = require("cors")


app.use(cors(
  {
    origin: "*",}
))

const port = 5431
require("dotenv").config();



const ethers = require('ethers')
const API_URL = process.env.API_URL;
let PRIVATE_KEY;
let contractAddress;

let provider;
let signer;

let contractInstance;

// contractInstance.transaction({ value: ethers.utils.parseEther("0.004")})
// contractInstance.setValue(1000000000000000*1).then(
    // const {
    //     abi,
    //   } = require("./artifacts/contracts/Lock.sol/DeployPlace.json");
    //   const contractInstance = new ethers.Contract(contractAddress, abi, signer);
//  )

app.post('/InitApi/:contractAddr/:ApiKey', (req, res) => {
    contractAddress  = req.params.contractAddr
     PRIVATE_KEY = req.params.ApiKey
  
   const {abi,} = req.body

    provider = new ethers.providers.JsonRpcProvider(API_URL);
    signer = new ethers.Wallet(PRIVATE_KEY, provider);
    contractInstance = new ethers.Contract(contractAddress,abi,signer);
    console.log(contractAddress,PRIVATE_KEY)
    res.send('200')
   
  })


  app.get('/getOwnerAddress', (req, res) => {
      
    
        contractInstance.getOwnerAddress().then(val=>{
          console.log("success /getOwnerAddrress")
          res.send(val)})
     
    
  })
  

  app.get('/setValue/:value', (req, res) => {


         contractInstance.setValue(1000000000000000*parseInt(req.params.value)).then(()=>{res.send(200)})
         
  })
  app.get('/historyOwnership', (req, res) => {


      contractInstance.getOwnerHistory().then(val=>res.send(val))
  
    
    })

  
  app.get('/transaction', (req, res) => {
 
     contractInstance.transaction().then(res.send(200))
  
}
     
     )

  
  

  app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
  })
// contractInstance.getOwnerAddress().then(res=>console.log(res))
