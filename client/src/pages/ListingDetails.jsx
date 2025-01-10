import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Loader from '../components/Loader';
import Header from '../components/Header';
import { HiOutlineLocationMarker } from 'react-icons/hi';
import { FaPersonShelter } from 'react-icons/fa6';
import { MdBed, MdOutlineBathroom, MdOutlineBedroomChild } from 'react-icons/md';
import { facilities } from '../assets/data';
import { DateRange } from 'react-date-range';
import Footer from '../components/Footer';
import 'react-date-range/dist/styles.css'; 
import 'react-date-range/dist/theme/default.css'; 
import { useSelector } from 'react-redux';

const ListingDetails = () => {
   const [loading, setLoading] = useState(true);
   const { listingId } = useParams();
   const [listing, setListing] = useState(null);

   const getListingDetails = async () => {
     try {
       const response = await fetch(`http://localhost:4000/listing/${listingId}`, { method: "GET" });
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

     try {
       const bookingForm = {
         customerId,
         listingId,
         hostId: listing.creator._id,
         startDate: dateRange[0].startDate.toDateString(),
         endDate: dateRange[0].endDate.toDateString(),
         totalPrice: listing?.price * dayCount,
         title: listing?.title,
         description: listing?.description,
       };

       const response = await fetch("http://localhost:4000/booking/create", { 
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

   const [dateRange, setDateRange] = useState([{
     startDate: new Date(),
     endDate: new Date(),
     key: "selection",
   }]);

   const handleSelect = (ranges) => setDateRange([ranges.selection]);

   const start = new Date(dateRange[0].startDate);
   const end = new Date(dateRange[0].endDate);
   const dayCount = Math.round((end - start) / (1000 * 60 * 60 * 24));

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
             <h3 className="h3">{listing?.title}</h3>
             <div className="flex items-center gap-x-1 pb-1">
               <HiOutlineLocationMarker />
               <p>
                 {listing?.type} in {listing?.city}, {listing?.province}, {listing?.country}
               </p>
             </div>
             <div className="flex items-center gap-4 capitalize pt-5">
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

           <div className="flex items-center gap-x-3 py-6">
             <img
               src={`http://localhost:4000/${listing?.creator?.profileImagePath?.replace("public", "")}`}
               alt="creator"
               height={44}
               width={44}
               className="rounded-full"
             />
             <h5 className="medium-14 capitalize">
               HOSTED BY {listing?.creator?.firstname} {listing?.creator?.lastname}
             </h5>
           </div>
           <p className="pb-3">{listing?.description}</p>

           {/* Amenities/Facilities */}
           <div>
             <h4 className="h4 py-3">What this place offers?</h4>
             <ul className="flex items-center flex-wrap gap-3">
               {listing?.amenities?.[0]?.split(",").map((item, i) => (
                 <li key={i} className="flex items-center gap-3 bg-white ring-1 ring-slate-900/5 p-4 rounded">
                   <div>{facilities.find((f) => f.name === item)?.icon}</div>
                   <p>{item}</p>
                 </li>
               ))}
             </ul>
           </div>

           {/* Booking Calendar */}
           <div className="calendar-container">
             <h4>How long do you want to stay?</h4>
             <DateRange
               ranges={dateRange}
               onChange={handleSelect}
               showSelectionPreview={true}
               moveRangeOnFirstSelection={false}
               months={2}
               direction="horizontal"
             />
           </div>

           <div className="flex gap-4">
             <div>
               <div className="flex-start gap-x-2 pt-2">
                 <h5 className="bold-16">Total Stay:</h5>
                 <p className="relative pt-0.5">&#8377;{listing?.price} x {dayCount}</p>
               </div>
               <div className="flex-start gap-x-2 pt-2">
                 <h5 className="bold-16">Total Price:</h5>
                 <p className="relative pt-0.5">&#8377;{listing?.price * dayCount}</p>
               </div>
             </div>

             <div>
               <div className="flex items-center gap-x-3 pt-2">
                 <span className="bold-15">Start Date:</span>
                 <p className="relative pt-0.5">{dateRange[0].startDate.toDateString()}</p>
               </div>
               <div className="flex gap-x-3 pt-2">
                 <span className="bold-15">End Date:</span>
                 <p className="relative pt-0.5">{dateRange[0].endDate.toDateString()}</p>
               </div>
             </div>
           </div>

           <button 
             type="submit" 
             onClick={handleSubmit} 
             className="btn-secondary rounded-full flexCenter gap-x-2 left-0 capitalize"
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
                   src={`http://localhost:4000/${item.replace("public", "")}`}
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
