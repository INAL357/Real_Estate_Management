//import React from 'react';
import Header from '../components/Header';
import Hero from '../components/Hero';
import Features from '../components/Features';
import Listing from '../components/Listing';
import About from'../components/About';
import Footer from '../components/Footer';
import ListingCard from '../components/ListingCard';


const Home = () => {
  return (
    <>
      <Header/>
      <Hero />
      <Features />
      <Listing />
      <ListingCard />
  
      <About/>
      <Footer/>
     </>
  )
}
export default Home;
