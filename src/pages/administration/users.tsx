import {
  MiniPage,
  MiniPageSection,
  MiniPageSectionContent,
} from "@/components/custom/profile/common";

export default function ManageUsersPage() {
  return (
    <MiniPage>
      <MiniPageSection title="User Management">
        <MiniPageSectionContent>
          <p>Here you can manage users of the application.</p>
        </MiniPageSectionContent>
      </MiniPageSection>
    </MiniPage>
  );
}
