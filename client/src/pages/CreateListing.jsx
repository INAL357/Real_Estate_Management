import { useState } from "react";
import { categories, facilities, types } from "../assets/data";
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { BiTrash } from 'react-icons/bi';
import {IoIosImages}from 'react-icons/io'
//import {userSelector} from 'react-redux'
import { useNavigate } from 'react-router-dom';
import{FaMinus ,FaPlus }from 'react-icons/fa6';
import Header from "../components/Header";
import { useSelector } from "react-redux";


const CreateListing = () => {
  const [category, setCategory] = useState("");
  const [type, setType] = useState("");
  const[amenities,setAmenities]=useState([]);
  const [photos, setPhotos] = useState([]);
  const creatorId = useSelector((state)=>state.user._id)

  // Counts
  const [guestCount, setGuestCount] = useState(1);
  const [bedroomCount, setBedroomCount] = useState(1);
  const [bedCount, setBedCount] = useState(1);
  
  const [bathroomCount, setBathroomCount] = useState(1);



  const [description,setDescription]=useState({
    title:"",
    description:"",
    price:0,
    
  });

  
const navigate = useNavigate();

const handleDescription=(e)=>{
    const{name,value} = e.target
    setDescription({
      ...description,
      [name]:value
    })
}
console.log(description)
console.log(category)
console.log(type)
console.log(photos)

  const handleUploadPhotos = (e) => {
    const newPhotos = e.target.files;
    setPhotos((prevPhotos) => [...prevPhotos, ...newPhotos]);
  };

  const handleDragPost = (result) => {
    if (!result.destination) return;
    const item = Array.from(photos);
    const [recordedItem] = item.splice(result.source.index, 1);
    item.splice(result.destination.index, 0, recordedItem);
    setPhotos(item);
  };

  const handleRemovePhoto = (indexToRemove) => {
    setPhotos((prevPhotos) => prevPhotos.filter((_, index) => index !== indexToRemove));
  };

//   const handlePost = async (e) => {
//     e.preventDefault();
//   };
///address and location
const[fromlocation,setFromlocation]=useState({
    streetAddress:"",
    aptSuite:"",
    city:"",
    province:"",
    phoneNumber:"",
});

const handlechangeLocation = (e)=>{
    const {name,value} =e.target
    setFromlocation({
        ...fromlocation,
        [name]:value,
    })
}
//console.log(fromlocation)


//amenities facilitties
const handleSelectAmenities = (facility) => {
    if (amenities.includes(facility)) {
      setAmenities((prevAmenties) =>
        prevAmenties.filter((option) => option !== facility)
      );
    } else {
      setAmenities((prevAmenties) => [...prevAmenties, facility]);
    }
  };
      

  console.log(amenities)

  const handlepost = async (e) => {
    e.preventDefault();
    try{

     const listingForm = new FormData();
     listingForm.append("creator", creatorId);
     listingForm.append("category", category);
     listingForm.append("type", type);
     listingForm.append("streetAddress", fromlocation.streetAddress);
     listingForm.append("aptSuite", fromlocation.aptSuite);
     listingForm.append("city", fromlocation.city);
     listingForm.append("province", fromlocation.province);
     listingForm.append("phoneNumber", fromlocation.phoneNumber);
     listingForm.append("guestCount", guestCount);
     listingForm.append("bedroomCount", bedroomCount);
     listingForm.append("bedCount", bedCount);
     listingForm.append("bathroomCount", bathroomCount);
     listingForm.append("amenities", amenities);
     listingForm.append("title", description.title);
     listingForm.append("description", description.description);
     listingForm.append("price", description.price);
 
     photos.forEach((photo) => {
       listingForm.append("listingPhotos", photo);
     });
      console.log(listingForm+"listing form")


      photos.forEach((photo) => {
        listingForm.append("listingPhotos", photo);
      });
  
      const response = await fetch(`${import.meta.env.VITE_API_URL}/listing/create`, {
        method: "POST",
        body: listingForm,
      });
     // const response = await axios.post(`${import.meta.env.VITE_API_URL}/listing/create`, listingForm);
    
        if(response.ok){
          navigate("/")
        }
           }catch(err){
       console.log("publish listing failed",err.message)
            }
         };
         console.log("creatorid",creatorId)

  return (
    <>
      <Header />
      
      <section className="max-padd-conatiner py-10 bg-slate-100">
        <h3 className="h3">Add Properties</h3>
        <form onSubmit={handlepost} method="post">
          <h4 className="h4 my-4">Describe Your Property</h4>
          {/* Categories Container */}
          <div
            className="hide-scrollbar flex gap-x-4 bg-slate-50 ring-1 ring-slate-400/5 shadow-sm 
          rounded-2xl px-5 py-4 overflow-x-auto mb-8"
          >
            {categories.map((items) => (
              <div
                key={items.label}
                onClick={() => setCategory(items.label)}
                className="flex flex-col items-center gap-2 p-3 rounded-xl cursor-pointer 
              min-w-[96px] xl:min-w-[112px] flex-shrink-0"
              >
                {/* Category Icon */}
                <div
                  className="text-secondary rounded-full h-12 w-12 p-2 flex items-center justify-center text-lg"
                  style={{ backgroundColor: `${items.color}` }}
                >
                  {items.icon}
                </div>
                {/* Category Label */}
                <p
                  className={`${
                    category === items.label ? "text-secondary" : ""
                  } medium-14`}
                >
                  {items.label}
                </p>
              </div>
            ))}
          </div>
          {/* Container types & location */}
          <div className="flex-col flex xl:flex-row gap-x-16">
            <div className="flex-1">
              {/* Types of places */}
              <h4 className="h4 my-4">What is the type of your place?</h4>
              <div className="flex flex-col gap-3 mb-6">
                {types.map((items) => (
                  <div
                    key={items.name}
                    
                    onClick={() => setType(items.name)}
                    className={`${
                      type === items.name
                        ? "ring-1 ring-slate-900/50"
                        : "ring-1 ring-slate-900/5"
                    } flexBetween max-w-[777px] px rounded-xl px-4 py-1`}
                  >
                    <div>
                      <h5 className="text-2xl">{items.name}</h5>
                      <p className="text-sm">{items.description}</p>
                    </div>
                    <div className="text-2px1">{items.icon}</div>
                  </div>
                ))}
              </div>
            </div>
            {/* Place location */}
            <div className="flex-1 mb-4">
              <h4>Whats the address of your place?</h4>
              <div>
                <div>
                  <h5 className="h5">Street Address:</h5>
                  <input onChange={handlechangeLocation}
                  value ={fromlocation.streetAddress}
                    type="text"
                    name="streetAddress"
                    placeholder="Street"
                    required
                    className="bg-white p-2 text-sm outline-none border-none mb-2 rounded ring-1 ring-slate-900/5"
                  />
                </div>
              </div>
              <div className="flex gap-6 ">
                <div className="w-1/2">
                  <h5 className="h5">Apartment, Suite (opt):</h5>
                  <input onChange={handlechangeLocation}
                  value={fromlocation.aptSuite}
                    type="text"
                    name="aptSuite"
                    placeholder="Apt, Suite (opt)"
                    className="bg-white p-2 text-sm outline-none border-none mb-2 rounded ring-1 ring-slate-900/5"
                  />
                </div>
                <div className="w-1/2">
                  <h5 className="h5">City:</h5>
                  <input  onChange={handlechangeLocation}
                  value={ fromlocation.city}
                    type="text"
                    name="city"
                    placeholder="City"
                    required
                    className="bg-white p-2 text-sm outline-none border-none mb-2 rounded ring-1 ring-slate-900/5"
                  />
                </div>
              </div>

              <div className="flex gap-6 ">
                <div className="w-1/2">
                  <h5 className="h5">Province:</h5>
                  <input  onChange={handlechangeLocation} 
                  value={fromlocation.province}
                    type="text"
                    name="province"
                    placeholder="Province"
                    required
                    className="bg-white p-2 text-sm outline-none border-none mb-2 rounded ring-1 ring-slate-900/5"
                  />
                </div>
                <div className="w-1/2">
                  <h5 className="h5">Phone Number:</h5>
                  <input  onChange={handlechangeLocation} 
                  value={fromlocation.phoneNumber}
                    type="text"
                    name="phoneNumber"
                    placeholder="Phone Number"
                    required
                    className="bg-white p-2 text-sm outline-none border-none mb-2 rounded ring-1 ring-slate-900/5"
                  />
                </div>
              </div>
            </div>
          </div>
          {/* Essentials */}
          <h4 className="h4 my-4">
            Provide some essential detail about your place?
          </h4>
          <div className="flex flex-wrap gap-4 mb-6 ">
            {[
              { label: "Guest", count: guestCount, setCount: setGuestCount },
              { label: "Bedrooms", count: bedroomCount, setCount: setBedroomCount },
              { label: "Beds", count: bedCount, setCount: setBedCount },
              { label: "Bathrooms", count: bathroomCount, setCount: setBathroomCount },
            ].map(({ label, count, setCount }) => (
              <div
                key={label}
                className="flexCenter gap-x-4 ring-1 ring-slate-900/5 p-2 rounded"
              >
                <h5>{label}</h5>
                <div className="flexCenter gap-x-2 bg-white">
                  <FaMinus
                    onClick={() => count > 1 && setCount(count - 1)}
                    className="h-6 w-6 bg-secondary text-xl p-1 rounded cursor-pointer"
                  />
                  <p>{count}</p>
                  <FaPlus
                    onClick={() => setCount(count + 1)}
                    className="h-6 w-6 text-xl bg-secondary text-white p-1 rounded cursor-pointer"
                  />
                </div>
              </div>
            ))}
          </div>
          <div>
            <h4>Description about the features of your location</h4>
            <ul className="flex items-center flex-wrap gap-3 mb-10">
  {facilities.map((card) => (
    <li
      key={card.name}
      onClick={() => handleSelectAmenities(card.name)}
      className={`${amenities.includes(card.name)
        ? "ring-1 ring-slate-900/50"
        : "ring-1 ring-slate-900/5"} flex items-center gap-3 bg-white p-4 rounded cursor-pointer`}
    >
      <div>{card.icon}</div>
      <p>{card.name}</p>
    </li>
  ))}
</ul>
            {/* Upload Images Section */}
          <h4 className="h4 my-6">Including images showcasing your property?</h4>

<DragDropContext onDragEnd={handleDragPost}>
  <Droppable droppableId="photos" direction="horizontal">
    {(provided) => (
      <div
        className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 p-4 bg-gray-50 rounded-lg shadow-lg"
        {...provided.droppableProps}
        ref={provided.innerRef}
      >
        {photos.length < 1 && (
          <>
            <input
              type="file"
              name="image"
              accept="image/*"
              onChange={handleUploadPhotos}
              multiple
              id="imageUpload"
              className="hidden"
            />
            <label
              htmlFor="imageUpload"
              className="group flex flex-col items-center justify-center border-2 border-dashed border-gray-300 rounded-lg p-6 hover:bg-gray-100 transition-colors cursor-pointer"
            >
              <div className="h-52 w-full flexCenter">
                <IoIosImages className="text-gray-400 group-hover:text-gray-600 transition-colors" />
              </div>
              <p className="text-gray-500 group-hover:text-gray-700">
                Upload from your device
              </p>
            </label>
          </>
        )}
        {photos.length >= 1 && (
          <>
            {photos.map((photo, index) => (
              <Draggable key={index} draggableId={index.toString()} index={index}>
                {(provided) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    className="relative group"
                  >
                    <img
                      src={URL.createObjectURL(photo)}
                      alt="Property"
                      className="aspect-square object-cover h-53 w-full rounded-lg shadow-md"
                    />
                    <button
                      type="button"
                      onClick={() => handleRemovePhoto(index)}
                      className="absolute top-2 right-2 bg-white p-1 rounded-full shadow-md hover:bg-gray-200"
                    >
                      <BiTrash className="text-red-600" />
                    </button>
                  </div>
                )}
              </Draggable>
            ))}
             <input
              type="file"
              name="image"
              accept="image/*"
              onChange={handleUploadPhotos}
              multiple
              id="imageUpload"
              className="hidden"
            />
            <label
              htmlFor="imageUpload"
              className="group flex flex-col items-center justify-center border-2 border-dashed border-gray-300 rounded-lg p-6 hover:bg-gray-100 transition-colors cursor-pointer"
            >
              <div className="h-52 w-full flexCenter">
                <IoIosImages className="text-gray-400 group-hover:text-gray-600 transition-colors" />
              </div>
              <p className="text-gray-500 group-hover:text-gray-700">
                Upload more images
              </p>
            </label>
          </>
        )}
        {provided.placeholder}
      </div>
    )}
  </Droppable>
</DragDropContext>
<h4 className="h4 my-5 ">How would Your characterize the charm and exicitement of your property</h4>
<div className="">
    <h5 className="h5">Title:</h5>
    <input onChange={handleDescription} value={description.title}
     type="text" name="title" placeholder="Tiltle" required className="bg-white p-2 outline-none text-sm border-none mb-2 rounded ring-1 ring-slate-900/5 w-full"/>
    <h5>Description</h5>
    <textarea  onChange={handleDescription} value={description.description}
     name="description" rows={10} placeholder="Description"required className="bg-white p-2 outline-none text-sm border-none mb-2 rounded ring-1 ring-slate-900/5 w-full resize-none" />
    <input  onChange={handleDescription} value={description.price}
    type="number" name="price" placeholder="100" required className="bg-white p-2 outline-none text-sm border-none mb-2 rounded ring-1 ring-slate-900/5 w-full"/>
    
</div>
          </div>
          <button type="submit" onClick={handlepost} className="btn-secondary rounded-full">Create Property</button>
        </form>
      </section>
    </>
  );
};

export default CreateListing;
