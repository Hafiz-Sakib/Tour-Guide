// src/Components/Booking/Booking.js
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import toast from "react-hot-toast";

import {
  FiArrowLeft,
  FiCheck,
  FiClock,
  FiShield,
  FiStar,
} from "react-icons/fi";
import Modal from "./Modal";
import { auth } from "../../Firebase.init";
import { API_BASE_URL } from "../../config";

const inclusions = [
  "Dedicated trip coordinator",
  "Vetted local guide & driver",
  "Flexible travel date request",
  "Detailed itinerary planning",
  "Safety briefing & support",
  "24/7 on-trip assistance",
];

const Booking = () => {
  const { bookingId } = useParams();
  const [service, setService] = useState(null);
  const [loading, setLoading] = useState(true);
  const [existingBooking, setExistingBooking] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const [travelers, setTravelers] = useState(1);
  const [date, setDate] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [address, setAddress] = useState("");
  const [formError, setFormError] = useState("");
  const [imgLoaded, setImgLoaded] = useState(false);

  const [user] = useAuthState(auth);

  // Fetch service and check for existing booking
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        // 1. Fetch Service
        const serviceRes = await fetch(`${API_BASE_URL}/api/services`);
        const serviceData = await serviceRes.json();
        const servicesList = Array.isArray(serviceData)
          ? serviceData
          : serviceData.data || [];

        const foundService = servicesList.find(
          (item) => String(item._id) === String(bookingId),
        );

        if (foundService) {
          setService({
            ...foundService,
            id: foundService._id,
          });
        }

        // 2. Check if user already requested this service
        if (user && foundService) {
          const bookingRes = await fetch(
            `${API_BASE_URL}/api/bookings/user/${user.uid}`,
          );
          if (bookingRes.ok) {
            const userBookings = await bookingRes.json();
            const alreadyBooked = userBookings.find(
              (b) =>
                String(b.serviceId) === String(bookingId) ||
                String(b.serviceName).toLowerCase() ===
                  String(foundService.name).toLowerCase(),
            );
            if (alreadyBooked) {
              setExistingBooking(alreadyBooked);
            }
          }
        }
      } catch (error) {
        console.error("Failed to fetch data:", error);
        toast.error("Failed to load package details");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [bookingId, user]);

  const confirmBooking = async () => {
    if (existingBooking) {
      toast.error("You have already requested this tour.");
      return;
    }

    if (!date || !phoneNumber || !address) {
      setFormError("Please fill all required fields (Date, Phone, Address)");
      return;
    }

    const phoneRegex = /^(013|014|015|016|017|018|019)\d{8}$/;
    if (!phoneRegex.test(phoneNumber)) {
      toast.error("Enter a valid Bangladeshi phone number (e.g. 017XXXXXXXX)");
      return;
    }

    const addressWordCount = address.trim().split(/\s+/).filter(Boolean).length;
    if (addressWordCount > 30) {
      toast.error("Address must not exceed 30 words");
      return;
    }

    if (!user) {
      toast.error("Please login to make a booking");
      return;
    }

    const price =
      parseFloat(String(service.balance).replace(/[^0-9.]/g, "")) || 0;
    const totalAmount = Number((price * travelers).toFixed(0));

    const bookingData = {
      userId: user.uid,
      userEmail: user.email,
      userName: user.displayName || user.email?.split("@")[0],

      serviceId: service.id,
      serviceName: service.name,
      serviceBalance: service.balance,

      travelers: Number(travelers),
      preferredDate: new Date(date),
      totalAmount: totalAmount,

      phoneNumber: phoneNumber.trim(),
      address: address.trim(),
      status: "pending",
    };

    try {
      const response = await fetch(`${API_BASE_URL}/api/bookings`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(bookingData),
      });

      const result = await response.json();

      if (result.success) {
        setShowModal(true);
        toast.success("🎉 Booking request submitted successfully!");
      } else {
        toast.error(result.message || "Failed to submit booking");
      }
    } catch (error) {
      console.error(error);
      toast.error("Network error. Please try again.");
    }
  };

  if (loading) {
    return (
      <main className="min-h-screen flex items-center justify-center bg-[#f5f0e8]">
        <div className="flex flex-col items-center gap-4">
          <div className="h-14 w-14 animate-spin rounded-full border-4 border-[#e7dfd0] border-t-[#0b6b62]" />
          <p className="text-[#5a6a7e] text-sm">Loading package…</p>
        </div>
      </main>
    );
  }

  if (!service) {
    return (
      <main className="min-h-screen flex flex-col items-center justify-center bg-[#f5f0e8] px-6 text-center">
        <div className="text-6xl mb-6">🗺️</div>
        <h1
          className="text-5xl font-black text-[#0d1f35] mb-4"
          style={{ fontFamily: "var(--font-display)" }}
        >
          Package Not Found
        </h1>
        <p className="text-[#5a6a7e] mb-8">
          Sorry, the tour you're looking for is no longer available.
        </p>
        <Link
          to="/services"
          className="px-8 py-4 bg-[#0d1f35] text-white rounded-2xl font-bold hover:bg-[#0b6b62] transition-all"
        >
          Browse All Packages
        </Link>
      </main>
    );
  }

  const price =
    parseFloat(String(service.balance).replace(/[^0-9.]/g, "")) || 0;
  const total = (price * travelers).toFixed(0);

  return (
    <main className="min-h-screen bg-[#f5f0e8] pt-[76px] text-[#0d1f35]">
      <section className="max-w-7xl mx-auto px-6 py-12 lg:px-10">
        <Link
          to="/services"
          className="inline-flex items-center gap-2 text-sm font-bold text-[#0b6b62] mb-10 hover:text-[#0d1f35] hover:gap-3 transition-all duration-200 group"
        >
          <FiArrowLeft className="group-hover:-translate-x-1 transition-transform" />
          Back to All Packages
        </Link>

        <div className="grid lg:grid-cols-[1fr_400px] gap-12">
          {/* Left Side - Details */}
          <div>
            <div className="relative rounded-[32px] overflow-hidden bg-[#0d1f35] shadow-2xl img-zoom">
              <img
                src={service.picture}
                alt={service.name}
                className={`w-full h-[480px] object-cover transition-all duration-700 ${imgLoaded ? "opacity-100" : "opacity-0"}`}
                onLoad={() => setImgLoaded(true)}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0d1f35]/80 via-[#0d1f35]/20 to-transparent" />
              <div className="absolute bottom-0 p-8 text-white">
                <p className="text-[#c9a84c] uppercase tracking-[0.25em] text-[10px] font-bold mb-2">
                  Curated Experience
                </p>
                <h1
                  className="text-4xl md:text-5xl font-black leading-tight"
                  style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
                >
                  {service.name}
                </h1>
              </div>
            </div>

            {/* Highlight badges */}
            <div className="mt-8 grid md:grid-cols-3 gap-5">
              {[
                {
                  icon: <FiStar className="text-2xl" />,
                  label: "Guest Rating",
                  value: "4.9/5",
                },
                {
                  icon: <FiClock className="text-2xl" />,
                  label: "Duration",
                  value: "Flexible",
                },
                {
                  icon: <FiShield className="text-2xl" />,
                  label: "Support",
                  value: "24/7 Concierge",
                },
              ].map((item, i) => (
                <div
                  key={i}
                  className="border border-[#e7dfd0] bg-white p-6 rounded-[24px] text-center hover:border-[#c9a84c]/30 hover:shadow-lg transition-all duration-400 card-premium"
                >
                  <div className="text-[#0b6b62] mb-3">{item.icon}</div>
                  <p
                    className="text-2xl font-black text-[#0d1f35] mb-1"
                    style={{
                      fontFamily: "'Cormorant Garamond', Georgia, serif",
                    }}
                  >
                    {item.value}
                  </p>
                  <p className="text-[10px] text-[#5a6a7e] uppercase tracking-widest font-bold">
                    {item.label}
                  </p>
                </div>
              ))}
            </div>

            {/* Trip Overview */}
            <div className="mt-8 border border-[#e7dfd0] bg-white p-8 rounded-[28px] shadow-sm">
              <h2
                className="text-3xl font-black mb-6 text-[#0d1f35]"
                style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
              >
                Trip Overview
              </h2>
              <p className="text-[#5a6a7e] leading-relaxed mb-10">
                {service.about}
              </p>

              <div>
                <h3 className="font-black uppercase tracking-widest text-[10px] text-[#0b6b62] mb-5">
                  What's Included
                </h3>
                <div className="grid sm:grid-cols-2 gap-3">
                  {inclusions.map((item) => (
                    <div
                      key={item}
                      className="flex items-center gap-3 p-3.5 rounded-2xl bg-[#f5f0e8] hover:bg-[#e8e0d4] transition-colors duration-200"
                    >
                      <div className="w-7 h-7 rounded-xl bg-[#0b6b62]/12 flex items-center justify-center text-[#0b6b62] shrink-0">
                        <FiCheck size={13} />
                      </div>
                      <p className="text-sm text-[#5a6a7e] font-medium">
                        {item}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Booking Sidebar */}
          <aside className="lg:sticky lg:top-24 h-fit">
            <div className="border border-[#e7dfd0] bg-white rounded-[28px] p-8 shadow-[0_16px_48px_rgba(13,31,53,0.08)] overflow-hidden relative">
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#c9a84c] to-[#e8c96a]" />

              {existingBooking ? (
                // Already Booked Message
                <div className="bg-amber-50 border border-amber-200 rounded-2xl p-8 text-center">
                  <FiCheck className="mx-auto text-5xl text-amber-600 mb-4" />
                  <h3 className="text-2xl font-black text-[#0d1f35] mb-2">
                    Booking Already Requested
                  </h3>
                  <p className="text-[#5a6a7e] mb-6">
                    You have already submitted a request for this tour.
                    <br />
                    Current Status:{" "}
                    <span className="font-semibold capitalize text-amber-700">
                      {existingBooking.status}
                    </span>
                  </p>

                  <Link
                    to="/my-bookings" // ← Updated
                    className="inline-block px-8 py-3 bg-[#0d1f35] text-white rounded-2xl font-semibold hover:bg-[#0b6b62] transition-all"
                  >
                    View My Bookings
                  </Link>

                  <p className="text-[#5a6a7e] mb-6 mt-6">
                    You have already submitted a request for this tour.
                    <br />
                    Current Status:{" "}
                    <span className="font-semibold capitalize text-amber-700">
                      {existingBooking.status}
                    </span>
                  </p>
                </div>
              ) : (
                // Booking Form
                <>
                  <p className="text-[10px] uppercase tracking-widest text-[#5a6a7e] font-bold mt-2">
                    Starting from
                  </p>
                  <p
                    className="text-5xl font-black text-[#e85d45] mt-1 mb-8"
                    style={{
                      fontFamily: "'Cormorant Garamond', Georgia, serif",
                    }}
                  >
                    {service.balance}
                  </p>

                  <div className="space-y-7">
                    {/* Preferred Date */}
                    <div>
                      <label className="block text-[10px] font-black uppercase tracking-widest text-[#5a6a7e] mb-3">
                        Preferred Travel Date
                      </label>
                      <input
                        type="date"
                        value={date}
                        min={new Date().toISOString().split("T")[0]}
                        onChange={(e) => setDate(e.target.value)}
                        className="w-full border border-[#e7dfd0] bg-[#f5f0e8] rounded-2xl px-5 py-4 focus:border-[#0b6b62]/50 focus:bg-white outline-none transition-all duration-300 text-sm"
                      />
                    </div>

                    {/* Travelers */}
                    <div>
                      <label className="block text-[10px] font-black uppercase tracking-widest text-[#5a6a7e] mb-3">
                        Number of Travelers
                      </label>
                      <div className="flex items-center bg-[#f5f0e8] rounded-2xl p-2 gap-2">
                        <button
                          onClick={() =>
                            setTravelers(Math.max(1, travelers - 1))
                          }
                          className="w-12 h-12 flex items-center justify-center text-2xl rounded-xl hover:bg-white hover:text-[#0d1f35] transition-all active:scale-90 font-bold text-[#5a6a7e]"
                        >
                          −
                        </button>
                        <span
                          className="flex-1 text-center text-4xl font-black text-[#0d1f35]"
                          style={{
                            fontFamily: "'Cormorant Garamond', Georgia, serif",
                          }}
                        >
                          {travelers}
                        </span>
                        <button
                          onClick={() =>
                            setTravelers(Math.min(20, travelers + 1))
                          }
                          className="w-12 h-12 flex items-center justify-center text-2xl rounded-xl hover:bg-white hover:text-[#0d1f35] transition-all active:scale-90 font-bold text-[#5a6a7e]"
                        >
                          +
                        </button>
                      </div>
                    </div>

                    {/* Phone Number */}
                    <div>
                      <label className="block text-[10px] font-black uppercase tracking-widest text-[#5a6a7e] mb-3">
                        Phone Number (BD)
                      </label>
                      <input
                        type="tel"
                        value={phoneNumber}
                        onChange={(e) => {
                          const value = e.target.value.replace(/\D/g, "");
                          if (value.length <= 11) setPhoneNumber(value);
                        }}
                        placeholder="01XXXXXXXXX"
                        maxLength={11}
                        className="w-full border border-[#e7dfd0] bg-[#f5f0e8] rounded-2xl px-5 py-4 focus:border-[#0b6b62]/50 focus:bg-white outline-none transition-all duration-300 text-sm"
                      />
                    </div>

                    {/* Address */}
                    <div>
                      <label className="block text-[10px] font-black uppercase tracking-widest text-[#5a6a7e] mb-3">
                        Address
                      </label>
                      <textarea
                        value={address}
                        onChange={(e) => {
                          const words = e.target.value
                            .trim()
                            .split(/\s+/)
                            .filter(Boolean);
                          if (words.length <= 30) setAddress(e.target.value);
                        }}
                        placeholder="House No, Road No, Area, City"
                        rows={3}
                        className="resize-none w-full border border-[#e7dfd0] bg-[#f5f0e8] rounded-2xl px-5 py-4 focus:border-[#0b6b62]/50 focus:bg-white outline-none transition-all"
                      />
                      <p className="text-xs text-gray-500 mt-2">
                        {address.trim().split(/\s+/).filter(Boolean).length}/30
                        words
                      </p>
                    </div>
                  </div>

                  {/* Summary */}
                  <div className="mt-7 bg-[#f5f0e8] border border-[#e7dfd0] rounded-[20px] p-5">
                    <div className="flex justify-between text-sm text-[#5a6a7e] mb-3">
                      <span>
                        {service.balance} × {travelers}
                      </span>
                      <span className="font-bold text-[#0d1f35]">
                        BDT {total}
                      </span>
                    </div>
                    <div className="border-t border-[#e7dfd0] pt-3 flex justify-between font-black">
                      <span>Total Estimate</span>
                      <span className="text-[#e85d45]">BDT {total}</span>
                    </div>
                  </div>

                  {formError && (
                    <p className="text-red-500 text-xs mt-4 font-medium">
                      {formError}
                    </p>
                  )}

                  <button
                    onClick={confirmBooking}
                    className="mt-6 w-full py-5 bg-gradient-to-r from-[#c9a84c] to-[#e8c96a] text-[#0d1f35] font-black uppercase tracking-widest rounded-2xl hover:shadow-xl hover:shadow-[#c9a84c]/25 hover:scale-[1.02] active:scale-[0.99] transition-all duration-300 text-sm btn-glow"
                  >
                    Confirm Booking Request
                  </button>
                </>
              )}

              <p className="text-center text-[10px] text-[#5a6a7e] mt-4">
                No payment required at this stage
              </p>
            </div>
          </aside>
        </div>
      </section>

      {showModal && (
        <Modal
          closeModal={() => setShowModal(false)}
          service={service}
          travelers={travelers}
          date={date}
        />
      )}
    </main>
  );
};

export default Booking;
