import React from 'react';
import { TextInput, TextInputProps, Group, Text } from '@mantine/core';
import { useTranslation } from 'react-i18next';

interface RequiredTextInputProps extends TextInputProps {
  required?: boolean;
  label: string;
}

const RequiredTextInput: React.FC<RequiredTextInputProps> = ({ label, required, ...props }) => {
  const { t } = useTranslation();

  return (
    <TextInput
      {...props}
      label={
        <Group gap={2}>
          <Text>{label}</Text>
          {required && (
            <Text c="red" size="xs">
              {t("required")} {/* This is the text for "required" */}
            </Text>
          )}
        </Group>
      }
      required={required}
    />
  );
};

export default RequiredTextInput;
