import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";

export const ConfigurationItemLabel = ({ label }: { label: string }) => {
  return (
    <span className="px-4 flex items-center font-medium text-sm text-nowrap text-start border-b nth-last-2:border-0">
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
    <ScrollArea className="text-xs text-muted-foreground text-start truncate border-b nth-last-1:border-0">
      <p className="py-3">{description}</p>
      <ScrollBar orientation="horizontal" />
    </ScrollArea>
  );
};

export const ConfigurationIcon = ({ children }: { children: React.ReactNode }) => {
  return <div className="pl-4 items-center flex justify-center border-b nth-last-3:border-0">{children}</div>;
}

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
    <>
      <ConfigurationIcon>{children}</ConfigurationIcon>
      <ConfigurationItemLabel label={label} />
      <ConfigurationItemDescription description={description} />
    </>
  );
};

export const ConfigurationTable = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return (
    <div className="grid grid-cols-[3rem_auto_1fr] border rounded-md overflow-hidden max-w-[50vw] min-w-100 w-full">
      {children}
    </div>
  );
};
