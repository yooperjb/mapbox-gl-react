import React, { useState } from 'react';
import './App.css';
import ReactMapGl, {Marker, Popup} from 'react-map-gl';
import Skateboard_Parks from "./data/Skateboard_Parks.json";
//require('dotenv').config();

function App() {

  const [viewport, setViewport] = useState({
    latitude: 45.4211,
    longitude: -75.6903,
    zoom: 10,
    width: '100vw',
    height: '100vh'
  });

  const [selectedPark, setSelectedPark] = useState(null);
  //console.log({Skateboard_Parks});
  //console.log(selectedPark.properties.NAME);
  console.log({selectedPark});

  return (
    <ReactMapGl 
      {...viewport}
      mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}
      //mapStyle="" can put a different map style link here
      onViewportChange={setViewport}
    >
      {Skateboard_Parks.features.map((park) => (
        <Marker key={park.properties.PARK_ID}
          latitude={park.geometry.coordinates[1]}
          longitude={park.geometry.coordinates[0]}>
          <button className="marker-btn" onClick={(e) => {
            e.preventDefault();
            setSelectedPark(park)
          }}>
            <img src="skateboarding.svg" alt="Skate Park Icon" />
          </button>
        </Marker>
      ))}
      {selectedPark ? (
        <Popup
          latitude={selectedPark.geometry.coordinates[1]}
          longitude={selectedPark.geometry.coordinates[0]}
          closeButton={false}>
          <div>
            {selectedPark.properties.NAME}
          </div>
        </Popup>
      ) : null }
    </ReactMapGl>
  );
}

export default App;
