import React from "react";
import Avatar from "./Avatar";
import Name from "./Name";
import Message from "./Message";
import Timestamp from "./Timestamp";

function Notification(props){
    return (<div>
        <Avatar />
        <Name name={props.report.name} />
        <Message />
        <Timestamp />
    </div>);
}

export default Notification;