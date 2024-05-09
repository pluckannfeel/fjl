import {
  Button,
  Group,
  Loader,
  //   Button,
  //   Grid,
  //   Title,
  //   Text,
  Modal,
} from "@mantine/core";
import React from "react";
// import commonStyles from "../classes/Common.module.scss";
// import { useTranslation } from "react-i18next";
// import dayjs from "dayjs";
// import timezone from "dayjs/plugin/timezone";
import { Applicant } from "../types/Applicant";
import ApplicantResumeBuilder from "./ApplicantResumeBuilder";
import { PDFViewer } from "@react-pdf/renderer";
import { useAdminPDFTranslate } from "../hooks/useAdminPDFTranslate";
import { useTranslation } from "react-i18next";
import { IconLanguageHiragana } from "@tabler/icons-react";
import CustomLoader from "@/core/components/Loader";
import { showNotification } from "@mantine/notifications";

// import { Applicant, ApplicantRecords } from "../types/Applicant";

interface ApplicantPDFModalProps {
  open: boolean;
  onClose: () => void;
  processing: boolean;
  applicant: Applicant;
  setApplicant: (applicant: Applicant) => void;
  //   displayPhoto: string; // base64
}

const ApplicantPDFModal: React.FC<ApplicantPDFModalProps> = ({
  open,
  onClose,
  processing,
  applicant,
  setApplicant,
}) => {
  const { isTranslating, pdfTranslate } = useAdminPDFTranslate();
  const { t } = useTranslation();

  // const [record, setRecord] = useState<Applicant>(applicant);

  const handleTranslate = () => {
    pdfTranslate(applicant)
      .then((applicant) => {
        showNotification({
          message: `${applicant.last_name}${applicant.first_name}: ${t(
            "applicantManagement.notification.translated"
          )}`,
          color: "green",
        });

        if (applicant) {
          setApplicant(applicant);
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <Modal
      opened={open}
      onClose={onClose}
      size={"xl"}
      title={t("applicantManagement.title")}
    >
      {isTranslating && <CustomLoader />}
      {processing && <Loader color="teal.4" size={20} />}
      <Group justify="space-between" pb="md">
        {!applicant.is_translated && (
          <Button
            leftSection={<IconLanguageHiragana />}
            variant="gradient"
            gradient={{ from: "pink", to: "red" }}
            mt="md"
            onClick={handleTranslate}
            size="md"
            type="submit"
          >
            {t("common.translate")}
          </Button>
        )}
      </Group>
      <PDFViewer
        style={{
          width: "100%",
          //   height: "auto",
          minHeight: "90dvh",
          border: "none",
        }}
      >
        <ApplicantResumeBuilder data={applicant} />
      </PDFViewer>
    </Modal>
  );
};

export default ApplicantPDFModal;
