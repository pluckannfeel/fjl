import React, { useEffect, useState } from "react";
import {
  Modal,
  Image,
  Grid,
  Skeleton,
  useMantineTheme,
  Card,
  rem,
} from "@mantine/core";

interface PhotoGalleryProps {
  photos: File[];
}

export const PhotoGallery: React.FC<PhotoGalleryProps> = ({ photos }) => {
  const theme = useMantineTheme();
  const [opened, setOpened] = useState(false);
  const [selectedImageSrc, setSelectedImageSrc] = useState<string | null>(null);
  const [imageUrls, setImageUrls] = useState<string[]>([]);

  useEffect(() => {
    const newImageUrls = photos.map((photo) => URL.createObjectURL(photo));
    setImageUrls(newImageUrls);

    return () => {
      newImageUrls.forEach((url) => URL.revokeObjectURL(url));
    };
  }, [photos]);

  const openModal = (imageSrc: string) => {
    setSelectedImageSrc(imageSrc);
    setOpened(true);
  };

  const handleImageClick = (imageSrc: string) => {
    setSelectedImageSrc(imageSrc);
    setOpened(true);
  };

  //   const placeholders = Array.from({ length: 4 - photos.length }, (_, index) => (
  //     <Skeleton key={index} height="100%" radius="md" />
  //   ));

  const PRIMARY_COL_HEIGHT = rem(300);
  const SECONDARY_COL_HEIGHT = `calc(${PRIMARY_COL_HEIGHT} / 2 - var(--mantine-spacing-md) / 2)`;

  const renderImageCard = (imageSrc?: string, index?: number) => (
    <Card
      key={index}
      shadow="sm"
      p={0}
      //   p="lg"
      style={{
        cursor: imageSrc ? "pointer" : undefined,
        background: theme.colors.dark[7],
        height: "100%", // Ensure all cards have the same height
      }}
      onClick={() => imageSrc && handleImageClick(imageSrc)}
    >
      {imageSrc ? (
        <Image
          src={imageSrc}
          alt={`Photo ${index}`}
          fit="cover"
          height="100%"
        />
      ) : (
        <Skeleton
          animate={false}
          height={index === 0 ? PRIMARY_COL_HEIGHT : SECONDARY_COL_HEIGHT}
          radius="md"
        />
      )}
    </Card>
  );

  return (
    <>
      <Grid mt={"lg"} gutter="sm">
        <Grid.Col span={{ base: 12, sm: 6 }}>
          {renderImageCard(imageUrls[0], 0)}
        </Grid.Col>
        <Grid.Col span={{ base: 12, sm: 6 }}>
          <Grid gutter="sm" style={{ height: "100%" }}>
            <Grid.Col span={{ base: 12, sm: 12 }}>
              {renderImageCard(imageUrls[1], 1)}
            </Grid.Col>
            <Grid.Col span={{ base: 12, sm: 6 }}>
              {renderImageCard(imageUrls[2], 2)}
            </Grid.Col>
            <Grid.Col span={{ base: 12, sm: 6 }}>
              {renderImageCard(imageUrls[3], 3)}
            </Grid.Col>
          </Grid>
        </Grid.Col>
      </Grid>

      <Modal
        opened={opened}
        centered
        withCloseButton={false}
        onClose={() => setOpened(false)}
        // title="Photo Preview"
        size="lg"
        padding={0}
        bg={"transparent"}
        color="transparent"
      >
        {selectedImageSrc && (
          <Image
            src={selectedImageSrc}
            alt="Selected"
            fit="contain"
            style={{ width: "100%", height: "auto", maxHeight: "80vh" }}
          />
        )}
      </Modal>
    </>
  );
};
