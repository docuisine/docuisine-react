import {
  MiniPage,
  MiniPageSection,
  MiniPageSectionContent,
} from "@/components/custom/profile/common";

export default function ManageRecipesPage() {
  return (
    <MiniPage>
      <MiniPageSection title="Recipe Management">
        <MiniPageSectionContent>
          <p>Here you can manage recipes of the application.</p>
        </MiniPageSectionContent>
      </MiniPageSection>
    </MiniPage>
  );
}
