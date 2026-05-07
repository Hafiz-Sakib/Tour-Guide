import React from "react";
import fb from "../../assets/f.png";
import tw from "../../assets/t.png";
import ig from "../../assets/i.png";
import linkedIn from "../../assets/linkedIn.png";
import git from "../../assets/git.png";

const SocialMedia = () => {
  return (
    <div className="flex flex-wrap gap-2 mt-5">
      <a
        href="https://www.facebook.com/Sakib1056"
        target="_blank"
        rel="noreferrer"
      >
        <img
          src={fb}
          className="h-8 cursor-pointer hover:scale-110 duration-300"
          alt="fb"
        />
      </a>
      <a
        href="https://twitter.com/Hafizsakib1"
        target="_blank"
        rel="noreferrer"
      >
        <img
          src={tw}
          className="h-8 cursor-pointer hover:scale-110 duration-300"
          alt="tw"
        />
      </a>

      <a
        href="https://www.instagram.com/s_a_k_i_b_1056/"
        target="_blank"
        rel="noreferrer"
      >
        <img
          src={ig}
          className="h-8 cursor-pointer hover:scale-110 duration-300"
          alt="ig"
        />
      </a>
      <a href="https://github.com/Hafiz-Sakib" target="_blank" rel="noreferrer">
        <img
          src={git}
          className="h-8 cursor-pointer hover:scale-110 duration-300"
          alt="github"
        />
      </a>
      <a href="https://github.com/Hafiz-Sakib" target="_blank" rel="noreferrer">
        <img
          src={linkedIn}
          className="h-8 cursor-pointer hover:scale-110 duration-300"
          alt="aedin"
        />
      </a>
    </div>
  );
};

export default SocialMedia;
