"use client";

import * as React from "react";
import Box from "@mui/material/Box";
import Alert from "@mui/material/Alert";
import IconButton from "@mui/material/IconButton";
import Collapse from "@mui/material/Collapse";
import CloseIcon from "@mui/icons-material/Close";

type AlertType = "error" | "warning" | "info" | "success";

interface AlertState {
  open: boolean;
  message: string;
  type: AlertType;
}

interface AlertContextProps {
  showAlert: (message: string, type?: AlertType) => void;
  closeAlert: () => void;
}

const AlertContext = React.createContext<AlertContextProps | undefined>(undefined);

export function AlertProvider({ children }: { children: React.ReactNode }) {
  const [alert, setAlert] = React.useState<AlertState>({
    open: false,
    message: "",
    type: "info",
  });

  const showAlert = (message: string, type: AlertType = "info") => {
    setAlert({ open: true, message, type });
  };

  const closeAlert = () => {
    setAlert((prev) => ({ ...prev, open: false }));
  };

  return (
    <AlertContext.Provider value={{ showAlert, closeAlert }}>
      <Box sx={{ width: "100%", position: "fixed", top: 20, zIndex: 1000 }}>
        <Collapse in={alert.open}>
          <Alert
            severity={alert.type}
            action={
              <IconButton
                aria-label="close"
                color="inherit"
                size="small"
                onClick={closeAlert}
              >
                <CloseIcon fontSize="inherit" />
              </IconButton>
            }
          >
            {alert.message}
          </Alert>
        </Collapse>
      </Box>
      {children}
    </AlertContext.Provider>
  );
}

export function useAlert() {
  const context = React.useContext(AlertContext);
  if (!context) {
    throw new Error("useAlert must be used within an AlertProvider");
  }
  return context;
}
