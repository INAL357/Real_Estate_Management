import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setTripList } from '../redux/state';
import Loader from '../components/Loader';
import ListingCard from '../components/ListingCard';

const TripList = () => {
  const [loading, setLoading] = useState(true);
  const userId = useSelector((state) => state.user._id);
  const tripList = useSelector((state) => state.user.TripList);
  const dispatch = useDispatch();

  const getTripList = async () => {
    try {
      const response = await fetch(`http://localhost:4000/user/${userId}/trips`, {
        method: "GET",
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }

      const data = await response.json();
      dispatch(setTripList(data)); 
      setLoading(false);
    } catch (err) {
      console.log("Fetch Trip List Failed", err.message);
      setLoading(false);
    }
  };

  useEffect(() => {
    if (userId) {
      getTripList(); 
    }
  }, [userId]);

  console.log(tripList); 
  console.log(userId)

  return loading ? (
    <Loader />
  ) : (
    <section className="max-padd-container pt-10">
      <h3 className="h3">Your trip list</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {tripList && tripList.length > 0 ? (
          tripList.map(({ 
            listingId, 
            hostId, 
            startDate, 
            endDate, 
            totalPrice, 
            booking = true, 
          }) => {
            if (!listingId || !hostId) {
              console.warn('Missing listingId or hostId for a trip');
              return null; // Skip rendering if data is incomplete
            }

            return (
              <ListingCard
                key={listingId._id} 
                listingId={listingId._id} 
                creator={hostId._id}  
                listingPhotoPaths={listingId.listingPhotoPaths}  
                city={listingId.city}  
                province={listingId.province}
                country={listingId.country}
                category={listingId.category}
                startDate={startDate}
                endDate={endDate}
                totalPrice={totalPrice}
                title={listingId.title}
                description={listingId.description}
                booking={booking}
              />
            );
          })
        ) : (
          <p>No trips available.</p> // Handle case where tripList is empty
        )}
      </div>
    </section>
  );
};

export default TripList;
