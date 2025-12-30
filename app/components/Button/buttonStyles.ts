export const baseButtonStyles =
  "inline-flex items-center justify-center gap-2 rounded px-3 py-1 text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2";

export const buttonVariantStyles = {
  primary:
    "bg-blue-600 text-white border border-blue-600 hover:bg-blue-700 focus:ring-blue-500",

  secondary:
    "bg-transparent text-blue-600 border border-blue-600 hover:bg-blue-50 focus:ring-blue-500",

  tertiary:
    "bg-transparent text-gray-700 border border-transparent hover:bg-gray-100 focus:ring-gray-400",
} as const;
