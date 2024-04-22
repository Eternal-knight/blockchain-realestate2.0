import React, {useState, useEffect} from 'react'
import Login_Form from '../components/core/Auth/Login_Form'
import realestate from "../assets/login_hero.jpeg"

const Login_Page = () => {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };


    // Add event listener for window resize
    window.addEventListener('resize', handleResize);

    // Remove event listener on component unmount
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);


  return (
    <div
    className='flex h-screen justify-center'
    >
      <div
      className=' md:w-full'
      >
        <div
        className='w-full h-full flex justify-center items-center'
        >
          <Login_Form />
        </div>
      </div>

      {!isMobile && <div className='w-full'>
        <img 
        src={realestate} 
        alt=""
        className='object-cover w-full h-full'
        />
      </div>}
    </div>
  )
}

export default Login_Page