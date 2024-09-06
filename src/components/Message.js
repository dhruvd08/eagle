import React from "react";
import '../App.css';

function Message(props){
    return (<p className="message">{props.type} in {props.location}.</p>);
}

export default Message;