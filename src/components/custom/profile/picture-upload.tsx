import { useRef, useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { ImageUpIcon, XIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuGroup,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogDescription,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import api from "@/lib/api";
import { useAuth } from "@/lib/useAuth";
import { Spinner } from "@/components/ui/spinner";

const MAX_SIZE_MB = 5;

export default function UserImageFileUpload({
  children,
}: {
  children: React.ReactNode;
}) {
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const [open, setOpen] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const { setUserSync, user } = useAuth();

  // Create / cleanup preview URL
  useEffect(() => {
    if (!file) return;
    const url = URL.createObjectURL(file);
    setPreview(url);
    return () => URL.revokeObjectURL(url);
  }, [file]);

  const handleFile = (file: File) => {
    if (!file.type.startsWith("image/")) {
      alert("Only image files are allowed");
      return;
    }

    if (file.size > MAX_SIZE_MB * 1024 * 1024) {
      alert("Image must be smaller than 5MB");
      return;
    }

    setFile(file);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    const droppedFile = e.dataTransfer.files?.[0];
    if (droppedFile) handleFile(droppedFile);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file) throw new Error("No file selected");

    try {
      setLoading(true);
      const formData = new FormData();
      formData.append("fileb", file);
      formData.append("user_id", String(user?.id));

      const updatedUser = await api.updateUserProfilePicture(formData);
      setUserSync(updatedUser);

      setOpen(false);
      setFile(null);
      setPreview(null);
    } catch (err) {
      console.error("Upload failed", err);
    } finally {
      setLoading(false);
    }
  };

  const dropzoneClass = cn(
    "relative flex flex-col items-center justify-center",
    "border-2 border-dashed rounded-md",
    "h-48 cursor-pointer transition text-center",
    "hover:bg-primary/8 hover:border-primary/20",
    isDragging
      ? "border-primary bg-primary/10"
      : "border-muted-foreground/40 bg-muted/40"
  );

  return (
    <>
      <DropdownMenu modal={false}>
        <DropdownMenuTrigger>{children}</DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuGroup>
            <DropdownMenuItem onSelect={() => setOpen(true)}>
              <ImageUpIcon />
              Upload new image
            </DropdownMenuItem>
            <DropdownMenuItem>
              <XIcon />
              Remove image
            </DropdownMenuItem>
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>

      <Dialog open={open} onOpenChange={setOpen}>
        <form onSubmit={handleSubmit} id="profile-pic-upload-form">
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Upload an image</DialogTitle>
              <DialogDescription>
                Choose a new profile picture (PNG, JPG, max 5MB).
              </DialogDescription>
            </DialogHeader>

            <div
              className={dropzoneClass}
              onClick={() => fileInputRef.current?.click()}
              onDragOver={(e) => {
                e.preventDefault();
                setIsDragging(true);
              }}
              onDragLeave={() => setIsDragging(false)}
              onDrop={handleDrop}
            >
              {preview ? (
                <img
                  src={preview}
                  alt="Preview"
                  className="max-h-full object-cover"
                />
              ) : (
                <>
                  <ImageUpIcon className="text-muted-foreground mb-2 w-10 h-10" />
                  <p className="text-sm text-muted-foreground">
                    Drag & drop an image, or click to select
                  </p>
                </>
              )}

              <Input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={(e) => {
                  const f = e.target.files?.[0];
                  if (f) handleFile(f);
                }}
              />
            </div>

            <DialogFooter>
              <DialogClose asChild>
                <Button type="button" variant="outline">
                  Cancel
                </Button>
              </DialogClose>
              <Button
                type="submit"
                form="profile-pic-upload-form"
                className="min-w-24 flex justify-center"
                disabled={!file || loading}
              >
                {loading ? (
                  <Spinner
                    className="mr-2"
                    role="status"
                    aria-label="Loading"
                  />
                ) : (
                  "Upload"
                )}
              </Button>
            </DialogFooter>
          </DialogContent>
        </form>
      </Dialog>
    </>
  );
}
