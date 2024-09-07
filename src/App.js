import "./App.css";
import Header from "./components/Header";
import Notification from "./components/Notification";
import Map from "./components/Map";
import React, { useEffect, useState } from "react";
import Avatar from "./components/Avatar";

function App() {
  const [incidents, setIncidents] = useState([]);

  const baseUrl = process.env.REACT_APP_BACKEND_URL;

  const source = new EventSource(`${baseUrl}/subscribe`);

  source.addEventListener("message", async (e) => {
    console.log(`Data is ${e.data}`);
    if (Boolean(e.data)) {
      await getData();
    }
  });

  async function getData() {
    const result = await fetch(baseUrl + "/incidents");
    const allIncidents = await result.json();
    console.log(allIncidents);

    setIncidents(allIncidents);
  }

  useEffect(() => {
    const fetchData = async () => {
      await getData();
    };

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
            return (
              <div className="msg-with-avatar" >
                <Avatar name={incident.name}  />
                <Notification key={incident.id} report={incident} />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default App;
