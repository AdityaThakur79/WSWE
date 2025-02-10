import React, { useState, useEffect } from "react";
import axios from "axios";
import { UserData } from "../../context/UserContext";
import toast from "react-hot-toast";

const SOSButton = () => {
  const [isSending, setIsSending] = useState(false);
  const [receivers, setReceivers] = useState([]);
  const [newNumber, setNewNumber] = useState();
  const { user } = UserData()

  // Load receivers from local storage when the component mounts
  // useEffect(() => {
  //   const savedReceivers = JSON.parse(localStorage.getItem("receivers")) || [];
  //   setReceivers(savedReceivers);
  // }, []);

  // // Save receivers to local storage whenever the list is updated
  // useEffect(() => {
  //   localStorage.setItem("receivers", JSON.stringify(receivers));
  // }, [receivers]);

  // // Function to add a new phone number
  // const addNumber = () => {
  //   if (newNumber.trim() === "" || receivers.length >= 4) {
  //     alert("Please enter a valid phone number and ensure no more than 4 numbers.");
  //     return;
  //   }
  //   if (receivers.includes(newNumber)) {
  //     alert("This number is already added.");
  //     return;
  //   }
  //   setReceivers([...receivers, newNumber]);
  //   setNewNumber(""); // Clear the input field
  // };

  // // Function to remove a number from the list
  // const removeNumber = (index) => {
  //   const updatedReceivers = receivers.filter((_, i) => i !== index);
  //   setReceivers(updatedReceivers);
  // };

  // Function to send the SOS message





  // below is the function for adding the number 
  const addNumber = async () => {
    try {
      const { data } = await axios.post('/api/v1/user/addEmergencyNumber', { userId: user?._id, emergencyNumber: newNumber })
      if (data?.success) {
        toast.success(`number ${newNumber} added successfully`)
      }
      getNumber();
    } catch (error) {
      console.log(error)
    }
  }
  // below is the contrtoller for getting all nmumbers
  const getNumber = async () => {
    try {
      const { data } = await axios.get(`/api/v1/user/getEmergencyNumber/${user._id}`)
      console.log(data)
      setReceivers(data?.emergencyNumber)
    } catch (error) {
      console.log(error)
    }
  }
  // below is the function for removing the number
  const removeNumber = async (index) => {
    try {
      // console.log(index)
      const number = receivers[index];
      console.log(number);
      console.log(number)
      const { data } = await axios.put('/api/v1/user/removeEmergencyNumber', { emergencyNumber: number, userId: user?._id })
      getNumber();
      console.log(data);
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    getNumber();
  }, [])


  const sendSOS = () => {
    if (!navigator.geolocation) {
      alert("Geolocation is not supported by your browser");
      return;
    }

    if (receivers.length === 0) {
      alert("Please add at least one phone number.");
      return;
    }

    // Get the user's location
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;

        // Send the SOS request to the backend
        setIsSending(true);
        axios
          .post("/send-sos", {
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

  return (
    <div className="max-w-md mx-auto bg-white p-6 rounded-lg shadow-lg mt-10">
      <h2 className="text-xl font-semibold text-center mb-4 text-gray-800">Add Emergency Contacts</h2>

      <div className="flex items-center mb-4">
        <input
          type="text"
          placeholder="Enter phone number"
          value={newNumber}
          onChange={(e) => setNewNumber(e.target.value)}
          className="flex-1 px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        <button
          onClick={addNumber}
          disabled={receivers?.length > 4}
          className={`ml-4 px-4 py-2 rounded-lg ${receivers?.length >= 4 ? "bg-gray-400 cursor-not-allowed" : "bg-blue-500 hover:bg-blue-600"} text-white`}
        >
          Add
        </button>
      </div>

      <h3 className="text-lg font-semibold text-gray-700 mb-3">Receivers (max 4):</h3>
      <ul className="list-disc pl-5 mb-4">
        {receivers?.map((receiver, index) => (
          <li key={index} className="flex items-center justify-between py-1">
            <span>{receiver}</span>
            <button
              onClick={() => removeNumber(index)}
              className="text-red-500 hover:text-red-600"
            >
              Remove
            </button>
          </li>
        ))}
      </ul>

      <button
        onClick={sendSOS}
        disabled={isSending || receivers?.length === 0}
        className={`w-full px-4 py-2 rounded-lg text-white ${isSending || receivers?.length === 0 ? "bg-gray-400 cursor-not-allowed" : "bg-red-500 hover:bg-red-600"} focus:outline-none`}
      >
        {isSending ? "Sending SOS..." : "Send SOS"}
      </button>
    </div>
  );
};

export default SOSButton;
