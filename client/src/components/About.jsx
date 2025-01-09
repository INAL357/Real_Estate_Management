//import React from 'react'
import aboutImg from '../assets/about.png';
import { BsCheck2Circle } from 'react-icons/bs';

const About = () => {
  return (
    <section className="max-padd-container py-16 x1:py-28">
      <div className="flex flex-col xl:flex-row gap-10">
       {/* Left */}
       <div className="flex-1">
       <img src={aboutImg} alt="About Image" className="h-[511px] w-full rounded-xl object-cover" />
       </div>

       {/* Right */}
       <div className="flex flex-1 flex-col p-6">
         <div className="pb-4">
         <h6 className="capitalize text-xl">Few steps to your new home</h6>
      <h2 className="h2 capitalize text-3xl font-bold">This is how easy it can be</h2>
         </div>
 

        <ul>
            <li className="flex item-center gap-x-3 py-2">
                <BsCheck2Circle/> Access exclusive property listings 
            </li>
            <li className="flex item-center gap-x-3 py-2">
                <BsCheck2Circle/> Experts advice from local real estate profeesional
            </li>
            <li className="flex item-center gap-x-3 py-2">
                <BsCheck2Circle/> Find yor Dream home in prime location
            </li>
            <li className="flex item-center gap-x-3 py-2">
                <BsCheck2Circle/> Seamless online property search experience
            </li>
            <li className="flex item-center gap-x-3 py-2">
                <BsCheck2Circle/> Get personalized property recommendations
            </li>
            <li className="flex item-center gap-x-3 py-2">
                <BsCheck2Circle/> Transparent and hassle-free transactions
            </li>
            <li className="flex item-center gap-x-3 py-2">
                <BsCheck2Circle/> 24/7 customer support for all your inquires 
            </li>
            <li className="flex item-center gap-x-3 py-2">
                <BsCheck2Circle/> comprehensive market analysis and report 
            </li>
            
        </ul>
        </div>
        </div>
    </section>
  )
}

export default About