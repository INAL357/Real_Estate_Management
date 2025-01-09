import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaSearch, FaUser } from 'react-icons/fa';
//import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setlogout } from '../redux/state.js';
import Search from './../pages/search';
import { Navigate } from 'react-router-dom';

const Header = () => {
    const [dropdownMenu, setDropdownMenu] = useState(false);
    const user = useSelector((state) => state.user);
    //const navigate = useNavigate();
    const [search, setSearch] = useState("");
    const dispatch = useDispatch();
   const navigate = useNavigate();
    const handleSearch = () => {
      if (search !== "") {
        navigate(`/listing/search/${search}`);  // Navigate to the search page
      }
    };
    return (
        <header className="max-padd-container flexBetween rounded-xl py-4">
            {/* Logo */}
            <Link to="/" className="bold-24">
                <div>
                    <h4>
                        SkyLine <span className="text-secondary">Developers</span>
                    </h4>
                </div>
            </Link>

            {/* Search Bar */}
            <div className="bg-white ring-1 ring-slate-900/5 rounded-full p-2 w-44 sm:w-96 flexBetween gap-x-2 relative">
                <input
                    type="text"
                    
                    value={search}  
                    onChange={(e) => setSearch(e.target.value)} 
                    placeholder="Search here"
                    className="outline-none border-none w-full bg-white"
                    aria-label="Search input"
                />
                <button

                disabled={search === ""}//doesnt work if search bar is empty
                    className="absolute right-0 h-full w-10 rounded-full bg-secondary text-white flexCenter cursor-pointer"
                    aria-label="Search"
                    onClick={handleSearch}
                >
                    <FaSearch />
                </button>
            </div>

            <div className="cursor-pointer flexBetween gap-x-10">
  <div onClick={() => setDropdownMenu(!dropdownMenu)}>
    <div>
      {!user ? (
        <FaUser />
      ) : (
        <img
          src={`http://localhost:4000/${user?.profileImagePath?.replace('public', '') || ''}`}
          alt="User Profile"
          height={47}
          width={47}
          className="rounded-full object-cover aspect-square"
        />
      )}
      {dropdownMenu && (
        <div className="absolute top-16 right-0 w-40 p-4 rounded-3xl bg-white text-grey-30 medium-14 flex flex-col gap-y-2 shadow-sm z-50">
          {!user ? (
            <>
              <Link to="/login">Login</Link>
              <Link to="/register">Register</Link>
            </>
          ) : (
            <>
              <Link to="/create-listing">Add a property</Link>
              <Link to={`/${user._id}/wishlist`}>Wish List</Link>
              <Link to={`/${user._id}/listing`}>Property List</Link>
              <Link to={`/${user._id}/reservation`}>Reservation List</Link>
              <Link to="/login" onClick={() => dispatch(setlogout())}>
                Logout
              </Link>
            </>
          )}
        </div>
      )}
    </div>
  </div>
</div>

        </header>
    );
};

export default Header;
