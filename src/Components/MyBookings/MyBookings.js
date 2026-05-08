// src/Components/MyBookings.js
import { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../Firebase.init";
import { FiCalendar, FiUsers, FiClock } from "react-icons/fi";
import toast from "react-hot-toast";
import { API_BASE_URL } from "../../config"; // ← Add this

const MyBookings = () => {
  const [user] = useAuthState(auth);
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) {
      setLoading(false);
      return;
    }

    const fetchBookings = async () => {
      try {
        const response = await fetch(
          `${API_BASE_URL}/api/bookings/user/${user.uid}`,
        );
        const data = await response.json();
        setBookings(data);
      } catch (error) {
        console.error(error);
        toast.error("Failed to load bookings");
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, [user]);

  if (!user) {
    return (
      <main className="min-h-screen bg-[#f5f0e8] pt-[76px] flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-3xl font-black mb-4">Please Login First</h2>
          <p className="text-[#5a6a7e]">
            You need to be logged in to view your bookings.
          </p>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#f5f0e8] pt-[76px] pb-20">
      <div className="max-w-5xl mx-auto px-6 lg:px-10">
        <div className="mb-10">
          <h1
            className="text-4xl md:text-5xl font-black text-[#0d1f35]"
            style={{ fontFamily: "var(--font-display)" }}
          >
            My Bookings
          </h1>
          <p className="text-[#5a6a7e] mt-2">
            All your travel requests at one place
          </p>
        </div>

        {loading ? (
          <div className="flex justify-center py-20">
            <div className="h-12 w-12 animate-spin rounded-full border-4 border-[#e7dfd0] border-t-[#0b6b62]" />
          </div>
        ) : bookings.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-3xl border border-[#e7dfd0]">
            <p className="text-6xl mb-6">🗺️</p>
            <h3 className="text-2xl font-bold mb-3">No bookings yet</h3>
            <p className="text-[#5a6a7e]">
              When you book a trip, it will appear here.
            </p>
          </div>
        ) : (
          <div className="grid gap-6">
            {bookings.map((booking) => (
              <div
                key={booking._id}
                className="bg-white border border-[#e7dfd0] rounded-3xl p-8 hover:shadow-xl transition-all"
              >
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                  <div>
                    <p className="text-[#c9a84c] text-sm font-bold uppercase tracking-widest mb-1">
                      {booking.status.toUpperCase()}
                    </p>
                    <h3 className="text-2xl font-black text-[#0d1f35]">
                      {booking.serviceName}
                    </h3>
                    <p className="text-[#5a6a7e] mt-1">
                      Booking ID:{" "}
                      <span className="font-mono text-sm">{booking._id}</span>
                    </p>
                  </div>

                  <div className="text-right">
                    <p className="text-3xl font-black text-[#e85d45]">
                      ${booking.totalAmount}
                    </p>
                    <p className="text-sm text-[#5a6a7e]">Total</p>
                  </div>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-8 border-t border-[#e7dfd0] pt-8">
                  <div className="flex items-center gap-3">
                    <FiCalendar className="text-[#0b6b62]" />
                    <div>
                      <p className="text-xs uppercase tracking-widest text-[#5a6a7e]">
                        Date
                      </p>
                      <p className="font-medium">
                        {new Date(booking.preferredDate).toLocaleDateString(
                          "en-GB",
                          {
                            day: "numeric",
                            month: "long",
                            year: "numeric",
                          },
                        )}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <FiUsers className="text-[#0b6b62]" />
                    <div>
                      <p className="text-xs uppercase tracking-widest text-[#5a6a7e]">
                        Travelers
                      </p>
                      <p className="font-medium">{booking.travelers}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <FiClock className="text-[#0b6b62]" />
                    <div>
                      <p className="text-xs uppercase tracking-widest text-[#5a6a7e]">
                        Status
                      </p>
                      <p className="font-medium capitalize">{booking.status}</p>
                    </div>
                  </div>

                  <div>
                    <p className="text-xs uppercase tracking-widest text-[#5a6a7e]">
                      Booked On
                    </p>
                    <p className="text-sm">
                      {new Date(booking.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
};

export default MyBookings;
