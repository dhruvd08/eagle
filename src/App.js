import "./App.css";
import Header from "./components/Header";
import Notification from "./components/Notification";
import Map from "./components/Map";
import React, { useEffect, useState } from "react";

function App() {
  const [incidents, setIncidents] = useState([]);

  useEffect(() => {

    const fetchData = async () => {
      const baseUrl = "https://mseb-incident.onrender.com/";

      const result = await fetch(baseUrl);
      const allIncidents = await result.json();
      console.log(allIncidents);
      
      setIncidents(allIncidents);
    }
    
    fetchData();
  }, []);

  return (
    <div>
      <Header />
      <div id="container">
        <Map />
        {/* <Feed incidents={incidents} /> */}
        <div className="feed">
          {incidents.map((incident) => {
            return <Notification key={incident.id} report={incident} />;
          })}
        </div>
      </div>
    </div>
  );
}

export default App;
