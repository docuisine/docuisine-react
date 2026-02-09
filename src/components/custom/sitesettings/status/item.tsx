import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";

export const StatusItemStatus = ({
  color,
}: {
  color: "green" | "red" | "yellow";
}) => {
  switch (color) {
    case "green":
      return (
        <div className="pl-4 items-center flex justify-center border-b nth-last-3:border-0">
          <div className="rounded-full w-2 h-2 bg-green-600 ring-card block size-2 ring-2"></div>
        </div>
      );
    case "yellow":
      return (
        <div className="pl-4 items-center flex justify-center border-b nth-last-3:border-0">
          <div className="rounded-full w-2 h-2 bg-yellow-600 ring-card block size-2 ring-2"></div>
        </div>
      );
  }

  return (
    <div className="pl-4 items-center flex justify-center border-b nth-last-3:border-0">
      <div className="rounded-full w-2 h-2 bg-red-600 ring-card block size-2 ring-2"></div>
    </div>
  );
};

export const StatusItemLabel = ({ label }: { label: string }) => {
  return (
    <div className="px-4 flex font-medium text-sm text-start items-center-safe border-b nth-last-2:border-0">
      {label}
    </div>
  );
};

export const StatusItemDescription = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return (
    <ScrollArea className="text-xs text-muted-foreground text-start truncate border-b last:border-0">
      <p className="py-3 w-full">{children}</p>
      <ScrollBar orientation="horizontal" />
    </ScrollArea>
  );
};

export const StatusItem = ({
  color,
  label,
  description,
}: {
  color: "green" | "red" | "yellow";
  label: string;
  description: React.ReactNode;
}) => {
  return (
    <>
      <StatusItemStatus color={color} />
      <StatusItemLabel label={label} />
      <StatusItemDescription>{description}</StatusItemDescription>
    </>
  );
};

export const StatusTable = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="grid grid-cols-[3rem_auto_1fr] border rounded-md overflow-hidden max-w-[50vw] min-w-100 w-full">
      {children}
    </div>
  );
};
