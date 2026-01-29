import {
  MiniPage,
  MiniPageSection,
  MiniPageSectionContent,
} from "@/components/custom/profile/common";

export default function ManageCookbooksPage() {
  return (
    <MiniPage>
      <MiniPageSection title="Cookbook Management">
        <MiniPageSectionContent>
          <p>Here you can manage cookbooks of the application.</p>
        </MiniPageSectionContent>
      </MiniPageSection>
    </MiniPage>
  );
}
