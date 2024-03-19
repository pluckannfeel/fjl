// ButtonProgress.tsx
import React from 'react';
import { FileButton, Button, Progress, Group, useMantineTheme } from '@mantine/core';

interface ButtonProgressProps {
  setFieldValue: (field: string, value: any, shouldValidate?: boolean) => void;
  files: File[];
}

export const ButtonProgress: React.FC<ButtonProgressProps> = ({ setFieldValue, files }) => {
  const theme = useMantineTheme();
  const [progress, setProgress] = React.useState<number>(0);
  const [uploading, setUploading] = React.useState<boolean>(false);

  const handleFilesChange = (selectedFiles: File[]) => {
    setFieldValue("photos", selectedFiles);
    // Reset and start upload simulation
    setUploading(true);
    setProgress(0);

    // Simulate upload progress
    const timer = setInterval(() => {
      setProgress(prev => {
        if (prev < 100) {
          return prev + 20; // Increment by 20 for the demo
        }
        clearInterval(timer);
        setUploading(false);
        return 100;
      });
    }, 200);
  };

  return (
    <Group grow>
      <FileButton onChange={handleFilesChange} multiple accept="image/png,image/jpeg">
        {(props) => (
          <Button {...props} color={theme.primaryColor}>
            {uploading ? `Uploading (${progress}%)` : files.length > 0 ? `${files.length} files selected` : 'Select files'}
          </Button>
        )}
      </FileButton>
      {uploading && <Progress value={progress} color="blue" radius="sm" />}
    </Group>
  );
};
