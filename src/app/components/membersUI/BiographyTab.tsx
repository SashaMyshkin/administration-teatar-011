"use client";

import { biographyProps } from "@/db/schemas/biographies";
import { scriptProps } from "@/db/schemas/scripts";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Divider,
  FormControl,
  InputLabel,
  List,
  ListItemButton,
  ListItemText,
  MenuItem,
  Select,
  SelectChangeEvent,
  TextField,
} from "@mui/material";
import Grid from "@mui/material/Grid2";
import React, { FormEvent, MouseEventHandler, useState } from "react";
import { DndContext, closestCenter, DragEndEvent } from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  verticalListSortingStrategy,
  useSortable,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

export default function BiographyTab({
  biography,
  scripts,
}: {
  biography: biographyProps[];
  scripts: scriptProps[];
}) {
  const [input, setInput] = useState({
    paragraph: "",
    scriptId: "2",
  });
  const [open, setOpen] = useState(false);
  const [dataToUpdate, setDataToUpdate] = useState({
    id: 0,
    paragraph: "",
    memberId: 0,
    scriptId: 0,
    orderNumber: 0,
  });
  const [items, setItems] = useState(biography);

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

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  function handleSubmit(e: FormEvent<HTMLFormElement>) {}

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
        onSubmit={handleSubmit}
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
        <Grid size={2} sx={{ alignSelf: "end" }}>
          <Button variant="contained" size="small" type="submit">
            Dodaj
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
                  {scriptItems.map((bio) => (
                    <DraggableListItem
                      key={bio.id}
                      id={bio.id}
                      bio={bio}
                      onClick={() => {
                        console.log("I am being called")
                        setDataToUpdate({
                          id: bio.id,
                          paragraph: bio.paragraph,
                          memberId: bio.memberId,
                          scriptId: bio.scriptId,
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
            onSubmit: (event: React.FormEvent<HTMLFormElement>) => {
              event.preventDefault();
              const formData = new FormData(event.currentTarget);
              const formJson = Object.fromEntries((formData as any).entries());
              const email = formJson.email;
              console.log(email);
              handleClose();
            },
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
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Otkaži</Button>
          <Button type="submit">Sačuvaj</Button>
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
      <ListItemText >{bio.paragraph}</ListItemText>
      <div {...listeners} style={{ cursor: "grab" }}>☰</div>
    </ListItemButton>
  );
}
