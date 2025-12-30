import { PencilIcon, UploadIcon, XIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

const EditProfilePic = () => {
  return (
    <div className="relative">
      <div className="absolute left-0 bottom-4 block">
        <Popover>
          <PopoverTrigger asChild>
            <Button variant="outline" size="icon" className="w-fit p-4">
              <PencilIcon />
              Edit
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-fit p-2">
            <div className="grid w-full grid-rows-2 gap-2">
              <Button variant="ghost" size="sm" className="justify-start">
                <UploadIcon /> Upload new image
              </Button>
              <Button variant="ghost" size="sm" className="justify-start">
                <XIcon />
                Remove image
              </Button>
            </div>
          </PopoverContent>
        </Popover>
      </div>
    </div>
  );
};

export default EditProfilePic;
