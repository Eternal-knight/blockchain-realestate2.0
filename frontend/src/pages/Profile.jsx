import React, {useEffect, useState} from 'react'
import {useDispatch} from 'react-redux'
import {useNavigate} from 'react-router-dom'
import {useSelector} from 'react-redux'
import Avatar from '@mui/material/Avatar';
import { motion } from 'framer-motion'
import { addProperty } from '../services/operations/propertyAPI';
import axios from 'axios';

const TRUE = import.meta.env.VITE_APP_TRUE_BACKEND
const LOCAL = import.meta.env.VITE_APP_LOCAL_BACKEND

// console.log(TRUE);
// console.log(LOCAL);

const Profile = () => {

    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [file, setFile] = useState(null);
    const [formData, setFormData] = useState({
      city: "",
      state: "",
      address: "",
      price: "",
      description: "",
      PropertyImage: "",
    });

    const { city, state, address, price, description } = formData;

    const {user} = useSelector(state => state.profile) 

    const [PrivateApi, setPrivateApi] = useState(false);
    let contractAddress;

    //console.log(address)

    const handleOnChange = (e) => {
      setFormData((prevData) => ({
        ...prevData,
        [e.target.name]: e.target.value,
      }))
      console.log(formData);
    }

    const handleFileChange = (e) => {
      const selectedFile = e.target.files[0];
      setFile(selectedFile);
      // Manually set the value for the file input
    };

    const publicAddress = localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")).metaMaskAddress : null;



    const handleOnSubmit = async  (e) => {
      e.preventDefault();

      console.log();

      const response = await axios.get(`${TRUE}/init/${publicAddress}`).catch((err) => console.log(err));

        contractAddress = response.data

      dispatch(addProperty(city, state, address, price, description, file, publicAddress,  contractAddress));

      const fetchedJson = await axios.get(`${TRUE}/getjson`).catch((err) => console.log(err));

      console.log(fetchedJson.data);

      setPrivateApi(true);

      // 69aae7d63a5e97cb3554c9d9be2e0f17ca11b3c5f75bd375299d1c95b5fd3ef6
    }

    const handlePrivateApi = async (e) => {
      e.preventDefault();
      const privateApi = document.getElementById('privateApi').value;
      console.log("hello");

      const initForFunction = await axios.post(`${LOCAL}/InitApi/${contractAddress}/${privateApi}`, fetchedJson.data)
      
      const setValue = await axios.get(`${LOCAL}/setValue/1`)
      
      console.log(setValue.data);

      setPrivateApi(false);
    }



  return (
    <>
    
        {PrivateApi && 
        
        <div
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


    <div className='w-full flex justify-center items-center flex-col pb-10 pt-10'
    //style={{height: 'calc(100vh - 64px)'}}
    >
        
        {/* AVATAR */}

        <motion.div
        className='flex flex-col items-center justify-center gap-3 mb-10'
        initial={{opacity: 0, scale: 0.5}}
        animate={{opacity: 1, scale: 1}}
        transition={{duration: 0.5}}
        >
            <Avatar 
            alt={user.fullname} 
            src={user.avatar} 
            sx={{ width: 150, height: 150 }} 
            />
            <span
            className='font-semibold text-white cursor-pointer'
            onClick={() => navigate("/profile/edit")}
            >
              {user.avatar && "Edit Avatar"}
            </span>
        </motion.div>

        {/* USER INFO AND PROPERTY LISTING FORM */}

        <div
        className='flex justify-evenly'
        >

          <motion.div 
          className='flex flex-col items-center justify-center gap-5 shadow-[0_8px_30px_rgb(0,0,0,0.12)] px-4  rounded-md bg-white w-[85%] md:w-1/5 md:h-80 mb-10'
          initial={{opacity: 0, scale: 0.5}}
          animate={{opacity: 1, scale: 1}}
          transition={{duration: 0.5}}
          >

            <div
            className='flex flex-col gap-4'
            >
              <div
              className=''
              style={{width: '100%'}}
              >
                <span
                className='font-semibold text-xl'
                >Personal Details</span>
                </div>    

                <div
                className='flex flex-col gap-4'
                >
                  <div>
                    <span className='font-semibold'>Full Name: </span>
                    <span>{user.fullname}</span>
                  </div>

                  <div>
                    <span>Email: </span>
                    <span>{user.email}</span>
                  </div>

                  <div>
                    <span>Phone: </span>
                    <span>{user.phone}</span>
                  </div>

                  <div>
                    <span>Username: </span>
                    <span>{user.username}</span>
                    </div>
                </div>
            </div>



          </motion.div>

          <motion.div
          className='flex flex-col items-center justify-center gap-3 shadow-[0_8px_30px_rgb(0,0,0,0.12)] p-4 rounded-md bg-white w-[85%] md:w-1/4 mb-10'
          initial={{opacity: 0, scale: 0.5}}
          animate={{opacity: 1, scale: 1}}
          transition={{duration: 0.5}}
          >

            <h1
            className='text-xl font-bold'
            >
              Property Listing
            </h1>

            <form
            className=''
            onSubmit={handleOnSubmit}
            >
              
              
              <input 
              type="text" 
              placeholder='City'
              required
              name='city'
              value={city}
              onChange={handleOnChange}
              className='p-3 rounded-lg bg-white text-black outline-none focus:bg-gray-50 duration-200 border mb-3 border-gray-200 md:w-full'
              />

              <input 
              type='text'
              placeholder='State'
              required
              name='state'
              value={state}
              onChange={handleOnChange}
              className='p-3 rounded-lg bg-white text-black outline-none focus:bg-gray-50 duration-200 border mb-3 border-gray-200 md:w-full'
              />

              <input 
              type="text" 
              placeholder='Address'
              required
              name='address'
              value={address}
              onChange={handleOnChange}
              className='p-3 rounded-lg bg-white text-black outline-none focus:bg-gray-50 duration-200 border mb-3 border-gray-200 md:w-full'
              />

              <input 
              type="number" 
              placeholder='Price'
              required
              name='price'
              value={price}
              onChange={handleOnChange}
              className='p-3 rounded-lg bg-white text-black outline-none focus:bg-gray-50 duration-200 border mb-3 border-gray-200 md:w-full'
              />


              <input 
              type='text'
              required
              placeholder='Description'
              name='description'
              value={description}
              onChange={handleOnChange}
              className='p-3 rounded-lg bg-white text-black outline-none focus:bg-gray-50 duration-200 border mb-3 border-gray-200 md:w-full'
              />

              <input 
              type="file" 
              name='PropertyImage'
              onChange={(e) => handleFileChange(e)}
              className='mb-3'
              />

              <input 
              type="submit" 
              className='bg-orange-500 font-semibold text-white p-3 rounded-lg cursor-pointer hover:bg-orange-600 mb-3 duration-200 w-[80%] mx-auto text-center'
              />
            </form>

          </motion.div>

        </div>
    </div>
    </>
  )
}

export default Profile