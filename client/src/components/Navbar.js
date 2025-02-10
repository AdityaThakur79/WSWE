import React, { useContext, useEffect, useState } from "react";
import logo from "../assets/logo.svg";
import lock from "../assets/lock.svg";
import hamburgerMenu from "../assets/hamburgerMenu.svg";
import close from "../assets/close.svg";
import { Link } from "react-router-dom";
import { UserData } from "../context/UserContext";

const Navbar = ({ isAuth }) => {
  const { user } = UserData();
  const [toggle, setToggle] = useState(false);
  const [role, setRole] = useState(0);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  useEffect(() => {
    setRole(user?.role || 0);
  }, [user]);

  const toggleDropdown = () => setDropdownOpen(!dropdownOpen);
  const handleLinkClick = () => {
    setToggle(false);
    setDropdownOpen(false);
  };

  const getUserInitials = (name) => {
    if (!name) return "";
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase();
  };

  return (
    <div className="w-full h-[80px] bg-white border-b fixed top-0 left-0 z-50 shadow-md">
      <div className="max-w-[1480px] w-full h-full mx-auto flex justify-between items-center px-4 md:px-8">
        {/* Logo */}
        <Link to="/">
          <p
            className="text-3xl font-bold text-[#FAA845]"
            style={{ fontFamily: "'Roboto', sans-serif" }}
          >
            WSWE
          </p>
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-6">
          <ul className="flex gap-4">
            {[
              { to: "/", label: "Home" },
              { to: "/allWorkshop", label: "Workshops" },
              { to: "/nearbySafeLocations", label: "Nearby Safe Locations" },
              { to: "/live-tracking", label: "Live Tracking" },
              { to: "/community", label: "Community" },
              { to: "/AddEmergencyNum", label: "SOS", style: "text-[#fa6345]" },
              { to: "/jobs", label: "Jobs", style: "text-[#fa6345]" },
            ].map(({ to, label, style }) => (
              <Link key={to} to={to} onClick={handleLinkClick}>
                <li
                  className={`text-[#FAA845] font-bold hover:text-[#20B486] cursor-pointer ${
                    style || ""
                  }`}
                >
                  {label}
                </li>
              </Link>
            ))}
          </ul>
        </div>

        {/* User Account / Login-Register */}
        <div className="hidden md:flex items-center gap-4">
          {isAuth ? (
            <div className="relative">
              <button
                onClick={toggleDropdown}
                className="px-4 py-2 bg-[#FAA845] text-white font-bold rounded-md hover:bg-[#e8993d] transition duration-300"
              >
                {getUserInitials(user?.name)}
              </button>
              {dropdownOpen && (
                <ul className="absolute right-0 mt-2 w-48 bg-white shadow-lg border rounded-lg z-50">
                  <li>
                    <Link
                      to="/account"
                      className="block px-4 py-2 text-[#FAA845] hover:bg-gray-100"
                      onClick={handleLinkClick}
                    >
                      Account
                    </Link>
                  </li>
                  {role === 1 && (
                    <li>
                      <Link
                        to="/admin/dashboard"
                        className="block px-4 py-2 text-[#FAA845] hover:bg-gray-100"
                        onClick={handleLinkClick}
                      >
                        Dashboard
                      </Link>
                    </li>
                  )}
                  <li>
                    <Link
                      to="/mybookmarks"
                      className="block px-4 py-2 text-[#FAA845] hover:bg-gray-100"
                      onClick={handleLinkClick}
                    >
                      My Job Bookmarks
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/applied-jobs"
                      className="block px-4 py-2 text-[#FAA845] hover:bg-gray-100"
                      onClick={handleLinkClick}
                    >
                      My Applied Jobs
                    </Link>
                  </li>
                </ul>
              )}
            </div>
          ) : (
            <>
              <Link to="/login" onClick={handleLinkClick}>
                <button className="flex justify-center items-center border border-[#20B486] text-[#20B486] font-bold py-2 px-6 rounded-md">
                  <img src={lock} alt="lock icon" className="mr-2" />
                  Login
                </button>
              </Link>
              <Link to="/register" onClick={handleLinkClick}>
                <button className="px-8 py-3 rounded-md bg-[#FAA845] text-white font-bold">
                  Sign Up For Free
                </button>
              </Link>
            </>
          )}
        </div>

        {/* Mobile Menu Button */}
        <div
          className="md:hidden flex-shrink-0"
          onClick={() => setToggle(!toggle)}
        >
          <img
            src={toggle ? close : hamburgerMenu}
            alt="menu icon"
            className="w-6 h-6 cursor-pointer"
          />
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`${
          toggle ? "block" : "hidden"
        } md:hidden fixed top-[80px] left-0 w-full bg-white shadow-lg border-t`}
      >
        <ul className="flex flex-col px-6 py-4 space-y-4">
          {[
            { to: "/", label: "Home" },
            { to: "/allWorkshop", label: "Workshops" },
            { to: "/nearbySafeLocations", label: "Nearby Safe Locations" },
            { to: "/live-tracking", label: "Live Tracking" },
            { to: "/community", label: "Community" },
            { to: "/AddEmergencyNum", label: "SOS", style: "text-[#fa6345]" },
            { to: "/jobs", label: "Jobs", style: "text-[#fa6345]" },
          ].map(({ to, label, style }) => (
            <Link key={to} to={to} onClick={handleLinkClick}>
              <li
                className={`py-2 text-[#FAA845] font-bold hover:text-[#20B486] cursor-pointer ${
                  style || ""
                }`}
              >
                {label}
              </li>
            </Link>
          ))}

          {/* Authentication Buttons for Mobile */}
          {!isAuth ? (
            <div className="flex flex-col gap-4 mt-4">
              <Link to="/login" onClick={handleLinkClick}>
                <button className="flex items-center justify-center border border-[#20B486] text-[#20B486] font-bold py-3">
                  <img src={lock} alt="lock icon" className="mr-2" />
                  Login
                </button>
              </Link>
              <Link to="/register" onClick={handleLinkClick}>
                <button className="px-8 py-3 rounded-md bg-[#FAA845] text-white font-bold">
                  Sign Up For Free
                </button>
              </Link>
            </div>
          ) : (
            <Link to="/account" onClick={handleLinkClick}>
              <button className="px-4 py-2 bg-[#FAA845] text-white font-bold rounded-md hover:bg-[#e8993d] transition duration-300 w-full">
                Account
              </button>
            </Link>
          )}
        </ul>
      </div>
    </div>
  );
};

export default Navbar;
