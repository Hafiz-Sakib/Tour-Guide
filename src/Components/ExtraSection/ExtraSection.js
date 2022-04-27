import React from "react";
import { Link } from "react-router-dom";
import Button from "../NavBar/Button";

const ExtraSection = ({ content, alternative }) => {
  return (
    <section
      className={`flex ${
        alternative ? "md:flex-row-reverse" : "md:flex-row"
      } flex-col gap-6 py-12 md:px-28 px-4 items-center`}
    >
      <div className="flex-1">
        <img
          src={content.img}
          alt="img"
          className="md:h-[500px] h-full object-cover rounded-xl"
        />
      </div>
      <div className="flex-1">
        <h1 className="text-indigo-600 md:text-5xl font-semibold md:leading-snug text-3xl leading-normal">
          {content.title}
        </h1>
        <p className="text-sm text-gray-600 md:w-2/3 leading-relaxed py-5">
          {content.des}
        </p>
        <Link to={"/Services"}>
          <Button>My Services</Button>
        </Link>
      </div>
    </section>
  );
};

export default ExtraSection;
