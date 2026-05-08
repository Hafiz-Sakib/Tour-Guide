// src/Components/AdminDashboard.js
import { useEffect, useState, useCallback } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../Firebase.init";
import toast from "react-hot-toast";
import {
  FiCheckCircle,
  FiXCircle,
  FiTrash2,
  FiRefreshCw,
  FiSearch,
  FiX,
} from "react-icons/fi";

const ADMIN_EMAIL = "hafizsakib5@gmail.com";
const API = "https://sababa-tours-backend.onrender.com/api/admin/bookings";
const PER_PAGE = 10;

const STATUSES = ["all", "pending", "confirmed", "cancelled"];

const statusStyle = {
  confirmed: {
    badge: "bg-green-100 text-green-700",
    btn: "bg-green-50 text-green-700 hover:bg-green-100 border-green-200",
    label: "Confirm",
  },
  cancelled: {
    badge: "bg-red-100 text-red-700",
    btn: "bg-red-50 text-red-700 hover:bg-red-100 border-red-200",
    label: "Cancel",
  },
  pending: { badge: "bg-yellow-100 text-yellow-700", btn: "", label: "" },
};

function fmtDate(d) {
  if (!d) return "—";
  return new Date(d).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

function fmtAmt(n) {
  return "BDT " + Number(n).toLocaleString();
}

// ─── Stat Card ───────────────────────────────────────────────────────────────
function StatCard({ label, value, color = "text-[#0d1f35]" }) {
  return (
    <div className="bg-white rounded-2xl border border-[#e7dfd0] p-4 flex flex-col gap-1">
      <span className="text-xs font-medium text-[#5a6a7e] uppercase tracking-wide">
        {label}
      </span>
      <span className={`text-2xl font-bold ${color}`}>{value ?? "—"}</span>
    </div>
  );
}

// ─── Status Badge ─────────────────────────────────────────────────────────────
function StatusBadge({ status }) {
  const s = statusStyle[status] ?? statusStyle.pending;
  return (
    <span
      className={`px-3 py-1 rounded-full text-xs font-semibold capitalize ${s.badge}`}
    >
      {status}
    </span>
  );
}

// ─── Booking Detail Drawer ────────────────────────────────────────────────────
function Drawer({ booking, onClose, onUpdate, onDelete }) {
  if (!booking) return null;
  const b = booking;

  const Field = ({ label, value }) => (
    <div className="flex flex-col gap-0.5 py-3 border-b border-[#e7dfd0] last:border-0">
      <span className="text-[10px] font-semibold uppercase tracking-widest text-[#5a6a7e]">
        {label}
      </span>
      <span className="text-sm text-[#0d1f35]">{value || "—"}</span>
    </div>
  );

  return (
    <>
      {/* Overlay */}
      <div
        className="fixed inset-0 bg-black/30 z-40 transition-opacity"
        onClick={onClose}
      />
      {/* Panel */}
      <div className="fixed right-0 top-0 h-full w-full max-w-sm bg-white z-50 shadow-2xl flex flex-col overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#e7dfd0] sticky top-0 bg-white">
          <div>
            <h2 className="text-base font-bold text-[#0d1f35]">
              Booking Details
            </h2>
            <StatusBadge status={b.status} />
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl hover:bg-[#f5f0e8] text-[#5a6a7e]"
            aria-label="Close"
          >
            <FiX size={18} />
          </button>
        </div>

        {/* Fields */}
        <div className="px-6 flex-1">
          <Field label="Service" value={b.serviceName} />
          <Field label="Customer" value={b.userName} />
          <Field label="Email" value={b.userEmail} />
          <Field label="Phone" value={b.phoneNumber} />
          <Field label="Address" value={b.address} />
          <Field label="Preferred Date" value={fmtDate(b.preferredDate)} />
          <Field label="Travelers" value={b.travelers} />
          <div className="py-3">
            <span className="text-[10px] font-semibold uppercase tracking-widest text-[#5a6a7e]">
              Amount
            </span>
            <div className="text-xl font-bold text-[#e85d45] mt-0.5">
              {fmtAmt(b.totalAmount)}
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="px-6 py-4 border-t border-[#e7dfd0] flex flex-col gap-2 sticky bottom-0 bg-white">
          {b.status !== "confirmed" && (
            <button
              onClick={() => onUpdate(b._id, "confirmed")}
              className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl border text-sm font-semibold bg-green-50 text-green-700 hover:bg-green-100 border-green-200"
            >
              <FiCheckCircle size={16} /> Mark Confirmed
            </button>
          )}
          {b.status !== "cancelled" && (
            <button
              onClick={() => onUpdate(b._id, "cancelled")}
              className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl border text-sm font-semibold bg-yellow-50 text-yellow-700 hover:bg-yellow-100 border-yellow-200"
            >
              <FiXCircle size={16} /> Mark Cancelled
            </button>
          )}
          <button
            onClick={() => onDelete(b._id)}
            className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl border text-sm font-semibold bg-red-50 text-red-700 hover:bg-red-100 border-red-200"
          >
            <FiTrash2 size={16} /> Delete Booking
          </button>
        </div>
      </div>
    </>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────
const AdminDashboard = () => {
  const [user] = useAuthState(auth);
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [sort, setSort] = useState("date-desc");
  const [page, setPage] = useState(1);
  const [selected, setSelected] = useState(null); // for drawer

  const isAdmin = user?.email === ADMIN_EMAIL;

  const fetchBookings = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch(API);
      const data = await res.json();
      setBookings(data);
    } catch {
      toast.error("Failed to load bookings");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (isAdmin) fetchBookings();
  }, [isAdmin, fetchBookings]);

  const updateStatus = async (id, newStatus) => {
    try {
      const res = await fetch(`${API}/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
      });
      const result = await res.json();
      if (result.success) {
        toast.success(`Booking marked as ${newStatus}`);
        setBookings((prev) =>
          prev.map((b) => (b._id === id ? { ...b, status: newStatus } : b)),
        );
        setSelected((prev) =>
          prev?._id === id ? { ...prev, status: newStatus } : prev,
        );
      }
    } catch {
      toast.error("Failed to update status");
    }
  };

  const deleteBooking = async (id) => {
    if (!window.confirm("Delete this booking permanently?")) return;
    try {
      const res = await fetch(`${API}/${id}`, { method: "DELETE" });
      const result = await res.json();
      if (result.success) {
        toast.success("Booking deleted");
        setBookings((prev) => prev.filter((b) => b._id !== id));
        if (selected?._id === id) setSelected(null);
      }
    } catch {
      toast.error("Failed to delete booking");
    }
  };

  // ── Derived stats ──
  const confirmed = bookings.filter((b) => b.status === "confirmed");
  const pending = bookings.filter((b) => b.status === "pending");
  const cancelled = bookings.filter((b) => b.status === "cancelled");
  const revenue = confirmed.reduce((s, b) => s + Number(b.totalAmount), 0);

  // ── Filtered + sorted list ──
  const filtered = bookings
    .filter((b) => statusFilter === "all" || b.status === statusFilter)
    .filter((b) => {
      const q = search.toLowerCase();
      return (
        !q ||
        [b.userName, b.userEmail, b.serviceName, b.phoneNumber]
          .join(" ")
          .toLowerCase()
          .includes(q)
      );
    })
    .sort((a, b) => {
      if (sort === "date-desc")
        return new Date(b.preferredDate) - new Date(a.preferredDate);
      if (sort === "date-asc")
        return new Date(a.preferredDate) - new Date(b.preferredDate);
      if (sort === "amount-desc") return b.totalAmount - a.totalAmount;
      if (sort === "amount-asc") return a.totalAmount - b.totalAmount;
      return 0;
    });

  const totalPages = Math.ceil(filtered.length / PER_PAGE) || 1;
  const paginated = filtered.slice((page - 1) * PER_PAGE, page * PER_PAGE);

  const handleFilter = (s) => {
    setStatusFilter(s);
    setPage(1);
  };
  const handleSearch = (e) => {
    setSearch(e.target.value);
    setPage(1);
  };

  // ── Access denied ──
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
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10">
        {/* Page header */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-black text-[#0d1f35]">
              Admin Dashboard
            </h1>
            <p className="text-[#5a6a7e] mt-1">Manage all booking requests</p>
          </div>
          <button
            onClick={fetchBookings}
            className="flex items-center gap-2 px-5 py-2.5 bg-[#0d1f35] text-white rounded-xl hover:bg-[#0b6b62] text-sm font-semibold"
          >
            <FiRefreshCw size={15} /> Refresh
          </button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 mb-8">
          <StatCard label="Total" value={bookings.length} />
          <StatCard
            label="Confirmed"
            value={confirmed.length}
            color="text-green-700"
          />
          <StatCard
            label="Pending"
            value={pending.length}
            color="text-yellow-600"
          />
          <StatCard
            label="Cancelled"
            value={cancelled.length}
            color="text-red-600"
          />
          <StatCard
            label="Revenue"
            value={"৳" + revenue.toLocaleString()}
            color="text-[#185FA5]"
          />
        </div>

        {/* Toolbar */}
        <div className="flex flex-wrap items-center gap-3 mb-4">
          {/* Search */}
          <div className="flex items-center gap-2 bg-white border border-[#e7dfd0] rounded-xl px-3 py-2 flex-1 min-w-[180px]">
            <FiSearch size={15} className="text-[#5a6a7e]" />
            <input
              value={search}
              onChange={handleSearch}
              placeholder="Search name, email, service…"
              className="bg-transparent outline-none text-sm flex-1 text-[#0d1f35] placeholder:text-[#a0aab4]"
            />
          </div>

          {/* Status filter pills */}
          <div className="flex gap-2 flex-wrap">
            {STATUSES.map((s) => (
              <button
                key={s}
                onClick={() => handleFilter(s)}
                className={`px-4 py-1.5 rounded-full text-xs font-semibold capitalize border transition-colors ${
                  statusFilter === s
                    ? s === "all"
                      ? "bg-[#0d1f35] text-white border-[#0d1f35]"
                      : s === "confirmed"
                        ? "bg-green-600 text-white border-green-600"
                        : s === "pending"
                          ? "bg-yellow-500 text-white border-yellow-500"
                          : "bg-red-600 text-white border-red-600"
                    : "bg-white text-[#5a6a7e] border-[#e7dfd0] hover:bg-[#f5f0e8]"
                }`}
              >
                {s}
              </button>
            ))}
          </div>

          {/* Sort */}
          <select
            value={sort}
            onChange={(e) => {
              setSort(e.target.value);
              setPage(1);
            }}
            className="bg-white border border-[#e7dfd0] rounded-xl px-3 py-2 text-sm text-[#0d1f35] outline-none cursor-pointer"
          >
            <option value="date-desc">Newest first</option>
            <option value="date-asc">Oldest first</option>
            <option value="amount-desc">Highest amount</option>
            <option value="amount-asc">Lowest amount</option>
          </select>
        </div>

        {/* Table card */}
        <div className="bg-white rounded-3xl border border-[#e7dfd0] overflow-hidden">
          {loading ? (
            <div className="flex justify-center py-20">
              <div className="h-10 w-10 animate-spin rounded-full border-4 border-[#e7dfd0] border-t-[#0b6b62]" />
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full min-w-[680px]">
                <thead className="bg-[#f5f0e8] border-b border-[#e7dfd0]">
                  <tr>
                    <th className="text-left px-5 py-3.5 text-xs font-semibold text-[#5a6a7e] uppercase tracking-wide">
                      Service
                    </th>
                    <th className="text-left px-5 py-3.5 text-xs font-semibold text-[#5a6a7e] uppercase tracking-wide">
                      Customer
                    </th>
                    <th className="text-left px-5 py-3.5 text-xs font-semibold text-[#5a6a7e] uppercase tracking-wide">
                      Date
                    </th>
                    <th className="text-center px-5 py-3.5 text-xs font-semibold text-[#5a6a7e] uppercase tracking-wide">
                      Travelers
                    </th>
                    <th className="text-left px-5 py-3.5 text-xs font-semibold text-[#5a6a7e] uppercase tracking-wide">
                      Amount
                    </th>
                    <th className="text-left px-5 py-3.5 text-xs font-semibold text-[#5a6a7e] uppercase tracking-wide">
                      Status
                    </th>
                    <th className="text-center px-5 py-3.5 text-xs font-semibold text-[#5a6a7e] uppercase tracking-wide">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {paginated.length === 0 ? (
                    <tr>
                      <td
                        colSpan={7}
                        className="text-center py-16 text-[#5a6a7e] text-sm"
                      >
                        No bookings found.
                      </td>
                    </tr>
                  ) : (
                    paginated.map((b) => (
                      <tr
                        key={b._id}
                        onClick={() => setSelected(b)}
                        className="border-b border-[#f0ebe2] hover:bg-[#f9f7f3] cursor-pointer transition-colors"
                      >
                        <td
                          className="px-5 py-4 font-semibold text-sm text-[#0d1f35] max-w-[160px] truncate"
                          title={b.serviceName}
                        >
                          {b.serviceName}
                        </td>
                        <td className="px-5 py-4">
                          <div className="font-semibold text-sm text-[#0d1f35]">
                            {b.userName}
                          </div>
                          <div className="text-xs text-[#5a6a7e]">
                            {b.userEmail}
                          </div>
                        </td>
                        <td className="px-5 py-4 text-sm text-[#0d1f35] whitespace-nowrap">
                          {fmtDate(b.preferredDate)}
                        </td>
                        <td className="px-5 py-4 text-sm text-center text-[#0d1f35]">
                          {b.travelers}
                        </td>
                        <td className="px-5 py-4 text-sm font-bold text-[#e85d45] whitespace-nowrap">
                          {fmtAmt(b.totalAmount)}
                        </td>
                        <td className="px-5 py-4">
                          <StatusBadge status={b.status} />
                        </td>
                        <td
                          className="px-5 py-4"
                          onClick={(e) => e.stopPropagation()}
                        >
                          <div className="flex gap-1 justify-center">
                            {b.status !== "confirmed" && (
                              <button
                                onClick={() => updateStatus(b._id, "confirmed")}
                                title="Mark as Confirmed"
                                className="p-1.5 rounded-lg text-green-600 hover:bg-green-50"
                              >
                                <FiCheckCircle size={17} />
                              </button>
                            )}
                            {b.status !== "cancelled" && (
                              <button
                                onClick={() => updateStatus(b._id, "cancelled")}
                                title="Cancel Booking"
                                className="p-1.5 rounded-lg text-yellow-600 hover:bg-yellow-50"
                              >
                                <FiXCircle size={17} />
                              </button>
                            )}
                            <button
                              onClick={() => deleteBooking(b._id)}
                              title="Delete"
                              className="p-1.5 rounded-lg text-red-500 hover:bg-red-50"
                            >
                              <FiTrash2 size={17} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          )}

          {/* Pagination */}
          {!loading && filtered.length > PER_PAGE && (
            <div className="flex items-center justify-between px-5 py-3 border-t border-[#e7dfd0] text-xs text-[#5a6a7e]">
              <span>
                Showing {(page - 1) * PER_PAGE + 1}–
                {Math.min(page * PER_PAGE, filtered.length)} of{" "}
                {filtered.length}
              </span>
              <div className="flex gap-1">
                <button
                  onClick={() => setPage((p) => Math.max(1, p - 1))}
                  disabled={page === 1}
                  className="px-3 py-1.5 rounded-lg border border-[#e7dfd0] hover:bg-[#f5f0e8] disabled:opacity-40"
                >
                  Prev
                </button>
                {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                  (n) => (
                    <button
                      key={n}
                      onClick={() => setPage(n)}
                      className={`px-3 py-1.5 rounded-lg border ${
                        n === page
                          ? "bg-[#0d1f35] text-white border-[#0d1f35]"
                          : "border-[#e7dfd0] hover:bg-[#f5f0e8]"
                      }`}
                    >
                      {n}
                    </button>
                  ),
                )}
                <button
                  onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                  disabled={page === totalPages}
                  className="px-3 py-1.5 rounded-lg border border-[#e7dfd0] hover:bg-[#f5f0e8] disabled:opacity-40"
                >
                  Next
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Detail drawer */}
      {selected && (
        <Drawer
          booking={selected}
          onClose={() => setSelected(null)}
          onUpdate={updateStatus}
          onDelete={deleteBooking}
        />
      )}
    </main>
  );
};

export default AdminDashboard;
