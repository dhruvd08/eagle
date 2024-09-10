import React, { useState, useEffect, useMemo } from "react";
import { AppProvider } from "@toolpad/core/AppProvider";
import { DashboardLayout } from "@toolpad/core/DashboardLayout";
import PropTypes from "prop-types";
import { createTheme } from "@mui/material/styles";

import MapIcon from "@mui/icons-material/Map";
import InfoIcon from "@mui/icons-material/Info";
import BarChartIcon from "@mui/icons-material/BarChart";
import ChatIcon from "@mui/icons-material/Chat";

import Feed from "./components/Feed";
import Imap from "./components/Imap";


import { APIProvider } from "@vis.gl/react-google-maps";

function App(props) {
  const [incidents, setIncidents] = useState([]);

  const baseUrl = process.env.REACT_APP_BACKEND_URL;

  useEffect(() => {
    const source = new EventSource(`${baseUrl}/subscribe`, {
      withCredentials: false,
    });
    console.log(`Connection status ${source.readyState}`);

    source.onopen = function () {
      console.log("Connection to server opened.");
    };

    source.onmessage = async (e) => {
      
      
      if (JSON.parse(e.data).id) {
        console.log(
          `Data is ${e.data}; Id is ${e.lastEventId}; Event is ${e.type}`
        );
        // setIncidents((prevValues) => {
        //   return [...prevValues, JSON.parse(e.data)]
        // });
        await getData();
      }
    };

    source.onerror = (err) => {
      console.error("EventSource failed:", err);
    };
  }, []);

  async function getData() {
    const result = await fetch(baseUrl + "/incidents");
    const allIncidents = await result.json();
    console.log(allIncidents);

    setIncidents(allIncidents);
  }

  useEffect(() => {
    const fetchData = async () => {
      await getData();
    };

    fetchData();
  }, []);

  const NAVIGATION = [
    {
      segment: "map",
      title: "Map",
      icon: <MapIcon />,
    },
    {
      segment: "feed",
      title: "Live Feed",
      icon: <ChatIcon />,
    },
    {
      segment: "insights",
      title: "Insights",
      icon: <BarChartIcon />,
    },
    {
      segment: "about",
      title: "About",
      icon: <InfoIcon />,
    },
  ];

  const [pathname, setPathname] = React.useState("/dashboard");

  const router = React.useMemo(() => {
    return {
      pathname,
      searchParams: new URLSearchParams(),
      navigate: (path) => setPathname(String(path)),
    };
  }, [pathname]);

  const demoTheme = createTheme({
    cssVariables: {
      colorSchemeSelector: "data-toolpad-color-scheme",
    },
    colorSchemes: { light: true, dark: true },
    breakpoints: {
      values: {
        xs: 0,
        sm: 600,
        md: 600,
        lg: 1200,
        xl: 1536,
      },
    },
  });

  function DemoPageContent({ pathname }) {
    console.log(pathname);
    return pathname === "/feed" ? (
      <Feed incidents={incidents} />
    ) : pathname === "/map" ? (
      <div className="app">
        <APIProvider apiKey={process.env.REACT_APP_GOOGLE_MAPS_APIKEY}>
          <Imap incidents={incidents} />
        </APIProvider>
      </div>
    ) : null;
  }

  DemoPageContent.propTypes = {
    pathname: PropTypes.string.isRequired,
  };

  return (
    // preview-start
    <AppProvider
      navigation={NAVIGATION}
      branding={{
        logo: <img src="./elogo.png" alt="EAGLE logo" />,
        title: "EAGLE",
      }}
      router={router}
      theme={demoTheme}
    >
      <DashboardLayout>
        <DemoPageContent pathname={pathname} />
      </DashboardLayout>
    </AppProvider>

    // preview-end
  );
}

export default App;
