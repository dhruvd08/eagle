import React from "react";
import Avatar from "./Avatar";
import Name from "./Name";
import Message from "./Message";
import Timestamp from "./Timestamp";
import '../App.css';

function Notification(props){
    return (<div className="notification" >
        <Name name={props.report.name} />
        <Message type={props.report.desc} location={props.report.namedloc} />
        <Timestamp date={props.report.reported_on} />
    </div>);
}

export default Notification;