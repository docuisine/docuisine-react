import {
  MiniPage,
  MiniPageSection,
  MiniPageSectionContent,
} from "@/components/custom/profile/common";

export default function CleanPage() {
  return (
    <MiniPage>
      <MiniPageSection title="Clean Application">
        <MiniPageSectionContent>
          <p>Here you can clean the application data.</p>
        </MiniPageSectionContent>
      </MiniPageSection>
    </MiniPage>
  );
}
