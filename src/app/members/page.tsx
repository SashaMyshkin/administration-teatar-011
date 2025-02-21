"use client"; // This directive ensures the component runs on the client side in Next.js

// Import necessary MUI components and utilities
import {
  Divider,
  Typography,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Box,
  useTheme,
  Theme,
} from "@mui/material";
import { DataGrid, GridColDef, GridRenderCellParams } from "@mui/x-data-grid";
import { format } from "date-fns"; // Date formatting utility
import { useEffect, useState } from "react";
import CheckCircleIcon from "@mui/icons-material/CheckCircle"; // Success icon
import ClearIcon from "@mui/icons-material/Clear"; // Error icon
import { useDebounce } from "use-debounce"; // Hook to optimize performance by delaying function execution

// Default pagination settings
const DEFAULT_PAGE = 0;
const DEFAULT_LIMIT = 5;

export default function Members() {
  // State for storing members data, pagination settings, and filters
  const [data, setData] = useState([]);
  const [paginationModel, setPaginationModel] = useState({
    page: DEFAULT_PAGE,
    pageSize: DEFAULT_LIMIT,
  });
  const [recordCount, setRecordCount] = useState(0); // Total number of records
  const [loading, setLoading] = useState(false); // Loading state for the DataGrid
  const [filters, setFilters] = useState({
    name: "",
    surname: "",
    membershipStatus: "",
    active: "1", // Default filter: show active members
  });

  // Debounce filters to prevent excessive API calls while typing
  const [filtersDebounced] = useDebounce(filters, 650);
  const [membershipStatus, setMembershipStatus] = useState([]); // Stores membership status options
  const theme = useTheme(); // Theme object for styling

  // Fetch membership status options on component mount
  useEffect(() => {
    async function fetchData() {
      try {
        const urlString = `${process.env.NEXT_PUBLIC_API}membershipStatus`;
        const url = new URL(urlString);
        const response = await fetch(url);
        const json = await response.json();
        const resultSet = json.resultSet;
        setMembershipStatus(resultSet);
      } catch (err) {
        console.log(err); // Log errors for debugging
      }
    }

    fetchData();
  }, []);

  // Fetch members list based on filters and pagination
  useEffect(() => {
    const controller = new AbortController(); // Controller to cancel requests when needed
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

        // Apply filters if provided
        if (filters.name) url.searchParams.set("name", filters.name);
        if (filters.surname) url.searchParams.set("surname", filters.surname);
        if (filters.membershipStatus)
          url.searchParams.set("membershipStatus", filters.membershipStatus);
        if (filters.active) url.searchParams.set("active", filters.active);

        const response = await fetch(url, { signal: controller.signal });

        if (!response.ok) throw new Error("Failed to fetch data");

        const json = await response.json();
        const resultSet = json.resultSet;
        const count = json.count;

        setData(resultSet);
        setRecordCount(count);
      } catch (err) {
        if (err instanceof Error && err.name !== "AbortError") console.log(err);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
    return () => controller.abort(); // Cleanup function to cancel pending requests
  }, [paginationModel, filtersDebounced]); // Runs when pagination or filters change

  return (
    <div style={{ height: "auto", width: "90%", margin: "auto" }}>
      <Typography align="left" component="h1" variant="h5">
        Članovi
      </Typography>
      <Divider sx={{ marginBottom: "1rem" }} />

      {/* Filter Inputs */}
      <div style={{ display: "flex", gap: "1rem", marginBottom: "1rem" }}>
        {/* Name Filter */}
        <Box style={{ flex: 1, minWidth: 0 }}>
          <TextField
            fullWidth
            label="Ime"
            variant="outlined"
            size="small"
            value={filters.name}
            onChange={(e) => setFilters({ ...filters, name: e.target.value })}
          />
        </Box>

        {/* Surname Filter */}
        <Box style={{ flex: 1, minWidth: 0 }}>
          <TextField
            fullWidth
            label="Prezime"
            variant="outlined"
            size="small"
            value={filters.surname}
            onChange={(e) =>
              setFilters({ ...filters, surname: e.target.value })
            }
          />
        </Box>

        {/* Membership Status Filter */}
        <Box style={{ flex: 1, minWidth: 0 }}>
          <FormControl fullWidth size="small">
            <InputLabel id="membershipStatus-label">Status članstva</InputLabel>
            <Select
              labelId="membershipStatus-label"
              id="membershipStatus"
              variant="outlined"
              value={filters.membershipStatus}
              label="Status članstva"
              onChange={(e) =>
                setFilters({ ...filters, membershipStatus: e.target.value })
              }
            >
              <MenuItem value="">Svi</MenuItem>
              {membershipStatus &&
                membershipStatus.map(({ id, status }) => (
                  <MenuItem value={id} key={status}>
                    {status}
                  </MenuItem>
                ))}
            </Select>
          </FormControl>
        </Box>

        {/* Active Status Filter */}
        <Box style={{ flex: 1, minWidth: 0 }}>
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

      {/* Data Grid */}
      <DataGrid
        rows={data}
        columns={getColumns(theme)}
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

// Function to define DataGrid columns
function getColumns(theme: Theme): GridColDef[] {
  return [
    {
      field: "name",
      headerName: "Ime",
      type: "string",
      flex: 1,
      align: "center",
      headerAlign: "center",
      sortable:false,
      filterable:false,
    },
    {
      field: "surname",
      headerName: "Prezime",
      type: "string",
      flex: 1,
      align: "center",
      headerAlign: "center",
      sortable:false,
      filterable:false,
    },
    {
      field: "email",
      headerName: "Imejl",
      type: "string",
      flex: 1,
      align: "center",
      headerAlign: "center",
      sortable:false,
      filterable:false,
    },
    {
      field: "dateOfBirth",
      headerName: "Datum rođenja",
      type: "string",
      flex: 1,
      valueFormatter: (value) =>
        value != null ? format(new Date(value), "dd. MM. yyyy.") : "",
      align: "center",
      headerAlign: "center",
      sortable:false,
      filterable:false,
    },
    {
      field: "active",
      headerName: "Aktivan",
      type: "string",
      flex: 1,
      renderCell: (params: GridRenderCellParams<any, Number>) =>
        params.value === 1 ? (
          <CheckCircleIcon sx={{ color: theme.palette.success.main }} />
        ) : (
          <ClearIcon sx={{ color: theme.palette.error.main }} />
        ),
      align: "center",
      headerAlign: "center",
      sortable:false,
      filterable:false,
    },
  ];
}
