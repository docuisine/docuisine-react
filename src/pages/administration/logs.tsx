import {
  MiniPage,
  MiniPageSection,
  MiniPageSectionContent,
} from "@/components/custom/profile/common";

export default function LogsPage() {
  return (
    <MiniPage>
      <MiniPageSection title="Logs">
        <MiniPageSectionContent>
          <p>Here you can view logs of the application.</p>
        </MiniPageSectionContent>
      </MiniPageSection>
    </MiniPage>
  );
}
