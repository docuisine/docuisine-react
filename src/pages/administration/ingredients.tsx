import {
  MiniPage,
  MiniPageSection,
  MiniPageSectionContent,
} from "@/components/custom/profile/common";

export default function ManageIngredientsPage() {
  return (
    <MiniPage>
      <MiniPageSection title="Ingredient Management">
        <MiniPageSectionContent>
          <p>Here you can manage ingredients of the application.</p>
        </MiniPageSectionContent>
      </MiniPageSection>
    </MiniPage>
  );
}
