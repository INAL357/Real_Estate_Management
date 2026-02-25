import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setTripList, setReservationList } from '../redux/state';
import Loader from '../components/Loader';
import ListingCard from '../components/ListingCard';
import Header from '../components/Header';

const TripList = () => {
  const [loading, setLoading] = useState(true);
  const userId = useSelector((state) => state.user._id);
  const isAdmin = useSelector((state) => state.user.isAdmin); // Get isAdmin from Redux state
  const tripList = useSelector((state) => state.user?.TripList || []);
  const reservationList = useSelector((state) => state.user?.reservationList || []);
  const dispatch = useDispatch();

  const getTripList = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/user/${userId}/trips`, {
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

  const handleCancelTrip = async (bookingId) => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/booking/user/${userId}/reservation/${bookingId}/cancel`,
        { method: "DELETE" }
      );
  
      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }
  
      // Update both tripList and reservationList in Redux store
      const updatedTrips = tripList.filter((trip) => trip._id !== bookingId);
      dispatch(setTripList(updatedTrips));
  
      const updatedReservations = reservationList.filter(
        (reservation) => reservation._id !== bookingId
      );
      dispatch(setReservationList(updatedReservations));
  
    } catch (err) {
      console.error("Error canceling trip:", err.message);
    }
  };
  
 
  
  useEffect(() => {
    if (userId) {
      getTripList(); 
    }
  }, [userId]);

  return loading ? (
    <Loader />
  ) : (
    <>

    <Header/>
    <section className="max-padd-container pt-10">
      <h3 className="h3">Your trip list</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {tripList && tripList.length > 0 ? (
          tripList.map(({ 
            listingId, 
            hostId, 
            visitDate, 
            visitTime, 
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
                visitDate={visitDate}
                visitTime={visitTime}
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

      <Header />
      <section className="max-padd-container pt-10">
        <h3 className="h3">Your Trip List</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {tripList && tripList.length > 0 ? (
            tripList.map(({ _id, listingId, hostId, visitDate, visitTime, totalPrice }) => {
              if (!listingId || !hostId) return null;

              return (
                <ListingCard
                  key={_id}
                  listingId={listingId._id}
                  creator={hostId._id}
                  listingPhotoPaths={listingId.listingPhotoPaths}
                  city={listingId.city}
                  province={listingId.province}
                  category={listingId.category}
                  visitDate={visitDate}
                  visitTime={visitTime}
                  totalPrice={totalPrice}
                  title={listingId.title}
                  description={listingId.description}
                  booking={true}
                  onCancel={() => handleCancelTrip(_id)} // Pass bookingId here
                  isAdmin={isAdmin} // Pass isAdmin prop here
                />
              );
            })
          ) : (
            <p>No trips available.</p>
          )}
        </div>
      </section>

    </>
  );
};

export default TripList;