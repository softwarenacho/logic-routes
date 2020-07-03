import React, { useEffect } from 'react';

const Map = () => {

  useEffect(() => {
    initMap();
  }, [])


  function initMap() {
    let map = new window.google.maps.Map(
      document.getElementById('map'),
      {
        center: {lat: 19.3910038, lng: -99.2836963},
        zoom: 12,
        streetViewControl: false,
        mapTypeControl: false,
      }
    );
    window.map = map
  }

  return (
    <div id='map'></div>
  )
}

export default Map;
