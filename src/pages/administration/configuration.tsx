import {
  MiniPage,
  MiniPageSection,
  MiniPageSectionContent,
} from "@/components/custom/profile/common";

export default function SiteSettingsPage() {
  return (
    <MiniPage>
      <MiniPageSection title="Configuration">
        <MiniPageSectionContent>
          <p>Here you can configure various settings for the application.</p>
        </MiniPageSectionContent>
      </MiniPageSection>
      <MiniPageSection title="About">
        <MiniPageSectionContent>
          <p>This application is built using React and TypeScript.</p>
        </MiniPageSectionContent>
      </MiniPageSection>
    </MiniPage>
  );
}
