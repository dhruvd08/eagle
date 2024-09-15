import { useState } from "react";
import React from "react";
import {
  AdvancedMarker,
  Map,
  Pin,
  InfoWindow,
  useMap,
} from "@vis.gl/react-google-maps";

import "./Imap.css";

export default function Imap(props) {
  const PoiMarkers = (props) => {
    const map = useMap();
    const [activeMarker, setActiveMarker] = useState(null);

    const handleMarkerClick = (marker) => {
      if (!map) return;
      // console.log(`Active marker id ${marker}`);
      if (marker === activeMarker) {
        return;
      }
      setActiveMarker(marker);
      //map.panTo(marker.latLng);
    };

    // if the maps api closes the infowindow, we have to synchronize our state
    //const handleClose = useCallback(() => setInfoWindowShown(false), []);

    return (
      <>
        {props.incidents.map((incident) => (
          <AdvancedMarker
            key={incident.id}
            position={{ lat: incident.meter_lat, lng: incident.meter_lng }}
            onClick={() => handleMarkerClick(incident.id)}
          >
            <Pin
              background={getMarkerColour(incident.incident_type)}
              glyphColor={"#000"}
              borderColor={getMarkerColour(incident.incident_type)}
            />
            {String(activeMarker) === String(incident.id) ? (
              <InfoWindow
                onCloseClick={() => setActiveMarker(null)}
                position={{ lat: incident.meter_lat, lng: incident.meter_lng }}
                headerContent={
                  <h6 className="info-content" >
                    {incident.desc} in {incident.namedloc}
                  </h6>
                }
              >
                <p className="info-content" >
                  Reported on{" "}
                  {new Date(incident.reported_on).toLocaleDateString("in") +
                    ", " +
                    new Date(incident.reported_on).toLocaleTimeString("in")}
                </p>
              </InfoWindow>
            ) : null}
          </AdvancedMarker>
        ))}
      </>
    );
  };

  function getMarkerColour(incidentType) {
    let color;
    switch (incidentType) {
      case 0:
        color = "#FF8A8A";
        break;

      case 1:
        color = "#88AB8E";
        break;

      case 2:
        color = "#EEC759";
        break;

      default:
        break;
    }

    return color;
  }

  return (
    <div className="map-container">
      <Map
        style={{ height: "100%", width: "100%" }}
        defaultZoom={13}
        defaultCenter={{ lat: 18.23574, lng: 73.58042 }}
        gestureHandling={"greedy"}
        disableDefaultUI={false}
        reuseMaps={true}
        mapId={"ba03c67f2ea790a6"}
      >
        <PoiMarkers incidents={props.incidents} />
      </Map>
    </div>
  );
}
