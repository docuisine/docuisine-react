import { useRef, useState } from "react";
import { Input } from "@/components/ui/input";
import { ImageUpIcon, TrashIcon } from "lucide-react";
import React from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export const DeleteImage = ({ handler }: { handler: () => void }) => {
  const classname = cn(
    "bg-background",
    "hover:bg-[rgb(var(--admonition-destructive-bg))]",
    "border-[rgb(var(--admonition-destructive-border))]",
    "text-[rgb(var(--admonition-destructive-fg))]",
    "hover:text-[rgb(var(--admonition-destructive-fg))]"
  );
  return (
    <Button variant="destructive" className={classname} onClick={handler}>
      <TrashIcon />
      Delete image
    </Button>
  );
};

export default function RecipeImageUpload() {
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [preview, setPreview] = useState<string | null>(null);

  const handleFile = (file: File) => {
    if (!file.type.startsWith("image/")) return;

    const url = URL.createObjectURL(file);
    setPreview(url);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);

    const file = e.dataTransfer.files?.[0];
    if (file) handleFile(file);
  };

  const handleDeleteImage = () => {
    setPreview(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };
  const classname = cn(
    "relative flex flex-col items-center justify-center",
    "border-2 border-dashed rounded-md",
    "h-full cursor-pointer transition text-center p-4",
    "hover:bg-primary/8 hover:border-primary/20",
    isDragging
      ? "bg-primary/8 border-primary/20"
      : "bg-muted/40 border-muted-foreground/40"
  );
  return (
    <div className="h-full">
      {!preview && (
        <div
          onClick={() => fileInputRef.current?.click()}
          onDragOver={(e) => {
            e.preventDefault();
            setIsDragging(true);
          }}
          onDragLeave={() => setIsDragging(false)}
          onDrop={handleDrop}
          className={classname}
        >
          <ImageUpIcon className="w-10 h-10 mb-2 text-muted-foreground" />
          <p className="text-sm text-muted-foreground mx-2">
            Drag & drop an image here, or click to upload
          </p>
          <Input
            ref={fileInputRef}
            id="recipe-image-upload"
            type="file"
            accept="image/*"
            className="hidden"
            name="recipeImage"
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (file) handleFile(file);
            }}
          />
        </div>
      )}
      {preview && (
        <div className="flex flex-col gap-2">
          <img
            src={preview}
            alt="Preview"
            className="rounded-md object-cover"
            onDragOver={(e) => {
              e.preventDefault();
              setIsDragging(true);
            }}
            onDragLeave={() => setIsDragging(false)}
            onDrop={handleDrop}
          />
          <DeleteImage handler={handleDeleteImage} />
        </div>
      )}
    </div>
  );
}
