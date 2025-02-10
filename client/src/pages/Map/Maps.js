import React, { useEffect, useRef } from 'react';
import { useMapsContext } from '../../context/MapsContext';

const Map = () => {
  const mapRef = useRef(null);
  const { currentLocation, safeLocationPoints } = useMapsContext();

  useEffect(() => {
    if (currentLocation && safeLocationPoints) {
      // Initialize the map
      const map = new window.google.maps.Map(mapRef.current, {
        center: { lat: currentLocation.lat, lng: currentLocation.lng },
        zoom: 14,
      });

      // Set up directions service
      const directionsService = new window.google.maps.DirectionsService();
      const directionsRenderer = new window.google.maps.DirectionsRenderer();
      directionsRenderer.setMap(map);

      // Request directions
      directionsService.route(
        {
          origin: { lat: currentLocation.lat, lng: currentLocation.lng },
          destination: { lat: safeLocationPoints.lat, lng: safeLocationPoints.lng },
          travelMode: window.google.maps.TravelMode.WALKING, // You can also use WALKING,DRIVING,BICYCLING, TRANSIT
        },
        (result, status) => {
          if (status === window.google.maps.DirectionsStatus.OK) {
            directionsRenderer.setDirections(result);
          } else {
            console.error(`Error fetching directions: ${status}`);
          }
        }
      );
    }
  }, [currentLocation, safeLocationPoints]);

  return (
    <div ref={mapRef} className="h-[85vh] w-full"></div>
  );
};

export default Map;