import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import BookingCard from "./BookingCard";

const Booking = () => {
  const [service, setService] = useState({});
  const { BookingId } = useParams();
  useEffect(() => {
    fetch('https://raw.githubusercontent.com/Hafiz-Sakib/FakeData/main/FakeData.json')
      .then((res) => res.json())
      .then((data) => {
        const matchedProduct = data?.find((singleProduct) => singleProduct.id == BookingId);
        setService(matchedProduct);
        console.log(matchedProduct);
        
      });
  }, [BookingId]);

  return (
    <div className="mt-36 mb-36 text-center text-3xl">
      <p>{BookingId}</p>
      {/* <div className="md:grid grid-cols-3 mt-12">
        {services.map((service) => (
          <BookingCard key={service.id} service={service}></BookingCard>
        ))}
      </div> */}
      <h2>{service.name}</h2>
    </div>
  );
};

export default Booking;
