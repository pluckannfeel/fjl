import React from "react";
import { useTranslation } from "react-i18next";
import { Menu, FileButton, Text, Group } from "@mantine/core";
import { IconPhoto } from "@tabler/icons-react";

interface FileInputMenuItemProps {
  onSelectFile: (file: File | null) => void;
  applicant_id: string | null | undefined;
}

const FileInputMenuItem: React.FC<FileInputMenuItemProps> = ({
  onSelectFile,
  applicant_id,
}) => {
  const { t } = useTranslation();

  return (
    <Menu.Item>
      <FileButton onChange={(file) => onSelectFile(file)} accept="image/*">
        {(props) => (
          <Group {...props} wrap="nowrap">
            <IconPhoto size={20} />
            <Text size="sm">
              {applicant_id
                ? t("common.change")
                : t("common.upload")}
            </Text>
          </Group>
        )}
      </FileButton>
    </Menu.Item>
  );
};

export default FileInputMenuItem;
