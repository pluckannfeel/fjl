// App.tsx
import React, { useRef, useState } from "react";
import {
  MantineProvider,
  Container,
  Text,
  Center,
  Box,
  Paper,
  useMantineTheme,
  Button,
} from "@mantine/core";
import LandingHeader from "../components/LandingHeader";
import Home from "../components/Home";
import AboutUs from "../components/AboutUs";
import { useScrollIntoView } from "@mantine/hooks";
import Services from "../components/Services";
import ActiveSectionContextProvider from "../contexts/ActiveSectionProvider";
import ContactUs from "../components/ContactUs";

// import AppHeader from "./Header";
// import SettingsDrawer from "./SettingsDrawer";

const App: React.FC = () => {
  const [settingsOpened, setSettingsOpened] = useState(false);
  const theme = useMantineTheme();

  // const { scrollIntoView, targetRef: homeRef } = useScrollIntoView({
  //   offset: 0,
  // });
  // const { scrollIntoView: scrollIntoViewAbout, targetRef: aboutRef } =
  //   useScrollIntoView({ offset: 0 });

  return (
    <React.Fragment>
      <ActiveSectionContextProvider>
        <LandingHeader title="FJL" />
        <Home />
        <AboutUs />
        <Services />
        <ContactUs />
      </ActiveSectionContextProvider>
    </React.Fragment>
  );
};

export default App;
