import { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../Firebase.init";
import toast from "react-hot-toast";
import { FiTrash2, FiCheckCircle, FiXCircle } from "react-icons/fi";

const ADMIN_EMAIL = "hafizsakib5@email.com"; // ← Change this to your admin email

const AdminDashboard = () => {
  const [user] = useAuthState(auth);
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  const isAdmin = user?.email === ADMIN_EMAIL;

  useEffect(() => {
    if (!isAdmin) return;

    fetchBookings();
  }, [isAdmin]);

  const fetchBookings = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/admin/bookings");
      const data = await res.json();
      setBookings(data);
    } catch (err) {
      toast.error("Failed to load bookings");
    } finally {
      setLoading(false);
    }
  };

  const updateStatus = async (id, newStatus) => {
    try {
      const res = await fetch(
        `http://localhost:5000/api/admin/bookings/${id}`,
        {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ status: newStatus }),
        },
      );
      const result = await res.json();

      if (result.success) {
        toast.success(`Booking marked as ${newStatus}`);
        fetchBookings(); // Refresh list
      }
    } catch (err) {
      toast.error("Failed to update status");
    }
  };

  const deleteBooking = async (id) => {
    if (!window.confirm("Delete this booking permanently?")) return;

    try {
      const res = await fetch(
        `http://localhost:5000/api/admin/bookings/${id}`,
        {
          method: "DELETE",
        },
      );
      const result = await res.json();

      if (result.success) {
        toast.success("Booking deleted");
        fetchBookings();
      }
    } catch (err) {
      toast.error("Failed to delete booking");
    }
  };

  if (!user || !isAdmin) {
    return (
      <main className="min-h-screen bg-[#f5f0e8] pt-[76px] flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-4xl font-black mb-4">Access Denied</h2>
          <p className="text-[#5a6a7e]">Only admin can access this page.</p>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#f5f0e8] pt-[76px] pb-12">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <div className="flex justify-between items-center mb-10">
          <div>
            <h1 className="text-4xl font-black">Admin Dashboard</h1>
            <p className="text-[#5a6a7e]">Manage All Booking Requests</p>
          </div>
          <button
            onClick={fetchBookings}
            className="px-6 py-3 bg-[#0d1f35] text-white rounded-2xl hover:bg-[#0b6b62]"
          >
            Refresh
          </button>
        </div>

        {loading ? (
          <div className="flex justify-center py-20">Loading...</div>
        ) : (
          <div className="bg-white rounded-3xl border border-[#e7dfd0] overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-[#f5f0e8] border-b">
                  <tr>
                    <th className="text-left p-6">Service</th>
                    <th className="text-left p-6">Customer</th>
                    <th className="text-left p-6">Date</th>
                    <th className="text-left p-6">Travelers</th>
                    <th className="text-left p-6">Amount</th>
                    <th className="text-left p-6">Status</th>
                    <th className="text-center p-6">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {bookings.map((b) => (
                    <tr key={b._id} className="border-b hover:bg-[#f9f5eb]">
                      <td className="p-6 font-medium">{b.serviceName}</td>
                      <td className="p-6">
                        <div>{b.userName}</div>
                        <div className="text-sm text-[#5a6a7e]">
                          {b.userEmail}
                        </div>
                      </td>
                      <td className="p-6">
                        {new Date(b.preferredDate).toLocaleDateString("en-GB")}
                      </td>
                      <td className="p-6">{b.travelers}</td>
                      <td className="p-6 font-bold">${b.totalAmount}</td>
                      <td className="p-6">
                        <span
                          className={`px-4 py-1 rounded-full text-sm font-medium ${
                            b.status === "confirmed"
                              ? "bg-green-100 text-green-700"
                              : b.status === "cancelled"
                                ? "bg-red-100 text-red-700"
                                : "bg-yellow-100 text-yellow-700"
                          }`}
                        >
                          {b.status}
                        </span>
                      </td>
                      <td className="p-6 text-center">
                        <div className="flex gap-2 justify-center">
                          {b.status !== "confirmed" && (
                            <button
                              onClick={() => updateStatus(b._id, "confirmed")}
                              className="p-2 text-green-600 hover:bg-green-50 rounded-xl"
                              title="Mark as Confirmed"
                            >
                              <FiCheckCircle size={20} />
                            </button>
                          )}
                          {b.status !== "cancelled" && (
                            <button
                              onClick={() => updateStatus(b._id, "cancelled")}
                              className="p-2 text-red-600 hover:bg-red-50 rounded-xl"
                              title="Cancel Booking"
                            >
                              <FiXCircle size={20} />
                            </button>
                          )}
                          <button
                            onClick={() => deleteBooking(b._id)}
                            className="p-2 text-red-600 hover:bg-red-50 rounded-xl"
                            title="Delete"
                          >
                            <FiTrash2 size={20} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </main>
  );
};

export default AdminDashboard;
