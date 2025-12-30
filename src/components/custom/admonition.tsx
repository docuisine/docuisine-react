import {
  InfoIcon,
  XIcon,
  FlameIcon,
  TriangleAlertIcon,
  CheckIcon,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface AdmonitionProps {
  type: "info" | "tip" | "warning" | "destructive" | "success";
  title?: string;
  className?: string;
  children?: React.ReactNode;
}

const borderStyles = {
  info: "border-[rgb(var(--admonition-info-border))]",
  tip: "border-[rgb(var(--admonition-tip-border))]",
  warning: "border-[rgb(var(--admonition-warning-border))]",
  destructive: "border-[rgb(var(--admonition-destructive-border))]",
  success: "border-[rgb(var(--admonition-success-border))]",
};

const backgroundStyles = {
  info: "bg-[rgb(var(--admonition-info-bg))]",
  tip: "bg-[rgb(var(--admonition-tip-bg))]",
  warning: "bg-[rgb(var(--admonition-warning-bg))]",
  destructive: "bg-[rgb(var(--admonition-destructive-bg))]",
  success: "bg-[rgb(var(--admonition-success-bg))]",
};

const iconStyles = {
  info: "text-[rgb(var(--admonition-info-fg))]",
  tip: "text-[rgb(var(--admonition-tip-fg))]",
  warning: "text-[rgb(var(--admonition-warning-fg))]",
  destructive: "text-[rgb(var(--admonition-destructive-fg))]",
  success: "text-[rgb(var(--admonition-success-fg))]",
};

const iconSize = "1.2em";

const typeIcons = {
  info: <InfoIcon className={iconStyles.info} size={iconSize} />,
  tip: <FlameIcon className={iconStyles.tip} size={iconSize} />,
  warning: <TriangleAlertIcon className={iconStyles.warning} size={iconSize} />,
  destructive: <XIcon className={iconStyles.destructive} size={iconSize} />,
  success: <CheckIcon className={iconStyles.success} size={iconSize} />,
};

const defaultTitles = {
  info: "Info",
  tip: "Tip",
  warning: "Warning",
  destructive: "Error",
  success: "Success",
};

export default function Admonition({
  type,
  title,
  className,
  children,
}: AdmonitionProps) {
  const hasChildren = Boolean(children && String(children).trim().length > 0);
  return (
    <div
      className={cn(
        "border rounded-md overflow-hidden shadow-sm",
        borderStyles[type]
      )}
    >
      <div
        className={cn(
          "flex items-center px-4 py-2 gap-2 font-semibold text-md",
          backgroundStyles[type]
        )}
      >
        {typeIcons[type]}
        <span className="flex items-center justify-center text-sm">
          {title ?? defaultTitles[type]}
        </span>
      </div>
      {hasChildren && (
        <span className={cn("px-4 py-2 text-start flex text-sm", className)}>
          {children}
        </span>
      )}
    </div>
  );
}
