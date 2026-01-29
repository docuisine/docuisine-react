import {
  MiniPage,
  MiniPageSection,
  MiniPageSectionContent,
} from "@/components/custom/profile/common";
import { InfoIcon, SettingsIcon } from "lucide-react";

export default function SiteSettingsPage() {
  return (
    <MiniPage>
      <MiniPageSection title="Configuration" icon={<SettingsIcon />}>
        <MiniPageSectionContent>
          <p>Here you can configure various settings for the application.</p>
        </MiniPageSectionContent>
      </MiniPageSection>
      <MiniPageSection title="About" icon={<InfoIcon />}>
        <MiniPageSectionContent>
          <p>This application is built using React and TypeScript.</p>
        </MiniPageSectionContent>
      </MiniPageSection>
    </MiniPage>
  );
}
