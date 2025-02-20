"use client";

import * as React from "react";
import {
  Typography,
  TextField,
  Button,
  Box,
  SxProps,
} from "@mui/material";
import { useAlert } from "@components/AlertProvider";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation"; // ✅ Import useRouter

export default function LoginPage(): React.JSX.Element {
  const { showAlert } = useAlert();
  const router = useRouter(); // ✅ Use router

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const form = e.currentTarget;
    const formData = new FormData(form);
    const username = formData.get("username") as string;
    const password = formData.get("password") as string;

    const res = await signIn("credentials", {
      username,
      password,
      redirect: false, // Keep redirect false to handle navigation manually
    });

    console.log(res);

    if (res?.error) {
      showAlert(res.error, "error"); // Display error message
    } else {
      showAlert("Uspešno ste se prijavili!", "success");
      router.push("/"); // ✅ Redirect using router.push
      router.refresh(); // ✅ Refresh the page to ensure user state updates
    }
  }

  return (
    <Box
      component="main"
      sx={{
        display: "flex",
        justifyContent: "center",
        height: "100vh",
        width: "100vw",
        alignItems: "center",
        bgcolor: "background.default",
      }}
    >
      <Box component="form" sx={formStyles} onSubmit={handleSubmit}>
        <Typography component="h1" variant="h6" textAlign="center">
          Administracija
        </Typography>
        <TextField
          id="username"
          name="username"
          type="text"
          label="Korisničko ime"
          variant="standard"
          size="small"
        />
        <TextField
          id="password"
          name="password"
          type="password"
          label="Lozinka"
          variant="standard"
          size="small"
        />
        <Button variant="contained" type="submit">
          Uloguj se
        </Button>
      </Box>
    </Box>
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
  boxShadow: 3,
  bgcolor: "background.paper",
};
