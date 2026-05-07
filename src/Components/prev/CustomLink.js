import { Link, useMatch, useResolvedPath } from "react-router-dom";

const CustomLink = ({ children, to, ...props }) => {
  const resolved = useResolvedPath(to);

  const match = useMatch({
    path: resolved.pathname,
    end: true,
  });

  return (
    <Link
      to={to}
      className={`nav-link transition-colors duration-200 ${
        match ? "nav-link-active text-gold" : "text-cream/70 hover:text-cream"
      }`}
      {...props}
    >
      {children}
    </Link>
  );
};

export default CustomLink;
