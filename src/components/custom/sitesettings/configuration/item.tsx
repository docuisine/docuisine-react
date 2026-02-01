import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";

export const ConfigurationItemLabel = ({ label }: { label: string }) => {
  return (
    <span className="font-medium text-sm min-w-24 w-36 text-nowrap text-start py-2">
      {label}
    </span>
  );
};

export const ConfigurationItemDescription = ({
  description,
}: {
  description: string;
}) => {
  return (
    <ScrollArea className="text-xs text-muted-foreground text-start truncate">
      <p className="py-3 w-full">{description}</p>
      <ScrollBar orientation="horizontal" />
    </ScrollArea>
  );
};

export const ConfigurationItem = ({
  label,
  description,
  children,
}: {
  label: string;
  description: string;
  children?: React.ReactNode;
}) => {
  return (
    <div className="flex flex-row gap-8 items-center border-b last:border-b-0 px-4 w-full">
      <div className="w-4 py-2">{children}</div>
      <ConfigurationItemLabel label={label} />
      <ConfigurationItemDescription description={description} />
    </div>
  );
};

export const ConfigurationTable = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return (
    <div className="flex flex-col border rounded-md overflow-hidden max-w-[50vw] min-w-100 w-full table-fixed">
      {children}
    </div>
  );
};
