import React, { useEffect, useRef, useState } from "react";
import { Group, Avatar, Menu, Button, Text } from "@mantine/core";
import { IconUser, IconCamera, IconTrash } from "@tabler/icons-react";
import { useTranslation } from "react-i18next";
import classes from "../classes/ClickableAvatar.module.css";

interface ClickableAvatarProps {
  applicant_image: File | string | null;
  setApplicantImage: (image: File | null) => void;
  applicant_id: string | null | undefined;
  handleFileSelect: (file: File | null) => void;
  error?: string | boolean; // Optional error message or boolean indicating error state
}

const ClickableAvatar: React.FC<ClickableAvatarProps> = ({
  applicant_image,
  setApplicantImage,
  applicant_id,
  handleFileSelect,
  error,
}) => {
  const { t } = useTranslation();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [opened, setOpened] = useState(false);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  useEffect(() => {
    if (applicant_image && typeof applicant_image === "string") {
      setPreviewUrl(applicant_image);
    } else {
      // If no image is provided, reset the preview URL
      setPreviewUrl(null);
    }
  }, [applicant_image]);

  const handleMenuItemClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0] || null;

    handleFileSelect(file);
  };

  const handleClearImage = () => {
    handleFileSelect(null);
    setPreviewUrl(null);
  };

  return (
    <Group>
      <Button
        variant="subtle"
        radius="lg"
        onClick={() => setOpened((o) => !o)}
        className={`${classes.avatarButton}`}
      >
        <Avatar
          src={previewUrl}
          alt="Applicant Avatar"
          radius="lg"
          className={`${classes.avatarImage}`}
        >
          {!previewUrl && <IconUser size={50} />}
        </Avatar>
      </Button>

      <Menu opened={opened} onClose={() => setOpened(false)}>
        <Menu.Item
          rightSection={<IconCamera size={14} />}
          onClick={handleMenuItemClick}
          ta={"center"}
        >
          {applicant_image
            ? t("mirairo.form.img.change")
            : t("mirairo.form.img.upload")}
        </Menu.Item>
      </Menu>

      {error && (
        <Text c="red" size="xs">
          {typeof error === "string" ? error : t("common.errors.imageRequired")}
        </Text>
      )}

      <input
        ref={fileInputRef}
        type="file"
        style={{ display: "none" }}
        accept="image/*"
        onChange={handleFileChange}
      />
    </Group>
  );
};

export default ClickableAvatar;
