"use client";

import * as React from "react";
import {
  Container,
  Typography,
  TextField,
  Button,
  Box,
  SxProps,
} from "@mui/material";

export default function LoginPage(): React.JSX.Element {
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      email: data.get("email") as string,
      password: data.get("password") as string,
    });
  };

  return (
    <Container
      component="main"
      sx={{
        display: "flex",
        justifyContent: "center",
        height: "100vh",
        alignItems: "center",
      }}
    >
      <Box component="form" sx={formStyles}>
        <Typography component="h1" variant="h6" textAlign="center">
          Administracija
        </Typography>
        <TextField
          id="standard-basic"
          label="Korisničko ime"
          variant="standard"
          size="small"
        />
        <TextField
          id="standard-basic"
          label="Lozinka"
          variant="standard"
          size="small"
        />
        <Button variant="contained">Uloguj se</Button>
      </Box>
    </Container>
  );
}

const formStyles: SxProps = {
  display: "flex",
  flexDirection: "column",
  gap: "1rem",
  border: 1,
  borderRadius: "3%",
  padding: "1.5rem",
  width: "22rem",
	boxShadow:3,
};
