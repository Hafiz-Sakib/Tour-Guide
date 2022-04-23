import { useState } from "react";
import { HiMenu, HiX } from "react-icons/hi";
import { Link } from "react-router-dom";
import CustomLink from "../Utilities/CustomLink";
import Button from "./Button";

const NavBar = () => {
  const [open, setOpen] = useState(false);
  const Links = [
    { name: "Home", link: "/" },
    { name: "Services", link: "/Services" },
    { name: "Blogs", link: "/Blogs" },
    { name: "About", link: "/About" },
  ];
  return (
    <nav className="sticky top-0">
      <div className="shadow-md w-full fixed top-0 left-0">
        <div className="md:flex items-center justify-between bg-white py-4 md:px-10 px-7">
          <div
            className="font-bold text-2xl cursor-pointer flex items-center font-[Poppins] 
      text-gray-800"
          >
            <Link to={"/"}>
              <img
                className="h-14"
                src={
                  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTuUyUpPXN22vqd8YSB_qrgTPQlrpkCsRw_Kw&usqp=CAU"
                }
                alt=""
              />
            </Link>
          </div>
          <div
            onClick={() => setOpen(!open)}
            className="text-3xl absolute right-8 top-6 cursor-pointer md:hidden"
          >
            {open ? <HiX /> : <HiMenu />}
          </div>
          <ul
            className={`md:flex md:items-center md:pb-0 pb-12 absolute md:static bg-white md:z-auto z-[-1] left-0 w-full md:w-auto md:pl-0 pl-9 transition-all duration-700 ease-in ${
              open ? "top-20" : "top-[-490px]"
            }`}
          >
            {Links.map((link) => (
              <li
                key={link.name}
                className="md:ml-8 text-xl font-medium md:my-0 my-7"
              >
                <CustomLink to={link.link}>{link.name}</CustomLink>
              </li>
            ))}
            <Link to={"/Login"}>
              <button className="bg-blue-600 text-white font-[Poppins] py-2 px-6 rounded md:ml-4  duration-500">
                Login
              </button>
            </Link>
            <Link to={"/Registration"}>
              <Button>Register Now</Button>
            </Link>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
