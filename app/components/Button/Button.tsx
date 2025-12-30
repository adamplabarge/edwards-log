import {
  ButtonHTMLAttributes,
  ReactElement,
  ReactNode,
  isValidElement,
  cloneElement,
} from "react";
import { ArrowPathIcon } from "@heroicons/react/24/outline";
import clsx from "clsx";
import {
  baseButtonStyles,
  buttonVariantStyles,
} from "./buttonStyles";

type ButtonVariant = "primary" | "secondary" | "tertiary";

interface ButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  loading?: boolean;
  asChild?: boolean;
  children: ReactNode;
}

export function Button({
  variant = "primary",
  loading = false,
  disabled,
  asChild = false,
  children,
  className,
  ...props
}: ButtonProps) {
  const isDisabled = disabled || loading;

  const mergedClassName = clsx(
    baseButtonStyles,
    buttonVariantStyles[variant],
    isDisabled && "cursor-not-allowed",
    className
  );

  if (asChild) {
    if (!isValidElement(children)) {
      throw new Error(
        "Button with `asChild` expects a single React element as its child."
      );
    }

    return cloneElement(children as ReactElement<any>, {
      className: clsx((children as ReactElement<any>).props.className, mergedClassName),
      ...props,
    });
  }

  return (
    <button
      disabled={isDisabled}
      className={mergedClassName}
      {...props}
    >
      {loading && (
        <ArrowPathIcon className="h-4 w-4 animate-spin" />
      )}
      {loading ? "Saving…" : children}
    </button>
  );
}
