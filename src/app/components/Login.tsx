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

export default  function LoginPage(): React.JSX.Element {
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    
    try {
      const options:RequestInit = {
        method:"POST",
        body: new FormData(event.currentTarget)
      }
     
      const url = new URL(process.env.NEXT_PUBLIC_API ?? "");
      url.pathname += 'auth/';

      const response = await fetch(url, options);
      const result = await response.json();
  
    } catch (err) {
      console.log(err)
    }
    

    
  };

  return (
    <Box
      component="main"
      sx={{
        display: "flex",
        justifyContent: "center",
        height: "100vh",
				width:"100vw",
        alignItems: "center",
				bgcolor:"background.default",
      }}
    >
      <Box component="form" sx={formStyles} onSubmit={handleSubmit} method="POST"> 
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
        <Button variant="contained" type="submit">Uloguj se</Button>
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
	boxShadow:3,
	bgcolor:"background.paper",
};
