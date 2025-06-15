"use client";

import { biographyProps } from "@/db/schemas/";
import { scriptProps } from "@/db/schemas/scripts";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  InputLabel,
  List,
  ListItemButton,
  ListItemText,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import Grid from "@mui/material/Grid2";
import React, {
  FormEvent,
  MouseEventHandler,
  useEffect,
  useRef,
  useState,
} from "react";
import { DndContext, closestCenter, DragEndEvent } from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  verticalListSortingStrategy,
  useSortable,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { useParams, useRouter } from "next/navigation";
import { useAlert } from "@components/AlertProvider";

export default function BiographyTab({
  biography,
  scripts,
}: {
  biography: biographyProps[];
  scripts: scriptProps[];
}) {
  const router = useRouter();
  const isFirstRender = useRef(true);
  const { showAlert } = useAlert();
  const params = useParams();
  const [input, setInput] = useState({
    paragraph: "",
    scriptId: "1",
  });
  const [open, setOpen] = useState(false);
  const [dataToUpdate, setDataToUpdate] = useState({
    id: 0,
    paragraph: "",
    orderNumber: 0,
  });
  const [items, setItems] = useState(biography);

  // ✅ Run database updates after state has updated
  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return; // 🚨 Skip the first render
    }
    items.forEach((elem, index) => {
      updateOrderNumber(elem.id, index); // Now it will have the correct order
    });
  }, [items]); // Runs whenever `items` changes

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over) return;

    if (active.id !== over.id) {
      setItems((items) => {
        const oldIndex = items.findIndex((item) => item.id === active.id);
        const newIndex = items.findIndex((item) => item.id === over.id);
        return arrayMove(items, oldIndex, newIndex);
      });
    }
  };

  async function updateOrderNumber(id: number, orderNumber: number) {
    const biography: Partial<biographyProps> = {};
    biography.id = id;
    biography.orderNumber = orderNumber;

    const url = `${process.env.NEXT_PUBLIC_API}/biography/${biography.id}`;

    try {
      await fetch(url, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(biography),
      });
    } catch (err) {
      showAlert("Desila se greška u realizaciji zahteva.", "error");
    }
  }

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  async function handleInsert(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const biography: biographyProps = {
      id: 0,
      memberId: Number(params.id),
      paragraph: input.paragraph,
      scriptId: Number(input.scriptId),
      orderNumber: items.filter(
        (elem) => elem.scriptId === Number(input.scriptId)
      ).length,
    };

    const url = `${process.env.NEXT_PUBLIC_API}/biography/`;

    try {
      const result = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(biography),
      });

      const json = await result.json();

      if (json.success) {
        showAlert(json.message, "success");
        biography.id = json.responseData[0].insertId;
        setItems((prev) => [...prev, biography]);
        setInput({
          paragraph: "",
          scriptId: String(biography.scriptId),
        });
      } else {
        showAlert(json.message, "error");
      }
    } catch (err) {
      showAlert("Desila se greška u realizaciji zahteva.", "error");
    }
  }

  async function updateParagraph() {
    const biography: Partial<biographyProps> = {};
    biography.id = dataToUpdate.id;
    biography.paragraph = dataToUpdate.paragraph;
    if (biography.paragraph == undefined) return;
    if (biography.id == undefined) return;

    const url = `${process.env.NEXT_PUBLIC_API}/biography/${biography.id}`;

    try {
      const result = await fetch(url, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(biography),
      });

      const json = await result.json();

      if (json.success) {
        showAlert(json.message, "success");
        setItems((prev) => {
          return prev.map((elem) => {
            return elem.id === biography.id
              ? { ...elem, paragraph: biography.paragraph ?? "" }
              : elem;
          });
        });
        setDataToUpdate({
          id: 0,
          paragraph: "",
          orderNumber: 0,
        });
        handleClose();
      } else {
        showAlert(json.message, "error");
      }
    } catch (err) {
      showAlert("Desila se greška u realizaciji zahteva.", "error");
    }
  }

  async function deleteParagraph() {
    const biography: Partial<biographyProps> = {};
    biography.id = dataToUpdate.id;

    if (biography.id == undefined) return;

    const url = `${process.env.NEXT_PUBLIC_API}/biography/${biography.id}`;

    try {
      const result = await fetch(url, {
        method: "DELETE",
      });

      const json = await result.json();

      if (json.success) {
        showAlert(json.message, "success");
        setItems((prev) => {
          return prev.filter((elem) => {
            return elem.id !== biography.id;
          });
        });
        setDataToUpdate({
          id: 0,
          paragraph: "",
          orderNumber: 0,
        });
        handleClose();
      } else {
        showAlert(json.message, "error");
      }
    } catch (err) {
      showAlert("Desila se greška u realizaciji zahteva.", "error");
    }
  }

  return (
    <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
      <Grid
        container
        spacing={2}
        component="form"
        sx={{
          marginBottom: "1.5rem",
          position: "sticky",
          top: 64,
          zIndex: 1,
          backgroundColor: "background.paper",
          paddingBottom: "1rem",
          paddingLeft: "0.5rem",
          paddingRight: "0.5rem",
          paddingTop: "0.5rem",
          borderRadius: "10px",
          boxShadow: "0px 8px 20px rgba(0, 0, 0, 0.2)",
        }}
        onSubmit={handleInsert}
      >
        <Grid size={8}>
          <TextField
            fullWidth
            label="Novi paragraf"
            variant="standard"
            size="small"
            value={input.paragraph}
            onChange={(e) => {
              setInput({ ...input, paragraph: e.currentTarget.value });
            }}
            multiline={true}
            sx={{ opacity: 1 }}
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
              value={input.scriptId}
              onChange={(e) => {
                setInput({ ...input, scriptId: e.target.value });
              }}
            >
              {scripts.map(({ id, script }) => (
                <MenuItem value={id} key={script}>
                  {script}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
        <Grid size={1} sx={{ alignSelf: "end" }}>
          <Button variant="contained" size="small" type="submit">
            Dodaj
          </Button>
        </Grid>
        <Grid size={1} sx={{ alignSelf: "end" }}>
          <Button
            variant="contained"
            color="secondary"
            size="small"
            type="button"
            onClick={() => {
              router.push(`/members/`);
            }}
          >
            Nazad
          </Button>
        </Grid>

        
      </Grid>

      {scripts.map((script) => {
        const scriptItems = items.filter((elem) => elem.scriptId === script.id);
        return (
          <React.Fragment key={script.id}>
            <Box>
              <b>{script.script}</b>
            </Box>
            <Box
              sx={{
                width: "100%",
                bgcolor: "background.paper",
                marginBottom: "1rem",
                borderRadius: "10px",
              }}
            >
              <SortableContext
                items={scriptItems}
                strategy={verticalListSortingStrategy}
              >
                <List>
                  {scriptItems
                    .sort((a, b) => a.orderNumber - b.orderNumber)
                    .map((bio) => (
                      <DraggableListItem
                        key={bio.id}
                        id={bio.id}
                        bio={bio}
                        onClick={() => {
                          setDataToUpdate({
                            id: bio.id,
                            paragraph: bio.paragraph,
                            orderNumber: bio.orderNumber,
                          });
                          setOpen((prev) => !prev);
                        }}
                      />
                    ))}
                </List>
              </SortableContext>
            </Box>
          </React.Fragment>
        );
      })}

      <Dialog
        maxWidth="md"
        fullWidth
        open={open}
        onClose={handleClose}
        slotProps={{
          paper: {
            component: "form",
          },
        }}
      >
        <DialogTitle>Izmeni</DialogTitle>
        <DialogContent>
          <TextField
            required
            margin="normal"
            id="paragraph"
            name="paragraph"
            label="Paragraf"
            type="text"
            fullWidth
            multiline={true}
            variant="outlined"
            value={dataToUpdate.paragraph}
            onChange={(e) => {
              setDataToUpdate({
                ...dataToUpdate,
                paragraph: e.currentTarget.value,
              });
            }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Otkaži</Button>
          <Button type="button" color="error" onClick={deleteParagraph}>
            Obriši
          </Button>
          <Button type="button" color="success" onClick={updateParagraph}>
            Sačuvaj
          </Button>
        </DialogActions>
      </Dialog>
    </DndContext>
  );
}

function DraggableListItem({
  id,
  bio,
  onClick,
}: {
  id: number;
  bio: biographyProps;
  onClick: MouseEventHandler<HTMLDivElement>;
}) {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <ListItemButton
      ref={setNodeRef}
      style={style}
      {...attributes}
      onClick={onClick}
    >
      <ListItemText>{bio.paragraph}</ListItemText>
      <div {...listeners} style={{ cursor: "grab" }}>
        ☰
      </div>
    </ListItemButton>
  );
}
