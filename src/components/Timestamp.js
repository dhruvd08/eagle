import React from "react";
import '../App.css';

function Timestamp(props){
    return (<p className="timestamp">{`${new Date(props.date).getHours()}:${new Date(props.date).getMinutes()}`}</p>);
}

export default Timestamp;