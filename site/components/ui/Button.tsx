import { ButtonHTMLAttributes, forwardRef, ReactNode } from "react";
import { cn } from "@/lib/utils";

type Variant = "primary" | "secondary";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  children: ReactNode;
}

const base =
  "inline-flex items-center justify-center font-sans text-[14px] font-semibold uppercase tracking-[0.16em] rounded-button px-7 py-3.5 transition-all duration-200 ease-out select-none";

const variants: Record<Variant, string> = {
  primary:
    "bg-on-tertiary-container text-on-surface crimson-glow hover:crimson-glow-strong hover:brightness-110",
  secondary:
    "bg-transparent text-on-surface border border-primary/70 hover:border-primary hover:border-2 hover:py-[13px] hover:px-[27px]",
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = "primary", className, children, ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(base, variants[variant], className)}
        {...props}
      >
        {children}
      </button>
    );
  }
);

Button.displayName = "Button";
