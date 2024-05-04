import React, { useState } from "react";
import { Text } from "@mantine/core";
import { useTranslation } from "react-i18next";
import ApplicantTable from "../components/ApplicantTable";
import { useGetApplicants } from "@/mirairo/hooks/useGetApplicants";
import { Applicant, ApplicantRecords } from "../types/Applicant";
import { useDisclosure } from "@mantine/hooks";
import ApplicantModal from "../components/ApplicantModal";
import ImageViewer from "@/core/components/ImageViewer";
import { useAdminEditApplicant } from "../hooks/useAdminEditApplicant";
import { showNotification } from "@mantine/notifications";
// import { useGeneratePDFApplicantCV } from "../hooks/useAdminGenerateApplicant";
import ApplicantPDFModal from "../components/ApplicantPDFModal";
// import { convertImageUrlToBase64 } from "@/mirairo/helpers/constants";

const ApplicantManagement = () => {
  const { t } = useTranslation();
  const { isLoading, data: applicants } = useGetApplicants();
  const { isEditing, editApplicant } = useAdminEditApplicant();
  // const { isGenerating, generatePDFApplicant } = useGeneratePDFApplicantCV();

  const [selectedApplicants, setSelectedApplicants] = useState<Applicant[]>([]);

  // const [openApplicantModal, setOpenApplicantModal] = useState<boolean>(false);
  const [
    applicantModalOpened,
    { open: applicantModalOpen, close: applicantModalClose },
  ] = useDisclosure();
  const [applicantUpdated, setApplicantUpdated] = useState<
    ApplicantRecords | undefined
  >(undefined);
  const [
    applicantPDFModalOpened,
    { open: applicantPDFModalOpen, close: applicantPDFModalClose },
  ] = useDisclosure();
  const [showApplicantPDF, setShowApplicantPDF] = useState<
    Applicant | undefined
  >(undefined);
  // const [applicantImage64, setApplicantImage64] = useState<string>("");

  // const theme = readLocalStorageValue({ key: "resume-theme" });
  // const [pdfImageBase64, setPdfImageBase64] = useState<string>("");

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

  const handleDownloadPDF = (record: Applicant) => {
    setShowApplicantPDF(record);

    // if (record.img_url) {
    //   convertImageUrlToBase64(record.img_url as string)
    //     .then((data) => {
    //       setApplicantImage64(data);
    //     })
    //     .catch((error) => {
    //       console.log(error);
    //     });
    // }

    applicantPDFModalOpen();
    // console.log(record);
    // generatePDFApplicant(record).then((data) => {
    //   const url = window.URL.createObjectURL(new Blob([data]));
    //   const link = document.createElement("a");
    //   link.href = url;
    //   link.setAttribute(
    //     "download",
    //     `${record.first_name}_${record.last_name}CV.pdf`
    //   );
    //   document.body.appendChild(link);
    //   link.click();
    // });
  };

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
        onViewPDF={handleDownloadPDF}
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

      {showApplicantPDF && (
        <ApplicantPDFModal
          open={applicantPDFModalOpened}
          onClose={applicantPDFModalClose}
          processing={processing}
          applicant={showApplicantPDF}
          // displayPhoto={applicantImage64}
        />
      )}
      <ImageViewer
        open={imageViewerOpened}
        onClose={imageViewerClose}
        url={currentImage}
      />
    </React.Fragment>
  );
};

export default ApplicantManagement;
