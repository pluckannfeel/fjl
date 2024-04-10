import {
  Button,
  Card,
  CardSection,
  Center,
  FileButton,
  Grid,
  Group,
  Select,
  SimpleGrid,
  TextInput,
  Textarea,
  Title,
} from "@mantine/core";
import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import commonStyles from "../classes/Common.module.scss";
import { useTranslation } from "react-i18next";
import { useFormikContext } from "../contexts/FormProvider";
import { PhotoGallery } from "../../core/components/PhotoGallery";
import { Link } from "../types/Information";
import { IconLink, IconX } from "@tabler/icons-react";
import { getNestedError } from "../helpers/constants";
import { showNotification } from "@mantine/notifications";
import PhotoVideoGallery from "../../core/components/PhotoVideoGallery";

const PhotosVideoLinksForm = () => {
  const { t } = useTranslation();
  const formik = useFormikContext();

  const resetRef = useRef<() => void>(null);

  // ======================= EVENT HANDLERS =======================
  const clearFile = () => {
    formik.setFieldValue("photos", []);
    resetRef.current?.();
  };

  const handleAddLink = () => {
    formik.setFieldValue("links", [
      ...(formik.values.links ?? []),
      {
        id: formik.values.links?.length ?? 0,
        link: "",
      },
    ]);
  };

  const handleRemoveLink = (index: number) => {
    const links = [...(formik.values.links ?? [])];
    links.splice(index, 1);
    formik.setFieldValue("links", links);
  };

  const validateFileSize = (files: File[], maxSizeMB: number): boolean => {
    const maxSizeBytes = maxSizeMB * 1024 * 1024; // Convert MB to Bytes
    // const maxSizeBytes = maxSizeMB * 2;
    return files.every((file) => file.size <= maxSizeBytes);
  };

  return (
    <React.Fragment>
      <Title
        order={2}
        className={commonStyles.title}
        c="text"
        ta="left"
        // mt="sm"
      >
        {t("mirairo.sections.photosVideosLinks")}
      </Title>

      {/* description */}

      <Title
        order={4}
        // className={commonStyles.title}
        c="teal.4"
        ta="left"
        // mt="sm"
      >
        {t("mirairo.form.photosVideosLinks.description")}
      </Title>

      <Group grow mt="lg" justify="center">
        {/* <FileButton
          multiple
          resetRef={resetRef}
          onChange={(payload: File[] | null) => {
            formik.setFieldValue("photos", payload);
          }}
          accept="image/png,image/jpeg,video/mp4,video/mov,video/avi"
        >
          {(props) => (
            <Button size="lg" variant="gradient" {...props}>
              {formik.values.photos?.length
                ? t("common.change")
                : t("common.upload")}
            </Button>
          )}
        </FileButton> */}
        <FileButton
          multiple
          // accept="image/png,image/jpeg,video/mp4,video/mov,video/avi"
          accept="image/png,image/jpeg,video/mp4,video/quicktime,video/x-msvideo,video/avi"
          onChange={(files) => {
            if (files) {
              if (validateFileSize(files, 200)) {
                formik.setFieldValue("photos", files);
              } else {
                showNotification({
                  title: "File size limit exceeded",
                  message: "Please upload files up to 200 MB.",
                  color: "red",
                });
                // Optionally reset the file input if needed
                resetRef.current?.();
              }
            }
          }}
        >
          {(props) => (
            <Button size="lg" variant="gradient" {...props}>
              {formik.values.photos?.length
                ? t("common.change")
                : t("common.upload")}
            </Button>
          )}
        </FileButton>

        {formik.values.photos && formik.values.photos.length > 0 && (
          <Button size="lg" color="red.6" onClick={clearFile}>
            Reset
          </Button>
        )}
      </Group>

      {/* <PhotoGallery photos={formik.values.photos || []} /> */}
      <PhotoVideoGallery photos={formik.values.photos || []} />

      {/* links */}
      {/* <Card mt="sm">
        <CardSection>
          {formik.values.links &&
            formik.values.links.map((item: Link, index: number) => (
              <Grid id={item.id} key={index} mt="sm">
                <Grid.Col span={{ base: 12, sm: 11 }}>
                  <TextInput
                    rightSection={
                      <IconLink
                        style={{
                          padding: 0,
                          margin: 0,
                        }}
                      />
                    }
                    // autoFocus
                    label={`URL ${index + 1}`}
                    onChange={formik.handleChange(`links[${index}].link`)}
                    required
                    withAsterisk
                    name={`links[${index}].link`}
                    value={item.link}
                    error={getNestedError(`links.${index}.link`, formik.errors)}
                  />
                </Grid.Col>
                <Grid.Col span={{ base: 12, sm: 1 }}>
                  <Center
                    style={{
                      height: "100%",
                    }}
                  >
                    <Button
                      size="sm"
                      color="red.7"
                      px={6}
                      variant="outline"
                      onClick={() => handleRemoveLink(index)}
                    >
                      <IconX
                        style={{
                          padding: 0,
                          margin: 0,
                        }}
                      />
                    </Button>
                  </Center>
                </Grid.Col>
              </Grid>
            ))}
        </CardSection>
      </Card> */}

      {/* <SimpleGrid mt={"xs"} mb={0} pb={0} cols={{ base: 1, sm: 6 }}>
        <Group grow mt="sm" ta="center">
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button
              // fullWidth
              size="lg"
              c="white"
              variant="gradient"
              onClick={handleAddLink}
            >
              {`${t("common.add")} URL`}
            </Button>
          </motion.div>
        </Group>
      </SimpleGrid> */}
    </React.Fragment>
  );
};

export default PhotosVideoLinksForm;
