import { Link, useMatch, useResolvedPath } from "react-router-dom";

const CustomLink = ({ children, to, solid = true, ...props }) => {
  const resolved = useResolvedPath(to);
  const match = useMatch({ path: resolved.pathname, end: true });

  return (
    <Link
      to={to}
      className={`relative px-3 py-2 text-xs font-black uppercase tracking-[0.16em] transition ${
        match
          ? solid
            ? "text-[#0f766e]"
            : "text-[#f4c76b]"
          : solid
            ? "text-[#65758a] hover:text-[#132236]"
            : "text-white/70 hover:text-white"
      }`}
      {...props}
    >
      {children}
      <span className={`absolute inset-x-3 bottom-0 h-0.5 transition ${match ? "bg-current opacity-100" : "bg-current opacity-0"}`} />
    </Link>
  );
};

export default CustomLink;
