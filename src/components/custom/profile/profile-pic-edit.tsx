import { PencilIcon } from "lucide-react";
import UserImageFileUpload from "./picture-upload";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const EditProfilePic = () => {
  return (
    <div className="relative">
      <div className="absolute left-0 bottom-8 block">
        <UserImageFileUpload>
          <div
            className={cn(
              buttonVariants({
                variant: "outline",
                size: "sm",
              })
            )}
          >
            <PencilIcon size="16" className="text-muted-foreground" />
            Edit
          </div>
        </UserImageFileUpload>
      </div>
    </div>
  );
};

export default EditProfilePic;
