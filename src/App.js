import React, { useState, useEffect } from 'react';
import './App.css';
import Papa from './Components/Papa'
function App() {

  const [addressList, setAddressList] = useState([]);

  const getGeocode = address => {
    console.log('address', address);
    // PENDING TO INTEGRATE GOOGLE WITH REACT
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
            <div key={result.id} style={{marginTop: '1rem'}}>
              <span>
                <input
                  type="checkbox"
                  onChange={() => getGeocode(result.address)}
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
            </div>
          ))}
        </div>
        <div id="map"></div>
      </div>
    </div>
  );
}

export default App;
