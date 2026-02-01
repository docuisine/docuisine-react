import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";

export const StatusItemStatus = ({
  color,
}: {
  color: "green" | "red" | "yellow";
}) => {
  switch (color) {
    case "green":
      return (
        <div className="w-4 py-2 items-center flex justify-center">
          <div className="rounded-full w-2 h-2 bg-green-600 ring-card block size-2 ring-2"></div>
        </div>
      );
    case "yellow":
      return (
        <div className="w-4 py-2 items-center flex justify-center">
          <div className="rounded-full w-2 h-2 bg-yellow-600 ring-card block size-2 ring-2"></div>
        </div>
      );
  }

  return (
    <div className="w-4 py-2 items-center flex justify-center">
      <div className="rounded-full w-2 h-2 bg-red-600 ring-card block size-2 ring-2"></div>
    </div>
  );
};

export const StatusItemLabel = ({ label }: { label: string }) => {
  return (
    <span className="font-medium text-sm min-w-24 w-24 text-nowrap text-start py-2">
      {label}
    </span>
  );
};

export const StatusItemDescription = ({
  children
}: {
  children: React.ReactNode;
}) => {
  return (
    <ScrollArea className="text-xs text-muted-foreground text-start truncate">
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
    <div className="flex flex-row gap-8 items-center border-b last:border-b-0 px-4 w-full">
      <StatusItemStatus color={color} />
      <StatusItemLabel label={label} />
      <StatusItemDescription>
        {description}
      </StatusItemDescription>
    </div>
  );
};

export const StatusTable = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex flex-col border rounded-md overflow-hidden max-w-[50vw] min-w-100 w-full">
      {children}
    </div>
  );
};
