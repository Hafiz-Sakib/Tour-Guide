import React, { useEffect, useState } from "react";
import "./Home.css";
import { Link } from "react-router-dom";
import { FaArrowRight } from "react-icons/fa";
import HeroImg from "../../assets/Hero.png";
import Icon1 from "../../assets/icon-1.png";
import Icon2 from "../../assets/icon-2.png";
import Icon3 from "../../assets/icon-3.png";
import ExtraSection from "../ExtraSection/ExtraSection";
import ServiceCard from "../Services/ServiceCard";
import img1 from "../../assets/img1_1.jpg";
import img2 from "../../assets/img2_1.jpg";
import img3 from "../../assets/img3_1.jpg";
import Review from "./Review";
const Home = () => {
  const [services, setServices] = useState([]);
  useEffect(() => {
    fetch("https://raw.githubusercontent.com/Hafiz-Sakib/FakeData/main/FakeData.json")
      .then((res) => res.json())
      .then((data) => setServices(data));
  }, []);
  const contents = [
    {
      title: "Safe, Affordable, And Trusted",
      des: "AffordableTours takes your health and well-being very seriously, which is why we partner with operators who have elevated and introduced health and safety protocols to ensure everyone on your trip is safe and remains healthy. We have all adapted to this new world, where it is important for us to take additional hygiene measures. In addition to the measures taken by our partners, we ask that you please take personal responsibility for your well-being as well.",
      img: img1,
    },
    {
      title: "Enjoy Your Journey With Me!",
      des: "You can change that. The secret of being happy is accepting where you are in life and making the most out of everyday. It doesn't matter how old we are, what we've done, or how much money we have. Our journey is a personal one-full of lessons and reasons to be happy. When we stop comparing ourselves to others and realize how full our lives are, we can appreciate our individual value.",

      img: img2,
    },
    {
      title: "Let’s Enjoy Nature With Me!",
      des: "I declare this world is so beautiful that I can hardly believe it exists.”  The beauty of nature can have a profound effect upon our senses, those gateways from the outer world to the inner, whether it results in disbelief in its very existence as Emerson notes, or feelings such as awe, wonder, or amazement.  But what is it about nature and the entities that make it up that cause us, oftentimes unwillingly, to feel or declare that they are beautiful?",
      img: img3,
    },
  ];
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
    <div>
      <div className="bg-Hero bg-cover bg-center py-4  md:px-24 px-4" id="home">
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
              <span className="text-indigo-600 text-bold">
                {" "}
                Bandarban,Khagrachari,Rangamati or Sitakundu
              </span>
              ? Don’t worry! I got it for you! Keeping one’s self going is a
              difficult thing to do. There are a million distractions that occur
              every day and that can mean that we do not stay on track with what
              we should be doing. Self-motivation is something that does not
              come easy to a lot of people and that means that there are some
              steps that need to be taken before you can become motivated to the
              fullest extent.
            </p>
            <br />
            <div className="flex md:gap-4 gap-2 flex-wrap">
              <Link to={"/About"}>
                <button
                  type="button"
                  className="mt-[-20px] inline-block px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out"
                >
                  About Me
                </button>
              </Link>
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
              <p className="text-gray-600 text-sm leading-relaxed">
                {info.des}
              </p>
              <button className="text-rose-600 font-medium text-sm my-1">
                Read More <FaArrowRight className="ml-6"></FaArrowRight>
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
      </div>
      <div className="mt-8">
        <h1 className="text-3xl text-center text-red-600">
          🌿 The Places Where I Can Guide You! 🌿
        </h1>
        <hr />
        <div className="md:grid grid-cols-3 mt-12">
          {services.slice(0, 3).map((service) => (
            <ServiceCard key={service.id} service={service}></ServiceCard>
          ))}
        </div>
        <div className="text-center md:mb-24">
          <Link to={"/Services"}>
            <button
              type="button"
              className="text-blue-700 hover:text-white border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:border-blue-500 dark:text-blue-500 dark:hover:text-white dark:hover:bg-blue-600 dark:focus:ring-blue-800"
            >
              See All Places
              <svg
                className="w-5 h-5 ml-8 -mr-1"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                  clipRule="evenodd"
                ></path>
              </svg>
            </button>
          </Link>
        </div>
        <div>
          <ExtraSection content={contents[0]}></ExtraSection>
          <ExtraSection content={contents[1]} alternative={true}></ExtraSection>
          <ExtraSection content={contents[2]}></ExtraSection>
        </div>
        <div>
          <Review></Review>
        </div>
      </div>
    </div>
  );
};

export default Home;
