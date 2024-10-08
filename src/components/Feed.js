import React from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Divider from "@mui/material/Divider";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import BackgroundLetterAvatars, {
  stringToColor,
} from "./BackgroundLetterAvatar";
import "./Feed.css";
import Typography from "@mui/material/Typography";

export default function Feed(props) {
  let dates = [];

  function isToday(date) {
    return (
      `${date.getFullYear()}${date.getMonth()}${date.getDate()}` ===
      `${new Date().getFullYear()}${new Date().getMonth()}${new Date().getDate()}`
    );
  }

  function isYesterday(date) {
    return (
      `${date.getFullYear()}${date.getMonth()}${date.getDate()}` ===
      `${new Date().getFullYear()}${new Date().getMonth()}${new Date().getDate() - 1}`
    );
  }

  function getDate(incidentDate) {
    const dateIncident = new Date(incidentDate);

    return !dates.includes(dateIncident.toLocaleDateString())
      ? isToday(dateIncident)
        ? "Today"
        : isYesterday(dateIncident)
          ? "Yesterday"
          : `${dateIncident.toLocaleString("in", { month: "long" })} ${dateIncident.getDate()}, ${dateIncident.getFullYear()}`
      : "";
  }

  return (
    <List sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}>
      {props.incidents.map((incident) => {
        return (
          <div key={incident.id} >
            <Typography
              component="span"
              variant="body2"
              sx={{ color: "text.primary", display: "inline" }}
            >
              <p className="date">{getDate(incident.reported_on)}</p>
            </Typography>
            <p hidden>
              {dates.push(new Date(incident.reported_on).toLocaleDateString())}
            </p>
            <ListItem alignItems="flex-start">
              <ListItemAvatar>
                <BackgroundLetterAvatars name={incident.name} />
              </ListItemAvatar>
              <ListItemText
                className="name"
                primary={incident.name}
                secondary={
                  <React.Fragment>
                    <Typography
                      component="span"
                      variant="body2"
                      sx={{ color: "text.primary", display: "inline" }}
                    >
                      <p
                        className={incident.desc.replace(" ", "-") + " desc"}
                      >
                        {incident.desc}
                      </p>{" "}
                      in{" "}
                      <p
                        style={{
                          backgroundColor: stringToColor(incident.namedloc),
                        }}
                        className="desc"
                      >
                        {incident.namedloc}
                      </p>
                    </Typography>
                    <br />
                    <p className="time">
                      {`${String(new Date(incident.reported_on).getHours()).length === 1 ? "0" + String(new Date(incident.reported_on).getHours()) : new Date(incident.reported_on).getHours()}:${String(new Date(incident.reported_on).getMinutes()).length === 1 ? "0" + String(new Date(incident.reported_on).getMinutes()) : new Date(incident.reported_on).getMinutes()}`}
                    </p>
                  </React.Fragment>
                }
              />
            </ListItem>
            <Divider variant="inset" component="li" />
          </div>
        );
      })}
    </List>
  );
}
