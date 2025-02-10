import React, { useState, useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useParams } from "react-router-dom";
import { FaMapMarkerAlt, FaCalendarAlt, FaUsers } from "react-icons/fa";
import moment from "moment";

const DetailInformation = () => {
  const params = useParams();
  const [workshopData, setWorkshopData] = useState();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [locationSet, setLocationSet] = useState("");
  const [date, setDate] = useState("");
  const [approved, setApproved] = useState();
  const [organizer, setOrganizer] = useState("");
  
  const getPostdetails = async () => {
    try {
      const { workshopId } = params;
      const { data } = await axios.get(
        `/api/v1/user/getSingleWorkshop/${workshopId}`
      );
      setWorkshopData(data?.post);
      setName(data?.post?.name);
      setWorkshopData(data?.post);
      setDescription(data?.post?.description);
      setOrganizer(data?.post?.organizerName);
      setApproved(data?.post?.approved);
    } catch (error) {
      console.log(error);
    }
  };

  
  // Format Date
  const formatDate = (dateString) => {
    return moment(dateString).format("DD MMMM YYYY");
  };

  useEffect(() => {
    getPostdetails();
  }, []);
  return (
    <div className="py-8 mt-16">
    <div className="max-w-6xl mx-auto sm:px-6 lg:px-8 px-4">
      <div className="flex flex-col md:flex-row -mx-4">
        <div className="md:flex-1 px-4 -mt-20">
          <div className="h-[460px] rounded-lg w-auto mb-4">
            <img
              src={`/api/v1/user/postPhoto/${workshopData?._id}`}
              className="w-full h-full object-contain"
              alt=""
            />
          </div>
        </div>

        <div className="md:flex-1 px-4">
          <h2 className="text-2xl font-bold mb-2">
            <span className="font-bold text-lg text-[#FAA845] lg:text-[1.6rem] font-poppins">
              Name:{" "}
            </span>
            <span className="text-[1.7rem] font-semibold font-poppins">
              {name}
            </span>
          </h2>
          <p className="text-sm md:text-[1.4rem] mb-4 font-poppins font-semibold">
            <span className="text-lg lg:text-[1.4rem] text-[#FAA845] font-poppins">
              Description:{" "}
            </span>
            <span className="tracking-tight">{description}</span>
          </p>
          <div className="flex flex-col sm:flex-row mb-4">
            <div className="sm:mr-4 mb-4 sm:mb-0">
              <span className="font-bold text-lg">
                <span className="font-bold text-lg lg:text-[1.4rem] font-poppins text-[#FAA845]">
                  Organizer:{" "}
                </span>
                <span className="text-[1.5rem] font-poppins ">
                  {organizer}
                </span>
              </span>
            </div>
          </div>
          <div className="sm:mr-4 mb-4 sm:mb-0">
            <span className="font-bold text-lg">
              <span className="font-bold text-lg lg:text-[1.4rem] font-poppins text-[#FAA845]">
                Status:{" "}
              </span>
              <span
                className={
                  approved === 1
                    ? "text-[1.5rem] font-poppins text-green-600"
                    : "text-[1.5rem] font-poppins text-red-600"
                }
              >
                {approved === 1 ? "Approved" : "Not Yet Approved"}
              </span>
            </span>
          </div>
          <div className="flex flex-col sm:flex-row mb-2 mt-0 md:mt-2">
            <div className="sm:mr-4 mb-4 sm:mb-0">
              <span className="font-bold text-lg">
                <span className="font-bold text-lg lg:text-[1.4rem] font-poppins text-[#FAA845]">
                  Slots:{" "}
                </span>
                <span className="text-[1.5rem] font-poppins ">
                  {workshopData?.participantsNumber}
                </span>
              </span>
            </div>
            <div className="sm:mr-4 mb-4 sm:mb-0">
              <span className="font-bold text-lg">
                <span className="font-bold text-lg lg:text-[1.4rem] font-poppins text-[#FAA845]">
                  Registered:{" "}
                </span>
                <span className="text-[1.5rem] font-poppins ">
                  {workshopData?.registered}
                </span>
              </span>
            </div>
          </div>
          <div className="sm:mr-4 mb-4 sm:mb-0">
            <span className="font-bold text-lg">
              <span className="font-bold text-lg lg:text-[1.4rem] font-poppins text-[#FAA845]">
                Location:{" "}
              </span>
              <span className="text-[1.4rem] font-poppins ">
                <FaMapMarkerAlt className="inline-block text-red-500" />{" "}
                {workshopData?.address}
              </span>
            </span>
          </div>
          <div className="sm:mr-4 mb-4 sm:mb-0 md:mt-2">
            <span className="font-bold text-lg">
              <span className="font-bold text-lg lg:text-[1.4rem] font-poppins text-[#FAA845]">
                Date:{" "}
              </span>
              <span className="text-[1.4rem] font-poppins">
                <FaCalendarAlt className="inline-block text-[#FAA845]" />{" "}
                {formatDate(workshopData?.date)}
              </span>
            </span>
          </div>
        </div>
      </div>
    </div>
  </div>
  );
};

export default DetailInformation;
