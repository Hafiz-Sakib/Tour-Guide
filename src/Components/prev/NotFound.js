import { Link } from "react-router-dom";
import { FiArrowLeft } from "react-icons/fi";

const NotFound = () => {
  return (
    <main className="pt-[72px] min-h-screen bg-forest flex items-center justify-center px-6">
      <div className="text-center">
        <p className="font-cormorant text-[9rem] font-bold text-cream/10 leading-none select-none">
          404
        </p>

        <h1 className="font-cormorant text-4xl md:text-5xl font-semibold text-cream -mt-8 mb-4">
          Trail not found
        </h1>

        <p className="text-cream/50 text-sm max-w-sm mx-auto mb-10">
          Looks like you've wandered off the path. Let's get you back to
          familiar territory.
        </p>

        <Link to="/" className="btn-primary">
          <FiArrowLeft />
          Back to Home
        </Link>
      </div>
    </main>
  );
};

export default NotFound;
