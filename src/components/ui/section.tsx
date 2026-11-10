import { cn } from "@/lib/utils";

interface SectionProps extends React.HTMLAttributes<HTMLElement> {
  as?: "section" | "div" | "article";
  container?: boolean;
  bg?: "default" | "muted" | "primary" | "dark";
}

export function Section({
  children,
  className,
  as: Component = "section",
  container = true,
  bg = "default",
  ...props
}: SectionProps) {
  const bgClasses = {
    default: "bg-background",
    muted: "bg-muted/30",
    primary: "bg-primary text-primary-foreground",
    dark: "bg-slate-950 text-slate-50",
  };

  return (
    <Component
      className={cn("py-16 md:py-24", bgClasses[bg], className)}
      {...props}
    >
      {container ? (
        <div className="container mx-auto px-4 md:px-6">{children}</div>
      ) : (
        children
      )}
    </Component>
  );
}