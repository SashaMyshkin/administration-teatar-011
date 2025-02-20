"use client";

import {
  Divider,
  Typography,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Box,
} from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { format } from "date-fns";
import { useEffect, useState } from "react";

const DEFAULT_PAGE = 0;
const DEFAULT_LIMIT = 5;

export default function Members() {
  const [data, setData] = useState([]);
  const [paginationModel, setPaginationModel] = useState({
    page: DEFAULT_PAGE,
    pageSize: DEFAULT_LIMIT,
  });
  const [recordCount, setRecordCount] = useState(0);
  const [loading, setLoading] = useState(false);
  const [filters, setFilters] = useState({
    name: "",
    surname: "",
    membershipStatus: "",
    active: "1",
  });

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);
        const urlString = `${process.env.NEXT_PUBLIC_API}members`;
        const url = new URL(urlString);
        url.searchParams.set("limit", String(paginationModel.pageSize));
        url.searchParams.set(
          "offset",
          String(paginationModel.page * paginationModel.pageSize)
        );

        // Append filters if set
        if (filters.name) url.searchParams.set("name", filters.name);
        if (filters.surname) url.searchParams.set("surname", filters.surname);
        if (filters.membershipStatus)
          url.searchParams.set("membershipStatus", filters.membershipStatus);
        if (filters.active) url.searchParams.set("active", filters.active);

        const response = await fetch(url);
        const json = await response.json();
        const resultSet = json.resultSet;
        const count = json.count;

        setData(resultSet);
        setRecordCount(count);
      } catch (err) {
        console.log(err);
        setData([]);
        setRecordCount(0);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, [paginationModel, filters]); // Re-fetch when pagination or filters change

  return (
    <div style={{ height: "auto", width: "90%", margin: "auto" }}>
      <Typography align="left" component="h1" variant="h5">
        Članovi
      </Typography>
      <Divider sx={{ marginBottom: "1rem" }}></Divider>

      {/* Filter Inputs */}
      <div style={{ display: "flex", gap: "1rem", marginBottom: "1rem" }}>
        <Box style={{ flexGrow: 1 }}>
          <TextField
            label="Ime"
            variant="outlined"
            size="small"
            value={filters.name}
            onChange={(e) => setFilters({ ...filters, name: e.target.value })}
          />
        </Box>

        <Box style={{ flexGrow: 1 }}>
          <TextField
            label="Prezime"
            variant="outlined"
            size="small"
            value={filters.surname}
            onChange={(e) =>
              setFilters({ ...filters, surname: e.target.value })
            }
          />
        </Box>

        <Box style={{ flexGrow: 1 }}>
          <TextField
            label="Status članstva"
            variant="outlined"
            size="small"
            value={filters.membershipStatus}
            onChange={(e) =>
              setFilters({ ...filters, membershipStatus: e.target.value })
            }
          />
        </Box>

        <Box style={{ flexGrow: 1 }}>
          <FormControl fullWidth size="small">
            <InputLabel id="active-label">Aktivan</InputLabel>
            <Select
              labelId="active-label"
              id="active-select"
              variant="outlined"
              value={filters.active}
              label="Aktivan"
              onChange={(e) =>
                setFilters({ ...filters, active: e.target.value })
              }
            >
              <MenuItem value="">Svi</MenuItem>
              <MenuItem value="1">Aktivni</MenuItem>
              <MenuItem value="0">Neaktivni</MenuItem>
            </Select>
          </FormControl>
        </Box>
      </div>

      <DataGrid
        rows={data}
        columns={getColumns()}
        rowCount={recordCount}
        loading={loading}
        pageSizeOptions={[5, 10, 25, 50]}
        paginationModel={paginationModel}
        paginationMode="server"
        sortingMode="server"
        filterMode="server"
        onPaginationModelChange={setPaginationModel}
      />
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
      filterable: false,
      sortable: false,
    },
    {
      field: "surname",
      headerName: "Prezime",
      type: "string",
      flex: 1,
      filterable: false,
      sortable: false,
    },
    {
      field: "email",
      headerName: "Imejl",
      type: "string",
      flex: 1,
      filterable: false,
      sortable: false,
    },
    {
      field: "dateOfBirth",
      headerName: "Datum rođenja",
      type: "string",
      flex: 1,
      filterable: false,
      sortable: false,
      valueFormatter: (value) => {
        return (value != null) ? format(new Date(value), "dd. MM. yyyy.") : "";
      },
    },
    {
      field: "dateOfJoining",
      headerName: "Datum upisa",
      type: "string",
      flex: 1,
      filterable: false,
      sortable: false,
      valueFormatter: (value) => {
        return (value != null) ? format(new Date(value), "dd. MM. yyyy."):"";
      },
    },
    {
      field: "membershipStatus",
      headerName: "Status članstva",
      type: "string",
      flex: 1,
      filterable: false,
      sortable: false,
    },
    {
      field: "active",
      headerName: "Aktivan",
      type: "string",
      flex: 1,
      filterable: false,
      sortable: false,
    },
  ];
}
