import React, { useState } from "react";
import { Text } from "@mantine/core";
import { useTranslation } from "react-i18next";
import ApplicantTable from "../components/ApplicantTable";
import { useGetApplicants } from "@/mirairo/hooks/useGetApplicants";
import { Applicant, ApplicantRecords } from "../types/Applicant";
import dayjs from "dayjs";
import { readLocalStorageValue, useDisclosure } from "@mantine/hooks";
import ApplicantModal from "../components/ApplicantModal";
import ImageViewer from "@/core/components/ImageViewer";
import { useAdminEditApplicant } from "../hooks/useAdminEditApplicant";
import { showNotification } from "@mantine/notifications";
import { pdf, usePDF } from "@react-pdf/renderer";
import ResumeBuilder from "@/mirairo/components/Resume/ResumeBuilder";
import { ResumeTheme } from "@/mirairo/types/Resume";
import { convertImageUrlToBase64 } from "@/mirairo/helpers/constants";
import ApplicantResumeBuilder from "../components/ApplicantResumeBuilder";

type Props = {};

const ApplicantManagement = (props: Props) => {
  const { t } = useTranslation();
  const { isLoading, data: applicants } = useGetApplicants();
  const { isEditing, editApplicant } = useAdminEditApplicant();

  const [selectedApplicants, setSelectedApplicants] = useState<Applicant[]>([]);
  // const [openApplicantModal, setOpenApplicantModal] = useState<boolean>(false);
  const [
    applicantModalOpened,
    { open: applicantModalOpen, close: applicantModalClose },
  ] = useDisclosure();
  const [applicantUpdated, setApplicantUpdated] = useState<
    ApplicantRecords | undefined
  >(undefined);

  // const theme = readLocalStorageValue({ key: "resume-theme" });
  const [pdfImageBase64, setPdfImageBase64] = useState<string>("");

  const [
    imageViewerOpened,
    { open: imageViewerOpen, close: imageViewerClose },
  ] = useDisclosure();
  const [currentImage, setCurrentImage] = useState<string>("");

  const processing = isLoading || isEditing;

  const handleEditApplicant = async (record: Applicant) => {
    editApplicant(record)
      .then(() => {
        showNotification({
          message: t("admin.notifications.saveChanges.subTitle"),
          color: "green",
        });
        // applicantModalClose();
      })
      .catch((error) => {
        console.log(error);
        showNotification({
          title: t("common.errors.unexpected.title"),
          message: t("common.errors.unexpected.subTitle"),
          color: "red",
        });
      });
  };

  const handleOpenEditApplicantModal = (record: ApplicantRecords) => {
    setApplicantUpdated(record);
    applicantModalOpen();
  };

  // const handleDownloadPDF = (record: Applicant) => {};

  const handleOpenImageViewer = (img_url: string) => {
    // setOpenImageViewer(true);
    // console.log(img_url);
    setCurrentImage(img_url);

    imageViewerOpen();
  };

  // Transform the applicants data into ApplicantRecords format
  // const applicantRecords =
  //   applicants?.map((applicant) => ({
  //     id: applicant.id || "Unknown ID",
  //     img_url: applicant.img_url || "",
  //     registered_date: applicant.created_at || "Unknown Date",
  //     name: `${applicant.last_name}, ${applicant.first_name}`,
  //     age: applicant.age || "",
  //     gender: applicant.gender || "",
  //     recruiter: applicant.recruiter || "",
  //     interview_date: applicant.interview_date || null,
  //     organization: applicant.organization || "",
  //     result: applicant.result || "",
  //     visa: applicant.visa || "",
  //   })) || [];

  return (
    <React.Fragment>
      <Text
        ta="center"
        size="xl"
        style={{ marginTop: "2rem", marginBottom: "2rem", fontWeight: 700 }}
      >
        {t("applicantManagement.title")}
      </Text>

      <ApplicantTable
        loading={processing}
        selected={selectedApplicants}
        onSelectedChange={setSelectedApplicants}
        data={applicants || []}
        onEdit={handleOpenEditApplicantModal}
        // onViewPDF={handleDownloadPDF}
        onViewImage={handleOpenImageViewer}
      />
      <ApplicantModal
        open={applicantModalOpened}
        onClose={applicantModalClose}
        onEdit={handleEditApplicant}
        onAdd={() => {}}
        processing={processing}
        applicant={applicantUpdated}
      />
      <ImageViewer
        open={imageViewerOpened}
        onClose={imageViewerClose}
        url={currentImage}
      />
    </React.Fragment>
  );
};

export default ApplicantManagement;
