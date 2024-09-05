import React from "react";
import "./Feed.css";
import Notification from "./Notification";

function Feed(props) {
  return (
    <div className="feed">
      {props.incidents.map((incident) => (
        <Notification key={incident.id} report={incident} />
      ))}
    </div>
  );
}

export default Feed;
