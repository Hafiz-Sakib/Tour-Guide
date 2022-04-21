import React from "react";
import HeroImg from "../../assets/Hero.png";
import Icon1 from "../../assets/icon-1.png";
import Icon2 from "../../assets/icon-2.png";
import Icon3 from "../../assets/icon-3.png";
const Home = () => {
  const Info = [
    {
      icon: Icon1,
      title: "Secret Locations",
      des: "I know Many Secret Places in this area.Where I can guide you very smoothly.I Hope You will Enjoy these Secret Places",
    },
    {
      icon: Icon2,
      title: "Safe Adventure",
      des: "I am offering for a 100% safe adventure in This Area.Beacuse I am here in this place for about 15 Years.I know This Place Very Much",
    },
    {
      icon: Icon3,
      title: "Professional Hikers",
      des: "If You are a Professional Hiker,then I am always ready for you.Your hiking experience with me will be very delightfull",
    },
  ];
  return (
    <section className="bg-Hero bg-cover bg-center py-4  md:px-24 px-4">
      <div className="flex md:flex-row flex-col gap-5 pt-20">
        <div className="flex-1 md:mt-24">
          <h1
            className="text-blue-600 md:text-5xl text-4xl font-semibold tracking-wide md:leading-tight
          leading-snug"
          >
            Be prepared for the mountains and beyond!
          </h1>
          <p className="text-gray-600 md:w-2/3 md:py-4 py-2 leading-relaxed text-justify">
            Are you looking for amazing hiking travel in{" "}
            <span className="text-indigo-600 text-bold"> Bandarban</span>? Don’t
            worry! I got it for you! Keeping one’s self going is a difficult
            thing to do. There are a million distractions that occur every day
            and that can mean that we do not stay on track with what we should
            be doing. Self-motivation is something that does not come easy to a
            lot of people and that means that there are some steps that need to
            be taken before you can become motivated to the fullest extent.
          </p>
          <br />
          <div className="flex md:gap-4 gap-2 flex-wrap">
            <button
              type="button"
              class="mt-[-20px] inline-block px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out"
            >
              Contact Me
            </button>
          </div>
        </div>
        <div className="flex-1  flex justify-center">
          <img src={HeroImg} alt="hero" className="h-2/3" />
        </div>
      </div>

      <div className="bg-white shadow-2xl flex md:flex-row flex-col md:-mt-48 gap-10 md:p-14 p-10 mt-5 rounded-md">
        {Info.map((info, i) => (
          <div key={i}>
            <img src={info.icon} alt="icon" className="h-16" />
            <h1 className="font-semibold text-lg my-3">{info.title}</h1>
            <p className="text-gray-600 text-sm leading-relaxed">{info.des}</p>
            <button className="text-rose-600 font-medium text-sm my-1">
              Read More
            </button>
          </div>
        ))}
      </div>
      <p className="py-10 md:text-sm text-xs block text-gray-600 text-center">
        Don’t hesitate to contact us to get better Information.
        <span className="text-rose-600 font-semibold italic px-1">
          EXPLORE ALL TREKKING.
        </span>
      </p>
    </section>
  );
};

export default Home;
