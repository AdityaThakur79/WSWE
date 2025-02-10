import React, { useState, useEffect } from "react";
import ProfilePic from "../../assets/ProfilePic.jfif";
import WorkshopImage1 from "../../assets/workshop2.jfif"; // Image for girl empowerment
import WorkshopImage2 from "../../assets/workshop1.jfif"; // Image for security workshop
import WorkshopImage3 from "../../assets/workshop3.webp"; // Image for confidence workshop
import { UserData } from "../../context/UserContext";
import { useNavigate, Link } from "react-router-dom";
import toast from "react-hot-toast";
import axios from "axios";

const UserDashboard = ({ user }) => {

  const { setIsAuth, setUser,workshop } = UserData();
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsAuth(false);
    setUser(null);
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center pt-10 md:px-20 px-4">
      {/* Profile Card */}
      <div className="bg-white shadow-lg rounded-lg p-8 w-full md:max-w-[600px] flex flex-col items-center text-center relative">
        <img
          src={ProfilePic}
          alt="profile"
          className="w-24 h-24 rounded-full object-cover mb-4 border-4 border-[#FAA845]"
        />
        <h2 className="text-[#FAA845] text-2xl font-bold">{user?.name}</h2>
        <p className="text-[#FAA845]">{user?.email}</p>
        <p className="text-gray-700 mt-2">
          Enthusiast in women safety and self-defense advocacy.
        </p>

        {/* Buttons for Edit Profile, Logout, and Admin Dashboard */}
        <div className="mt-4 flex flex-col space-y-3 sm:space-y-0 sm:flex-row sm:space-x-4">
          <button className="px-6 py-3 bg-[#FAA845] text-white font-bold rounded-md hover:bg-[#e8993d] transition duration-300">
            Edit Profile
          </button>

          {/* Logout Button */}
          <button
            onClick={handleLogout}
            className="px-6 py-3 bg-red-600 text-white font-bold rounded-md hover:bg-red-500 transition duration-300"
          >
            Logout
          </button>

          {/* Conditionally show Admin Dashboard button if the user is an admin */}
          {user?.role === 1 ? (
            <Link to="/admin/dashboard/">
              <button className="px-6 py-3 bg-[#FAA845] text-white font-bold rounded-md hover:bg-[#dcb381] transition duration-300">
                Admin Dashboard
              </button>
            </Link>
          ) : (
            <></>
          )}
        </div>
      </div>

      {/* Hovering Button to Post a Workshop */}
      <div className="fixed bottom-8 right-8 group">
        <button
          className="bg-[#FAA845] hover:bg-[#e8993d] text-white p-4 rounded-full shadow-lg cursor-pointer transition duration-300"
          title="Post a Workshop"
          onClick={() => navigate('/create-workshop')}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 4v16m8-8H4"
            />
          </svg>
        </button>
        {/* Tooltip on hover */}
        <span className="absolute right-0 bottom-14 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-black text-white text-sm rounded px-2 py-1">
          Add a Workshop
        </span>
      </div>

      {/* Workshops Section */}
      <div className="w-full mt-10">
        <h3 className="text-xl font-bold text-[#FAA845] text-center mb-6">
          Your Workshops
        </h3>

        {workshop.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 justify-center items-center">
            {workshop
              .filter(item => item.user === user?._id) // Filter for workshops by the current user
              .map((workshop) => (
                <div
                  key={workshop._id}
                  className="bg-white shadow-lg p-6 rounded-lg border-t-4 border-[#FAA845] flex flex-col"
                >
                  <img
                    src={`/api/v1/user/postPhoto/${workshop?._id}`}
                    alt={workshop.title}
                    className="w-full h-40 object-fill rounded-lg mb-4"
                  />
                  <h4 className="text-lg font-bold text-gray-800" style={{ fontFamily: "'Poppins', sans-serif" }}>
                    {workshop?.name}
                  </h4>
                  <p className="text-gray-600" style={{ fontFamily: "'Poppins', sans-serif" }}>Date: {workshop.date}</p>
                  <p className="text-gray-600" style={{ fontFamily: "'Poppins', sans-serif" }}>Location: {workshop.address}</p>
                  <p className="text-gray-700 font-semibold" style={{ fontFamily: "'Poppins', sans-serif" }}>Remaining:{Number(workshop?.participantsNumber) - Number(workshop?.registered)}</p>
                  <p className="text-gray-700 font-semibold" style={{ fontFamily: "'Poppins', sans-serif" }}>Status:<span className={workshop?.approved === 1 ? 'text-green-600' : 'text-yellow-500'}>
                    {workshop?.approved === 1 ? 'Approved' : 'Not yet approved'}</span></p>
                  <p className="text-gray-700 mt-2 mb-1" style={{ fontFamily: "'Poppins', sans-serif" }}>{workshop?.description?.slice(0,30)}</p>
                  <button className='mt-auto text-start text-white  bg-[#FAA845] px-4 py-2 rounded hover:bg-[#b47931]' style={{ fontFamily: "'Poppins',sans-serif" }} onClick={()=>navigate(`/viewParticipants/${workshop._id}`)}>View Participants</button>
                  {/* <p className="text-gray-600 mt-2">
              Attendees: {workshop.attendees}
            </p> */}
                </div>
              ))}
          </div>
        ) : (
          <p className="text-gray-600 text-center">
            No workshops posted yet. Click the button to post your first
            workshop.
          </p>
        )}
      </div>

      {/* Show All Workshops Button */}
      <div className="mt-10 w-full flex justify-center">
        <button className="px-6 py-3 bg-[#FAA845] text-white font-bold rounded-md hover:bg-[#e8993d] transition duration-300 w-full md:max-w-[400px] text-center">
          Show All Workshops
        </button>
      </div>
    </div>
  );
};

export default UserDashboard;
