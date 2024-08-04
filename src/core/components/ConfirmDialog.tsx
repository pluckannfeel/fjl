import React from "react";
import { Button, Modal, Text, Group, Loader, Center } from "@mantine/core";
import { useTranslation } from "react-i18next";
import ConfirmSvg from "../assets/confirm.svg?react";


type ConfirmDialogProps = {
  description?: string;
  onClose: () => void;
  onConfirm: () => void;
  open: boolean;
  pending: boolean;
  title: string;
};

const ConfirmDialog: React.FC<ConfirmDialogProps> = ({
  description,
  onClose,
  onConfirm,
  open,
  pending,
  title,
}) => {
  const { t } = useTranslation();

  return (
    <Modal
      opened={open}
      onClose={onClose}
    //   title={title}
      centered
      withCloseButton={false}
    //   ={3}
    //   overlayOpacity={0.55}
      radius="md"
    >
      <ConfirmSvg style={{ maxWidth: "auto", width: "100%" }} />
      {description && (
        <Text ta={"center"} fz="h4" fw={"bold"} mb="lg">
          {description}
        </Text>
      )}
      <Group justify="center" p="center" >
        <Button size="lg" onClick={onClose} variant="default">
          {t("common.cancel")}
        </Button>
        <Button bg={"red.8"} size="lg" onClick={onConfirm} loading={pending}>
          {pending ? <Loader size="sm" /> : t("common.delete")}
        </Button>
      </Group>
    </Modal>
  );
};

export default ConfirmDialog;
