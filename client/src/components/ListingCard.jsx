import { FaArrowLeft } from 'react-icons/fa';
import { FaArrowRight } from 'react-icons/fa';
import { HiOutlineLocationMarker } from 'react-icons/hi';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom'; 
import { useSelector, useDispatch } from 'react-redux';
import { setwishList } from '../redux/state';
import { GoHeartFill, GoHeart } from 'react-icons/go';

const ListingCard = ({
  
  listingId,
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
  startDate,
  endDate,
  totalPrice,
  booking,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const goToPrevSlide = () => {
    setCurrentIndex(
      (prevIndex) => (prevIndex - 1 + listingPhotoPaths.length) % listingPhotoPaths.length
    );
  };

  const goToNextSlide = () => {
    setCurrentIndex(
      (prevIndex) => (prevIndex + 1) % listingPhotoPaths.length
    );
  };

  // Add to wishlist
  const user = useSelector((state) => state.user);
  const wishList = user?.wishList || [];
  const isLiked = wishList?.find((item) => item?._id === listingId);

  const patchWishList = async () => {
    try {
     
      if (user?._id && creator?._id && user._id !== creator._id) {
        const response = await fetch(`http://localhost:4000/user/${user._id}/${listingId}`, {
          method: "PATCH",
          headers: {
              "Content-Type": "application/json",
          },
      });
      
        if (!response.ok) {
          throw new Error("Failed to update wishlist");
        }
        const data = await response.json();
        dispatch(setwishList(data.wishList));
      }
    } catch (error) {
      console.error("Error updating wishlist:", error);
    }
  };

  // Logging user and creator IDs for debugging
  console.log("User ID:", user._id);
  console.log("Listing ID:", listingId);

  console.log('Creator ID:', creator?._id);

  return (
<div 
  onClick={() => navigate(`/listing/${listingId}`)}
  className="flex flex-col lg:flex-row gap-6 p-6 bg-white shadow-lg rounded-3xl ring-1 ring-gray-300 cursor-pointer group transition hover:shadow-xl"
>
  {/* Image Carousel */}
  <div className="relative overflow-hidden rounded-2xl w-full lg:w-1/2">
    <div
      className="flex transition-transform duration-500 ease-in-out"
      style={{ transform: `translateX(-${currentIndex * 100}%)` }}
    >
      {listingPhotoPaths?.map((photo, i) => (
        <div key={i} className="flex-none w-full h-64 md:h-80">
          <img
            src={`http://localhost:4000/${photo.replace("public", "")}`}
            alt={`Photo ${i + 1}`}
            className="w-full h-full object-cover rounded-2xl"
          />
        </div>
      ))}
    </div>
    {/* Arrow Buttons */}
    <div className="absolute inset-0 flex justify-between items-center px-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
      <button
        onClick={(e) => {
          e.stopPropagation();
          goToPrevSlide();
        }}
        className="bg-white p-2 rounded-full shadow hover:bg-gray-200 transition"
      >
        <FaArrowLeft className="text-xl text-gray-700" />
      </button>
      <button
        onClick={(e) => {
          e.stopPropagation();
          goToNextSlide();
        }}
        className="bg-white p-2 rounded-full shadow hover:bg-gray-200 transition"
      >
        <FaArrowRight className="text-xl text-gray-700" />
      </button>
    </div>
    {/* Wishlist Button */}
    <button
      onClick={(e) => {
        e.stopPropagation();
        patchWishList();
      }}
      className={`absolute top-4 right-4 h-10 w-10 rounded-full flex items-center justify-center 
        ${isLiked ? 'bg-red-500' : 'bg-gray-100'} shadow-lg transition transform hover:scale-105`}
      disabled={!user}
    >
      {isLiked ? (
        <GoHeartFill className="text-white text-lg" />
      ) : (
        <GoHeart className="text-gray-700 text-lg" />
      )}
    </button>
  </div>
  {/* Details Section */}
  <div className="w-full lg:w-1/2 space-y-4">
    <h4 className="text-xl font-bold text-gray-800">{title}</h4>
    <div className="text-sm font-semibold text-gray-600">{category}</div>
    <h5 className="flex items-center gap-2 text-sm text-gray-500">
      <HiOutlineLocationMarker className="text-lg" />
      {city}, {province}, {country}
    </h5>
    <div className="mt-2">
      {!booking ? (
        <div className="space-y-1">
          <div className="text-lg font-semibold text-gray-800">
            <span className="text-indigo-500">&#8377;{price}</span>
            <span className="text-sm text-gray-500"> /night</span>
          </div>
          <div className="text-sm text-gray-500 capitalize">{type}</div>
        </div>
      ) : (
        <div className="space-y-1">
          <p className="text-sm text-gray-500">{startDate} - {endDate}</p>
          <p className="text-lg font-bold text-indigo-500">&#8377;{totalPrice}</p>
        </div>
      )}
    </div>
    <p className="text-sm text-gray-600 line-clamp-4">{description}</p>
  </div>
</div>


  );
};

export default ListingCard;
