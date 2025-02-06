"use client";

import { AuditionProps } from "@/types/audition";
import {
  DataGrid,
  GridColDef,
  GridRenderCellParams,
  GridValueGetter,
} from "@mui/x-data-grid";
import { useState } from "react";
import { format } from "date-fns";
import TaskAltIcon from "@mui/icons-material/TaskAlt";
import { useTheme } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";

export default function AuditionsUI({ error, message, data }: AuditionProps) {
  const theme = useTheme();

  const columns: GridColDef[] = [
    {
      field: "startDate",
      headerName: "Datum početka",
      type: "date",
      valueFormatter: (value) => {
        return format(new Date(value), "dd. M. yyyy.");
      },
      flex: 1,
    },
    {
      field: "endDate",
      headerName: "Datum završetka",
      valueFormatter: (value) => {
        console.log(value);
        if (!value) return "";

        return format(new Date(value), "dd. M. yyyy.");
      },
      flex: 1,
    },
    {
      field: "auditionTime",
      headerName: "Vreme",
      flex: 1,
      valueFormatter: (value) => {
        if (!value) return "";
        return format(new Date(`1970-01-01T${value}`), "HH:mm");
      },
    },
    {
      field: "auditionType",
      headerName: "Tip audicije",
      flex: 1,
    },
    {
      field: "presentationType",
      headerName: "Tip prezentacije",
      flex: 1,
    },
    {
      field: "auditionStatus",
      headerName: "Status",
      flex: 1,
      renderCell: (params: GridRenderCellParams<any, String>) => {
        switch (params.value) {
          case "in-progress":
            return (
              <span style={{ color: theme.palette.primary.main }}>
                <b>Aktivna</b>
              </span>
            );
            break;
          case "draft":
            return (
              <span style={{ color: theme.palette.secondary.main }}>
                <b>Nacrt</b>
              </span>
            );
            break;
          case "finished":
            return (
              <span style={{ color: theme.palette.success.main }}>
                <b>Završena</b>
              </span>
            );
            break;
          default:
            return (
              <span style={{ color: theme.palette.error.main }}>
                <b>Unknown</b>
              </span>
            );
            break;
        }
      },
    },
  ];

  return (
    <div style={{ height: "auto", width: "90%", margin: "auto" }}>
      <Typography align="left" component="h1" variant="h5">
        Audicije
      </Typography>
      <Divider sx={{ marginBottom: "1rem" }}></Divider>
      <DataGrid columns={columns} rows={data.rows} />
    </div>
  );
}
