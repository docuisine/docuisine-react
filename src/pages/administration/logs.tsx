import {
  MiniPage,
  MiniPageSection,
  MiniPageSectionContent,
} from "@/components/custom/profile/common";
import {
  Combobox,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxInput,
  ComboboxItem,
  ComboboxList,
} from "@/components/ui/combobox";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuGroup,
} from "@/components/ui/dropdown-menu";
import { DownloadIcon, CopyIcon } from "lucide-react";
import appSettings from "@/lib/settings";
import api from "@/lib/api";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { destructiveSonnerStyle, successSonnerStyle } from "@/lib/constants";

const logLevels = ["Trace", "Debug", "Info", "Warning", "Error"];

function LogsLevelCombobox({
  className,
  onValueChange,
  defaultValue,
}: {
  className?: string;
  onValueChange: (value: string | null) => void;
  defaultValue: string;
}) {
  return (
    <Combobox
      items={logLevels}
      defaultValue={defaultValue}
      id="log-level"
      onValueChange={onValueChange}
    >
      <ComboboxInput placeholder="Select a log level" className={className} />
      <ComboboxContent>
        <ComboboxEmpty>No log level found.</ComboboxEmpty>
        <ComboboxList>
          {(item) => (
            <ComboboxItem key={item} value={item}>
              {item}
            </ComboboxItem>
          )}
        </ComboboxList>
      </ComboboxContent>
    </Combobox>
  );
}

function LogsLevelSelect({
  selectedLevel,
  setSelectedLevel,
}: {
  selectedLevel: string;
  setSelectedLevel: (level: string) => void;
}) {
  return (
    <div className="flex gap-4 items-center self-end">
      <Label htmlFor="log-level">Log Level</Label>
      <LogsLevelCombobox
        className="self-end"
        onValueChange={(value) => {
          if (value) {
            setSelectedLevel(value);
          }
        }}
        defaultValue={selectedLevel}
      />
    </div>
  );
}

function highlightLogLevels(text: string) {
  const levelStyles: Record<string, string> = {
    trace: "text-gray-400 font-medium",
    debug: "text-blue-400 font-medium",
    info: "text-green-500 font-semibold",
    warning: "text-yellow-500 font-semibold",
    error: "text-red-500 font-bold",
  };

  const regex = new RegExp(`\\b(${logLevels.join("|")})\\b`, "gi");

  return text.split(regex).map((part, index) => {
    const key = part.toLowerCase();

    if (levelStyles[key]) {
      return (
        <span key={index} className={levelStyles[key]}>
          {part}
        </span>
      );
    }

    return part;
  });
}

function LogsViewer({ logs }: { logs: string }) {
  return (
    <div className="bg-muted rounded p-4 h-96 max-h-96 overflow-y-auto text-start whitespace-pre-wrap font-mono text-sm">
      {highlightLogLevels(logs)}
    </div>
  );
}

function downloadLogsAsTXT(logs: string) {
  const blob = new Blob([logs], { type: "text/plain" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = `docuisine-${appSettings.APP_VERSION}-logs-${new Date().toISOString()}.txt`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

function copyToClipboard(logs: string) {
  navigator.clipboard
    .writeText(logs)
    .catch((err) => {
      toast.error("Failed to copy logs to clipboard", {
        position: "top-right",
        style: destructiveSonnerStyle,
      });
      console.error("Could not copy logs to clipboard: ", err);
    })
    .then(() => {
      toast.success("Logs copied to clipboard", {
        position: "top-right",
        style: successSonnerStyle,
      });
    });
}

function ExportDropdownMenu({
  children,
  logs,
}: {
  children: React.ReactNode;
  logs: string;
}) {
  return (
    <DropdownMenu modal={false}>
      <DropdownMenuTrigger>{children}</DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuGroup>
          <DropdownMenuItem onSelect={() => downloadLogsAsTXT(logs)}>
            <DownloadIcon className="mr-2" />
            Download (.txt)
          </DropdownMenuItem>
          <DropdownMenuItem onSelect={() => copyToClipboard(logs)}>
            <CopyIcon className="mr-2" />
            Copy to Clipboard
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

function ExportLogsButton({ logs }: { logs: string }) {
  return (
    <ExportDropdownMenu logs={logs}>
      <Button variant="outline">Export Logs</Button>
    </ExportDropdownMenu>
  );
}

export default function LogsPage() {
  const [logs, setLogs] = useState("");
  const [selectedLevel, setSelectedLevel] = useState("Info");

  useEffect(() => {
    api.getLogs(selectedLevel).then((logs) => setLogs(logs.join("\n")));
  }, [selectedLevel]);

  return (
    <MiniPage>
      <MiniPageSection title="Logs">
        <MiniPageSectionContent className="flex-col">
          <div className="flex justify-end gap-4 w-full">
            <LogsLevelSelect
              selectedLevel={selectedLevel}
              setSelectedLevel={setSelectedLevel}
            />
            <ExportLogsButton logs={logs} />
          </div>
          <LogsViewer logs={logs} />
        </MiniPageSectionContent>
      </MiniPageSection>
    </MiniPage>
  );
}
