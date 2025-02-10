import React, { useEffect, useState } from "react";
import heroImage from "../assets/hero.jpg";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { UserData } from "../context/UserContext";
import { MdAddAlert } from "react-icons/md";
import toast from "react-hot-toast";
import AddToHomeScreen from "./AddToHomescreen";

const HeroSection = () => {
  const [receivers, setReceivers] = useState([]);
  const [sending, setIsSending] = useState(false);
  const { user } = UserData();

  const getNumber = async () => {
    try {
      const { data } = await axios.get(
        `/api/v1/user/getEmergencyNumber/${user._id}`
      );
      console.log(data);
      setReceivers(data?.emergencyNumber);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getNumber();
  }, []);
  const sendSOS = () => {
    if (!navigator.geolocation) {
      toast.error("Geolocation is not supported by your browser");
      return;
    }

    if (receivers?.length === 0) {
      toast.error("Please add at least one phone number");
      return;
    }

    // Get the user's location
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;

        // Send the SOS request to the backend
        setIsSending(true);
        axios
          .post("api/v1/user/send-sos", {
            sender: "Taha", // Static sender, you can make this dynamic
            receivers,
            message: "This is an SOS message!",
            latitude,
            longitude,
          })
          .then((response) => {
            alert(response.data.message);
          })
          .catch((error) => {
            console.error("Error sending SOS:", error);
            alert("Failed to send SOS");
          })
          .finally(() => {
            setIsSending(false);
          });
      },
      (error) => {
        console.error("Error getting location:", error);
        alert("Unable to retrieve your location");
      }
    );
  };
  // const navigate = useNavigate()
  return (
    <>
      <div
        className="relative w-full h-[88vh] bg-cover bg-center"
        style={{ backgroundImage: `url(${heroImage})` }}
      >
        <div className="absolute inset-0 z-10" /> {/* No overlay */}
        <div className="flex flex-col justify-center items-start w-full h-full px-8 md:px-16 z-20 text-left">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-800">
            Your Safety, <br /> Our Priority
          </h1>
          <p className="text-lg md:text-xl text-gray-600 mt-4">
            A platform dedicated to ensuring security, <br />
            support, and empowerment for women.
          </p>
          <button className="mt-6 px-8 py-3 rounded-md bg-[#FAA845] text-white font-bold">
            Learn More
          </button>
        </div>
        {/* Emergency Button */}
        <button
          onClick={sendSOS}
          className="fixed bottom-4 right-4 flex items-center px-6 py-3 rounded-md bg-[#FAA845] text-white font-bold shadow-lg z-30 hover:bg-red-700 transition duration-200"
        >
          <MdAddAlert size={24} className="mr-2" /> Emergency
        </button>
        <AddToHomeScreen />
      </div>
    </>
  );
};

export default HeroSection;
