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
  timeout: number;
}

interface AlertContextProps {
  showAlert: (message: string, type?: AlertType) => void;
  closeAlert: () => void;
}

const AlertContext = React.createContext<AlertContextProps | undefined>(undefined);
const DEFAULT_TIMEOUT = 5000;

export function AlertProvider({ children }: { children: React.ReactNode }) {
  const [alert, setAlert] = React.useState<AlertState>({
    open: false,
    message: "",
    type: "info",
    timeout:3000
  });

  const showAlert = (message: string, type: AlertType = "info", timeout:number = DEFAULT_TIMEOUT) => {
    setAlert({ open: true, message, type, timeout });
  };

  

  const closeAlert = () => {
    setAlert((prev) => ({ ...prev, open: false, timeout:DEFAULT_TIMEOUT }));
  };

  if(alert.open){
    setTimeout(closeAlert, alert.timeout);
  }

  return (
    <AlertContext.Provider value={{ showAlert, closeAlert }}>
      <Box sx={{ width: "fit-content", position: "fixed", top: 20, right:20, zIndex: 1000 }}>
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
