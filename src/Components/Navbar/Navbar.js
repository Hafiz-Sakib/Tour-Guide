import React, { useState } from "react";
import { HiMenu, HiX } from "react-icons/hi";
import CustomLink from "../Utilities/CustomLink";

const NavBar = () => {
  let Links = [
    { name: "Home", link: "/" },
    { name: "Services", link: "/Services" },
    { name: "Blogs", link: "/Blogs" },
    { name: "About", link: "/About" },
  ];
  let [open, setOpen] = useState(false);
  return (
    <div className="shadow-md w-full fixed top-0 left-0">
      <div className="md:flex items-center justify-between bg-white py-4 md:px-10 px-7">
        <div
          className="font-bold text-2xl cursor-pointer flex items-center font-[Poppins] 
      text-gray-800"
        >
          {/* <span className="text-3xl text-indigo-600 mr-1 pt-2 mb-3">
            <HiLibrary></HiLibrary>
          </span>
          Designer */}
          <img
            className="h-14"
            src={
              "https://www.armourycoachingstudio.co.uk/uploads/1/2/9/5/129586512/armoury-7.jpg"
            }
            alt=""
          />
        </div>

        <div
          onClick={() => setOpen(!open)}
          className="text-3xl absolute right-8 top-6 cursor-pointer md:hidden"
        >
          {open ? <HiX /> : <HiMenu />}
        </div>

        <ul
          className={`md:flex md:items-center md:pb-0 pb-12 absolute md:static bg-white md:z-auto z-[-1] left-0 w-full md:w-auto md:pl-0 pl-9 transition-all duration-700 ease-in${
            open ? "top-20 " : "top-[-490px]"
          }`}
        >
          {Links.map((link) => (
            <li
              key={link.name}
              className="md:ml-8 text-xl font-semibold md:my-0 my-7"
            >
              <CustomLink to={link.link}>{link.name}</CustomLink>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default NavBar;
