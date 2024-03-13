import {
  Text,
  Paper,
  createTheme,
  Container,
  MenuItem,
  TextInput,
  Input,
  Autocomplete,
  Select,
  Textarea,
} from "@mantine/core";
import { DateInput } from "@mantine/dates";

export const DarkTheme = createTheme({
  primaryColor: "primary",
  defaultGradient: {
    from: "orange.7", // Example dark mode gradient start
    to: "yellow.4", // Example dark mode gradient end
    deg: 45,
  },
  colors: {
    // Example color array with 10 shades, from lightest to darkest
    primary: [
      "#E6E9F8",
      "#CDD3F1",
      "#B3BDEA",
      "#9AA7E3",
      "#21325E",
      "#1E2C55",
      "#1A264C",
      "#161F43",
      "#12193A",
      "#0E1331",
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
    text: [
      "#e8e8e8", // light grey starting color
      "#ebebeb",
      "#ededed",
      "#f0f0f0",
      "#f2f2f2",
      "#f5f5f5",
      "#f7f7f7",
      "#fafafa",
      "#fcfcfc",
      "#ffffff", // pure white ending color
    ],

    // text: [
    //   "#e0e0e0",
    //   "#e3e3e3",
    //   "#e7e7e7",
    //   "#f0f0f0",
    //   "#ebebeb",
    //   "#efefef", // Closest to #F0F0F0 at the desired position
    //   "#f3f3f3",
    //   "#f7f7f7",
    //   "#fbfbfb",
    //   "#ffffff",
    // ],
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
        bg: "primary.5",
      },
    }),
    // Container: Container.extend({
    //   defaultProps: {
    //     bg: "primary.4",
    //   },
    // }),
    MenuItem: MenuItem.extend({
      defaultProps: {
        color: "text.8",
        bg: "primary.4",
      },
    }),
    TextInput: TextInput.extend({
      defaultProps: {
        // These default props will apply globally to all TextInput components
        variant: "filled", // Choose 'filled', 'unstyled', or 'default'
      },
      styles: (theme) => ({
        input: {
          backgroundColor: "white", // Dark theme background
          color: "black", // Text color for dark theme

          "&::placeholder": {
            color: theme.colors.gray[4], // Placeholder color for dark theme
          },
        },
        required: {
          fontSize: "1.25em",
        },
        label: {
          color: theme.colors.text[9],
          // Target the required asterisk within label
          "&[dataRequired]::after": {
            content: '"*"',
            marginLeft: 8,
            color: theme.colors.orange[6], // Change asterisk color if needed
            fontSize: "1.00em", // Make asterisk larger
          },
        },
        error: {
          // Customize the error message color
          color: theme.colors.orange[6], // Use light orange for errors
        },
      }),
    }),
    Textarea: Textarea.extend({
      defaultProps: {
        // These default props will apply globally to all TextInput components
        variant: "filled", // Choose 'filled', 'unstyled', or 'default'
      },
      styles: (theme) => ({
        input: {
          backgroundColor: "white", // Dark theme background
          color: "black", // Text color for dark theme

          "&::placeholder": {
            color: theme.colors.gray[4], // Placeholder color for dark theme
          },
        },
        required: {
          fontSize: "1.25em",
        },
        label: {
          color: theme.colors.text[9],
          // Target the required asterisk within label
          "&[dataRequired]::after": {
            content: '"*"',
            marginLeft: 8,
            color: theme.colors.orange[6], // Change asterisk color if needed
            fontSize: "1.00em", // Make asterisk larger
          },
        },
        error: {
          // Customize the error message color
          color: theme.colors.orange[6], // Use light orange for errors
        },
      }),
    }),
    Autocomplete: Autocomplete.extend({
      defaultProps: {
        variant: "filled",
      },
      styles: (theme) => ({
        input: {
          backgroundColor: "white", // Dark theme background
          color: "black", // Text color for dark theme

          "&::placeholder": {
            color: theme.colors.gray[4], // Placeholder color for dark theme
          },
        },
        required: {
          fontSize: "1.25em",
        },
        // dropdown: {
        //   backgroundColor: "white",
        //   color: "black",
        // },
        item: {
          "&[data-hovered]": {
            backgroundColor: theme.colors.dark[4], // Your desired hover background color
            color: theme.colors.gray[0], // Your desired hover text color
          },
        },
        label: {
          color: theme.colors.text[9],
          // Target the required asterisk within label
          "&[dataRequired]::after": {
            content: '"*"',
            marginLeft: 8,
            color: theme.colors.orange[6], // Change asterisk color if needed
            fontSize: "1.00em", // Make asterisk larger
          },
        },
        error: {
          // Customize the error message color
          color: theme.colors.orange[6], // Use light orange for errors
        },
      }),
    }),
    Select: Select.extend({
      defaultProps: {
        variant: "filled",
      },
      styles: (theme) => ({
        input: {
          backgroundColor: "white", // Dark theme background
          color: "black", // Text color for dark theme

          "&::placeholder": {
            color: theme.colors.gray[4], // Placeholder color for dark theme
          },
        },
        required: {
          fontSize: "1.25em",
        },
        // dropdown: {
        //   backgroundColor: "white",
        //   color: "black",
        // },
        item: {
          "&[data-hovered]": {
            backgroundColor: theme.colors.dark[4], // Your desired hover background color
            color: theme.colors.gray[0], // Your desired hover text color
          },
        },
        label: {
          color: theme.colors.text[9],
          // Target the required asterisk within label
          "&[dataRequired]::after": {
            content: '"*"',
            marginLeft: 8,
            color: theme.colors.orange[6], // Change asterisk color if needed
            fontSize: "1.00em", // Make asterisk larger
          },
        },
        error: {
          // Customize the error message color
          color: theme.colors.orange[6], // Use light orange for errors
        },
      }),
    }),
    DateInput: DateInput.extend({
      defaultProps: {
        // These default props will apply globally to all TextInput components
        variant: "filled", // Choose 'filled', 'unstyled', or 'default'
      },
      styles: (theme) => ({
        input: {
          backgroundColor: "white", // Dark theme background
          color: "black", // Text color for dark theme

          "&::placeholder": {
            color: theme.colors.gray[4], // Placeholder color for dark theme
          },
        },
        required: {
          fontSize: "1.25em",
        },
        label: {
          color: theme.colors.text[9],
          // Target the required asterisk within label
          "&[dataRequired]::after": {
            content: '"*"',
            marginLeft: 8,
            color: theme.colors.orange[6], // Change asterisk color if needed
            fontSize: "1.00em", // Make asterisk larger
          },
        },
        error: {
          // Customize the error message color
          color: theme.colors.orange[6], // Use light orange for errors
        },
      }),
    }),
  },
  other: {
    body: {
      backgroundColor: "#1A202C",
      color: "#E2E8F0",
    },
  },
  // Other theme customizations...
});
