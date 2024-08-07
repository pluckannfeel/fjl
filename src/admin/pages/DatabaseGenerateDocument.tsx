import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { Box, Button, rem, Text, Menu, Grid, Divider } from "@mantine/core";
import {
  IconCheck,
  IconCirclePlus,
  IconFilePencil,
  IconFilePlus,
  IconRefresh,
  IconX,
} from "@tabler/icons-react";
import classes from "@/admin/classes/Common.module.scss";
import {
  applicationTypes,
  documentTypes,
  visaTypes,
} from "../helpers/constants";
import { useGetCompanies } from "../hooks/useCompanies";
import { useGetAgencies } from "../hooks/useAgencies";
import GenerateDocumentForm from "../components/Database/GenerateDocument/GenerateDocumentForm";
import { GenerateDocument } from "../types/Database";
import { useCompaniesSelect } from "../hooks/useCompaniesSelect";
import { useAgenciesSelect } from "../hooks/useAgenciesSelect";
import { useGenerateDocument } from "../hooks/useGenerateDocument";
import { showNotification } from "@mantine/notifications";

interface DatabaseGenerateDocumentProps {
  // Define your props here
}

const DatabaseGenerateDocument: React.FC<DatabaseGenerateDocumentProps> = (
  {
    /* Destructure your props here */
  }
) => {
  const { t } = useTranslation();
  const [selectedApplicationType, setSelectedApplicationType] = useState<
    string | null
  >(null);
  const [selectedVisaType, setSelectedVisaType] = useState<string | null>(null);
  const [selectedDocument, setSelectedDocument] = useState<string | null>(null);

  const { isLoading: isCompaniesLoading, data: companies } =
    useCompaniesSelect();
  const { isLoading: isAgenciesLoading, data: agencies } = useAgenciesSelect();

  const { isGeneratingDocument, generateDocument } = useGenerateDocument();

  const handleSelectedAppTypeMenuClick = (value: string) => {
    setSelectedApplicationType(value);
  };

  const handleSelectedVisaTypeMenuClick = (value: string) => {
    setSelectedVisaType(value);
  };

  const handleSelectedDocumentMenuClick = (value: string) => {
    setSelectedDocument(value);
  };

  // event handlers
  const handleGenerateDocument = (data: GenerateDocument) => {
    // console.log("generate document");
    // console.log(data);

    generateDocument(data)
      .then((url: string) => {
        window.open(url, "_blank");
        showNotification({
            title: t("database.generateDocument.notifications.success.title"),
            message: t("database.generateDocument.notifications.success.description"),
            color: "lime.7",
            icon: <IconCheck style={{width: rem(20), height: rem(20)}} />,
            });
      })
      .catch((error: any) => {
        console.log(error);
        showNotification({
          title: t("common.errors.unexpected.title"),
          message: t("common.errors.unexpected.subTitle" + error),
          color: "red",
        });
      });
  };

  const processing =
    isCompaniesLoading || isAgenciesLoading || isGeneratingDocument;

  return (
    <React.Fragment>
      <Box component="main" style={{ flexGrow: 1, marginLeft: rem(250) }}>
        <Text
          ta="left"
          fz={28}
          fw={500}
          c={"orange.7"}
          style={{ marginTop: "2rem" }}
        >
          {t("database.generateDocument.title")}
        </Text>
        <Divider my={"md"} size={"md"} />

        <Grid pt={"xs"}>
          {/* //visa */}
          <Grid.Col span="content">
            <Text size="lg" fw={"bold"}>
              {t("database.generateDocument.menu.visa.title")}{" "}
              <span className={classes.required}>
                {t("common.validations.required")}
              </span>
            </Text>
          </Grid.Col>
          <Grid.Col span="content">
            <Menu
              shadow="md"
              width={"auto"}
              classNames={{
                dropdown: classes.menuDropdown,
                item: classes.menuItem,
                label: classes.menuLabel,
              }}
            >
              <Menu.Target>
                <Button
                  className={classes.menuButton}
                  variant="subtle"
                  fw={"normal"}
                  fz={20}
                >
                  {selectedVisaType
                    ? t(
                        visaTypes.find(
                          (type) => type.value === selectedVisaType
                        )?.label!
                      )
                    : t("database.generateDocument.actions.selectVisa")}
                </Button>
              </Menu.Target>
              <Menu.Dropdown>
                <Menu.Item
                  onClick={() => setSelectedVisaType(null)}
                  rightSection={
                    <IconX size={22} className={classes.menuIcon} />
                  }
                >
                  {t("common.clearSelection")}
                </Menu.Item>
                <Divider
                  my={"xs"}
                  label={t("database.generateDocument.actions.selectVisa")}
                  labelPosition="center"
                />
                {visaTypes.map((type, index) => (
                  <React.Fragment key={index}>
                    {/* {type.header &&
                      (index === 0 ||
                        visaTypes[index - 1].header !== type.header) && (
                        <Menu.Label
                          className={
                            type.header.includes("Danger")
                              ? classes.dangerZone
                              : ""
                          }
                        >
                          {t(type.header)}
                        </Menu.Label>
                      )} */}
                    <Menu.Item
                      onClick={() =>
                        handleSelectedVisaTypeMenuClick(type.value)
                      }
                      //   rightSection={
                      //     type.icon ? (
                      //       <type.icon size={22} className={classes.menuIcon} />
                      //     ) : null
                      //   }
                      disabled={type.disabled}
                    >
                      {t(type.label)}
                    </Menu.Item>
                  </React.Fragment>
                ))}
              </Menu.Dropdown>
            </Menu>
          </Grid.Col>

          {/* //application type */}
          <Grid.Col span="content">
            <Text size="lg" fw={"bold"}>
              {t("database.generateDocument.menu.applicationType.title")}{" "}
              <span className={classes.required}>
                {t("common.validations.required")}
              </span>
            </Text>
          </Grid.Col>
          <Grid.Col span="content">
            <Menu
              shadow="md"
              width={"auto"}
              classNames={{
                dropdown: classes.menuDropdown,
                item: classes.menuItem,
                label: classes.menuLabel,
              }}
            >
              <Menu.Target>
                <Button
                  variant="subtle"
                  className={classes.menuButton}
                  fw={"normal"}
                  fz={20}
                >
                  {selectedApplicationType
                    ? t(
                        applicationTypes.find(
                          (type) => type.value === selectedApplicationType
                        )?.label!
                      )
                    : t(
                        "database.generateDocument.actions.selectApplicationType"
                      )}
                </Button>
              </Menu.Target>
              <Menu.Dropdown>
                <Menu.Item
                  onClick={() => setSelectedApplicationType(null)}
                  rightSection={
                    <IconX size={22} className={classes.menuIcon} />
                  }
                >
                  {t("common.clearSelection")}
                </Menu.Item>
                <Divider
                  my={"xs"}
                  label={t(
                    "database.generateDocument.actions.selectApplicationType"
                  )}
                  labelPosition="center"
                />
                {applicationTypes.map((type, index) => (
                  <React.Fragment key={index}>
                    {type.header &&
                      (index === 0 ||
                        applicationTypes[index - 1].header !== type.header) && (
                        <Menu.Label
                          className={
                            type.header.includes("Danger")
                              ? classes.dangerZone
                              : ""
                          }
                        >
                          {t(type.header)}
                        </Menu.Label>
                      )}
                    <Menu.Item
                      onClick={() => handleSelectedAppTypeMenuClick(type.value)}
                      rightSection={
                        type.icon ? (
                          <type.icon size={22} className={classes.menuIcon} />
                        ) : null
                      }
                      disabled={type.disabled}
                    >
                      {t(type.label)}
                    </Menu.Item>
                  </React.Fragment>
                ))}
              </Menu.Dropdown>
            </Menu>
          </Grid.Col>
        </Grid>

        <Grid pt={"xs"}>
          {/* Select Document */}
          <Grid.Col span={"content"}>
            <Text size="lg" fw={"bold"}>
              {t("database.generateDocument.menu.document.title")}{" "}
              <span className={classes.required}>
                {t("common.validations.required")}
              </span>
            </Text>
          </Grid.Col>
          <Grid.Col span={"content"}>
            <Menu
              shadow="md"
              width={"auto"}
              classNames={{
                dropdown: classes.menuDropdown,
                item: classes.menuItem,
                label: classes.menuLabel,
              }}
            >
              <Menu.Target>
                <Button
                  variant="subtle"
                  className={classes.menuButton}
                  fw={"normal"}
                  fz={20}
                >
                  {selectedDocument
                    ? t(
                        documentTypes.find(
                          (type) => type.value === selectedDocument
                        )?.label!
                      )
                    : t("database.generateDocument.actions.selectDocument")}
                </Button>
              </Menu.Target>
              <Menu.Dropdown>
                <Menu.Item
                  onClick={() => setSelectedDocument(null)}
                  rightSection={
                    <IconX size={22} className={classes.menuIcon} />
                  }
                >
                  {t("common.clearSelection")}
                </Menu.Item>
                <Divider
                  my={"xs"}
                  label={t("database.generateDocument.actions.selectDocument")}
                  labelPosition="center"
                />
                {documentTypes.map((type, index) => (
                  <React.Fragment key={index}>
                    {/* {type.header &&
                      (index === 0 ||
                        applicationTypes[index - 1].header !== type.header) && (
                        <Menu.Label
                          className={
                            type.header.includes("Danger")
                              ? classes.dangerZone
                              : ""
                          }
                        >
                          {t(type.header)}
                        </Menu.Label>
                      )} */}
                    <Menu.Item
                      onClick={() =>
                        handleSelectedDocumentMenuClick(type.value)
                      }
                      //   rightSection={
                      //     type.icon ? (
                      //       <type.icon size={22} className={classes.menuIcon} />
                      //     ) : null
                      //   }
                      disabled={type.disabled}
                    >
                      {t(type.label)}
                    </Menu.Item>
                  </React.Fragment>
                ))}
              </Menu.Dropdown>
            </Menu>
          </Grid.Col>
          {/* Select Document */}
        </Grid>

        <GenerateDocumentForm
          onGenerate={handleGenerateDocument}
          documentType={selectedDocument}
          applicationType={selectedApplicationType}
          visaType={selectedVisaType}
          companies={companies || []}
          agencies={agencies || []}
          processing={processing}
        />
      </Box>
    </React.Fragment>
  );
};

export default DatabaseGenerateDocument;
