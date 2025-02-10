import React, { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { UserData } from "../../context/UserContext";
import { useNavigate } from "react-router-dom";
import moment from "moment";
import { FaMapMarkerAlt, FaCalendarAlt, FaUsers } from "react-icons/fa";
import { Link } from "react-router-dom";

const AllWorkshop = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();
  const { user, workshop, setWorkshop, getAllWorkshopks } = UserData();
  
  const registerUserIntoWorkshop = async (workShopId) => {
    try {
      const userId = user?._id;
      const { data } = await axios.put(
        `/api/v1/user/AddUserToWorkshop/${workShopId}/${userId}`
      );
      toast.success(data?.message);
      window.location.reload();
    } catch (error) {
      console.log(error);
    }
  };
  // below is the function we are writing the function for input search
  const handleSearch = async (query) => {
    try {
      setSearchQuery(query);
      const { data } = await axios.get(
        `/api/v1/user/searchWorkshop/${searchQuery}`
      );
      setWorkshop(data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    if (!searchQuery) {
      getAllWorkshopks();
    }
  }, [searchQuery]);

  const formatDate = (dateString) => {
    return moment(dateString).format("DD MMMM YYYY");
  };

  return (
    <div className="mt-10 px-10 ">
      <div className="mx-auto">
        <h3
          className="text-3xl font-bold text-[#FAA845] text-center mb-6 "
          style={{ fontFamily: "'Roboto', sans-serif" }}
        >
          Workshops
        </h3>
        {/* below is the search input box */}
        <div className="mb-6 text-center">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => handleSearch(e.target.value)}
            placeholder="Search Workshops"
            className="border-2 rounded-lg p-2 w-full md:w-1/3 border-[#FAA845] outline-none"
          />
        </div>
        {workshop?.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {workshop.map(
              (workshop) =>
                workshop.approved === 1 && (
                  <Link
                    to={`/workshopDetail/${workshop._id}`}
                    key={workshop._id}
                    className="overflow-hidden rounded-lg bg-white shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
                  >
                    <div className="relative">
                      <img
                        src={`/api/v1/user/postPhoto/${workshop._id}`}
                        alt={workshop.title}
                        className="w-full h-48 object-cover rounded-t-lg"
                      />
                    </div>
                    <div className="px-5 py-4 space-y-3">
                      <h1 className="font-bold text-lg truncate hover:underline">
                        {workshop.name}
                      </h1>
                      <div className="text-sm text-gray-600 flex items-center space-x-2">
                        <FaCalendarAlt className="text-[#FAA845]" />
                        <span>{formatDate(workshop.date)}</span>
                      </div>
                      <div className="text-sm text-gray-600 flex items-center space-x-2">
                        <FaMapMarkerAlt className="text-red-500" />
                        <span>{workshop.address}</span>
                      </div>
                      <div className="text-sm text-gray-700 font-semibold flex items-center space-x-2">
                        <FaUsers className="text-blue-600" />
                        <span>
                          Seats Left:{" "}
                          {Number(workshop.participantsNumber) -
                            Number(workshop.registered)}
                        </span>
                      </div>
                      <p className="text-gray-700 text-sm">
                        {workshop.description.slice(0, 30)}...
                      </p>
                      <div className="flex justify-between items-center mt-3">
                        {workshop.UsersRegistered?.includes(user?._id) ? (
                          <span className="bg-green-500 text-white px-3 py-1 text-xs rounded-full">
                            Registered
                          </span>
                        ) : (
                          <button
                            disabled={
                              workshop.UsersRegistered?.length >=
                              workshop.participantsNumber
                            }
                            className={`text-white px-4 py-2 rounded ${
                              workshop.UsersRegistered?.length >=
                              workshop.participantsNumber
                                ? "bg-gray-400 cursor-not-allowed"
                                : "bg-[#FAA845] hover:bg-[#b47931]"
                            }`}
                            onClick={(e) => {
                              e.preventDefault();
                              registerUserIntoWorkshop(workshop._id);
                            }}
                          >
                            Register
                          </button>
                        )}
                        <span className="bg-blue-600 text-white px-3 py-1 text-xs rounded-full">
                          {workshop.category || "Workshop"}
                        </span>
                      </div>
                    </div>
                  </Link>
                )
            )}
          </div>
        ) : (
          <p className="text-gray-600 text-center">
            No workshops posted yet. Click the button to post your first
            workshop.
          </p>
        )}
      </div>
    </div>
  );
};

export default AllWorkshop;
