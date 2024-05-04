import {
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

// import { Applicant, ApplicantRecords } from "../types/Applicant";

interface ApplicantPDFModalProps {
  open: boolean;
  onClose: () => void;
  processing: boolean;
  applicant: Applicant;
  //   displayPhoto: string; // base64
}

const ApplicantPDFModal: React.FC<ApplicantPDFModalProps> = ({
  open,
  onClose,
  processing,
  applicant,
  //   displayPhoto,
}) => {
  //   const [displayPhoto, setDisplayPhoto] = useState<string>(
  //     applicant.img_url as string
  //   );

  return (
    <Modal opened={open} onClose={onClose} size={"xl"} title="">
      {processing && <Loader color="teal.4" size={20} />}
      <PDFViewer
        style={{
          width: "100%",
          //   height: "auto",
          minHeight: "90dvh",
          border: "none",
        }}
      >
        <ApplicantResumeBuilder
          // displayPhoto={displayPhoto}
          data={applicant}
        />
      </PDFViewer>
    </Modal>
  );
};

export default ApplicantPDFModal;
