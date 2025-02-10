// this below is the live tracking page
import React,{useEffect,useState} from 'react'
import { io } from "socket.io-client";
import axios from 'axios';
import { UserData } from "../../context/UserContext";
// import { set } from 'mongoose';
const socket=io("http://localhost:8080")
const LiveTracking = () => {
  const {user}=UserData();
  const [link, setLink] = useState("");
  const [bounce,setBounce]=useState(true);
  // below is he function for sharing the shareable link
  useEffect(() => {
    const timer = setTimeout(() => {
      setBounce(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);
  const createLink = async () => {
    try {
      const { data } = await axios.post('/api/v1/user/createLink', { userId: user?._id });
      console.log(data);
      setLink(data?.url);
      // lat: 19.445578, lng: 72.820580
      if (navigator.geolocation) {
        navigator.geolocation.watchPosition(
          (position) => {
            const { latitude, longitude } = position.coords;
            socket.emit("update-location", { linkId: data.linkId, lat: latitude, lng: longitude });
            // socket.emit("update-location", { linkId: data.linkId, lat: 19.124345667154884, lng:72.85963363752664});
            // 19.124309435042534 72.8597634096631
            // 19.124345667154884 72.85963363752664
            console.log('location has been updated on live tracking',latitude,longitude)
          },
          (error) => console.error('Error while getting location', error),
          { enableHighAccuracy: true, maximumAge: 10000, timeout: 5000 }
        );
      }
    } catch (error) {
      console.log('error');
    }
  };

  const copyToClipboard = () => {
    if (link) {
      navigator.clipboard.writeText(link);
      alert("Link copied to clipboard!");
    }
  };

  useEffect(()=>{createLink()},[])
  return (
      <div className='flex flex-col items-center h-screen gap-4 '>
      <h2 className='my-8 text-xl font-semibold '>Share this link</h2>

      <div className='text-center'>
       <div className={`p-4 bg-blue-700 text-white text-lg rounded-lg shadow-lg font-semibold border-blue-500 hover:animate-none focus:animate-none ${bounce ? "animate-bounce" : ""}`}>
      {link && 
      <span>{link}</span>
      }
      </div>
      </div>
      <button className='border-2 p-2 rounded-md text-white font-semibold bg-green-500 hover:bg-green-600' onClick={copyToClipboard}>copy</button>
  </div>
  )
}

export default LiveTracking
