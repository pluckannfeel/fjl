import {
  Loader as LoaderComponent,
  Box,
  Center,
  LoadingOverlay,
  Container,
  Image,
  Text,
  Title,
  Button,
} from "@mantine/core";
import { motion } from "framer-motion";
import SubmittedImg from "../../core/assets/submitted.svg";
import { useNavigate } from "react-router";

const ApplicantSubmitted = () => {
  const navigate = useNavigate();
  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        delay: 0.2,
        when: "beforeChildren",
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <Container
      size="md"
      px={0}
      style={{
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <motion.div
        // className={styles.inner}
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <Box
          style={{
            padding: "8px 3px",
            textAlign: "center",
          }}
        >
          {/* <LoaderComponent size={75} /> */}
          {/* <LoadingOverlay
            visible={true}
            zIndex={1000}
            overlayProps={{ radius: "sm", blur: 2 }}
            loaderProps={{ color: "orange.6", type: "bars" }}
          /> */}
          <motion.div variants={itemVariants}>
            <Image src={SubmittedImg} width={"100%"} height={"auto"} />
          </motion.div>

          <Title order={6} size={"xl"} style={{ marginBottom: 8 }}>
            Your application has been submitted successfully! We will get back
            to you soon.
          </Title>

          {/*  this will close the page */}
          <Button
            size="lg"
            color="blue"
            onClick={() => {
              navigate("/");
            }}
          >
            Homepage
          </Button>
        </Box>
      </motion.div>
    </Container>
  );
};

export default ApplicantSubmitted;
