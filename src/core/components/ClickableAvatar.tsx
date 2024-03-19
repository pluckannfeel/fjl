import React, { useRef, useState } from "react";
import { Group, Avatar, Menu, Button, Text } from "@mantine/core";
import { IconUser, IconCamera, IconTrash } from "@tabler/icons-react";
import { useTranslation } from "react-i18next";
import classes from "../classes/ClickableAvatar.module.css";

interface ClickableAvatarProps {
  applicant_image: File | null;
  setApplicantImage: (image: File | null) => void;
  applicant_id: string | null | undefined;
  handleFileSelect: (file: File | null) => void;
}

const ClickableAvatar: React.FC<ClickableAvatarProps> = ({
  applicant_image,
  setApplicantImage,
  applicant_id,
  handleFileSelect,
}) => {
  const { t } = useTranslation();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [opened, setOpened] = useState(false);
  //   const [avatar, setAvatar] = useState<string | null>(applicant_image);

  const handleMenuItemClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0] || null;
    // const file = event.target.files?.[0];
    handleFileSelect(file);
    if (file) {
      //   setAvatar(URL.createObjectURL(file));
      //   setApplicantImage(URL.createObjectURL(file));
      setApplicantImage(file);
    }
  };

  const handleClearImage = () => {
    handleFileSelect(null);
    // setAvatar(null);
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
          src={applicant_image ? URL.createObjectURL(applicant_image) : null}
          alt="Applicant Avatar"
          radius="lg"
          className={`${classes.avatarImage}`}
          //   size={180}
        >
          {!applicant_image && <IconUser size={50} />}
        </Avatar>
      </Button>

      {/* <Text
        size="sm"
        color="blue"
        style={{ cursor: "pointer" }}
        onClick={() => setOpened((o) => !o)}
      >
        {t("Upload")}
      </Text> */}

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
        {/* <Menu.Item
          rightSection={<IconTrash size={14} />}
          onClick={handleClearImage}
        >
          {t("Clear photo")}
        </Menu.Item> */}
      </Menu>

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
