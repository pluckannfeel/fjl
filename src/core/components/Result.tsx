import React from "react";
import { Box, Center, Container, Text } from "@mantine/core";
import ErrorSvg from "../assets/error.svg?react";
import SuccessSvg from "../assets/success.svg?react";

interface ResultImageProps {
  customImage?: React.ReactNode;
  status?: "error" | "success";
}

const ResultImage: React.FC<ResultImageProps> = ({ customImage, status }) => {
  let image = customImage;

  if (!image) {
    if (status === "error") {
      image = <ErrorSvg />;
    } else if (status === "success") {
      image = <SuccessSvg />;
    }
  }

  return image ? <Box mb={24}>{image}</Box> : null; // Adjust margin as needed
};

interface ResultProps {
  extra?: React.ReactNode;
  image?: React.ReactNode;
  status?: "error" | "success";
  subTitle?: string;
  title: string;
}

const Result: React.FC<ResultProps> = ({
  extra,
  image,
  status,
  subTitle,
  title,
}) => {
  return (
    <Container
      size="md"
      px={0}
      style={{
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Box
        style={{
          padding: "8px 3px",
        }}
      >
        <Box>
          <ResultImage customImage={image} status={status} />
        </Box>
        <Text size="lg" style={{ marginBottom: 8 }}>
          {title}
        </Text>
        {subTitle && (
          <Text
            size="sm"
            gradient={{
              from: "teal",
              to: "cyan",
              deg: 45,
            }}
            style={{ marginBottom: 16 }}
          >
            {subTitle}
          </Text>
        )}
        {extra && (
          <Box mt={32}>
            <Center>{extra}</Center>
          </Box>
        )}
        {/* Assuming SvgContainer is a styled component for SVGs. If it's specific to MUI, you might need to adjust it for Mantine */}
      </Box>
    </Container>
  );
};

export default Result;
