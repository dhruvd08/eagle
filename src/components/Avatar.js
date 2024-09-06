import '../App.css';
import React from "react";

function Avatar(props) {
  function avatarString(string) {
    let words = [];
    for (let word of string.split(" ")) {
      words.push(word);
    }

    if (words.length > 1) {
        words = words.slice(0, 2);

        let avatars = [];

        for (let wrd of words) {
          avatars.push(wrd[0]);
        }

        return `${avatars[0].toUpperCase()}${avatars[1].toUpperCase()}`;
    } else {
        return String(words[0][0].toUpperCase());
    }
  }
  return (
    <div className="avatar-back">
      <p className="avatar-name">{avatarString(props.name)}</p>
    </div>
  );
}

export default Avatar;
