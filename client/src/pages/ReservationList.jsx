import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setReservationList, setTripList } from "../redux/state";
import Loader from "../components/Loader";
import ListingCard from "../components/ListingCard";
import Header from "../components/Header";

const ReservationList = () => {
  const [loading, setLoading] = useState(true);
  const userId = useSelector((state) => state.user?._id);
  const reservationList = useSelector((state) => state.user?.reservationList || []);
  const tripList = useSelector((state) => state.user?.TripList || []); // Access tripList from Redux store
  const dispatch = useDispatch();

  const getReservationList = async () => {
    try {
      const response = await fetch(`http://localhost:4000/user/${userId}/reservation`, {
        method: "GET",
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }

      const data = await response.json();
      dispatch(setReservationList(data)); 
    } catch (err) {
      console.log("Fetch Reservation List Failed", err.message);
    } finally {
      setLoading(false);
    }
  };
  const handleCancelReservation = async (bookingId) => {
    console.log("User ID:", userId);
    console.log("Booking ID:", bookingId);
    try {
      const response = await fetch(
        `http://localhost:4000/booking/user/${userId}/reservation/${bookingId}/cancel`,
        { method: "DELETE" } // Change from PATCH to DELETE
      );
  
      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }
  
      // Update both reservationList and tripList in Redux store
      const updatedReservations = reservationList.filter(
        (reservation) => reservation._id !== bookingId
      );
      dispatch(setReservationList(updatedReservations));
  
      const updatedTrips = tripList.filter((trip) => trip._id !== bookingId);
      dispatch(setTripList(updatedTrips));
  
    } catch (err) {
      console.error("Error canceling reservation:", err.message);
    }
  };

  useEffect(() => {
    if (userId) {
      getReservationList();
    }
  }, [userId]);

  return loading ? (
    <Loader />
  ) : (
    <>

    <Header/>
    <section className="max-padd-container pt-10">
      <h3 className="h3">Your ReservationList list</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {reservationList.map(({ 
          listingId, 
          hostId, 
          visitDate, 
          visitTime, 
          totalPrice, 
           
          
          booking = true, 

          
          
        }) => (
          <ListingCard
            key={listingId._id} 
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
            booking={booking}
          />
        ))}
      </div>
    </section>

      <Header />
      <section className="max-padd-container pt-10">
        <h3 className="h3">Your Reservation List</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {reservationList.length > 0 ? (
            reservationList.map(({ _id, listingId, hostId, visitDate, visitTime, totalPrice }) => {
              if (!listingId) return null;

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
                  onCancel={() => handleCancelReservation(_id)} // Pass bookingId here
                />
              );
            })
          ) : (
            <p>No reservations found.</p>
          )}
        </div>
      </section>

    </>
  );
};

export default ReservationList;