import React, { useState } from 'react'
import { useParams } from 'react-router-dom'
import { DataContextProvider } from '../context/DataContext'
import ProductDetail from '../components/ProductDetail/ProductDetail'
const ProductDetailPage = () => {
    const {id}=useParams()
  return (
    <div className="mt-16">
        <DataContextProvider>
          <ProductDetail id={id} />
        </DataContextProvider>
    </div>
        
  )
}

export default ProductDetailPage