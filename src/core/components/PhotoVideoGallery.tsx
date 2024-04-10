import React, { useEffect, useState } from "react";
import {
  Modal,
  Image,
  Grid,
  Skeleton,
  useMantineTheme,
  Card,
  rem,
  Text,
} from "@mantine/core";

interface PhotoGalleryProps {
  photos: File[];
}

interface MediaItem {
  url: string;
  type: "image" | "video";
}

export const PhotoVideoGallery: React.FC<PhotoGalleryProps> = ({ photos }) => {
  const theme = useMantineTheme();
  const [opened, setOpened] = useState(false);
  const [selectedMediaSrc, setSelectedMediaSrc] = useState<string | null>(null);
  const [selectedMediaType, setSelectedMediaType] = useState<
    "image" | "video" | null
  >(null);
  const [mediaUrls, setMediaUrls] = useState<
    { url: string; type: "image" | "video" }[]
  >([]);

  const PRIMARY_COL_HEIGHT = rem(300);
  const SECONDARY_COL_HEIGHT = `calc(${PRIMARY_COL_HEIGHT} / 2 - var(--mantine-spacing-md) / 2)`;

  useEffect(() => {
    const newMediaUrls = photos.map((photo): MediaItem => {
      const type = photo.type.startsWith("video") ? "video" : "image";
      return {
        url: URL.createObjectURL(photo),
        type: type as "image" | "video", // Explicit cast here
      };
    });
    setMediaUrls(newMediaUrls);

    return () => {
      newMediaUrls.forEach((media) => URL.revokeObjectURL(media.url));
    };
  }, [photos]);

  const handleMediaClick = (media: {
    url: string;
    type: "image" | "video";
  }) => {
    setSelectedMediaSrc(media.url);
    setSelectedMediaType(media.type);
    setOpened(true);
  };

  const renderMediaCard = (
    media?: { url: string; type: "image" | "video" },
    index?: number
  ) => (
    <Card
      key={index}
      shadow="sm"
      p={0}
      style={{
        cursor: media ? "pointer" : undefined,
        background: theme.colors.dark[7],
        height: "100%", // Ensure all cards have the same height
      }}
      onClick={() => media && handleMediaClick(media)}
    >
      {media ? (
        media.type === "image" ? (
          <Image
            src={media.url}
            alt={`Photo ${index}`}
            fit="cover"
            height="100%"
          />
        ) : (
          <video style={{ width: "100%", height: "100%" }} controls>
            <source src={media.url} type="video/mp4" />{" "}
            {/* Adjust type if necessary */}
            Your browser does not support the video tag.
          </video>
        )
      ) : (
        // <Skeleton
        //   animate={false}
        //   height={index === 0 ? PRIMARY_COL_HEIGHT : "100%"}
        //   radius="md"
        // />
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
          {renderMediaCard(mediaUrls[0], 0)}
        </Grid.Col>
        <Grid.Col span={{ base: 12, sm: 6 }}>
          <Grid gutter="sm" style={{ height: "100%" }}>
            <Grid.Col span={{ base: 12, sm: 12 }}>
              {renderMediaCard(mediaUrls[1], 1)}
            </Grid.Col>
            <Grid.Col span={{ base: 12, sm: 6 }}>
              {renderMediaCard(mediaUrls[2], 2)}
            </Grid.Col>
            <Grid.Col span={{ base: 12, sm: 6 }}>
              {renderMediaCard(mediaUrls[3], 3)}
            </Grid.Col>
          </Grid>
        </Grid.Col>
      </Grid>

      <Modal
        opened={opened}
        centered
        withCloseButton={false}
        onClose={() => setOpened(false)}
        size="lg"
        padding={0}
        bg={"transparent"}
        color="transparent"
      >
        {selectedMediaSrc && selectedMediaType === "image" && (
          <Image
            src={selectedMediaSrc}
            alt="Selected"
            fit="contain"
            style={{ width: "100%", height: "auto", maxHeight: "80vh" }}
          />
        )}
        {selectedMediaSrc && selectedMediaType === "video" && (
          <video style={{ width: "100%", maxHeight: "80vh" }} controls autoPlay>
            <source src={selectedMediaSrc} type="video/mp4" />{" "}
            {/* Adjust type if necessary */}
            Your browser does not support the video tag.
          </video>
        )}
      </Modal>
    </>
  );
};

export default PhotoVideoGallery;
