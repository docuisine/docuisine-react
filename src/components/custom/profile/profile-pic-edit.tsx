import { PencilIcon } from "lucide-react";
import UserImageFileUpload from "./picture-upload";

const EditProfilePic = () => {
  return (
    <div className="relative">
      <div className="absolute left-0 bottom-8 block">
        <UserImageFileUpload>
          <div className="flex gap-2 items-center border px-3 text-sm font-medium py-1.5 rounded-sm cursor-pointer bg-background shadow-xs hover:bg-accent transition-colors transition-duration-400">
            <PencilIcon size="16" className="text-muted-foreground" />
            Edit
          </div>
        </UserImageFileUpload>
      </div>
    </div>
  );
};

export default EditProfilePic;
