import { FaArrowLeft, FaArrowRight, FaTrash } from "react-icons/fa"; // Import FaTrash for the delete icon
import { HiOutlineLocationMarker } from "react-icons/hi";

import { useState } from "react";
import { useNavigate } from "react-router-dom";

const ListingCard = ({
  listingId,
  creator,
  listingPhotoPaths = [],
  city,
  province,
  category,
  type,
  price,
  title,
  description,
  visitDate,
  visitTime,
  totalPrice,
  booking,
  onDelete, 
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const navigate = useNavigate();



  const handleDeleteClick = async (e) => {
    e.stopPropagation(); // Prevent the card click event from firing
    if (window.confirm("Are you sure you want to delete this property?")) {
      await onDelete(listingId); // Call the onDelete function passed from the parent
    }
  };

  return (
    <div
      onClick={() => navigate(`/listing/${listingId}`)}
      className="group grid grid-cols-1 lg:grid-cols-2 gap-6 p-6 bg-white shadow-md rounded-3xl ring-1 ring-gray-200 
                 cursor-pointer transition-all duration-300 hover:shadow-xl"
    >
      {/* Image Carousel */}
      <div className="relative overflow-hidden rounded-2xl">
        <div
          className="flex transition-transform duration-500 ease-in-out"
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        >
          {listingPhotoPaths.map((photo, i) => (
            <div key={i} className="flex-none w-full h-64 md:h-80">
              <img
                src={`${import.meta.env.VITE_API_URL}/${photo.replace("public", "")}`}
                alt={`Photo ${i + 1}`}
                className="w-full h-full object-cover rounded-2xl transition-opacity duration-500 ease-in-out"
              />
            </div>
          ))}
        </div>

        {/* Arrow Buttons */}
        {listingPhotoPaths.length > 1 && (
          <div className="absolute inset-0 flex justify-between items-center px-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <button
              onClick={(e) => {
                e.stopPropagation();
                setCurrentIndex((prev) =>
                  prev === 0 ? listingPhotoPaths.length - 1 : prev - 1
                );
              }}
              className="bg-white p-2 rounded-full shadow-md hover:bg-gray-200 transition"
            >
              <FaArrowLeft className="text-xl text-gray-700" />
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                setCurrentIndex((prev) =>
                  prev === listingPhotoPaths.length - 1 ? 0 : prev + 1
                );
              }}
              className="bg-white p-2 rounded-full shadow-md hover:bg-gray-200 transition"
            >
              <FaArrowRight className="text-xl text-gray-700" />
            </button>
          </div>
        )}

        

        {/* Delete Button */}
        <button
          onClick={handleDeleteClick}
          className="absolute top-4 left-4 h-10 w-10 rounded-full flex items-center justify-center bg-red-500 shadow-lg transition transform hover:scale-110"
        >
          <FaTrash className="text-white text-lg" />
        </button>
      </div>

      {/* Details Section */}
      <div className="space-y-4">
        <h4 className="text-xl font-bold text-gray-800">{title}</h4>
        <div className="text-sm font-semibold text-gray-600">{category}</div>
        <h5 className="flex items-center gap-2 text-sm text-gray-500">
          <HiOutlineLocationMarker className="text-lg" />
          {city}, {province}
        </h5>

        <div className="mt-2">
          {!booking ? (
            <div className="space-y-1">
              <div className="text-lg font-semibold text-gray-800">
                <span className="text-indigo-500">&#8377;{price}</span>
              </div>
              <div className="text-sm text-gray-500 capitalize">{type}</div>
            </div>
          ) : (
            <div className="space-y-1">
              <p className="text-sm text-gray-500">
                Date: {new Date(visitDate).toISOString().split("T")[0]}
              </p>
              <p className="text-sm text-gray-500"> Time: {visitTime} </p>
              <p className="text-lg font-bold text-indigo-500">
                &#8377;{totalPrice}
              </p>
            </div>
          )}
        </div>
        <p className="text-sm text-gray-600 line-clamp-4">{description}</p>
      </div>
    </div>
  );
};

export default ListingCard;