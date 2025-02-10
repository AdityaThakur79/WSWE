import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { io } from 'socket.io-client';

// Establish socket connection
const socket = io('http://localhost:8080');

const MapViewer = () => {
  const { linkId } = useParams();
  const [targetlocation, setTargetLocation] = useState({ lat: null, lng: null });
  const [watcherLocation, setWatcherLocation] = useState({ lat: null, lng: null });
  const mapInstanceRef = useRef(null);
  const directionsRendererRef = useRef(null);
  const mapRef = useRef(null);

  // Function to get the initial location from the server
  const getLocation = async () => {
    try {
      const { data } = await axios.get(`/api/v1/user/getLinkData/${linkId}`);
      if (data?.linkedData?.lat && data?.linkedData?.lng) {
        setTargetLocation({ lat: data.linkedData.lat, lng: data.linkedData.lng });
        // 19.445578,72.820580
        // virar->19.445578,72.820580
        //  setTargetLocation({ lat: 19.445578, lng: 72.820580 });
      }
    } catch (error) {
      console.error("Error fetching initial location:", error);
    }
  };

  useEffect(() => {
    getLocation();
    socket.emit('join-link', linkId);

    socket.on('location-updated', (data) => {
      console.log('Location updated:', data);
      setTargetLocation({ lat: data.lat, lng: data.lng });
    });

   
  }, [linkId]);

  useEffect(() => {
    if (navigator.geolocation) {
      const watchId = navigator.geolocation.watchPosition(
        (position) => {
          const newLocation = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          };
          console.log("Updated location:", newLocation);
          setWatcherLocation(newLocation);
          socket.emit('update-location', { linkId, lat: newLocation.lat, lng: newLocation.lng }); 
        },
        (error) => {
          console.error('Error while fetching geolocation', error);
        },
        { enableHighAccuracy: true, maximumAge: 0, timeout: 5000 }
      );

      return () => {
        navigator.geolocation.clearWatch(watchId);
      };
    }
  }, [linkId]);

  useEffect(() => {
    if (targetlocation.lat && targetlocation.lng && watcherLocation.lat && watcherLocation.lng) {
      if (!mapInstanceRef.current) {
        mapInstanceRef.current = new window.google.maps.Map(mapRef.current, {
          center: { lat: watcherLocation.lat, lng: watcherLocation.lng },
          zoom: 14,
        });

        directionsRendererRef.current = new window.google.maps.DirectionsRenderer();
        directionsRendererRef.current.setMap(mapInstanceRef.current);
      } else {
        mapInstanceRef.current.setCenter({ lat: watcherLocation.lat, lng: watcherLocation.lng });
      }

      const directionsService = new window.google.maps.DirectionsService();
      directionsService.route(
        {
          origin: { lat: watcherLocation.lat, lng: watcherLocation.lng },
          destination: { lat: targetlocation.lat, lng: targetlocation.lng },
          travelMode: window.google.maps.TravelMode.WALKING,
        },
        (result, status) => {
          if (status === window.google.maps.DirectionsStatus.OK) {
            directionsRendererRef.current.setDirections(result);
          } else {
            console.error(`Error fetching directions: ${status}`);
          }
        }
      );
    }
  }, [watcherLocation, targetlocation]);

  return (
    <div>
      <h1>Track Location</h1>
      {targetlocation.lat && targetlocation.lng && watcherLocation.lat && watcherLocation.lng ? (
        <div ref={mapRef} style={{ height: "85vh", width: "100%" }}></div>
      ) : (
        <p>Waiting for location updates...</p>
      )}
    </div>
  );
};

export default MapViewer;