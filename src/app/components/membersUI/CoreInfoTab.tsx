"use client";

import { MemberProps } from "@/db/schemas/members";
import { membershipStatusProps } from "@/db/schemas/membershipStatus";
import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import Grid from "@mui/material/Grid2";
import { formatDate } from "date-fns";
import { FormEvent, useState } from "react";
import PermIdentityIcon from "@mui/icons-material/PermIdentity";
import TheaterComedyIcon from "@mui/icons-material/TheaterComedy";
import DatasetIcon from "@mui/icons-material/Dataset";
import { useRouter } from "next/navigation";
import { formatDateInput, isEmailValid, validateDate } from "@/lib/validation";
import { useAlert } from "@components/AlertProvider";

export default function CoreInfoTab({
  coreInfo,
  membershipStatus,
}: {
  coreInfo: MemberProps | null;
  membershipStatus: membershipStatusProps[];
}) {
  const router = useRouter();

  const [errors, setErrors] = useState<
    Record<string, { error: boolean; message: string }>
  >({});
  const { showAlert } = useAlert();
  const [data, setData] = useState({
    name: coreInfo?.name,
    nameCyr: coreInfo?.nameCyr,
    surname: coreInfo?.surname,
    surnameCyr: coreInfo?.surnameCyr,
    email: coreInfo?.email,
    dateOfBirth: coreInfo?.dateOfBirth
      ? formatDate(coreInfo.dateOfBirth, "dd. MM. yyyy")
      : "",
    dateOfJoining: coreInfo?.dateOfJoining
      ? formatDate(coreInfo.dateOfJoining, "dd. MM. yyyy")
      : "",
    exitDate: coreInfo?.exitDate
      ? formatDate(coreInfo.exitDate, "dd. MM. yyyy")
      : "",
    membershipStatus: coreInfo?.membershipStatus
      ? String(coreInfo.membershipStatus)
      : "1",
    identifier: coreInfo?.identifier ? coreInfo.identifier : "ime-prezime",
  });

  // Validate all fields on form submit
  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const values: Record<string, string> = {};

    formData.forEach((value, key) => {
      values[key] = value.toString();
    });

    const errors = validateFields(values);

    setErrors(errors);

    if (Object.values(errors).some((err) => err.error)) {
      return; // Prevent form submission if there are errors
    }

    const urlString = coreInfo
      ? `${process.env.NEXT_PUBLIC_API}/members/${coreInfo.id}`
      : `${process.env.NEXT_PUBLIC_API}/members/`;

    const result = await fetch(urlString, {
      method: coreInfo ? "PUT" : "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    

    const response = await result.json();

    if(!coreInfo)
      router.push(`/members/${response.responseData[0].insertId}`);

    showAlert(response.message, (response.success)?"success":"error");
    
    
  }

  // Validate single field on blur
  function validateField(e: React.FocusEvent<HTMLInputElement>) {
    const { id, value } = e.currentTarget;

    const fieldErrors = validateFields({ [id]: value });

    setErrors((prevErrors) => ({
      ...prevErrors,
      [id]: fieldErrors[id] || { error: false, message: "" },
    }));
  }

  return (
    <form onSubmit={handleSubmit} noValidate>
      <Typography
        variant="h5"
        component="h1"
        sx={{ marginBottom: "0.6rem", display: "flex", alignItems: "center" }}
      >
        <PermIdentityIcon sx={{ marginRight: "0.5rem" }} /> Osnovni podaci
      </Typography>

      <Box sx={{ flexGrow: 1 }}>
        <Grid container spacing={2}>
          <Grid size={2}>
            <TextField
              fullWidth
              id="name"
              name="name"
              label="Ime"
              value={data.name}
              variant="standard"
              size="small"
              required
              onChange={(e) =>
                setData({
                  ...data,
                  identifier: convertToBaldLatin(
                    `${e.target.value}-${data.surname}`.toLowerCase()
                  ),
                  name: e.target.value,
                })
              }
              error={errors.name?.error}
              helperText={errors.name?.message}
              onBlur={validateField}
            />
          </Grid>
          <Grid size={2}>
            <TextField
              fullWidth
              id="nameCyr"
              name="nameCyr"
              label="Ime - ćirilica"
              value={data.nameCyr}
              variant="standard"
              size="small"
              onChange={(e) => setData({ ...data, nameCyr: e.target.value })}
            />
          </Grid>
          <Grid size={2}>
            <TextField
              fullWidth
              required
              id="surname"
              name="surname"
              label="Prezime"
              value={data.surname}
              variant="standard"
              size="small"
              onChange={(e) =>
                setData({
                  ...data,
                  surname: e.target.value,
                  identifier: convertToBaldLatin(
                    `${data.name}-${e.target.value}`.toLowerCase()
                  ),
                })
              }
              onBlur={validateField}
              error={errors.surname?.error}
              helperText={errors.surname?.message}
            />
          </Grid>
          <Grid size={2}>
            <TextField
              fullWidth
              id="surnameCyr"
              name="surnameCyr"
              label="Prezime - ćirilica"
              value={data.surnameCyr}
              variant="standard"
              size="small"
              onChange={(e) => setData({ ...data, surnameCyr: e.target.value })}
            />
          </Grid>
          <Grid size={2}>
            <TextField
              fullWidth
              id="email"
              name="email"
              label="Imejl"
              value={data.email}
              variant="standard"
              size="small"
              onChange={(e) => setData({ ...data, email: e.target.value })}
              onBlur={validateField}
              error={errors.email?.error}
              helperText={errors.email?.message}
            />
          </Grid>
          <Grid size={2}>
            <TextField
              fullWidth
              id="dateOfBirth"
              name="dateOfBirth"
              label="Datum rođenja"
              value={data.dateOfBirth}
              variant="standard"
              size="small"
              placeholder=""
              onChange={(e) =>
                setData({
                  ...data,
                  dateOfBirth: formatDateInput(e.target.value),
                })
              }
              onBlur={validateField}
              error={errors.dateOfBirth?.error}
              helperText={errors.dateOfBirth?.message}
            />
          </Grid>
        </Grid>
      </Box>

      <Typography
        variant="h5"
        component="h1"
        sx={{
          marginTop: "1.8rem",
          marginBottom: "0.6rem",
          display: "flex",
          alignItems: "center",
        }}
      >
        <TheaterComedyIcon sx={{ marginRight: "0.5rem" }} /> Članstvo
      </Typography>

      <Box sx={{ flexGrow: 1 }}>
        <Grid container spacing={2}>
          <Grid size={2}>
            <TextField
              fullWidth
              required
              id="dateOfJoining"
              name="dateOfJoining"
              label="Datum upisa"
              value={data.dateOfJoining}
              variant="standard"
              size="small"
              placeholder=""
              onChange={(e) =>
                setData({
                  ...data,
                  dateOfJoining: formatDateInput(e.target.value),
                })
              }
              onBlur={validateField}
              error={errors.dateOfJoining?.error}
              helperText={errors.dateOfJoining?.message}
            />
          </Grid>
          <Grid size={2}>
            <TextField
              fullWidth
              id="exitDate"
              label="Datum izlaska"
              name="exitDate"
              value={data.exitDate}
              variant="standard"
              size="small"
              placeholder=""
              onChange={(e) =>
                setData({ ...data, exitDate: formatDateInput(e.target.value) })
              }
              onBlur={validateField}
              error={errors.exitDate?.error}
              helperText={errors.exitDate?.message}
            />
          </Grid>
          <Grid size={2}>
            <FormControl variant="standard" fullWidth size="small">
              <InputLabel id="membershipStatus-label">
                Status članstva
              </InputLabel>
              <Select
                labelId="membershipStatus-label"
                id="membershipStatus"
                name="membershipStatus"
                value={data.membershipStatus}
                label="Status članstva"
                onChange={(e) =>
                  setData({ ...data, membershipStatus: e.target.value })
                }
              >
                {membershipStatus &&
                  membershipStatus.map(({ id, status }) => (
                    <MenuItem value={id} key={status}>
                      {status}
                    </MenuItem>
                  ))}
              </Select>
            </FormControl>
          </Grid>
        </Grid>
      </Box>

      <Typography
        variant="h5"
        component="h1"
        sx={{
          marginTop: "1.8rem",
          marginBottom: "0.6rem",
          display: "flex",
          alignItems: "center",
        }}
      >
        <DatasetIcon sx={{ marginRight: "0.5rem" }} /> Meta podaci
      </Typography>

      <Box sx={{ flexGrow: 1 }}>
        <Grid container spacing={2}>
          <Grid size={4}>
            <TextField
              fullWidth
              id="identifier"
              name="identifier"
              label="Identifikator"
              value={data.identifier}
              variant="standard"
              size="small"
              placeholder=""
              slotProps={{
                input: {
                  readOnly: true,
                },
              }}
            />
          </Grid>
        </Grid>
      </Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          marginTop: "1.8rem",
          gap: "0.7rem",
        }}
      >
        <Button
          variant="contained"
          color="secondary"
          size="small"
          type="button"
          onClick={()=>{router.push(`/members/`)}}
        >
          Nazad
        </Button>
        <Button variant="contained" color="primary" size="small" type="submit">
          Sačuvaj
        </Button>
      </Box>
    </form>
  );
}

function validateFields(values: Record<string, string>) {
  const errors: Record<string, { error: boolean; message: string }> = {};

  if (values.name === "") {
    errors.name = { error: true, message: "Ime je obavezan podatak" };
  }

  if (values.surname === "") {
    errors.surname = { error: true, message: "Prezime je obavezan podatak" };
  }

  if (values.dateOfJoining === "") {
    errors.dateOfJoining = {
      error: true,
      message: "Datum upisa je obavezan podatak",
    };
  } else {
    const res = validateDate(values.dateOfJoining);
    if (res.error) {
      errors.dateOfJoining = { error: true, message: res.message };
    }
  }

  if (values.dateOfBirth) {
    const res = validateDate(values.dateOfBirth);
    if (res.error) {
      errors.dateOfBirth = { error: true, message: res.message };
    }
  }

  if (values.exitDate) {
    const res = validateDate(values.exitDate);
    if (res.error) {
      errors.exitDate = { error: true, message: res.message };
    }
  }

  if (values.alt === "") {
    errors.alt = {
      error: true,
      message: "Alternativni tekst je obavezan podatak",
    };
  }

  if (values.email) {
    if (!isEmailValid(values.email)) {
      errors.email = { error: true, message: "Neispravan format imejl adrese" };
    }
  }

  return errors;
}

function convertToBaldLatin(input: string): string {
  const replacements: { [key: string]: string } = {
    č: "c",
    ć: "c",
    ž: "z",
    š: "s",
    đ: "dj",
    á: "a",
    é: "e",
    í: "i",
    ó: "o",
    ú: "u",
    à: "a",
    è: "e",
    ì: "i",
    ò: "o",
    ù: "u",
  };

  return input
    .split("")
    .map((char) => replacements[char] || char)
    .join("");
}
