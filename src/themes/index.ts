import { createMuiTheme, ThemeOptions } from "@material-ui/core";
import { amber, teal, grey } from "@material-ui/core/colors";

const themeOptions: ThemeOptions = {
  palette: {
    primary: {
      light: teal[500],
      main: teal[700],
      dark: teal[900],
      contrastText: grey[50],
    },
    secondary: {
      light: amber[500],
      main: amber[700],
      dark: amber[900],
      contrastText: grey[900],
    },
  },
};

export const theme = createMuiTheme(themeOptions);
