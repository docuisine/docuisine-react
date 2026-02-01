import {
  MiniPage,
  MiniPageSection,
  MiniPageSectionContent,
} from "@/components/custom/profile/common";
import {
  Table,
  TableHeader,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { getAllUsers } from "@/lib/api";
import { useEffect, useState } from "react";
import type { User } from "@/lib/types";
import { CheckIcon } from "lucide-react";
import { DeleteBtn } from "@/components/custom/buttons";
import { useAuth } from "@/lib/useAuth";

function UTC08DateString(dateString: string) {
  const date = new Date(dateString);
  const utc8Date = new Date(
    date.getTime() + 8 * 60 * 60 * 1000,
  ); /* UTC+8 adjustment */
  return utc8Date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

export default function ManageUsersPage() {
  const { user } = useAuth();
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    getAllUsers().then(setUsers);
  }, []);
  return (
    <MiniPage>
      <MiniPageSection title="Add users">
        <MiniPageSectionContent className="justify-start">
          <Button>Add User</Button>
          <Button variant="ghost">Invite User</Button>
        </MiniPageSectionContent>
      </MiniPageSection>
      <MiniPageSection title="Users">
        <MiniPageSectionContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="font-semibold">User ID</TableHead>
                <TableHead className="font-semibold">Username</TableHead>
                <TableHead className="font-semibold">Email</TableHead>
                <TableHead className="font-semibold">Admin</TableHead>
                <TableHead className="font-semibold">Created At</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {users.map((appUser) => (
                <TableRow>
                  <TableCell className="text-left">{appUser.id}</TableCell>
                  <TableCell className="text-left">
                    {appUser.username}
                  </TableCell>
                  <TableCell className="text-left">{appUser.email}</TableCell>
                  <TableCell className="text-left">
                    {appUser.role === "admin" ? <CheckIcon /> : ""}
                  </TableCell>
                  <TableCell className="text-left">
                    {UTC08DateString(appUser.created_at)}
                  </TableCell>
                  <TableCell className="text-left">
                    {appUser.id != user!.id && (
                      <DeleteBtn handler={() => {}}></DeleteBtn>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </MiniPageSectionContent>
      </MiniPageSection>
    </MiniPage>
  );
}
