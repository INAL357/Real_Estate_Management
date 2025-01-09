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
  console.log('Logged in user ID:', user?._id);
  console.log('Creator ID:', creator?._id);

  return (
    <div 
      onClick={() => navigate(`/listing/${listingId}`)}
      className="grid grid-cols-1 x1:grid-cols-2 gap-6 place-items-center ring-1 ring-slate-900/5 bg-white coursor-default p-2.5 rounded-[2.5rem] relative group">
      
      <div className="overflow-hidden relative">
        {/* Image Carousel */}
        <div
          className="flex"
          style={{
            transform: `translateX(-${currentIndex * 100}%)`,
            transition: 'transform 0.5s ease-in-out',
          }}
        >
          {listingPhotoPaths?.map((photo, i) => (
            <div key={i} className="relative flex-none w-full h-[266px] items-center">
              <img
                src={`http://localhost:4000/${photo.replace("public", "")}`} 
                alt={`photo ${i + 1}`}
                className="h-full w-full rounded-[2rem]"
              />
            </div>
          ))}
        </div>

        {/* Arrow Buttons */}
        <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-1000">
          <div className="absolute top-1/2 left-2 transform -translate-y-1/2 bg-white rounded-full p-2 shadow">
            <FaArrowLeft 
              onClick={(e) => {
                e.stopPropagation();
                goToPrevSlide(e);
              }}
              className="absolute top-1/2 left-2.5 transform-translate-y-1/2 p-1.5 text-2xl rounded-full border-none cursor-pointer flexcenter bg-white/30 text-white z-50"
            />
          </div>

          <div className="absolute top-1/2 right-2 transform -translate-y-1/2 bg-white rounded-full p-2 shadow">
            <FaArrowRight 
              onClick={(e) => {
                e.stopPropagation();
                goToNextSlide(e);
              }}
              className="absolute top-1/2 right-2.5 transform-translate-y-1/2 p-1.5 text-2xl rounded-full border-none cursor-pointer flexcenter bg-white/30 text-white z-50"
            />
          </div>
        </div>

        {/* Wishlist Button */}
        <button
          onClick={(e) => { 
            e.stopPropagation();
            patchWishList(); 
          }}
          className="absolute top-3 right-5 border border-white h-7 w-7 rounded-full flexCenter"
          disabled={!user} // Disable if user is not logged in
        >
          {isLiked ? (
            <GoHeartFill className="text-white text-ig" />
          ) : (
            <GoHeart className="text-ig text-white" />
          )}
        </button>
      </div>

      {/* Title and Description Info */}
      <div className="max-sm:px-2">
        <h4 className="h4">{title}</h4>
        <div className="boald-16 pb-2">{category}</div>
        <h5 className="flex items-center gap-2 captialize medium-15">
          <HiOutlineLocationMarker />
          {city}, {province}, {country}
        </h5>
        <div className="mt-2">
          {!booking ? (
            <>
              <div className="text-lg font-semibold">
                <span className="text-secondary boald-22">&#8377;{price}</span>
                <span className="medium-14">/night</span>
              </div>
              <div className="medium-15 capitalize py-1 ">{type}</div>
            </>
          ) : (
            <div className="pb-3">
              <p className="py-1">{startDate} - {endDate}</p>
              <p className="pt-1"><span className="text-secondary bold-22">&#8377;{totalPrice}</span></p>
            </div>
          )}
        </div>
        <p className="line-clamp-4">{description}</p>
      </div>
    </div>
  );
};

export default ListingCard;
