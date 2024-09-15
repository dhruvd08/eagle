import * as React from "react";
import "./Insights.css";

export default function InsightsDetails(props) {
  return (
    <div className="insight" >
      <p className="title">{props.title}</p>
      <div className={`box ${props.bgcolor}`}>
        <p className="center-align">{props.insightValue}</p>
      </div>
    </div>
  );
}
