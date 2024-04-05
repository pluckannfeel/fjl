import React, { useEffect, useState } from "react";
import {
  useMantineTheme,
  Paper,
  Container,
  Center,
  Box,
  Grid,
  ColorPicker,
  Title,
  Group,
  Button,
} from "@mantine/core";
import { LandingHeader } from "../../landing/components/Header";
import { PDFDownloadLink, PDFViewer, usePDF } from "@react-pdf/renderer";
import ResumeBuilder from "../components/ResumeBuilder";
import { IconDoorEnter } from "@tabler/icons-react";

// css
import commonStyles from "../classes/Common.module.scss";

// Import the required components for color selection
import { RadioGroup, Radio } from "@mantine/core";
import { ResumeTheme } from "../types/Resume";
import { useLocalStorage } from "@mantine/hooks";
import CustomLoader from "../../core/components/Loader";
import { useNavigate } from "react-router";
import { useFormikContext } from "../contexts/FormProvider";
import { useApplicantData } from "../hooks/useApplicantData";
import { PersonalInformation } from "../types/Information";

const GenerateResume = () => {
  const navigate = useNavigate();
  const [theme, setTheme] = useLocalStorage<ResumeTheme>({
    key: "resume-theme",
    defaultValue: {
      textColor: "#000000",
      backgroundColor: "#E4E4E4",
    },
  });

  const [font, setFont] = useLocalStorage<string>({
    key: "resume-font",
    defaultValue: "Roboto",
  });

  // get local storage applicant_id
  const applicant_id = localStorage.getItem("applicant_id");

  const { isLoading, data: applicantData } = useApplicantData(
    applicant_id as string
  );

  //set a state for applicant_data
  const [data, setData] = useState<PersonalInformation | {}>(
    applicantData ? applicantData : {}
  );

  // const [resumeInstance, updateResumeInstance] = usePDF({
  //   document: <ResumeBuilder font={font} theme={theme} />,
  // });

  // const changeTheme = (color: string) => {
  //   // Here you can define your theme colors based on the selected color
  //   const themes: { [key: string]: ResumeTheme } = {
  //     pink: { textColor: "#ff79c6", backgroundColor: "#ff79c660" },
  //     yellow: { textColor: "#f1fa8c", backgroundColor: "#f1fa8c60" },
  //     darkBlue: { textColor: "#6272a4", backgroundColor: "#6272a460" },
  //     orange: { textColor: "#ffb86c", backgroundColor: "#ffb86c60" },
  //     grey: { textColor: "#999999", backgroundColor: "#99999960" },
  //   };

  //   setTheme(themes[color] || theme);
  // };

  const goBackHandler = () => {
    // navigate(-1); // Go back to the previous page
    navigate("/mirairo", { replace: true });
  };

  return (
    <React.Fragment>
      <Paper
        style={{
          // width: "100%",
          height: "auto",
        }}
      >
        {isLoading ?? <CustomLoader />}
        <LandingHeader title="Mirairo 未来路 " />

        <Container size="xl" px="xl" py="lg" mt="md">
          <Title
            order={2}
            c="text"
            className={commonStyles.title}
            ta="center"
            // mt="sm"
          >
            {/* // {t("mirairo.sections.legalInformation")} */}
            Generate Resume
          </Title>
          <Grid mt="md">
            <Grid.Col mt={"xs"} span={{ base: 12, xs: 3.5 }}>
              <Title
                order={3}
                c="text"
                // className={commonStyles.title}
                ta="left"
                // mt="sm"
                mb={"sm"}
              >
                Select Theme:
              </Title>
              <ColorPicker
                fullWidth
                value={theme.backgroundColor}
                onChangeEnd={(color) => {
                  setTheme({ ...theme, backgroundColor: color });
                }}
                withPicker={false}
                swatchesPerRow={7}
                format="hex"
                swatches={[
                  // "#FFFFFF",
                  "#2e2e2e",
                  "#1E2C55",
                  "#DBE1EF",
                  "#868e96",
                  "#C01C23",
                  "#fa5252",
                  "#e64980",
                  "#be4bdb",
                  "#7950f2",
                  "#4c6ef5",
                  "#228be6",
                  "#15aabf",
                  "#BFD1B0",
                  "#0B6623",
                  "#12b886",
                  "#40c057",
                  "#82c91e",
                  "#fd7e14",
                  "#FFA500",
                  "#fab005",
                  "#5D478B",
                ]}
              />

              <Title
                order={3}
                c="text"
                // className={commonStyles.title}
                ta="left"
                mt="sm"
                // mb={"sm"}
              >
                Select Font:
              </Title>
              <Radio.Group
                value={font}
                p={1}
                c="text.8"
                onChange={setFont}
                // name="favoriteFramework"
                // label="Select Font"
                // description="This is anonymous"
                withAsterisk
              >
                <Radio
                  my={8}
                  color="lime.4"
                  size="md"
                  value="Roboto"
                  label="Roboto"
                />
                <Radio
                  my={8}
                  color="cyan.4"
                  size="md"
                  value="EB_Garamond"
                  label="Garamond"
                />
                <Radio
                  size="md"
                  color="orange.4"
                  value="Mulish"
                  label="Mulish"
                />
              </Radio.Group>

              <Group grow mt="xl" ta="center">
                <Button
                  size="md"
                  color="orange.5"
                  onClick={goBackHandler}
                  // leftSection={<IconDoorEnter size={20} />}
                >
                  Cancel
                </Button>
                {/* <Button
                  size="lg"
                  color="teal.5"
                  component="a"
                  href={resumeInstance.url as string}
                  download="CV.pdf"
                  onClick={() => {}}
                  rightSection={<IconDownload size={20} />}
                >
                  Download PDF
                </Button> */}
                <PDFDownloadLink
                  style={{
                    textDecoration: "none",
                    backgroundColor: "#A9E24B",
                    padding: "10px 20px",
                    borderRadius: 10,
                    color: "#000",
                    fontWeight: "bold",
                  }}
                  document={
                    <ResumeBuilder
                      font={font}
                      theme={theme}
                      data={data as PersonalInformation}
                    />
                  }
                  fileName="CV.pdf"
                >
                  {({ blob, url, loading, error }) =>
                    loading ? <CustomLoader /> : "Download PDF"
                  }
                </PDFDownloadLink>
              </Group>
            </Grid.Col>
            <Grid.Col mt={"xs"} span={{ base: 12, xs: 8.5 }}>
              <PDFViewer
                showToolbar={false}
                style={{
                  borderRadius: 10,
                  width: "100%",
                  height: "90vh",
                  border: "none",
                }}
              >
                <ResumeBuilder
                  font={font}
                  theme={theme}
                  data={data as PersonalInformation}
                />
              </PDFViewer>
            </Grid.Col>
          </Grid>
        </Container>
      </Paper>
    </React.Fragment>
  );
};

export default GenerateResume;
