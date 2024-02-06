import React from 'react'
import { BiHeart } from "react-icons/bi";
import { HiLightningBolt } from "react-icons/hi";
import { useNavigate } from 'react-router-dom';
    
const Card = ({data,isFeatured}) => {
    const navigate=useNavigate();
    const navigateToDetail=()=>{
        navigate(`/Product-details/${data?.productId}`)
    }
    console.log(data,"dfsgg");
  return (
    <>
        <div className="md:w-1/4 sm:w-1/2 pr-5 mb-3 relative " onClick={navigateToDetail}>
            <div className="border border-gray-200 bg-white shadow-2xl hover:shadow-orange-100 rounded cursor-pointer ">
                <div className="h-52 overflow-hidden p-3">
                    <img src={data.snap.image} alt="asdfa" className="mx-auto w-full h-full object-contain" />
                </div>
                <div className={`p-3 ${isFeatured && "border-yellow-300 border-l-4"}`}>
                    <h2 className="font-bold text-xl">₹ {data.snap.price}</h2>
                    <h3 className="whitespace-nowrap overflow-hidden text-ellipsis">
                        {data.snap.productName}
                    </h3>
                    {/* <h3>{data.category}</h3> */}
                    <p className="text-sm text-gray-500  whitespace-nowrap overflow-hidden text-ellipsis">
                        {data.snap.description}
                    </p>
                </div>
                <div className="bg-white w-fit p-2 rounded-full absolute top-3 right-8 shadow-md ">
                    <BiHeart className="text-2xl" />
                </div>
                {isFeatured && (
                    <div className="absolute top-3 left-2 flex items-center bg-yellow-300 text-sm w-fit rounded px-2 gap-1">
                        <HiLightningBolt />
                        Featured
                    </div>
                )}
            </div>
        </div>
    </>
  )
}

export default Card