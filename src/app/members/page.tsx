"use client";

import { Divider, Typography } from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";

export default function Members() {
  return (
    <div style={{ height: "auto", width: "90%", margin: "auto" }}>
      <Typography align="left" component="h1" variant="h5">
        Članovi
      </Typography>
      <Divider sx={{ marginBottom: "1rem" }}></Divider>
      <DataGrid columns={getColumns()} rows={[]} />
    </div>
  );
}

function getColumns(): GridColDef[] {
  return [
    {
      field: "name",
      headerName: "Ime",
      type: "string",
      flex: 1,
    },
    {
      field: "surname",
      headerName: "Prezime",
      type: "string",
      flex: 1,
    },
    {
      field: "membershipStatus",
      headerName: "Status članstva",
      type: "string",
      flex: 1,
    },
    {
      field: "active",
      headerName: "Aktivan",
      type: "string",
      flex: 1,
    },
  ];
}
