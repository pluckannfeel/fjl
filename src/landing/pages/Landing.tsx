// App.tsx
import React, { useState } from "react";
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
import { LandingHeader } from "../components/Header";

// import AppHeader from "./Header";
// import SettingsDrawer from "./SettingsDrawer";

const App: React.FC = () => {
  const [settingsOpened, setSettingsOpened] = useState(false);
  const theme = useMantineTheme();

  return (
    <Paper>
      <LandingHeader title="FJL" />
      <Center style={{ height: "100vh" }}>
        <Container size={1080}>
          <Box style={{ textAlign: "center", padding: "32px" }}>
            <Text size="xl">Welcome to FJL</Text>
            <Text size="sm">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            </Text>
            {/* Add more content as needed */}
          </Box>
        </Container>
      </Center>
    </Paper>
  );
};

export default App;
