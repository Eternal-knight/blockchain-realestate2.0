import React, {useEffect, useState} from 'react'
import axios from "axios"
import {useNavigate} from "react-router-dom"
import {Link} from "react-router-dom"

const Marketplace = () => {

  const [properties, setProperties] = useState([])
  const navigate = useNavigate()

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get("http://localhost:8000/api/v1/property/get-properties")
      //console.log(response.data.data);
      setProperties(response.data.data)
    }

    fetchData()
  }, [])

  const handleClick = (item) => {
    <Link x />
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 p-10">
    {properties?.map((item) => (
        <div key={item._id} className="bg-white shadow-[inset_-12px_-8px_40px_#46464620] rounded py-4 flex md:flex-col justify-between px-2">
          <div className="flex justify-center">
            <img
              src={item.PropertyImage}
              alt="food"
              className="rounded-md h-40 w-40 object-cover" 
            />
          </div>
          <div className="mt-2 w-1/2 md:w-full flex-col gap-2 flex">
            <span className="text-lg font-semibold text-center text-gray-700">
              {item.city}, {item.state}
            </span>


            <div className="flex justify-center mt-2">
              <p className="text-lg font-semibold text-center text-gray-700">
                {item.price} ethers
              </p>
            </div>
            <div className="flex justify-center mt-2">
              <Link to={`/property/${item._id}`}
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              >
                Read Details
              </Link>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

export default Marketplace