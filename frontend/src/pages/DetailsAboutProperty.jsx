import React, { useEffect, useState } from 'react'
import {useParams} from 'react-router-dom'
import axios from 'axios'
import { motion } from 'framer-motion'


const TRUE = import.meta.env.VITE_APP_TRUE_BACKEND
const LOCAL = import.meta.env.VITE_APP_LOCAL_BACKEND
// console.log(TRUE);

const DetailsAboutProperty = () => {

    const {id} = useParams()
    console.log("Id is : ",id)
    const [property, setProperty] = useState({})
    const [modal, setModal] = useState(false)
    const [fetchedJson,setFetchedJson] = useState([])
    const [initForFunction, setinitForFunction] = useState([])

    useEffect(() => {
        const fetchData = async () => {
            const propertyData = await axios.get(`http://localhost:8000/api/v1/property/get-property/${id}`) 
            //console.log(propertyData.data.data);

            setProperty(propertyData.data.data)
        }

        fetchData()

     }, [])

     const handleClick = async () => {
         let fetchedJson_ = await axios.get(`${TRUE}/getjson`).catch((err) => console.log(err));
         const data = await fetchedJson_.data;
         setFetchedJson(data);
         console.log(data);
         setModal(true)

     }

     const handlePrivateApi = async (e) => {
       
        e.preventDefault();
        const privateApi = document.getElementById('privateApi').value;

        const contractAddress = property.contractAddress;

        console.log(contractAddress, fetchedJson);
  
        const data = await axios.post(`${LOCAL}/InitApi/${contractAddress}/${privateApi}`, fetchedJson)

        setinitForFunction(data.data);
  
        setModal(false);
      }


  return (
    <div>
        {modal && <div
        className='fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center z-50'
        >
        <motion.div
        className=' bg-white absolute top-[40%] left-[35%] transform -translate-x-1/2 -translate-y-1/2 flex justify-center items-center flex-col rounded-md shadow-lg p-5 gap-5 z-50'
        initial={{opacity: 0, scale: 0.5}}
        animate={{opacity: 1, scale: 1}}
        transition={{duration: 0.5}}
        >
            <form
            onSubmit={handlePrivateApi}
            className='flex flex-col gap-3'
            >
                <input 
                type="text" 
                className='p-3 rounded-lg bg-white text-black outline-none focus:bg-gray-50 duration-200 border border-gray-200 md:w-96'
                placeholder='Private API'
                id='privateApi'
                />

                <input 
                type="submit" 
                className='bg-orange-500 font-semibold text-white p-3 rounded-lg cursor-pointer hover:bg-orange-600 mb-3 duration-200 w-[80%] mx-auto text-center'
                />
            </form>
            </motion.div>
            </div>
    }
        <div className="flex justify-center">
            <img
            src={property.PropertyImage}
            alt="food"
            className="rounded-md h-40 w-40 object-cover" 
            />
        </div>
        <div className="mt-2 w-1/2 md:w-full flex-col gap-2 flex">
            <span className="text-lg font-semibold text-center text-gray-700">
            {property.city}, {property.state}
            </span>
            <div className="flex justify-center mt-2">
            <p className="text-lg font-semibold text-center text-gray-700">
                Price
                {property.price} ethers
            </p>
            </div>
            <div className="flex justify-center mt-2">
                <div
                    className=" text-black font-bold py-2 px-4 rounded"
                >
                    Read Details : {property.description}
                </div>
            </div>

            <button
            className='bg-gradient-to-r from-green-400 to-blue-500 text-white font-bold py-2 px-4 rounded w-48 mx-auto mb-8'
            onClick={handleClick}
            >
                Buy
            </button>
        </div>
    </div>
  )
}

export default DetailsAboutProperty