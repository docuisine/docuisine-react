import { useRef, useState } from "react";
import { Input } from "@/components/ui/input";
import { FileBraces } from "lucide-react";
import React from "react";

export default function RecipeFileUpload() {
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [isDragging, setIsDragging] = useState(false);

  const handleFile = (file: File) => {
    if (!file.type.startsWith("image/")) return;
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);

    const file = e.dataTransfer.files?.[0];
    if (file) handleFile(file);
  };
  return (
    <>
      <div
        onClick={() => fileInputRef.current?.click()}
        onDragOver={(e) => {
          e.preventDefault();
          setIsDragging(true);
        }}
        onDragLeave={() => setIsDragging(false)}
        onDrop={handleDrop}
        className={`
          relative flex flex-col items-center justify-center
          border-2 border-dashed rounded-md
          h-48 cursor-pointer transition text-center
          ${isDragging ? "border-primary bg-primary/10" : "border-muted"}
        `}
      >
        <FileBraces className="w-10 h-10 mb-2 text-muted-foreground" />
        <p className="text-sm text-muted-foreground">
          Drag & drop a JSON file here, or click to upload
        </p>
        <Input
          ref={fileInputRef}
          type="file"
          accept="application/json"
          className="hidden"
          onChange={(e) => {
            const file = e.target.files?.[0];
            if (file) handleFile(file);
          }}
        />
      </div>
    </>
  );
}
