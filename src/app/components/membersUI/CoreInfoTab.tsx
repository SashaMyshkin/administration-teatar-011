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
import { useState } from "react";
import PermIdentityIcon from "@mui/icons-material/PermIdentity";
import FingerprintIcon from "@mui/icons-material/Fingerprint";
import TheaterComedyIcon from "@mui/icons-material/TheaterComedy";
import DatasetIcon from "@mui/icons-material/Dataset";
import { useRouter } from "next/navigation";

export default function CoreInfoTab({
  coreInfo,
  membershipStatus,
}: {
  coreInfo: MemberProps | null;
  membershipStatus: membershipStatusProps[];
}) {
	const router = useRouter();
  const [data, setData] = useState({
    name: coreInfo?.name,
    nameCyr: coreInfo?.nameCyr,
    surname: coreInfo?.surname,
    surnameCyr: coreInfo?.surnameCyr,
    email: coreInfo?.email,
    dateOfBirth: coreInfo?.dateOfBirth
      ? formatDate(coreInfo.dateOfBirth, "dd. MM. yyy")
      : "",
    dateOfJoining: coreInfo?.dateOfJoining
      ? formatDate(coreInfo.dateOfJoining, "dd. MM. yyy")
      : "",
    exitDate: coreInfo?.exitDate
      ? formatDate(coreInfo.exitDate, "dd. MM. yyy")
      : "",
    img: coreInfo?.img ? coreInfo.img : "/assets/img/ime-prezime/profilna.jpg",
    alt: coreInfo?.alt ? coreInfo.alt : "Slika člana teatra",
    membershipStatus: coreInfo?.membershipStatus
      ? String(coreInfo.membershipStatus)
      : "1",
    identifier: coreInfo?.identifier ? coreInfo.identifier : "ime-prezime",
  });

	

  return (
    <>
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
              label="Ime"
              value={data.name}
              variant="standard"
              size="small"
              required
              onChange={(e) =>
                setData({
                  ...data,
                  img: convertToBaldLatin(
                    `/assets/img/${e.target.value}-${data.surname}/profilna.jpg`.toLowerCase()
                  ),
                  identifier: convertToBaldLatin(
                    `${e.target.value}-${data.surname}`.toLowerCase()
                  ),
                  name: e.target.value,
                })
              }
            />
          </Grid>
          <Grid size={2}>
            <TextField
              fullWidth
              id="nameCyr"
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
              label="Prezime"
              value={data.surname}
              variant="standard"
              size="small"
              onChange={(e) =>
                setData({
                  ...data,
                  img: convertToBaldLatin(
                    `/assets/img/${data.name}-${e.target.value}/profilna.jpg`.toLowerCase()
                  ),
                  surname: e.target.value,
                  identifier: convertToBaldLatin(
                    `${data.name}-${e.target.value}`.toLowerCase()
                  ),
                })
              }
            />
          </Grid>
          <Grid size={2}>
            <TextField
              fullWidth
              id="surnameCyr"
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
              label="Imejl"
              value={data.email}
              variant="standard"
              size="small"
              onChange={(e) => setData({ ...data, email: e.target.value })}
            />
          </Grid>
          <Grid size={2}>
            <TextField
              fullWidth
              id="dateOfBirth"
              label="Datum rođenja"
              value={data.dateOfBirth}
              variant="standard"
              size="small"
              placeholder=""
              onChange={(e) =>
                setData({ ...data, dateOfBirth: e.target.value })
              }
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
              label="Datum upisa"
              value={data.dateOfJoining}
              variant="standard"
              size="small"
              placeholder=""
              onChange={(e) =>
                setData({ ...data, dateOfJoining: e.target.value })
              }
            />
          </Grid>
          <Grid size={2}>
            <TextField
              fullWidth
              id="exitDate"
              label="Datum izlaska"
              value={data.exitDate}
              variant="standard"
              size="small"
              placeholder=""
              onChange={(e) => setData({ ...data, exitDate: e.target.value })}
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
              required
              id="alt"
              label="Alternativni tekst"
              value={data.alt}
              variant="standard"
              size="small"
              placeholder=""
              onChange={(e) => setData({ ...data, alt: e.target.value })}
              title="Alternativni tekst se prikazuje u slučaju ako sajt ne može da prikaže sliku ili biva pročitan od strane softvera za slepe."
            />
          </Grid>
          <Grid size={4}>
            <TextField
              fullWidth
              id="img"
              label="Putanja do slike"
              value={data.img}
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

          <Grid size={4}>
            <TextField
              fullWidth
              id="alt"
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
        sx={{ display: "flex", justifyContent: "center", marginTop: "1.8rem", gap:"0.7rem" }}
      >
        <Button variant="contained" color="secondary" size="small" type="button" onClick={router.back}>
          Nazad
        </Button>
        <Button variant="contained" color="primary" size="small">
          Sačuvaj
        </Button>
      </Box>
    </>
  );
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
