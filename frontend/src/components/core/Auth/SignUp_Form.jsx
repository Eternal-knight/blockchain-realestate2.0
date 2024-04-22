import React from 'react'
import Avatar from '@mui/material/Avatar';
import { useState } from 'react';
import {useDispatch} from 'react-redux'
import {useNavigate} from 'react-router-dom'
import { register } from '../../../services/operations/authAPI';
import { setUser } from '../../../Slices/authSlice';
import {useEffect} from 'react'

const SignUpForm = () => {

    const [file, setFile] = useState(null);
    const [walletAddress, setWalletAddress] = useState("");
    const [formData, setFormData] = useState({
        fullname: '',
        email: '',
        phone: '',
        username: '',
        password: '',
        metaMaskAddress: ''
    })
    const dispatch = useDispatch();
    const navigate = useNavigate();

    let {fullname, email, phone, username, password, metaMaskAddress} = formData;

    const handleOnChange = (e)  => {
        setFormData((prevData) => ({
            ...prevData,
            [e.target.name]: e.target.value,
        }))
        //console.log(formData);
    }

    const handleFileChange = (e) => {
        const selectedFile = e.target.files[0];
        setFile(selectedFile);
        // Manually set the value for the file input
      };

      const handleOnSubmit =(e) => {
        e.preventDefault();

        //console.log(file);
        const avatarData = {
            name: file ? file.name : '',
            size: file ? file.size : 0,
          };

        dispatch(register(username, password, email, fullname, phone, file, metaMaskAddress, navigate));

        dispatch(setUser({ fullname, email, phone, username, password, avatarData, metaMaskAddress}));
        console.log(formData);
      }

      useEffect(() => {
        getCurrentWalletConnected();
        addWalletListener();
      }, [walletAddress]);
    
    const connectWallet = async () => {
    if (typeof window != "undefined" && typeof window.ethereum != "undefined") {
        try {
        /* MetaMask is installed */
        const accounts = await window.ethereum.request({
            method: "eth_requestAccounts",
        });
        setWalletAddress(accounts[0]);
        const address = accounts[0];
        //console.log(accounts[0]);
        setFormData((prevData) => ({
          ...prevData,
          metaMaskAddress: address, // Update metaMaskAddress in the formData state
      }));
      console.log(address);
        } catch (err) {
        console.error(err.message);
        }
    } else {
        /* MetaMask is not installed */
        console.log("Please install MetaMask");
    }
    };
    
    const getCurrentWalletConnected = async () => {
        if (typeof window != "undefined" && typeof window.ethereum != "undefined") {
        try {
            const accounts = await window.ethereum.request({
            method: "eth_accounts",
            });
            if (accounts.length > 0) {
            setWalletAddress(accounts[0]);
            console.log(accounts[0]);
            } else {
            console.log("Connect to MetaMask using the Connect button");
            }
        } catch (err) {
            console.error(err.message);
        }
    } else {
        /* MetaMask is not installed */
        console.log("Please install MetaMask");
    }
    };
    
    const addWalletListener = async () => {
        if (typeof window != "undefined" && typeof window.ethereum != "undefined") {
            window.ethereum.on("accountsChanged", (accounts) => {
            setWalletAddress(accounts[0]);
            console.log(accounts[0]);
            });
        } else {
            /* MetaMask is not installed */
            setWalletAddress("");
            console.log("Please install MetaMask");
        }
    };
    
  return (
    <>
    <div className='w-full flex flex-col items-center h-screen justify-center'>
        <div>
            <h1 className='font-bold text-2xl '>
                Sign Up Form
            </h1>
        </div>

        <div>
            <form 
            className='px-8 pt-6 pb-8 mb-4 w-96 flex-col flex gap-4'
            onSubmit={handleOnSubmit}
            >
                <div>
              <label htmlFor="avatar" className='cursor-pointer'>
                <div className='flex flex-col items-center gap-2 justify-center'>
                  <Avatar
                    src={file ? URL.createObjectURL(file) : ''}
                    alt="Avatar"
                    style={{ width: '100px', height: '100px' }}
                  />
                  <span>Upload Avatar</span>
                </div>
              </label>
          <input
            type='file'
            id='avatar'
            required
            name='avatar'
            style={{ display: 'none' }}
            className='p-3 rounded-lg bg-white text-black outline-none focus:bg-gray-50 duration-200 border border-gray-200 w-full'
            onChange={(e) => handleFileChange(e)}
          />
                </div>


                <input 
                type="text" 
                required
                name='fullname'
                value={fullname}
                placeholder='Fullname'
                onChange={handleOnChange}
                className='p-3 rounded-lg bg-white text-black outline-none focus:bg-gray-50 duration-200 border border-gray-200 w-full'
                />

                <input 
                type="email" 
                name='email'
                required
                value={email}
                onChange={handleOnChange}
                placeholder='Email'
                className='p-3 rounded-lg bg-white text-black outline-none focus:bg-gray-50 duration-200 border border-gray-200 w-full'
                />

                <input 
                type="text" 
                required
                name='phone'
                value={phone}
                onChange={handleOnChange}
                placeholder='Phone Number'
                className='p-3 rounded-lg bg-white text-black outline-none focus:bg-gray-50 duration-200 border border-gray-200 w-full'
                />

                <input 
                type="text" 
                required
                name='username'
                value={username}
                onChange={handleOnChange}
                className='p-3 rounded-lg bg-white text-black outline-none focus:bg-gray-50 duration-200 border border-gray-200 w-full'
                placeholder='Username'
                />
                <input 
                type="password" 
                required
                name='password'
                value={password}
                onChange={handleOnChange}
                placeholder='Password'
                className='p-3 rounded-lg bg-white text-black outline-none focus:bg-gray-50 duration-200 border border-gray-200 w-full'
                />

                <button
                  className="bg-purple-700 hover:bg-purple-900 text-white font-bold py-2 px-4 rounded w-48 mx-auto"
                  onClick={connectWallet}
                >
                    <span className="is-link has-text-weight-bold">
                    {walletAddress && walletAddress.length > 0
                        ? `Connected`
                        : "Connect Wallet"}
                    </span>
                </button>

                <input 
                type="submit" 
                className='px-6 py-3 bg-green-500 text-white font-semibold rounded-md focus:outline-none focus:shadow-outline-blue'
                />
            </form>
        </div>
    </div>
    </>
  )
}

export default SignUpForm