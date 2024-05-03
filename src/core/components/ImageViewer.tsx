import React from "react";
import { Image, Modal } from "@mantine/core";

type ImageViewerProps = {
  url: string;
  open: boolean;
  onClose: () => void;
};

function ImageViewer({ url, open, onClose }: ImageViewerProps) {
  return (
    <Modal
      opened={open}
      centered
      onClose={onClose}
      size={"md"}
      //   style={{
      //     fontSize: "1.6rem",
      //   }}
      // title={t("mirairo.sections.workExperience")}
      //   title={applicant?.name}
    >
      <Image src={url} />
    </Modal>
  );
}

export default ImageViewer;
