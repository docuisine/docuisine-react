import {
  MiniPage,
  MiniPageSection,
  MiniPageSectionContent,
} from "@/components/custom/profile/common";
import { RotateCwIcon, CloudUploadIcon, CirclePlayIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableRow,
} from "@/components/ui/table";
import { Field, FieldLabel, FieldContent } from "@/components/ui/field";
import { Switch } from "@/components/ui/switch";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

function RefreshBtn() {
  return (
    <Tooltip>
      <TooltipTrigger>
        <Button variant="ghost">
          <RotateCwIcon size={20} />
        </Button>
      </TooltipTrigger>
      <TooltipContent>Refresh backup list</TooltipContent>
    </Tooltip>
  );
}

function UploadBackupBtn() {
  return (
    <Tooltip>
      <TooltipTrigger>
        <Button variant="ghost">
          <CloudUploadIcon size={20} />
        </Button>
      </TooltipTrigger>
      <TooltipContent>Upload backup</TooltipContent>
    </Tooltip>
  );
}

function Header() {
  return (
    <div className="rounded-md flex items-center gap-2">
      <span className="text-sm">Backup and restore your Docuisine data</span>
      <RefreshBtn />
      <UploadBackupBtn />
    </div>
  );
}

function BackupItem() {
  return (
    <TableRow>
      <TableCell className="font-medium">INV001</TableCell>
      <TableCell>Paid</TableCell>
      <TableCell>Credit Card</TableCell>
      <TableCell className="text-right">$250.00</TableCell>
    </TableRow>
  );
}

function BackupsTable() {
  const items = [];
  return (
    <div className="rounded-md border">
      <Table>
        <TableCaption className="border-t p-1 mt-0">
          <Button
            variant="ghost"
            className="text-foreground font-semibold w-full"
          >
            <CirclePlayIcon size={20} /> Initialize new backup
          </Button>
        </TableCaption>
        <TableBody>
          {items.length === 0 ? (
            <TableRow>
              <TableCell
                colSpan={4}
                className="text-center py-4 text-muted-foreground"
              >
                No backups yet.
              </TableCell>
            </TableRow>
          ) : (
            items.map((item) => <BackupItem key={item.id} />)
          )}
        </TableBody>
      </Table>
    </div>
  );
}

function BackupsOption({
  label,
  children,
}: {
  label: string;
  children?: React.ReactNode;
}) {
  const [enabled, setEnabled] = useState(false);

  return (
    <Field>
      <div className="flex flex-row gap-4">
        <Switch checked={enabled} onCheckedChange={setEnabled} />
        <FieldLabel>{label}</FieldLabel>
      </div>
      <FieldContent
        className={`${enabled ? "block" : "hidden"} transition transition-transform`}
      >
        {children}
      </FieldContent>
    </Field>
  );
}

function S3Settings() {
  return (
    <div className="flex flex-col gap-4">
      <Field>
        <FieldLabel>Endpoint</FieldLabel>
        <FieldContent>
          <Input placeholder="Enter S3 endpoint" id="s3-endpoint" />
        </FieldContent>
      </Field>
      <div className="flex flex-col md:flex-row md:gap-4">
        <Field>
          <FieldLabel>Bucket Name</FieldLabel>
          <FieldContent>
            <Input placeholder="Enter S3 bucket name" id="s3-bucket-name" />
          </FieldContent>
        </Field>
        <Field>
          <FieldLabel>Region</FieldLabel>
          <FieldContent>
            <Input placeholder="Enter S3 region" id="s3-region" />
          </FieldContent>
        </Field>
      </div>
      <div className="flex flex-col md:flex-row md:gap-4">
        <Field>
          <FieldLabel>Access Key ID</FieldLabel>
          <FieldContent>
            <Input placeholder="Enter Access Key ID" id="access-key-id" />
          </FieldContent>
        </Field>
        <Field>
          <FieldLabel>Secret Access Key</FieldLabel>
          <FieldContent>
            <Input
              placeholder="Enter Secret Access Key"
              type="password"
              id="secret-access-key"
            />
          </FieldContent>
        </Field>
      </div>
    </div>
  );
}

function CronPresetsDropdown() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline">Presets</Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>
          Every <i>x</i> at 00:00
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem>Every hour</DropdownMenuItem>
          <DropdownMenuItem>Every day</DropdownMenuItem>
          <DropdownMenuItem>Every week</DropdownMenuItem>
          <DropdownMenuItem>Every month</DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

function AutomaticBackupsSettings() {
  function removeSpaces(str: string) {
    return str.replace(/\s+/g, "");
  }

  function spaceSeparate(str: string) {
    return str.split("").join(" ");
  }

  function allowNumbersAndAsterisksOnly(str: string) {
    return str.replace(/[^0-9*]/g, "");
  }

  const [cron, setCron] = useState("");
  function cronHandler(value: string) {
    setCron(spaceSeparate(allowNumbersAndAsterisksOnly(removeSpaces(value))));
  }
  return (
    <div className="flex flex-col md:flex-row md:gap-4 mb-4">
      <Field>
        <FieldLabel>Backup Frequency (Cron)</FieldLabel>
        <FieldContent className="flex flex-row">
          <CronPresetsDropdown />
          <Input
            placeholder="e.g., 0 0 * * *"
            id="backup-frequency"
            maxLength={9}
            pattern="^[0-9 *]+$"
            value={cron}
            onChange={(e) => cronHandler(e.target.value)}
          />
        </FieldContent>
      </Field>
      <Field>
        <FieldLabel>Max number of backups to keep</FieldLabel>
        <FieldContent>
          <Input type="number" defaultValue={3} id="max-number-of-backups" />
        </FieldContent>
      </Field>
    </div>
  );
}

export default function BackupsPage() {
  return (
    <MiniPage>
      <MiniPageSection title="Backups">
        <MiniPageSectionContent className="flex flex-col gap-4">
          <Header />
          <BackupsTable />
        </MiniPageSectionContent>
      </MiniPageSection>
      <MiniPageSection title="Options">
        <MiniPageSectionContent className="flex flex-col gap-4">
          <BackupsOption label="Enable automatic backups">
            <AutomaticBackupsSettings />
          </BackupsOption>
          <BackupsOption label="Store backups in S3 storage">
            <S3Settings />
          </BackupsOption>
          <Button className="self-end max-w-xs mt-2">Save changes</Button>
        </MiniPageSectionContent>
      </MiniPageSection>
    </MiniPage>
  );
}
