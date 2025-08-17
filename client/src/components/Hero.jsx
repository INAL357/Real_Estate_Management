import React from "react";
import { Link } from "react-router-dom";
import circle from "./../assets/circle.png";
import client1 from "./../assets/person-1.jpg";
import client2 from "./../assets/person-2.jpg";
import sideimg from "./../assets/house1.jpg";
import sideimg1 from "./../assets/property00.jpg";
import sideimg2 from "./../assets/omerghgh.jpg";
import { useSelector } from "react-redux";

const Hero = () => {
  const user = useSelector((state) => state.user);

  return (
    <section className="max-padd-container mt-20 xl:mt-10">
      <div className="flex flex-col xl:flex-row gap-16">
        {/* Left Section */}
        <div className="flex justify-center flex-1 flex-col gap-y-8 xl:max-w-[50%] relative">
          <h1 className="h1">
            Invest In <span className="text-secondary">Your Future</span> with confidence
          </h1>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Placeat
            distinctio, doloribus repellendus culpa recusandae velit fuga iusto
            ipsum asperiores delectus at sed doloremque provident necessitatibus
            inventore facilis ab architecto! Officiis unde illum repellendus
            molestiae totam dolorem voluptatem rerum sint? Fugit mollitia
            distinctio soluta quia explicabo recusandae consequuntur ipsam
            molestias nihil placeat architecto ex, possimus nam.
          </p>
          <div className="flex gap-3">
            <a href="#listing" className="btn-dark flexCenter rounded-full">
              Explore Properties
            </a>
            {user && user.isAdmin ? (
              <Link to={"/create-listing"} className="btn-secondary flexCenter rounded-full">
                <span className="medium-20 pr-1">+</span>Add Property
              </Link>
            ) : user ? (
              <button 
                className="btn-secondary flexCenter rounded-full cursor-not-allowed opacity-50" 
                disabled
              >
                <span className="medium-20 pr-1">+</span>Add Property
              </button>
            ) : (
              <Link to={"/login"} className="btn-secondary flexCenter rounded-full">
                <span className="medium-20 pr-1">+</span>Add Property
              </Link>
            )}
          </div>

          <div className="flex relative">
            <img src={circle} alt="Circle graphic" className="rounded-full h-[99px] z-30" />
            <img src={client1} alt="Client 1" className="rounded-full h-[80px] shadow-sm absolute left-16 z-30" />
            <img src={client2} alt="Client 2" className="rounded-full h-[80px] shadow-sm absolute left-32 z-10" />
          </div>

          {/* <div className="flex relative">
            <img src={circle} alt="Circle graphic" className="rounded-full h-[99px] z-30" />
            <img src={client1} alt="Client 1" className="rounded-full h-[80px] shadow-sm absolute left-16 z-30" />
            <img src={client2} alt="Client 2" className="rounded-full h-[80px] shadow-sm absolute left-32 z-10" />
          </div> */}

        </div>

        {/* Right Section */}
        <div className="flex flex-1 flex-col gap-4">
          {/* Top Image */}
          <div className="rounded-2xl overflow-hidden">
            <img src={sideimg} alt="Top Image" className="rounded-xl object-cover w-full h-full"/>
          </div>

          {/* Side-by-Side Images */}
          <div className="flex gap-4">
            <div className="flex-1 rounded-xl overflow-hidden">
              <img
                src={sideimg1}
                alt="Side Image 1"
                className="rounded-xl object-cover w-full aspect-square"
              />
            </div>
            <div className="flex-1 rounded-xl overflow-hidden">
              <img
                src={sideimg2}
                alt="Side Image 2"
                className="rounded-xl object-cover w-full aspect-square"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
