import {
  Loader as LoaderComponent,
  Box,
  Center,
  LoadingOverlay,
} from "@mantine/core";

const CustomLoader = () => {
  //   const { colorScheme } = useMantineColorScheme();

  return (
    <Box
      style={{
        position: "fixed", // Use 'absolute' for positioning inside a relative container
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        backgroundColor: "rgba(0, 0, 0, 0.75)", // Adjust the alpha value (0.75) for more or less transparency
        opacity: 0.75, // Adjust the opacity value (0.9) for more or less transparency
        zIndex: 999,
      }}
    >
      <Center style={{ width: "100%", height: "100%" }}>
        {/* <LoaderComponent size={75} /> */}
        <LoadingOverlay
          visible={true}
          zIndex={1000}
          overlayProps={{ radius: "sm", blur: 2 }}
          loaderProps={{ color: "orange.6", type: "bars" }}
        />
      </Center>
    </Box>
  );
};

export default CustomLoader;
