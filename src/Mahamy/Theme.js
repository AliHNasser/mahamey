import { createTheme } from "@mui/material";
import { pink, indigo } from "@mui/material/colors";

const theme = createTheme({
  palette: {
    primary: {
      main: pink[800],
    },
    secondary: {
      main: indigo[800],
    },
  },
  typography: {
    fontFamily: "Cairo",
  },
});

export default theme;
