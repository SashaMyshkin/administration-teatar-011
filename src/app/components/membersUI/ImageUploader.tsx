import React, { useState, useCallback } from "react";
import Cropper, { Area } from "react-easy-crop";
import { Button, Slider, Box, Typography } from "@mui/material";
import { getCroppedImg } from "@lib/image";

interface ImageUploaderProps {
  aspectRatio?: number;
}

const ImageUploader: React.FC<ImageUploaderProps> = ({
  aspectRatio = 5 / 7,
}) => {
  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const [crop, setCrop] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [zoom, setZoom] = useState<number>(1);
  const [croppedImage, setCroppedImage] = useState<File | null>(null);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<Area | null>(null);
  const [imageExtension, setImageExtension] = useState("");

  const onCropComplete = useCallback((_: Area, croppedAreaPixels: Area) => {
    setCroppedAreaPixels(croppedAreaPixels);
  }, []);

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
      setCroppedImage(
        new File([croppedImageBlob], "cropped-image.jpg", {
          type: "image/jpeg",
        })
      );
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

  return (
    <Box>
      <Box sx={{ display: "flex", gap: "1rem", marginBottom: "1rem" }}>
        <Button onClick={handleCrop} variant="contained" color="primary">
          Crop
        </Button>
        <Button onClick={handleUpload} variant="contained" color="secondary">
          Upload
        </Button>
      </Box>
      {imageSrc && (
        <Box sx={{ display: "flex", gap: "1rem", marginBottom: "1.5rem" }}>
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
          <Box sx={{ flexGrow: 1 }}>
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

      <Box sx={{ display: "flex" }}>
        <input
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          style={{ display: "block", marginBottom: "1rem" }}
        />
      </Box>
    </Box>
  );
};

export default ImageUploader;
