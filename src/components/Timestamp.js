import React from "react";

function Timestamp(props){
    return (<p className="timestamp">{new Date(props.date).toLocaleDateString}, {new Date(props.date).toLocaleTimeString()}</p>);
}

export default Timestamp;