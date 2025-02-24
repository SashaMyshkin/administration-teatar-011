import { mottoProps } from "@/db/schemas/mottos";
import { scriptProps } from "@/db/schemas/scripts";
import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import Grid from "@mui/material/Grid2";
import { useParams, useRouter } from "next/navigation";
import { ChangeEvent, FormEvent, useState } from "react";
import { useAlert } from "@components/AlertProvider";

export default function MottoTab({
  scripts,
  motto,
}: {
  scripts: scriptProps[];
  motto: mottoProps[];
}) {
  const [data, setData] = useState(motto);
  const params = useParams();
  const { showAlert } = useAlert();
  const router = useRouter();

  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.currentTarget;
    const memberId = Number(params.id);
    const scriptId = scripts.find((elem) => elem.script === name)?.id;

    if (!scriptId) return;

    setData((prev) =>
      prev.some((elem) => elem.scriptId === scriptId)
        ? prev.map((elem) =>
            elem.scriptId === scriptId ? { ...elem, motto: value } : elem
          )
        : [...prev, { id: 0, motto: value, memberId, scriptId }]
    );
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const scriptId = data.find((m) => m.scriptId)?.scriptId;
    const mottoEntry = data.find((m) => m.scriptId === scriptId);

    if (!mottoEntry) return;
    if (!scriptId) return;

    const payload = {
      id: mottoEntry.id,
      memberId: mottoEntry.memberId,
      scriptId: mottoEntry.scriptId,
      motto: mottoEntry.motto,
    };

    if (payload.id === 0) {
      // POST request for inserting new data
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API}/mottos`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        });

        const result = await response.json();
        const messageType = result.success ? "success" : "error";
        showAlert(result.message, messageType);

        setData((prev) => {
          const index = prev.findIndex((elem) => elem.scriptId === scriptId);
          return prev.map((elem, i) => {
            return index === i
              ? { ...elem, id: result.responseData[0].insertId }
              : elem;
          });
        });
      } catch (error) {
        showAlert("Desila se kritična greška.", "error");
      }
    } else {
      // PUT request for updating existing data
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API}/mottos/${payload.id}`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(payload),
          }
        );

        const result = await response.json();
        const messageType = result.success ? "success" : "error";
        showAlert(result.message, messageType);
      } catch (error) {
        showAlert("Desila se kritična greška.", "error");
      }
    }
  }
  return (
    <>
      <Box sx={{ flexGrow: 1 }}>
        {scripts.map((scriptElem) => (
          <Grid
            container
            spacing={2}
            component="form"
            key={scriptElem.script}
            sx={{ marginBottom: "1.5rem" }}
            onSubmit={handleSubmit}
          >
            <Grid size={8}>
              <TextField
                fullWidth
                name={scriptElem.script}
                label={`Moto ${scriptElem.script}`}
                variant="standard"
                size="small"
                value={
                  data.find((mottoElem) => mottoElem.scriptId === scriptElem.id)
                    ?.motto ?? ""
                }
                onChange={handleChange}
              />
            </Grid>
            <Grid size={2}>
              <FormControl variant="standard" fullWidth size="small">
                <InputLabel id="script-label">Jezik</InputLabel>
                <Select
                  labelId="script-label"
                  id="script"
                  name="script"
                  label="Jezik"
                  readOnly
                  value={scriptElem.id}
                >
                  {scripts &&
                    scripts.map(({ id, script }) => (
                      <MenuItem value={id} key={script}>
                        {script}
                      </MenuItem>
                    ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid size={2} sx={{ alignSelf: "end" }}>
              <Button variant="contained" size="small" type="submit">
                Sačuvaj
              </Button>
            </Grid>
          </Grid>
        ))}
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
      
      </Box>
    </>
  );
}
