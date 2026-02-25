
import  { useEffect, useState } from "react";
import { categories } from "../assets/data";
import { useDispatch, useSelector } from "react-redux";
import { setListings } from "../redux/state.js";
import Loader from "./Loader.jsx";
import ListingCard from "./ListingCard.jsx";
//import Booking from './../../../server/models/Booking';


const Listing = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const [selectCategory, setSelectCategory] = useState("All");
  const listings = useSelector((state) => state.listings);

  const getQueryListing = async () => {
    setLoading(true); // Reset loading state before fetching data
    try {
      const response = await fetch(
        selectCategory !== "All"? `${import.meta.env.VITE_API_URL}/listing?qCategory=${selectCategory}`
          : "${import.meta.env.VITE_API_URL}/listing",
        { method: "GET" }
      );
  
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
  
      const data = await response.json();
      dispatch(setListings({ listings: data }));
    } catch (err) {
      console.error("Fetch Listing Failed", err.message);
    } finally {
      setLoading(false); // Ensure loading is stopped in all cases
    }
  };
  

  useEffect(() => {
    getQueryListing();
  }, [selectCategory]);

  return (
    <section id="listing" className="max-padd-container py-12">
      {/* Title */}
      <div className="text-center pb-16">
        <h6 className="capitalize">From concept to reality</h6>
        <h2 className="h2 capitalize">Discover our new Listing</h2>
      </div>
      
      {/* Categories Container */}
      <div
        className="hide-scrollbar flex gap-x-4 bg-slate-50 ring-1 ring-slate-400/5 shadow-sm 
        rounded-2xl px-5 py-4 overflow-x-auto"
      >
        {categories.map((category) => (
          <div
            key={category.label}
            onClick={() => setSelectCategory(category.label)}
            className={`flex flex-col items-center gap-2 p-3 rounded-xl cursor-pointer 
            min-w-[96px] xl:min-w-[112px] flex-shrink-0 ${
              category.label === selectCategory ? "text-secondary" : ""
            }`}
          >
            {/* Category Icon */}
            <div
              className="text-secondary rounded-full h-12 w-12 p-2 flex items-center justify-center text-xl"
              style={{ backgroundColor: `${category.color}` }}
            >
              {category.icon}
            </div>
            {/* Category Label */}
            <p className="medium-14 text-center">{category.label}</p>
          </div>
        ))}
      </div>
      <br/>
      {/* Properties/Listing */}
      {loading ? (
        <Loader />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {listings.map(
            ({
              _id,
              creator ,
              listingPhotoPaths,
              city,
              province,
              phoneNumber,
              category,
              type,
              price,
              title,
              description,
              booking=false
            }) => (
              <ListingCard
                key={_id}
                listingId={_id}
                creator={creator}
                listingPhotoPaths={listingPhotoPaths}
                city={city}
                province={province}
                phoneNumber={phoneNumber}
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
      )}
    </section>
  );
};

export default Listing;
