import React from "react";
import classes from "../classes/ApplicantDashboard.module.scss";
import { Container, Text, Button, Group } from "@mantine/core";
import { useApplicantAuth } from "../contexts/ApplicantAuthProvider";
import { useNavigate } from "react-router";

type Props = {};

const ApplicantDashboard = (props: Props) => {
  const navigate = useNavigate();
  const { applicantInfo } = useApplicantAuth();
  return (
    <div className={classes.wrapper}>
      <Container size={700} className={classes.inner}>
        <h1 className={classes.title}>
          <Text
            component="span"
            variant="gradient"
            gradient={{ from: "blue", to: "cyan" }}
            inherit
          >
            Welcome!
          </Text>{" "}
          {applicantInfo &&
            applicantInfo.first_name + " " + applicantInfo.last_name}
        </h1>

        <Text className={classes.description} color="dimmed">
          {/* Build fully functional accessible web applications with ease – Mantine
          includes more than 100 customizable components and hooks to cover you
          in any situation */}
          By clicking the button below, you can access your resume and edit it.
        </Text>

        <Group className={classes.controls}>
          <Button
            size="xl"
            className={classes.control}
            variant="gradient"
            gradient={{ from: "blue", to: "cyan" }}
            onClick={() => navigate("/applicant-dashboard/mirairo-resume")}
          >
            Generate Resume
          </Button>

          {/* <Button
            component="a"
            href="https://github.com/mantinedev/mantine"
            size="xl"
            variant="default"
            className={classes.control}
            leftSection={<GithubIcon size={20} />}
          >
            GitHub
          </Button> */}
        </Group>
      </Container>
    </div>
  );
};

export default ApplicantDashboard;
