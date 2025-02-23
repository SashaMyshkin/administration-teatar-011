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
import { useParams } from "next/navigation";
import { ChangeEvent, useState } from "react";

export default function MottoTab({
  scripts,
  motto,
}: {
  scripts: scriptProps[];
  motto: mottoProps[];
}) {
  const [data, setData] = useState(motto);
  const params = useParams();

  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.currentTarget;
    const memberId = Number(params.id);
    const scriptId = scripts.find((elem) => elem.script === name)?.id;

    if (!scriptId) return;

    setData((prev) => {
      const index = prev.findIndex((elem) => elem.scriptId === scriptId);

      if (index === -1) {
        return [
          ...prev,
          {
            id: 0,
            motto: value,
            memberId: memberId,
            scriptId: Number(scriptId),
          },
        ];
      }

      return prev.map((elem, i) => {
        return i === index ? { ...elem, motto: value } : elem;
      });
    });
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
          >
            <Grid size={8}>
              <TextField
                fullWidth
                id={scriptElem.script}
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
              <Button variant="contained" size="small" type="button">
                Sačuvaj
              </Button>
            </Grid>
          </Grid>
        ))}
      </Box>
    </>
  );
}
