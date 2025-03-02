import React, { useState, useCallback, useRef } from "react";
import Cropper, { Area } from "react-easy-crop";
import { Button, Slider, Box, Typography, TextField } from "@mui/material";
import { getCroppedImg } from "@lib/image";
import Grid from "@mui/material/Grid2";

interface ImageUploaderProps {
  aspectRatio: number;
  destination: URL;
  src: string;
}

const ImageUploader: React.FC<ImageUploaderProps> = ({
  aspectRatio,
  destination,
  src,
}) => {
  const [file, setFile] = useState<File | null>(null); // State to hold the selected file
  const [loading, setLoading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const [crop, setCrop] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [zoom, setZoom] = useState<number>(1);
  const [croppedImage, setCroppedImage] = useState<File | null>(null);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<Area | null>(null);
  const [imageExtension, setImageExtension] = useState("");

  const onCropComplete = useCallback((_: Area, croppedAreaPixels: Area) => {
    setCroppedAreaPixels(croppedAreaPixels);
  }, []);

  const handleChooseFile = () => {
    if (fileInputRef.current) fileInputRef.current.click();
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    console.log(file);
    if (file) {
      const reader = new FileReader();
      reader.onload = () => setImageSrc(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  const handleCrop = async () => {
    if (!imageSrc || !croppedAreaPixels) return;
    const croppedImageBlob = await getCroppedImg(imageSrc, croppedAreaPixels);
    if (croppedImageBlob) {
      const croppedFile = new File([croppedImageBlob], "cropped-image.jpg", {
        type: "image/jpeg",
      });

      setFile(croppedFile);
      setCroppedImage(croppedFile);
      setZoom(1);

      if (fileInputRef.current) {
        const input = fileInputRef.current;

        const dataTransfer = new DataTransfer();
        dataTransfer.items.add(croppedFile);
        input.files = dataTransfer.files;

        // Trigger the onChange event (so React knows about the change)
        const changeEvent = new Event("change", { bubbles: true });
        input.dispatchEvent(changeEvent);
      }
    }
  };

  const handleUpload = async () => {
    if (!croppedImage) return;
    const formData = new FormData();
    formData.append("file", croppedImage);

    /*try {
      const response = await axios.post("/upload", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      console.log("Upload successful:", response.data);
    } catch (error) {
      console.error("Upload failed:", error);
    }*/
  };

  const downloadImage = async (
    url: string,
    filename: string
  ): Promise<void> => {
    try {
      setLoading(true);
      const response = await fetch(url, { mode: "cors" });

      if (!response.ok) {
        throw new Error(
          `Failed to fetch image: ${response.status} ${response.statusText}`
        );
      }

      const blob = await response.blob();
      const link = document.createElement("a");
      link.href = URL.createObjectURL(blob);
      link.download = filename;

      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      // Free up memory
      URL.revokeObjectURL(link.href);
    } catch (error) {
      console.error("Error downloading the image:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Grid container spacing={2}>
        <Grid size={4} order={2}>
          <Box>
            <Box
              sx={{
                display: "flex",
                gap: "1rem",
                marginBottom: "1rem",
                justifyContent: "center",
              }}
            >
              <input
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                style={{ display: "none" }}
                ref={fileInputRef}
              />
              <Button
                onClick={handleChooseFile}
                variant="contained"
                color="primary"
                size="small"
              >
                Odaberi fajl
              </Button>
              <Button
                onClick={handleCrop}
                variant="contained"
                color="primary"
                size="small"
                disabled={!imageSrc}
              >
                Crop
              </Button>
              <Button
                onClick={handleUpload}
                variant="contained"
                color="secondary"
                size="small"
                disabled={!imageSrc || !croppedImage}
              >
                Upload
              </Button>
            </Box>
            {imageSrc && (
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "1rem",
                  marginBottom: "1.5rem",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Box position="relative" width={400} height={400}>
                  <Cropper
                    image={imageSrc}
                    crop={crop}
                    zoom={zoom}
                    aspect={aspectRatio}
                    onCropChange={setCrop}
                    onZoomChange={setZoom}
                    onCropComplete={onCropComplete}
                  />
                </Box>
                <Box sx={{ width: 400 }}>
                  <Typography>Zoom</Typography>
                  <Slider
                    value={zoom}
                    min={1}
                    max={3}
                    step={0.1}
                    onChange={(_, value) => setZoom(value as number)}
                  />
                </Box>
              </Box>
            )}
          </Box>
        </Grid>
        <Grid size={4} order={3}>
          <Box
            sx={{
              display: "flex",
              gap: "1rem",
              marginBottom: "1rem",
              justifyContent: "center",
            }}
          >
            <Button
              variant="contained"
              color="primary"
              size="small"
              disabled={true}
            >
              Preuzmi sliku
            </Button>
          </Box>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: "1rem",
              marginBottom: "1.5rem",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Box sx={{ width: 400, height: 400 }}>
              <img
                src={src}
                style={{ width: "100%", height: "100%", objectFit: "contain" }}
              />
            </Box>
          </Box>
        </Grid>
        <Grid
          size={4}
          component="form"
          sx={{ display: "flex", flexDirection: "column", gap: "1rem" }}
          order={1}
        >
          <TextField
            fullWidth
            id="standard-basic"
            label="Alt cirilica"
            variant="standard"
          />
          <TextField
            fullWidth
            id="standard-basic"
            label="Alt latinica"
            variant="standard"
          />
          <TextField
            fullWidth
            id="standard-basic"
            label="Alt engleski"
            variant="standard"
          />
          <TextField
            fullWidth
            id="standard-basic"
            label="Širina"
            variant="standard"
          />
          <TextField
            fullWidth
            id="standard-basic"
            label="Visina"
            variant="standard"
          />
          <TextField
            fullWidth
            id="standard-basic"
            label="Proporcije"
            variant="standard"
          />
          <TextField
            fullWidth
            id="standard-basic"
            label="Putanja"
            variant="standard"
          />
          <Button type="button">Sačuvaj</Button>
        </Grid>
      </Grid>
    </>
  );
};

export default ImageUploader;
