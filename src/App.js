import React, { useState, useEffect } from 'react';
import './App.css';
import Papa from './Components/Papa';
import Map from './Components/Map';
import * as functions from 'firebase-functions';

function App() {
  const [addressList, setAddressList] = useState([]);
  const [markers, setMarkers] = useState([]);
  const [googleLoaded, setGoogleLoaded] = useState(false);

  useEffect(() => {
    let key = '';
    console.log('FUNCTIONS config', functions?.config())
    if (functions?.config()?.google) {
      key = functions.config().google.key;
      console.log('KEY from functions', key);
    } else {
      key = process.env.REACT_APP_GOOGLE_APIKEY;
    }
    const google = document.createElement('script');
    google.src = `https://maps.googleapis.com/maps/api/js?libraries=places,geometry&key=${key}&v=3`;
    document.body.appendChild(google);
    google.addEventListener('load', () => setGoogleLoaded(true));
  }, []);

  useEffect(() => {
    if (window.google && window.map) {
      const bounds = new window.google.maps.LatLngBounds();
      markers.forEach(marker => {
        marker.setMap(window.map);
        bounds.extend(marker.getPosition());
      });
      window.map.fitBounds(bounds);
    }
  }, [markers])

  const clearMap = () => {
    markers.forEach(marker => {
      marker.setMap(null);
    })
  }

  const getGeocode = result => {
    const ids = markers.map(m => m.id);
    if (ids.includes(result.id)) {
      const filteredMarkers = markers.filter(m => m.id !== result.id);
      clearMap();
      setMarkers(filteredMarkers);
    } else {
      const geocoder = new window.google.maps.Geocoder();
      geocoder.geocode({'address': result.address}, (results, status) => {
        if (status === 'OK') {
          window.map.setCenter(results[0].geometry.location);
          const marker = new window.google.maps.Marker({
            position: results[0].geometry.location,
            id: result.id,
          });
          setMarkers([...markers, marker]);
        } else {
          console.log('Geocode was not successful for the following reason: ' + status);
        }
      });
    }
  }

  return (
    <div className="App">
      <h1>Logic routes finder</h1>
      <p>
        Upload your CSV file to obtain the logic routes for your address
      </p>
      <div className="container">
        <Papa setAddressList={setAddressList} />
      </div>
      <div className="container">
        <div id="addreses">
          {addressList.map(result => (
            <label
              key={result.id}
              htmlFor={`address-${result.id}`}
              className="address"
            >
              <span>
                <input
                  id={`address-${result.id}`}
                  type="checkbox"
                  onChange={() => getGeocode(result)}
                />
              </span>
              <span style={{marginLeft: '1rem'}}>
                {result.id}
              </span>
              <span style={{margin: '0rem 1rem'}} >
                -
              </span>
              <span>
                {result.address}
              </span>
            </label>
          ))}
        </div>
        {googleLoaded && <Map />}
      </div>
    </div>
  );
}

export default App;
