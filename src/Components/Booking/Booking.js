import { useParams } from "react-router-dom";

const Booking = () => {
  const { BookingId } = useParams();

  return (
    <div className="mt-24 text-center text-3xl">
      <p>{BookingId}</p>
    </div>
  );
};

export default Booking;
