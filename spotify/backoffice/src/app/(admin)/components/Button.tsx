import React from "react";

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement>;

export default function Button({
  children,
  className = "",
  ...rest
}: ButtonProps) {
  return (
    <button
      className={`
        px-3 py-2 rounded bg-gray-800 text-white
        hover:bg-gray-700 transition
        ${className}
      `}
      {...rest}
    >
      {children}
    </button>
  );
}

// import React from "react";

// export default function Button({ children }: { children: React.ReactNode }) {
//   return (
//     <div>
//       <button className="inline-flex cursor-pointer items-center transition delay-5 px-4 py-2 border border-transparent rounded-md shadow-sm text-gray-50 bg-gray-800 hover:bg-gray-100 hover:text-gray-950 hover:border-gray-950">
//         {children}
//       </button>
//     </div>
//   );
// }
