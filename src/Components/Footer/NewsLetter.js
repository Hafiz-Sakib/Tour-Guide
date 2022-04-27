import React from "react";
import mail from "../../assets/mail.png";

const NewsLetter = () => {
  return (
    <div className="text-center pb-9">
      <h1 className="text-2xl font-semibold md:w-1/2 md:mx-auto leading-normal">
        Subscribe to My Blogs For Weeekly Article Update.
      </h1>
      <p className="md:w-1/2 md:mx-auto pt-5 text-sm text-gray-600 leading-loose">
        I have hiking-related blog so I can share our thought and rutinity in
        our blog that updated Weekly. I will not spam you, I promise.
      </p>
      <div className="flex flex-wrap justify-center md:w-2/4 md:mx-auto my-6 gap-2 items-center">
        <div className="flex-1 flex rounded-full items-center gap-2 px-5 md:w-2/5 md:mx-auto justify-center border border-primary my-4">
          <img src={mail} alt="mail" className="h-5" />
          <input
            type="email"
            placeholder="Enter Your e-mail address"
            className="bg-transparent flex-1 outline-none text-sm py-3 placeholder-primary"
          />
        </div>
        <div>
          <button
            className="bg-primary text-white rounded-full shadow-sm
    shadow-primary font-semibold md:text-sm text-xs tracking-wide md:px-9 px-7 py-3"
          >
            Subscribe
          </button>
        </div>
      </div>
    </div>
  );
};

export default NewsLetter;
