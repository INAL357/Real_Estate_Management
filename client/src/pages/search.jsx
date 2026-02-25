import {  useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import Loader from '../components/Loader';
import { setListings } from '../redux/state';
import Header from '../components/Header';
import ListingCard from '../components/ListingCard';

const Search = () => {
    const [loading, setLoading] = useState(true);
    const{search} = useParams()
    const listing =useSelector((state)=>state.listings)
    const dispatch = useDispatch();
  
const getSearchListing = async ()=>{
    try{
        const response =await fetch(`${import.meta.env.VITE_API_URL}/listing/search/${search}`,{
            method:"GET"
        })
        const data = await response.json()
        dispatch(setListings({listing:data}))
        setLoading(false)
    }catch(err){
        console.log("fetch search list failed",err.message)
    }
}
useEffect(()=>{
    getSearchListing()
},[search])
return loading ? (
    <Loader />
  ) : (
    <>
      <Header />
      <section className="max-padd-container pt-10">
        <h3 className="h3">{search}</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {
            listing?.map(
              ({
                _id,
                creator,
                listingPhotoPaths,
                city,
                province,
                country,
                category,
                type,
                price,
                title,
                description,
                booking = false,
              }) => (
                <ListingCard
                  key={_id}
                  listingId={_id}
                  creator={creator}
                  listingPhotoPaths={listingPhotoPaths}
                  city={city}
                  province={province}
                  country={country}
                  category={category}
                  type={type}
                  price={price}
                  title={title}
                  description={description}
                  booking={booking}
                />
              )
            
         
          )}
        </div>
      </section>
    </>
  );
};

export default Search;
