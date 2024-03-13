import React, { useState } from "react";
import { useMantineTheme, Paper, Container, Center, Box } from "@mantine/core";
import { LandingHeader } from "../../landing/components/Header";
import { Introduction } from "../components/Introduction";
import { motion } from "framer-motion"; // Step 1: Import motion
import MirairoForm from "../components/MirairoForm";

const MirairoManagement: React.FC = () => {
  const theme = useMantineTheme();
  const [isStarted, setIsStarted] = useState<boolean>(false);

  const getStartedHandler = () => {
    setIsStarted(true);
    // console.log("clicked");
  };

  // Define variants for the animation
  const formVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.5 } },
  };

  return (
    <React.Fragment>
      <Paper>
        <LandingHeader title="Mirairo 未来路 " />
        {/* Conditional rendering with animation */}
        {isStarted ? (
          <motion.div
            initial="hidden"
            animate="visible"
            variants={formVariants}
          >
            <Container pt={50}>
              <MirairoForm />
            </Container>
          </motion.div>
        ) : (
          <Container pt={120}>
            <Introduction getStartedHandler={getStartedHandler} />
          </Container>
        )}
      </Paper>
    </React.Fragment>
  );
};

export default MirairoManagement;
