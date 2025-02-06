import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaSearch, FaUser } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { setlogout } from '../redux/state.js';

const Header = () => {
  const [dropdownMenu, setDropdownMenu] = useState(false);
  const user = useSelector((state) => state.user);
  const [search, setSearch] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSearch = () => {
    if (search !== "") {
      navigate(`/listing/search/${search}`);
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
          disabled={search === ""}
          className="absolute right-0 h-full w-10 rounded-full bg-secondary text-white flexCenter cursor-pointer"
          aria-label="Search"
          onClick={handleSearch}
        >
          <FaSearch />
        </button>
      </div>

      {/* User Dropdown */}
      <div className="cursor-pointer flexBetween gap-x-10 relative">
        <div onClick={() => setDropdownMenu(!dropdownMenu)} className="flex items-center gap-x-2">
          {!user ? (
            <FaUser className="text-gray-500 text-xl" />
          ) : (
            <div className="h-10 w-10 rounded-full bg-gray-300 text-gray-800 flexCenter font-bold text-lg">
              {user?.name?.charAt(0).toUpperCase() || "U"}
            </div>
          )}
        </div>

        {dropdownMenu && (
          <div className="absolute top-12 right-0 w-40 p-4 rounded-3xl bg-white text-grey-30 medium-14 flex flex-col gap-y-2 shadow-sm z-50">
            {!user ? (
              <>
                <Link to="/login">Login</Link>
                <Link to="/register">Register</Link>
              </>
            ) : (
              <>
                {user.isAdmin ? (
                  <>
                    <Link to="/create-listing">Add a Property</Link>
                    <Link to={`/${user._id}/listing`}>Property List</Link>
                    <Link to={`/${user._id}/reservation`}>Reservation List</Link>
                  </>
                ) : (
                  <>
                    <Link to={`/${user._id}/wishlist`}>Wish List</Link>
                    <Link to={`/${user._id}/trips`}>Trip List</Link>
                  </>
                )}
                <Link to="/login" onClick={() => dispatch(setlogout())}>
                  Logout
                </Link>
              </>
            )}
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
