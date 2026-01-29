import {
  MiniPage,
  MiniPageSection,
  MiniPageSectionContent,
} from "@/components/custom/profile/common";

export default function ManageCuisinesPage() {
  return (
    <MiniPage>
      <MiniPageSection title="Cuisine Management">
        <MiniPageSectionContent>
          <p>Here you can manage cuisines of the application.</p>
        </MiniPageSectionContent>
      </MiniPageSection>
    </MiniPage>
  );
}
