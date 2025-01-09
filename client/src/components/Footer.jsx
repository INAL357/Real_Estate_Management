
import { BsTelephoneFill, BsEnvelopeFill, BsGeoAltFill, BsFacebook, BsTwitterX, BsInstagram, BsLinkedin } from 'react-icons/bs';
import {Link} from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="max-padd-container">
        <div className="max-padd-container bg-black text-white py-10 rounded-3xl">
            <div className="container mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
            {/* logo */}
            <Link to={"/"}>
                <div className="bold-24 mb-4">
                    <h4>
                        SkyLine <span className="text-secondary">Developers</span>
                    </h4>
                </div>
                <p className="text-white/70">Lorem ipsum dolor sit amet consectetur adipisicing elit. Animi, est?</p>
                <p>Copyright 2024 SykLine Developers.All right reserved </p>
            </Link>
            {/* quick links */}
            <div className="">
                <h4 className="h4 mb-4">Quick Links</h4>
                <ul className="space-y-2 regular-15">
                    <li className="text-gray-10">
                        <a href="#">About Us</a>
                    </li>
                    
                    <li className="text-gray-10">
                        <a href="#">Properties</a>
                    </li>
                    
                    <li className="text-gray-10">
                        <a href="#">Services</a>
                    </li>
                    
                    <li className="text-gray-10">
                        <a href="#">Contact</a>
                    </li>
                    
                    <li className="text-gray-10">
                        <a href="#">Privacy policy</a>
                    </li>
                    
                </ul>
            </div>
            <div>
                <h4 className="h4 mb-4">Contact us</h4>
                <p className="text-gray-10 mb-2">
                    <BsTelephoneFill className="inline-block mr-2"/>+91 6360040507
                     </p>
                     <p className="text-gray-10 mb-2">
                    <BsEnvelopeFill className="inline-block mr-2"/>{" "}
                    support@sylinedevlopers.com
                     </p>
                     <p className="text-gray-10 mb-2">
                    <BsGeoAltFill className="inline-block mr-2"/>Developers Avenue, Udupi, Karnataka
                     </p>
            </div>
            {/* Social medial */}
            <div>
                <h4 className="h4 mb-4 ">Follow Us</h4>
                <div className="flex space-x-4 text-gray-10">
                    <a href="#" className="hover:text-blue-500">
                        <BsFacebook />
                    </a>
                    <a href="#" className="hover:text-blue-300">
                        <BsTwitterX />
                    </a>
                    <a href="#" className="hover:text-red-600">
                        <BsInstagram />
                    </a>
                    <a href="#" className="hover:text-yellow-200">
                        <BsLinkedin />
                    </a>
                </div>

            </div>
            <div className="mt-10 text-center text-gary-100">
                <p>
                    Powered by <a href="#">SkyLine Developers</a>
                </p>
            </div>
        </div>
        </div>
    </footer>
  )
}

export default Footer