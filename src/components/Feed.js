import * as React from "react";
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
  //   const [dates, setDates] = React.useState([]);

  //     function addDate (time) {
  //         setDates((prevValues) => {
  //             return [...prevValues, time];
  //         })
  //     }

  let dates = [];

  return (
    <List sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}>
      {props.incidents.map((incident) => {
        return (
          <div>
            <Typography
              component="span"
              variant="body2"
              sx={{ color: "text.primary", display: "inline" }}
            >
              <p className="date">
                {!dates.includes(
                  new Date(incident.reported_on).toLocaleDateString()
                ) &&
                  `${new Date(incident.reported_on).getFullYear()}${new Date(incident.reported_on).getMonth()}${new Date(incident.reported_on).getDate()}` === `${new Date().getFullYear()}${new Date().getMonth()}${new Date().getDate()}` ? "Today" : `${new Date(incident.reported_on).toLocaleString("in", { month: "long" })} ${new Date(incident.reported_on).getDate()}, ${new Date(incident.reported_on).getFullYear()}`}
              </p>
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
                      <div
                        className={incident.desc.replace(" ", "-") + " desc"}
                      >
                        {incident.desc}
                      </div>{" "}
                      in{" "}
                      <div
                        style={{
                          backgroundColor: stringToColor(incident.namedloc),
                        }}
                        className="desc"
                      >
                        {incident.namedloc}
                      </div>
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
