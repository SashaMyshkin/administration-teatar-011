import * as React from "react";
import {
  Container,
  Typography,
  TextField,
  Button,
  Box,
  SxProps,
} from "@mui/material";
import { signIn } from "@/auth";

export default  function LoginPage(): React.JSX.Element {
  
  

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
      <Box component="form" sx={formStyles} action={async (formData) => {
        "use server"
        await signIn("credentials",{
          username: formData.get("username"),
          password: formData.get("password"),
          redirectTo:"/",
          /*redirect: false, // Prevent auto-redirect for debugging*/
        })
      }}> 
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
