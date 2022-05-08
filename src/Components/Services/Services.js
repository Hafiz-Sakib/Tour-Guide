import React, { useEffect, useState } from "react";
import ServiceCard from "./ServiceCard";

const Services = () => {
  const [services, setServices] = useState([]);
  useEffect(() => {
    fetch("https://raw.githubusercontent.com/Hafiz-Sakib/FakeData/main/FakeData.json")
      .then((res) => res.json())
      .then((data) => setServices(data));
  }, []);
  return (
    <div>
      <div className="mt-36">
        <h1 className="text-blue-700 text-4xl text-center">
          🚵‍♀️ My Services 🚵
        </h1>
        <hr />
      </div>
      <div className="md:grid grid-cols-3 mt-12">
        {services.map((service) => (
          <ServiceCard key={service.id} service={service}></ServiceCard>
        ))}
      </div>
    </div>
  );
};
export default Services;
