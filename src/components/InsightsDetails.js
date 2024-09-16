import * as React from "react";
import "./Insights.css";

export default function InsightsDetails(props) {
  console.log(props);
  return (
    <div className="insight" >
      <p className="title">{props.title}</p>
      <div className={`box ${props.bgcolor}`}>
        <p className="center-align">{props.insightValue}</p>
        <p className="center-align small">{props.unit}</p>
      </div>
    </div>
  );
}
