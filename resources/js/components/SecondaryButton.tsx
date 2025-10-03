// import { Link } from "@inertiajs/react";

// type SecondaryButtonProps = {
//   type?: "button" | "submit" | "reset";
//   className?: string;
//   disabled?: boolean;
//   href?: string;
//   children: React.ReactNode;
//   [x: string]: any;
// };

// export default function SecondaryButton({
//   type = "button",
//   className = "",
//   disabled = false,
//   href,
//   children,
//   ...props
// }: SecondaryButtonProps) {
//   const baseClasses = `
//     inline-flex items-center px-4 py-2 bg-white border border-black rounded-full 
//     font-semibold text-xs text-black uppercase tracking-widest shadow-sm 
//     hover:bg-black hover:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 
//     focus:ring-offset-2 disabled:opacity-25 transition ease-in-out duration-150
//     ${disabled ? "opacity-25" : ""} 
//     ${className}
//   `;

//   if (href) {
//     // render Link als href bestaat
//     return (
//       <Link href={href} className={baseClasses} {...props}>
//         {children}
//       </Link>
//     );
//   }

//   // anders render normale button
//   return (
//     <button type={type} className={baseClasses} disabled={disabled} {...props}>
//       {children}
//     </button>
//   );
// }




import { Link } from "@inertiajs/react";
import React from "react";

type SecondaryButtonProps =
  | (React.ButtonHTMLAttributes<HTMLButtonElement> & {
      href?: undefined; // geen href bij echte button
    })
  | ({
      href: string; // verplicht als Link
    } & React.AnchorHTMLAttributes<HTMLAnchorElement>);

export default function SecondaryButton({
  type = "button",
  className = "",
  disabled = false,
  href,
  children,
  ...props
}: SecondaryButtonProps) {
  const baseClasses = `
    inline-flex items-center px-4 py-2 bg-white border border-black rounded-full 
    font-semibold text-xs text-black uppercase tracking-widest shadow-sm 
    hover:bg-black hover:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 
    focus:ring-offset-2 disabled:opacity-25 transition ease-in-out duration-150
    ${disabled ? "opacity-25" : ""} 
    ${className}
  `;

  if (href) {
    return (
      <Link href={href} className={baseClasses} {...props}>
        {children}
      </Link>
    );
  }

  return (
    <button type={type} className={baseClasses} disabled={disabled} {...props}>
      {children}
    </button>
  );
}
