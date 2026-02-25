import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Loader from '../components/Loader';
import Header from '../components/Header';
import { HiOutlineLocationMarker } from 'react-icons/hi';
import { FaPersonShelter } from 'react-icons/fa6';
import { MdBed, MdOutlineBathroom, MdOutlineBedroomChild } from 'react-icons/md';
import { facilities } from '../assets/data';
import Footer from '../components/Footer';
import { useSelector } from 'react-redux';

const ListingDetails = () => {
   const [loading, setLoading] = useState(true);
   const { listingId } = useParams();
   const [listing, setListing] = useState(null);
   const [visitDate, setVisitDate] = useState('');
   const [visitTime, setVisitTime] = useState('');

   const getListingDetails = async () => {
     try {
       const response = await fetch(`http://localhost:5000/listing/${listingId}`, { method: "GET" });
       const data = await response.json();
       setListing(data);
       setLoading(false);
     } catch (err) {
       console.log("Fetch Listing Details Failed", err.message);
       setLoading(false);
     }
   };

   const customerId = useSelector((state) => state.user?._id);
   const isOwner = listing?.creator?._id === customerId;
   const navigate = useNavigate();

   const handleSubmit = async () => {

     if (!customerId) {
       navigate('/login');
       return;
     }

     if (!visitDate || !visitTime) {
       alert("Please select a visit date and time.");
       return;
     }

     try {
       const bookingForm = {
         customerId,
         listingId,
         hostId: listing.creator._id,
         visitDate,
         visitTime,
         totalPrice: listing?.price, 
         title: listing?.title,
         description: listing?.description,
       };

       const response = await fetch("http://localhost:5000/booking/create", { 
         method: "POST",
         headers: {
           "Content-Type": "application/json",
         },
         body: JSON.stringify(bookingForm),
       });

       if (response.ok) {
         navigate(`/${customerId}/trips`);
       } else {
         const error = await response.json();
         console.log("Error creating booking:", error);
       }
     } catch (err) {
       console.log("Submit Booking Failed", err.message);
     }
   };

  

   useEffect(() => {
     getListingDetails();
   }, [listingId]);

   return loading ? (
     <Loader />
   ) : (
     <>
       <Header />
       <section className="max-padd-container flex gap-12 flex-col-reverse xl:flex-row py-10">
         {/* Left Section */}
         <div className="flex-1">
           <div>
             <h3 className="text-3xl font-semibold text-gray-800">{listing?.title}</h3>
             <div className="flex items-center gap-x-2 text-gray-600 pb-2">
               <HiOutlineLocationMarker className="text-xl" />
               <p>
                 {listing?.type} in {listing?.city}, {listing?.province}, {listing?.country}
               </p>
             </div>
             <div className="flex items-center gap-6 capitalize pt-5 text-gray-700">
               <span>
                 <FaPersonShelter className="text-xl" />
                 <p>{listing?.guestCount} Guests</p>
               </span>
               <span>
                 <MdOutlineBedroomChild className="text-xl" />
                 <p>{listing?.bedroomCount} Bedrooms</p>
               </span>
               <span>
                 <MdBed className="text-xl" />
                 <p>{listing?.bedCount} Beds</p>
               </span>
               <span>
                 <MdOutlineBathroom className="text-xl" />
                 <p>{listing?.bathroomCount} Bathrooms</p>
               </span>
             </div>
           </div>

           <div className="flex items-center gap-x-4 py-6">
             <img
               src={`http://localhost:4000/${listing?.creator?.profileImagePath?.replace("public", "")}`}
               alt="creator"
               height={44}
               width={44}
               className="rounded-full"
             />
             <h5 className="text-lg font-medium text-gray-800 capitalize">
               HOSTED BY {listing?.creator?.firstname} {listing?.creator?.lastname}
             </h5>
           </div>
           <p className="text-gray-600 pb-4">{listing?.description}</p>

           {/* Amenities/Facilities */}
           <div className="py-5">
             <h4 className="text-xl font-semibold text-gray-800 pb-3">What this place offers?</h4>
             <ul className="flex items-center flex-wrap gap-4">
               {listing?.amenities?.[0]?.split(",").map((item, i) => (
                 <li key={i} className="flex items-center gap-3 bg-white shadow-sm p-4 rounded-md hover:bg-gray-100">
                   <div>{facilities.find((f) => f.name === item)?.icon}</div>
                   <p className="text-sm text-gray-700">{item}</p>
                 </li>
               ))}
             </ul>
           </div>

           {/* Visit Date & Time Selection */}
           <div className="py-5">
             <h4 className="text-xl font-semibold text-gray-800">Select Visit Date and Time:</h4>
             <div className="flex flex-col gap-4">
               <label className="text-gray-700">
                 Visit Date:
                 <input
                   type="date"
                   value={visitDate}
                   onChange={(e) => setVisitDate(e.target.value)}
                   className="p-3 border rounded-md mt-2"
                   required
                 />
               </label>
               
               <label className="text-gray-700">
                 Visit Time:
                 <input
                   type="time"
                   value={visitTime}
                   onChange={(e) => setVisitTime(e.target.value)}
                   className="p-3 border rounded-md mt-2"
                   required
                 />
               </label>
             </div>
           </div>

           <div className="py-4">
             <p className="text-lg font-semibold text-gray-700">Cost of the Property: ₹{listing?.price}</p>
           </div>

           <button 
             type="submit" 
             onClick={handleSubmit} 
             className="rounded-full flex items-center gap-x-2 text-white bg-blue-600 hover:bg-blue-700 px-6 py-2 mt-4"
             disabled={isOwner}
           >
             {isOwner ? "You can't book your own property" : "Book the visit"}
           </button>
         </div>

        {/* Right Image Gallery */}
        <div className="flex-1">
           <div className="flex flex-wrap">
             {listing?.listingPhotoPaths?.map((item, index) => (
               <div key={index} className={`${index === 0 ? "w-full" : "w-1/2"} p-2`}>
                 <img
                   src={`http://localhost:5000/${item.replace("public", "")}`}
                   alt="ListingImages"
                   className={`${index === 0 ? "object-contain rounded-3xl" : "rounded-2xl"}`}
                 />
               </div>
             ))}
           </div>
         </div>
       </section>
       <Footer />
     </>
   );
};

export default ListingDetails;
