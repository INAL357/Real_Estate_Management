import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Header from "../components/Header";
import ListingCard from "../components/ListingCard";
import { setPropertyList } from "../redux/state";
import Loader from "../components/Loader";

const PropertyList = () => {
  const [loading, setLoading] = useState(true);
  const user = useSelector((state) => state.user);
  const propertyList = user?.propertyList || [];
  const dispatch = useDispatch();

  const getPropertyList = async () => {
    try {
      const response = await fetch(`http://localhost:4000/user/${user._id}/listing`, {
        method: "GET",
      });

      if (!response.ok) {
        throw new Error("Failed to fetch property list");
      }

      const data = await response.json();
      dispatch(setPropertyList(data));
    } catch (err) {
      console.error("Fetch all properties failed:", err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteProperty = async (listingId) => {
    try {
      const response = await fetch(`http://localhost:4000/listing/${listingId}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Failed to delete property');
      }

      // Remove the deleted property from the state
      const updatedPropertyList = propertyList.filter(property => property._id !== listingId);
      dispatch(setPropertyList(updatedPropertyList));

      alert('Property deleted successfully');
    } catch (error) {
      console.error('Error deleting property:', error);
      alert('Error deleting property');
    }
  };

  useEffect(() => {
    if (user?._id) {
      getPropertyList();
    } else {
      setLoading(false); // Avoid indefinite loading if user is not available
    }
  }, [user?._id]);

  return loading ? (
    <Loader />
  ) : (
    <>
      <Header />
      <section className="max-padd-container pt-10">
        <h3 className="h3">Your Property List</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {propertyList.length > 0 ? (
            propertyList.map(({
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

                onDelete={handleDeleteProperty}  // Pass handleDeleteProperty

               
                isPropertyListPage={true} // Pass this prop to indicate the user is on the PropertyList page

              />
            ))
          ) : (
            <p className="text-center text-gray-500">No properties found in your list.</p>
          )}
        </div>
      </section>
    </>
  );
};

export default PropertyList;