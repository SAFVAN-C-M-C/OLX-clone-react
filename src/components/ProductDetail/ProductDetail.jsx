import React, { useEffect, useState } from 'react'
import {FiShare2} from 'react-icons/fi'
import {BiHeart} from 'react-icons/bi'
import { useData } from '../../context/DataContext'

const ProductDetail = ({id}) => {
    const {getProduct}=useData()

    const [productData,setProductData]=useState();

    useEffect(()=>{
        
        const fetchData=async()=>{
            try{
                const Snapshot=await getProduct(id)
                setProductData(Snapshot.data())
                console.log(Snapshot.data(),"==============");
            }catch(err){
                console.log(err);
            }
        }
        fetchData();
    },[])

  return (
    <>
        <div className="h-screen w-full  flex justify-center  mt-24">
                <div className="h-full w-[80%]  flex pt-4 ">
                    <div className="h-full w-[65%] overflow-hidden flex flex-col">
                        <div className="w-full h-[70%]  flex flex-col">
                            {/* image */}
                            <div className="h-full w-full bg-gray-100 relative">
                                <img
                                    className="h-full w-full object-contain"
                                    src={productData?.image}
                                    alt="/"
                                />
                            </div>
                        </div>
                    </div>
                    <div className="h-[70%] w-[35%] overflow-hidden bg-slate-50 rounded flex flex-col items-center gap-3">
                        <div className="h-auto w-[95%] rounded flex flex-col p-4 gap-3">
                            <span className="text-4xl font-bold flex w-full justify-between items-center">{productData?.productName} <span className="flex gap-3 text-2xl"><FiShare2 /> <BiHeart /></span> </span>
                            <span>Price: {productData?.price}</span>
                            <span>Category: {productData?.category}</span>
                            {/* <span>Issued:{productData?.createdAt}</span> */}
                        </div>
                        <div className="h-40 w-[95%]  rounded flex flex-col p-4">
                            <span className="flex items-center justify-between w-full text-2xl font-bold">{productData?.userName} </span>    
                            <span className="flex items-center justify-between w-full text-l font-bold">Mob: {productData?.Phone} </span>
                        </div>
                    </div>
                </div>
            </div>
    </>

  )
}

export default ProductDetail