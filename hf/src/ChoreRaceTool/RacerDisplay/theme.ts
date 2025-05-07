import { createTheme } from "@mui/material/styles";
import { purple } from "@mui/material/colors";

const theme = createTheme({
  palette: {
    primary: {
      main: purple[200], // Custom primary color
    },
    secondary: {
      main: purple[900], // Custom secondary color
    },
    background: {
      default: purple[50], // Light gray background
    },
    text: {
      primary: "#000", // Darker text for contrast
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: "8px", // Rounded buttons
        },
      },
    },
  },
});

export default theme;
