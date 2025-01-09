//import React from "react";
import { useSelector } from "react-redux";
import Header from "../components/Header";
import ListingCard from "../components/ListingCard";

const WishList = () => {
  const WishList = useSelector((state) => state.user.wishList);

  
  //console.log("WishList:", WishList);

  return (
    <>
      <Header />
      <section className="max-padd-container pt-10">
        <h3 className="h3">Your Wish List</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {WishList && WishList.length > 0 ? (
            WishList.map(
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
            )
          ) : (
            <p className="text-center text-gray-500">No items in your Wish List.</p>
          )}
        </div>
      </section>
    </>
  );
};

export default WishList;
