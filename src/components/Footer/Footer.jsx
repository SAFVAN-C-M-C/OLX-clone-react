import React from 'react'
import { FaFacebookF, FaInstagram, FaTwitter,FaRegPlayCircle } from 'react-icons/fa'
import FooterColumn from '../FooterColumn/FooterColumn'
const Footer = () => {
  return (
    <>
    <div>
      <div className="bg-gray-300 md:h-60 mt-10 p-20 md:flex justify-between md:px-32">
        <FooterColumn values={['Kolkata','Mumbai','Chennai','Pune']} title={'POPULAR LOCATIONS'}/>
        <FooterColumn values={['Bhubhaneshwar','Hyderabad','Chandigarh','Nashik']} title={'TRENDING LOCATIONS'}/>
        <FooterColumn values={['Contact Us','','','']} title={'ABOUT US'}/>
        <FooterColumn values={['Help','Sitemap','Legal & Privacy information','Valnerability Disclosure Program']} title={'OLX'}/>
        <FooterColumn values={[<FaFacebookF className="text-2xl" />,<FaInstagram className="text-2xl"  />,<FaTwitter className="text-2xl"  />,<FaRegPlayCircle className="text-2xl"  />]} title={'FOLLOW US'}/>
      </div>
      
    </div>
    <div>
      <div className="bg-black h-10 md:px-24 flex justify-between">
        <span className="text-white text-xs mt-2">Help - Sitemap</span>
        <span className="text-white text-xs mt-2">All rights reserved © 2006-2024 OLX</span>
      </div>
    </div>
    </>
  )
}

export default Footer