import React, { useState, useEffect } from "react";
import { Select, MenuItem, FormControl, InputLabel } from "@mui/material";
import "./Insights.css";

import InsightsDetails from "./InsightsDetails";

export default function Insights(props) {
  const baseUrl = process.env.REACT_APP_BACKEND_URL;

  const [selectedVillage, setSelectedVillage] = useState(
    props.villages.length > 0 ? props.villages[0] : ""
  );
  const [noOfIncidents, setNoOfIncidents] = useState(0);
  const [upTime, setUpTime] = useState(0);
  const [resolutionTime, setResolutionTime] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      if (selectedVillage !== "") {
        await getNoOfIncidents(selectedVillage);
        await getUpTime(selectedVillage);
        await getResolutionTime(selectedVillage);
      }
    };

    fetchData();
  }, []);

  async function getNoOfIncidents(village) {
    let count = 0;
    try {
      const result = await fetch(baseUrl + `/incidentcount?village=${village}`);
      count = (await result.json()).count;
      return count;
    } catch (err) {
      // TODO Show /error
      //console.log("error fetch incidents...");
    } finally {
      setNoOfIncidents(count);
    }
  }

  async function getUpTime(village) {
    let result = 0;
    try {
      result = await fetch(baseUrl + `/uptime?village=${village}`);
      result = (await result.json()).upTime_inPerc;
      console.log(`uptime for ${village} is ${result}`);
      return Math.round(result);
    } catch (err) {
      // TODO Show /error
      //console.log("error fetch incidents...");
    } finally {
      setUpTime(result);
    }
  }

  async function getResolutionTime(village) {
    let result = 0;
    try {
      result = await fetch(baseUrl + `/resolutiontime?village=${village}`);
      result = (await result.json()).averageResolutionTime_inMins;
      return Math.round(result);
    } catch (err) {
      // TODO Show /error
      //console.log("error fetch incidents...");
    } finally {
      setResolutionTime(result);
    }
  }

  const handleChange = async (event) => {
    const village = event.target.value;
    setSelectedVillage(village);
    setNoOfIncidents(await getNoOfIncidents(village));
    setUpTime(await getUpTime(village));
    setResolutionTime(await getResolutionTime(village));
  };

  return (
    <div className="insight-container">
      <FormControl fullWidth size="small" margin="dense">
        <InputLabel id="demo-simple-select-label">Village</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={selectedVillage}
          label="Village"
          onChange={handleChange}
        >
          {props.villages.map((village, index) => {
            return (
              <MenuItem key={index} value={village}>
                {village}
              </MenuItem>
            );
          })}
        </Select>
      </FormControl>
      {selectedVillage !== "" && (
        <div className="ball-container">
          <InsightsDetails
            insightValue={Math.round(noOfIncidents)}
            bgcolor={
              noOfIncidents === 0
                ? "green"
                : noOfIncidents < 3
                  ? "yellow"
                  : "red"
            }
            title="Number of Incidents"
          />
          <InsightsDetails
            insightValue={Math.round(upTime)}
            bgcolor={upTime > 90 ? "green" : upTime > 80 ? "yellow" : "red"}
            title="Supply Availability (%)"
          />
          <InsightsDetails
            insightValue={Math.round(resolutionTime)}
            bgcolor={
              resolutionTime < 30
                ? "green"
                : resolutionTime < 120
                  ? "yellow"
                  : "red"
            }
            title="Average Resolution Time (mins)"
          />
        </div>
      )}
    </div>
  );
}
