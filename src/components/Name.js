import React from "react";
import "../App.css";

function Name(props) {
  function titleCase(str) {
    str = str.toLowerCase().split(" ");
    for (var i = 0; i < str.length; i++) {
      str[i] = str[i].charAt(0).toUpperCase() + str[i].slice(1);
    }
    return str.join(" ");
  }
  titleCase("I'm a little tea pot");

  return <p className="name">{titleCase(props.name)}</p>;
}

export default Name;
