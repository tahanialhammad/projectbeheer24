import { Link } from "@inertiajs/react";

type PrimaryButtonProps = {
  className?: string;
  disabled?: boolean;   // ✅ optioneel gemaakt
  children: React.ReactNode;
  href?: string;
  [x: string]: any;
};

export default function PrimaryButton({
  className = "",
  disabled = false,     // ✅ default false
  children,
  href,
  ...props
}: PrimaryButtonProps) {
  const baseClasses =
    `inline-flex items-center justify-center px-4 py-2 bg-black border border-transparent rounded-full font-semibold text-xs text-white uppercase tracking-widest hover:bg-gray-700 focus:bg-gray-700 active:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-fuchsia-500 focus:ring-offset-2 transition ease-in-out duration-150 ${
      disabled ? "opacity-25" : ""
    } ` + className;

  if (href) {
    return (
      <Link href={href} className={baseClasses} {...props}>
        {children}
      </Link>
    );
  }

  return (
    <button {...props} className={baseClasses} disabled={disabled}>
      {children}
    </button>
  );
}
