import { Alert, Snackbar } from "@mui/material";
import { useState } from "react";
import { SnackbarContext } from "../Contexts/SnackbarContext";

export default function SnackbarComponent({ children }) {
  const [snackbarState, setSnackbarState] = useState({
    isOpen: false,
    snackbarMessage: "",
    isError: false,
  });
  return (
    <>
      <Snackbar
        open={snackbarState.isOpen}
        autoHideDuration={3000}
        onClose={() => {
          setSnackbarState({
            ...snackbarState,
            isOpen: false,
          });
        }}
      >
        <Alert
          severity={snackbarState.isError ? "error" : "success"}
          variant="filled"
          icon={false}
        >
          {snackbarState.snackbarMessage}
        </Alert>
      </Snackbar>

      <SnackbarContext.Provider
        value={{
          snackbarState: snackbarState,
          setSnackbarState: setSnackbarState,
        }}
      >
        {children}
      </SnackbarContext.Provider>
    </>
  );
}
