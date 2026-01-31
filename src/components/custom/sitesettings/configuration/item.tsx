export const ConfigurationItemLabel = ({ label }: { label: string }) => {
  return (
    <span className="font-medium text-sm w-24 text-nowrap text-start">
      {label}
    </span>
  );
};

export const ConfigurationItemDescription = ({
  description,
}: {
  description: string;
}) => {
  return <p className="text-xs text-muted-foreground">{description}</p>;
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
    <div className="flex flex-row gap-8 items-center border-b py-2 px-4 w-full">
      <div className="w-4">{children}</div>
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
    <div className="flex flex-col border rounded-md overflow-hidden w-full">
      {children}
    </div>
  );
};
