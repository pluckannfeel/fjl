import React, { useEffect, useRef, useState } from "react";
import { Group, Avatar, Menu, Button, Text } from "@mantine/core";
import {
  IconUser,
  IconCamera,
  IconTrash,
  IconUserCircle,
} from "@tabler/icons-react";
import { useTranslation } from "react-i18next";
import classes from "../classes/ClickableAvatar.module.css";

interface ClickableAvatarProps {
  applicant_image: File | string | null;
  setApplicantImage: (image: File | null) => void;
  applicant_id: string | null | undefined;
  handleFileSelect: (file: File | null) => void;
  error?: string | boolean; // Optional error message or boolean indicating error state
  imgSizePreview?: number | string;
}

const ClickableAvatar: React.FC<ClickableAvatarProps> = ({
  applicant_image,
  setApplicantImage,
  applicant_id,
  handleFileSelect,
  error,
  imgSizePreview,
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
      <Avatar
        src={previewUrl}
        alt="Applicant Avatar"
        radius="lg"
        size={imgSizePreview ? imgSizePreview : 200}
        // className={`${classes.avatarImage}`}
      >
        {!previewUrl && <IconUserCircle size={100} />}
      </Avatar>

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
        <Text c="orange.6" size="md">
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
