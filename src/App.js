import React, { useState, useEffect, useMemo } from "react";
import { AppProvider } from "@toolpad/core/AppProvider";
import { DashboardLayout } from "@toolpad/core/DashboardLayout";
import PropTypes from "prop-types";
import { createTheme } from "@mui/material/styles";

import MapIcon from "@mui/icons-material/Map";
import InfoIcon from "@mui/icons-material/Info";
import BarChartIcon from "@mui/icons-material/BarChart";
import ChatIcon from "@mui/icons-material/Chat";

import { CircularProgress, Box } from "@mui/material";

import Feed from "./components/Feed";
import Imap from "./components/Imap";
import Insights from "./components/insights";

import { APIProvider } from "@vis.gl/react-google-maps";

function App(props) {
  const [incidents, setIncidents] = useState([]);
  const [villages, setVillages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const baseUrl = "https://mseb-incident.onrender.com"//;process.env.REACT_APP_BACKEND_URL;

  useEffect(() => {
    const source = new EventSource(`${baseUrl}/subscribe`, {
      withCredentials: false,
    });
    // console.log(`Connection status ${source.readyState}`);

    source.onopen = function () {
      // console.log("Connection to server opened.");
    };

    source.onmessage = async (e) => {
      if (JSON.parse(e.data).id) {
        // console.log(
        //   `Data is ${e.data}; Id is ${e.lastEventId}; Event is ${e.type}`
        // );
        await getData();
      }
    };

    source.onerror = (err) => {
      console.error("EventSource failed:", err);
    };
  }, []);

  async function getData() {
    setIsLoading(true);
    try {
      const result = await fetch(baseUrl + "/incidents");
      const allIncidents = await result.json();
      // console.log(allIncidents);
      setIncidents(allIncidents);
    } catch (err) {
      // TODO Show /error
      //console.log("error fetch incidents...");
    } finally {
      setIsLoading(false);
    }
  }

  async function getVillages() {
    setIsLoading(true);
    try {
      const result = await fetch(baseUrl + "/villages");
      const allVillages = await result.json();
      setVillages(allVillages);
    } catch (err) {
      // TODO Show /error
      //console.log("error fetch incidents...");
    } finally {
      setIsLoading(false);
    }
    
  }

  useEffect(() => {
    const fetchData = async () => {
      await getData();
    };

    fetchData();
  }, []);

  useEffect(() => {
    const fetchVillages = async () => {
      await getVillages();
    };

    fetchVillages();

  }, []);

  const NAVIGATION = [
    {
      segment: "map",
      title: "Map",
      icon: <MapIcon />,
    },
    {
      segment: "feed",
      title: "Incidents",
      icon: <ChatIcon />,
    },
    {
      segment: "insights",
      title: "Insights",
      icon: <BarChartIcon />,
    },
    // {
    //   segment: "about",
    //   title: "About",
    //   icon: <InfoIcon />,
    // },
  ];

  const [pathname, setPathname] = React.useState("/feed");

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
    // console.log(pathname);
    return pathname === "/feed" ? (
      <Feed incidents={incidents} />
    ) : pathname === "/map" ? (
      <div className="app">
        <APIProvider apiKey={process.env.REACT_APP_GOOGLE_MAPS_APIKEY}>
          <Imap incidents={incidents} />
        </APIProvider>
      </div>
    ) : pathname === "/insights" ? (<Insights villages={villages}/>) : null;
  }

  DemoPageContent.propTypes = {
    pathname: PropTypes.string.isRequired,
  };

  return (
    // preview-start
    <div>
      {isLoading ? (
        <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center", height:"100vh" }}>
          <CircularProgress />
        </Box>
      ) : (
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
      )}
    </div>
    // preview-end
  );
}

export default App;
