import {
  MiniPage,
  MiniPageSection,
  MiniPageSectionContent,
} from "@/components/custom/profile/common";

export default function BackupsPage() {
  return (
    <MiniPage>
      <MiniPageSection title="Backups">
        <MiniPageSectionContent>
          <p>Here you can manage backups of the application.</p>
        </MiniPageSectionContent>
      </MiniPageSection>
    </MiniPage>
  );
}
