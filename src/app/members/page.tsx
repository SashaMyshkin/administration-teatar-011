"use client";

import { Divider, Typography } from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { useEffect, useState } from "react";

const DEFAULT_OFFSET = 0;
const DEFAULT_LIMIT = 25;

export default function Members() {
	const [data, setData] = useState([]);
	const [offset, setOffset] = useState(DEFAULT_OFFSET);
	const [limit, setLimit] = useState(DEFAULT_LIMIT);
	const [recordCount, setRecordCount] = useState(0);
	const [loading, setLoading] = useState(false);

	useEffect(()=>{
		async function fetchData(){
			try{
				setLoading(true);
				const urlString = `${process.env.NEXT_PUBLIC_API}members`;
				const url = new URL(urlString);
				const response = await fetch(url);
				const json = await response.json();
				const resultSet = json.resultSet;
				const count = json.count;

				console.log(json)

				setLoading(false);
				setData(resultSet);
				setRecordCount(count);
				
			}catch(err){
				console.log(err);
				setLoading(false);
				setData([]);
				setRecordCount(0);
			}
		}
		
		fetchData();
		
	}, [limit, offset]);

  return (
    <div style={{ height: "auto", width: "90%", margin: "auto" }}>
      <Typography align="left" component="h1" variant="h5">
        Članovi
      </Typography>
      <Divider sx={{ marginBottom: "1rem" }}></Divider>
      <DataGrid columns={getColumns()} rows={data} />
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
