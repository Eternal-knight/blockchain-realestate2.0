import React from 'react'
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { login } from '../../../services/operations/authAPI';
import {useDispatch} from "react-redux"
import { Link } from 'react-router-dom';

const Login_Form = () => {

  const [walletAddress, setWalletAddress] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });


  const { username, password } = formData;

  const handleOnChange = (e) => {
    setFormData((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.value,
    }))
    //console.log(formData);
  }

  const handleOnSubmit = (e) => {
    e.preventDefault();
    dispatch(login(username, password, navigate))
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
    //console.log(accounts[0]);
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
    <div
    className='flex flex-col justify-center items-center md:w-[45%] bg-white rounded-xl py-5 shadow-[0_2.8px_2.2px_rgba(0,_0,_0,_0.034),_0_6.7px_5.3px_rgba(0,_0,_0,_0.048),_0_12.5px_10px_rgba(0,_0,_0,_0.06),_0_22.3px_17.9px_rgba(0,_0,_0,_0.072),_0_41.8px_33.4px_rgba(0,_0,_0,_0.086),_0_100px_80px_rgba(0,_0,_0,_0.12)]'
    >
        <form onSubmit={handleOnSubmit}
        className='px-8 pt-6 pb-8 mb-4 md:w-[100%] items-center flex-col flex gap-4'
        >

            <h1
            className='text-2xl font-bold text-center'
            >
                Login
            </h1>
            <div
            className='w-full flex justify-center'
            >
                <input 
                type="text" 
                name="username"
                required
                value={username}
                onChange={handleOnChange}
                placeholder='username'
                className='p-3 rounded-lg bg-white text-black outline-none focus:bg-gray-50 duration-200 border border-gray-200 md:w-full'
                />
            </div>

            <div
            className='w-full flex justify-center'
            >
                <input
                type="password"
                placeholder='password'
                name='password'
                required
                value={password}
                onChange={handleOnChange}
                className='p-3 rounded-lg bg-white text-black outline-none focus:bg-gray-50 duration-200 border border-gray-200 md:w-full'
                />
            </div>

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
            className='text-white mx-auto text-center font-semibold text-xl bg-gradient-to-r from-red-600 to-pink-500 hover:from-red-700 hover:to-pink-600 px-4 py-1 rounded-full sm:px-6 sm:py-2 focus:outline-none focus:ring focus:border-blue-300 transition-all duration-300'
            />

            <div className='mb-4'>
                    <span>
                    Don't have an account? 
                    <Link to="/signup" className='text-blue-500 font-semibold ml-1'>
                        Sign Up
                    </Link>
                    </span>
                </div>
        </form>
    </div>
  )
}

export default Login_Form