import React from "react";

function Message(props){
    return (<p className="message">{props.type} in {props.location}.</p>);
}

export default Message;