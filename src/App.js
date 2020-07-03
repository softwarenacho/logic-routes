import React, { useState, useEffect } from 'react';
import './App.css';
import Papa from './Components/Papa'
function App() {

  const [addressList, setAddressList] = useState([]);

  // function initMap() {
  //   const map = new google.maps.Map(document.getElementById('map'), {
  //     zoom: 11,
  //     center: {lat: 19.3910038, lng: -99.2836963},
  //   });
  //   const geocoder = new google.maps.Geocoder();
  //   const upload = document.getElementById('upload')
  //   upload.addEventListener('change', () => {
  //     changeFile(geocoder, map);
  //   });
  // }

  // async function geocodeAddress(geocoder, map, address) {
  //   geocoder.geocode({'address': address}, (results, status) => {
  //     if (status === 'OK') {
  //       map.setCenter(results[0].geometry.location);
  //       const marker = new google.maps.Marker({
  //         map: map,
  //         position: results[0].geometry.location
  //       });
  //     } else {
  //       console.log('Geocode was not successful for the following reason: ' + status);
  //     }
  //   });
  // }

  // const changeFile = (e) => {
  //   console.log('e', e)
  //   const file = document.getElementById("upload");
  //   if (file) {
  //     const csv = file.files[0];
  //     const json = Papa.parse(csv, {
  //       header: true,
  //       skipEmptyLines: true,
  //       complete: async results => {
  //         const minResults = results.data.slice(0, 10);
  //         const resultAdresses = minResults.map(result => {
  //           const address = `${result.StreetName} ${result.StreetNumber}, ${result.Neighborhood}, ${result.ZipCode}`;
  //         })
  //         setAddressList(resultAdresses);
  //       }
  //     });
  //   }
  // }

  return (
    <div className="App">
      <h1>Logic routes finder</h1>
      <p>
        Upload your CSV file to obtain the logic routes for your address
      </p>
      <Papa />
      <div id="map"></div>
    </div>
  );
}

export default App;
