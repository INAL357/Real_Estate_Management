import React from "react";
import { useSelector } from "react-redux";
import Header from "../components/Header";
import ListingCard from "../components/ListingCard";

const WishList = () => {
  // Retrieve the wish list from Redux state
  const wishList = useSelector((state) => state.user.wishList);

  return (
    <>
      {/* Header Component */}
      <Header />

      {/* Wish List Section */}
      <section className="max-padd-container pt-10">
        <h3 className="h3">Your Wish List</h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {wishList && wishList.length > 0 ? (
            // Map through the wish list items
            wishList.map(
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
            // Display a message if the wish list is empty
            <p className="text-center text-gray-500">No items in your Wish List.</p>
          )}
        </div>
      </section>
    </>
  );
};

export default WishList;
