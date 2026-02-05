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
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { getAllUsers } from "@/lib/api";
import { useEffect, useState } from "react";
import type { User } from "@/lib/types";
import { CheckIcon } from "lucide-react";
import { DeleteBtn } from "@/components/custom/buttons";
import { useAuth } from "@/lib/useAuth";
import { Spinner } from "@/components/ui/spinner";
import { toggleUserRole } from "@/lib/api";
import { Skeleton } from "@/components/ui/skeleton";
import { signup } from "@/lib/api";

function SkeletonRow() {
  return (
    <TableRow>
      {Array.from({ length: 6 }).map((_, index) => (
        <TableCell key={index}>
          <Skeleton className="h-4 flex-1 bg-muted my-2" />
        </TableCell>
      ))}
    </TableRow>
  );
}

function SkeletonTable() {
  return (
    <>
      {Array.from({ length: 5 }).map((_, index) => (
        <SkeletonRow key={index} />
      ))}
    </>
  );
}

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

function handleAddUser(event: React.FormEvent<HTMLFormElement>) {
  event.preventDefault();
  const form = event.currentTarget;

  if (form.email.value.trim() === "") {
    form.email.value = null;
  }

  const formData = new FormData(form);
  signup(formData)
    .then(() => {
      alert("User added successfully.");
      form.reset();
      window.location.reload();
    })
    .catch(() => {
      alert("Failed to add user.");
    });
}

function AdminToggle({ user, self }: { user: User; self: boolean }) {
  const [isAdmin, setIsAdmin] = useState(user.role === "admin");
  const [isLoading, setIsLoading] = useState(false);

  function handleToggle() {
    setIsLoading(true);
    toggleUserRole(user.id)
      .then(() => {
        setIsAdmin(!isAdmin);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  return (
    <Button variant="ghost" onClick={handleToggle} disabled={self}>
      {isLoading ? (
        <Spinner />
      ) : (
        <CheckIcon className={isAdmin ? "opacity-100" : "opacity-20"} />
      )}
    </Button>
  );
}

function sortById(users: User[]) {
  return users.sort((a, b) => {
    return a.id - b.id;
  });
}

function handleInviteUser() {
  try {
    const link = window.location.origin + "/signup?invite=true";
    navigator.clipboard.writeText(link);
    alert("Invitation link copied to clipboard.");
  } catch {
    alert("Failed to copy invitation link.");
  }
}

export default function ManageUsersPage() {
  const { user } = useAuth();
  const [users, setUsers] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getAllUsers().then((fetchedUsers) => {
      setUsers(sortById(fetchedUsers));
      setIsLoading(false);
    });
  }, []);
  return (
    <MiniPage>
      <MiniPageSection title="Add users">
        <MiniPageSectionContent className="justify-start">
          <Dialog>
            <DialogTrigger>
              <Button>Add user</Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add user</DialogTitle>
                <form onSubmit={handleAddUser}>
                  <Label className="mt-4 mb-2" htmlFor="username">
                    Username
                  </Label>
                  <Input
                    id="username"
                    name="username"
                    type="text"
                    placeholder="username"
                  />
                  <Label className="mt-4 mb-2" htmlFor="email">
                    User Email
                  </Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="user@example.com"
                  />
                  <Label className="mt-4 mb-2" htmlFor="password">
                    Password
                  </Label>
                  <Input
                    id="password"
                    name="password"
                    type="password"
                    placeholder="password"
                  />
                  <Button className="mt-6 w-full" type="submit">
                    Create User
                  </Button>
                </form>
              </DialogHeader>
            </DialogContent>
          </Dialog>
          <Button variant="ghost" onClick={handleInviteUser}>
            Invite User
          </Button>
        </MiniPageSectionContent>
      </MiniPageSection>
      <MiniPageSection title="Users">
        <MiniPageSectionContent className="border rounded-md overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="font-semibold pl-4">User ID</TableHead>
                <TableHead className="font-semibold">Username</TableHead>
                <TableHead className="font-semibold">Email</TableHead>
                <TableHead className="font-semibold">Admin</TableHead>
                <TableHead className="font-semibold pr-4">Created At</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {isLoading ? (
                <SkeletonTable />
              ) : (
                users.map((appUser) => (
                  <TableRow>
                    <TableCell className="text-left pl-4">
                      {appUser.id}
                    </TableCell>
                    <TableCell className="text-left">
                      {appUser.username}
                    </TableCell>
                    <TableCell className="text-left">{appUser.email}</TableCell>
                    <TableCell className="text-left">
                      <AdminToggle
                        user={appUser}
                        self={appUser.id === user!.id}
                      />
                    </TableCell>
                    <TableCell className="text-left">
                      {UTC08DateString(appUser.created_at)}
                    </TableCell>
                    <TableCell className="text-left pr-4">
                      {appUser.id != user!.id && (
                        <DeleteBtn handler={() => {}}></DeleteBtn>
                      )}
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </MiniPageSectionContent>
      </MiniPageSection>
    </MiniPage>
  );
}
