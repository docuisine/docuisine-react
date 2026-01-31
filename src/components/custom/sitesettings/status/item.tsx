export const StatusItemStatus = ({
  color,
}: {
  color: "green" | "red" | "yellow";
}) => {
  return (
    <div className="w-4 items-center flex justify-center">
      <div className={`rounded-full w-2 h-2 bg-${color}-600`}></div>
    </div>
  );
};

export const StatusItemLabel = ({ label }: { label: string }) => {
  return (
    <span className="font-medium text-sm w-24 text-nowrap text-start">
      {label}
    </span>
  );
};

export const StatusItemDescription = ({
  description,
}: {
  description: string;
}) => {
  return (
    <p className="text-xs text-muted-foreground">{description}</p>
  );
};

export const StatusItem = ({
  color,
  label,
  description,
}: {
  color: "green" | "red" | "yellow";
  label: string;
  description: string;
}) => {
  return (
    <div className="flex flex-row gap-8 items-center border-b py-2 px-4 w-full text-start">
      <StatusItemStatus color={color} />
      <StatusItemLabel label={label} />
      <StatusItemDescription description={description} />
    </div>
  );
};

export const StatusTable = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return (
    <div className="flex flex-col border rounded-md overflow-hidden w-full">
      {children}
    </div>
  );
};
