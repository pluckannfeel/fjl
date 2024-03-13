import {
  Container,
  MenuItem,
  Paper,
  Radio,
  Text,
  TextInput,
  createTheme,
} from "@mantine/core";
import { t } from "i18next";

export const LightTheme = createTheme({
  primaryColor: "primary",
  defaultGradient: {
    from: "blue.9", // Example light mode gradient start
    to: "cyan.5", // Example light mode gradient end
    deg: 45,
  },
  colors: {
    // Example color array with 10 shades, from lightest to darkest
    // 10 shades with 4 being F0F0F0
    primary: [
      "#e0e0e0",
      "#e3e3e3",
      "#e7e7e7",
      "#f0f0f0",
      "#ebebeb",
      "#efefef", // Closest to #F0F0F0 at the desired position
      "#f3f3f3",
      "#f7f7f7",
      "#fbfbfb",
      "#ffffff",
    ],
    secondary: [
      "#E6E6F8",
      "#CDCDF1",
      "#B3B4EA",
      "#9A9BE3",
      "#3E497A",
      "#383F6E",
      "#323562",
      "#2C2B56",
      "#26214A",
      "#20173E",
    ],
    action: [
      "#F9F1D0",
      "#F3E3A1",
      "#EDD572",
      "#E7C743",
      "#F1D00A",
      "#D7BA09",
      "#BDA308",
      "#A38C07",
      "#897506",
      "#6F5E05",
    ],
    // text: [
    //   "#E6E9F8",
    //   "#CDD3F1",
    //   "#B3BDEA",
    //   "#9AA7E3",
    //   "#21325E",
    //   "#1E2C55",
    //   "#1A264C",
    //   "#161F43",
    //   "#12193A",
    //   "#0E1331",
    // ],
    text: [
      "#e0e0e0", // lighter grey
      "#c6c6c6",
      "#acacac",
      "#939393",
      "#7a7a7a",
      "#616161",
      "#484848",
      "#2f2f2f",
      "#161616",
      "#000000", // black
    ],

    // Add more custom colors as needed
  },
  components: {
    // Override Button styles
    // Override global body background and text color
    Text: Text.extend({
      defaultProps: {
        color: "text.8",
      },
    }),
    Paper: Paper.extend({
      defaultProps: {
        bg: "primary.8",
      },
    }),
    MenuItem: MenuItem.extend({
      defaultProps: {
        color: "text.8",
        bg: "primary.4",
      },
    }),
    // TextInput: TextInput.extend({
    //   defaultProps: {
    //     // These default props will apply globally to all TextInput components
    //     variant: "filled", // Choose 'filled', 'unstyled', or 'default'
    //   },
    //   styles: (theme) => ({
    //     input: {
    //       backgroundColor: theme.colors.gray[3], // Dark theme background
    //       color: theme.black, // Text color for dark theme

    //       "&::placeholder": {
    //         color: theme.colors.gray[8], // Placeholder color for dark theme
    //       },
    //     },
    //     required: {
    //       fontSize: "1.25em",
    //     },
    //     label: {
    //       // Target the required asterisk within label
    //       "&[dataRequired]::after": {
    //         content: '"*"',
    //         marginLeft: 4,
    //         color: theme.colors.red[6], // Change asterisk color if needed
    //         fontSize: "1.25em", // Make asterisk larger
    //       },
    //     },
    //     error: {
    //       // Customize the error message color
    //       color: theme.colors.orange[6], // Use light orange for errors
    //     },
    //   }),
    // }),
    Radio: Radio.extend({
      defaultProps: {
        // color: "primary",
      },
      styles: (theme) => ({
        // ...
        
        // root: {
        //   // The root style applies to the entire radio component
        //   // Custom styles for the root element
        // },
        // icon: {
        //   // The `icon` part is what's visible when the radio is checked
        //   backgroundColor: theme.colors.primary[4],
        // },
        // radio: {
        //   // Default radio styles
        //   "&:not(:checked)": {
        //     borderColor: theme.colors.primary[4], // Unchecked state border color
        //     backgroundColor: theme.colors.dark[4], // Unchecked state background color
        //   },
        //   "&:checked": {
        //     backgroundColor: theme.colors.primary[4], // Checked state background color
        //     borderColor: theme.colors.primary[4], // Checked state border color
        //   },
        // },
        // label: {
        //   // Styles for the label, if needed
        // },
        // Add any other part styles if needed
      }),
    }),
  },
  other: {
    body: {
      backgroundColor: "#1A202C",
      color: "#E2E8F0",
    },
  },
});
