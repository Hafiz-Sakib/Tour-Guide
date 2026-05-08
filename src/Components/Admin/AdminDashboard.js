// src/Components/AdminDashboard.js
import { useCallback, useEffect, useState } from "react";
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
  FiEdit2,
  FiPlus,
  FiImage,
} from "react-icons/fi";

const ADMIN_EMAIL = "hafizsakib5@gmail.com";
const API_BASE = "https://sababa-tours-backend.onrender.com";
const API_BOOKINGS = `${API_BASE}/api/admin/bookings`;
const API_SERVICES = `${API_BASE}/api/admin/services`;
const API_SERVICES_PUBLIC = `${API_BASE}/api/services`;
const PER_PAGE = 10;
const STATUSES = ["all", "pending", "confirmed", "cancelled"];

// ─── helpers ──────────────────────────────────────────────────────────────────
const fmtDate = (d) => {
  if (!d) return "—";
  return new Date(d).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
};
const fmtAmt = (n) => "BDT " + Number(n).toLocaleString();

// ─── Shared UI atoms ──────────────────────────────────────────────────────────
const StatCard = ({ label, value, color = "text-[#0d1f35]" }) => (
  <div className="bg-white rounded-2xl border border-[#e7dfd0] p-4 flex flex-col gap-1">
    <span className="text-xs font-medium text-[#5a6a7e] uppercase tracking-wide">
      {label}
    </span>
    <span className={`text-2xl font-bold ${color}`}>{value ?? "—"}</span>
  </div>
);

const StatusBadge = ({ status }) => {
  const map = {
    confirmed: "bg-green-100 text-green-700",
    cancelled: "bg-red-100 text-red-700",
    pending: "bg-yellow-100 text-yellow-700",
  };
  return (
    <span
      className={`px-3 py-1 rounded-full text-xs font-semibold capitalize ${map[status] ?? map.pending}`}
    >
      {status}
    </span>
  );
};

const Spinner = () => (
  <div className="flex flex-col items-center justify-center py-20 gap-4">
    <div className="h-10 w-10 animate-spin rounded-full border-4 border-[#e7dfd0] border-t-[#0b6b62]" />
    <p className="text-[#5a6a7e] text-sm">Loading…</p>
  </div>
);

// ─── Reusable Field Component (Fixed) ───────────────────────────────────────
const Field = ({
  label,
  k,
  value,
  onChange,
  placeholder,
  textarea = false,
  required = false,
}) => (
  <div className="flex flex-col gap-1">
    <label className="text-xs font-semibold text-[#5a6a7e] uppercase tracking-wide">
      {label}
      {required && <span className="text-red-500 ml-0.5">*</span>}
    </label>
    {textarea ? (
      <textarea
        key={k}
        rows={3}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="border border-[#e7dfd0] rounded-xl px-3 py-2 text-sm outline-none focus:border-[#0b6b62] resize-none"
      />
    ) : (
      <input
        key={k}
        type="text"
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="border border-[#e7dfd0] rounded-xl px-3 py-2 text-sm outline-none focus:border-[#0b6b62]"
      />
    )}
  </div>
);

// ─── Booking Detail Drawer ────────────────────────────────────────────────────
const BookingDrawer = ({ booking: b, onClose, onUpdate, onDelete }) => {
  if (!b) return null;
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
      <div className="fixed inset-0 bg-black/30 z-40" onClick={onClose} />
      <div className="fixed right-0 top-0 h-full w-full max-w-sm bg-white z-50 shadow-2xl flex flex-col overflow-y-auto">
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#e7dfd0] sticky top-0 bg-white">
          <div>
            <h2 className="text-base font-bold text-[#0d1f35]">
              Booking Details
            </h2>
            <div className="mt-1">
              <StatusBadge status={b.status} />
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl hover:bg-[#f5f0e8] text-[#5a6a7e]"
          >
            <FiX size={18} />
          </button>
        </div>
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
};

// ─── Service Form Modal ───────────────────────────────────────────────────────
const EMPTY_SERVICE = {
  name: "",
  about: "",
  balance: "",
  picture: "",
  category: "General",
  duration: "Flexible",
  location: "Bangladesh",
};

const ServiceModal = ({ initial, onClose, onSave }) => {
  const [form, setForm] = useState(EMPTY_SERVICE);
  const [saving, setSaving] = useState(false);
  const isEdit = !!initial?._id;

  // Sync when editing existing service
  useEffect(() => {
    setForm(initial ?? EMPTY_SERVICE);
  }, [initial]);

  const handleChange = (k) => (e) => {
    setForm((prev) => ({ ...prev, [k]: e.target.value }));
  };

  const handleSave = async () => {
    if (!form.name || !form.about || !form.balance || !form.picture) {
      toast.error(
        "Please fill in all required fields (name, description, price, image URL)",
      );
      return;
    }
    setSaving(true);
    await onSave(form);
    setSaving(false);
  };

  return (
    <>
      <div className="fixed inset-0 bg-black/40 z-40" onClick={onClose} />
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-3xl w-full max-w-lg shadow-2xl overflow-y-auto max-h-[90vh]">
          {/* Header */}
          <div className="flex items-center justify-between px-6 py-5 border-b border-[#e7dfd0] sticky top-0 bg-white rounded-t-3xl">
            <h2 className="text-base font-bold text-[#0d1f35]">
              {isEdit ? "Edit Service" : "Add New Service"}
            </h2>
            <button
              onClick={onClose}
              className="p-2 rounded-xl hover:bg-[#f5f0e8] text-[#5a6a7e]"
            >
              <FiX size={18} />
            </button>
          </div>

          {/* Image preview */}
          <div className="mx-6 mt-5 rounded-2xl overflow-hidden aspect-video bg-[#f5f0e8] flex items-center justify-center">
            {form.picture ? (
              <img
                src={form.picture}
                alt="Preview"
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.target.style.display = "none";
                }}
              />
            ) : (
              <div className="flex flex-col items-center gap-2 text-[#5a6a7e]">
                <FiImage size={32} />
                <span className="text-xs">Image preview</span>
              </div>
            )}
          </div>

          {/* Fields */}
          <div className="px-6 py-5 flex flex-col gap-4">
            <Field
              label="Service Name"
              k="name"
              value={form.name}
              onChange={handleChange("name")}
              placeholder="e.g. Cox's Bazar Beach Tour"
              required
            />
            <Field
              label="Description"
              k="about"
              value={form.about}
              onChange={handleChange("about")}
              placeholder="A short description of the tour…"
              textarea
              required
            />
            <div className="grid grid-cols-2 gap-3">
              <Field
                label="Price"
                k="balance"
                value={form.balance}
                onChange={handleChange("balance")}
                placeholder="e.g. BDT 4,500"
                required
              />
              <Field
                label="Duration"
                k="duration"
                value={form.duration}
                onChange={handleChange("duration")}
                placeholder="e.g. 3 Days"
              />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <Field
                label="Category"
                k="category"
                value={form.category}
                onChange={handleChange("category")}
                placeholder="e.g. Beach"
              />
              <Field
                label="Location"
                k="location"
                value={form.location}
                onChange={handleChange("location")}
                placeholder="e.g. Cox's Bazar"
              />
            </div>
            <Field
              label="Image URL"
              k="picture"
              value={form.picture}
              onChange={handleChange("picture")}
              placeholder="https://images.unsplash.com/…"
              required
            />
          </div>

          {/* Footer */}
          <div className="px-6 pb-6 flex gap-3">
            <button
              onClick={onClose}
              className="flex-1 py-3 rounded-2xl border border-[#e7dfd0] text-sm font-semibold text-[#5a6a7e] hover:bg-[#f5f0e8]"
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              disabled={saving}
              className="flex-1 py-3 rounded-2xl bg-[#0d1f35] text-white text-sm font-semibold hover:bg-[#0b6b62] disabled:opacity-60 flex items-center justify-center gap-2"
            >
              {saving && (
                <div className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
              )}
              {isEdit ? "Save Changes" : "Create Service"}
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

// ─── Services Panel ───────────────────────────────────────────────────────────
const ServicesPanel = () => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modal, setModal] = useState(null);
  const [search, setSearch] = useState("");

  const fetchServices = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch(API_SERVICES_PUBLIC);
      const data = await res.json();
      setServices(data);
    } catch {
      toast.error("Failed to load services");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchServices();
  }, [fetchServices]);

  const filtered = services.filter((s) =>
    `${s.name} ${s.category} ${s.location}`
      .toLowerCase()
      .includes(search.toLowerCase()),
  );

  const handleSave = async (form) => {
    const isEdit = !!form._id;
    const url = isEdit ? `${API_SERVICES}/${form._id}` : API_SERVICES;
    const method = isEdit ? "PATCH" : "POST";
    try {
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const result = await res.json();
      if (result.success) {
        toast.success(isEdit ? "Service updated!" : "Service created!");
        setModal(null);
        fetchServices();
      } else {
        toast.error(result.message || "Something went wrong");
      }
    } catch {
      toast.error("Failed to save service");
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this service permanently?")) return;
    try {
      const res = await fetch(`${API_SERVICES}/${id}`, { method: "DELETE" });
      const result = await res.json();
      if (result.success) {
        toast.success("Service deleted");
        setServices((prev) => prev.filter((s) => s._id !== id));
      }
    } catch {
      toast.error("Failed to delete service");
    }
  };

  const categories = [
    ...new Set(services.map((s) => s.category).filter(Boolean)),
  ];

  return (
    <div>
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-5">
        <StatCard label="Total Services" value={services.length} />
        <StatCard
          label="Search Results"
          value={filtered.length}
          color="text-[#0b6b62]"
        />
        <StatCard
          label="Categories"
          value={categories.length}
          color="text-[#185FA5]"
        />
      </div>

      {/* Toolbar - Improved Mobile Experience */}
      <div className="flex flex-col sm:flex-row gap-3 mb-5">
        {/* Search Bar */}
        <div className="flex items-center gap-2 bg-white border border-[#e7dfd0] rounded-xl px-3 py-2 flex-1 min-w-0">
          <FiSearch size={15} className="text-[#5a6a7e] shrink-0" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by name, category, location…" // ← Shortened for mobile
            className="bg-transparent outline-none text-sm flex-1 text-[#0d1f35] placeholder:text-[#a0aab4] min-w-0"
          />
          {search && (
            <button
              onClick={() => setSearch("")}
              className="text-[#5a6a7e] hover:text-[#0d1f35] shrink-0"
            >
              <FiX size={14} />
            </button>
          )}
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => setModal("add")}
            className="flex items-center gap-2 px-5 py-2.5 bg-[#0d1f35] text-white rounded-xl hover:bg-[#0b6b62] text-sm font-semibold whitespace-nowrap"
          >
            <FiPlus size={16} /> Add Service
          </button>
          <button
            onClick={fetchServices}
            className="flex items-center gap-2 px-4 py-2.5 border border-[#e7dfd0] bg-white rounded-xl hover:bg-[#f5f0e8] text-sm font-semibold text-[#5a6a7e]"
            aria-label="Refresh"
          >
            <FiRefreshCw size={15} />
          </button>
        </div>
      </div>

      {loading ? (
        <Spinner />
      ) : filtered.length === 0 ? (
        <div className="text-center py-16 text-[#5a6a7e] text-sm bg-white rounded-2xl border border-[#e7dfd0]">
          No services found.{" "}
          <button
            onClick={() => setModal("add")}
            className="text-[#0b6b62] font-semibold underline"
          >
            Add one?
          </button>
        </div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((s) => (
            <div
              key={s._id}
              className="bg-white border border-[#e7dfd0] rounded-2xl overflow-hidden group hover:border-[#c9a84c]/40 hover:shadow-lg transition-all duration-300"
            >
              <div className="aspect-video bg-[#f5f0e8] overflow-hidden relative">
                {s.picture ? (
                  <img
                    src={s.picture}
                    alt={s.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-[#5a6a7e]">
                    <FiImage size={32} />
                  </div>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
                <span className="absolute top-3 left-3 bg-white backdrop-blur text-[#0d1f35] text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-full">
                  {s.category || "General"}
                </span>
                <span className="absolute bottom-3 right-3 bg-white/90 backdrop-blur text-[#e85d45] text-xs font-bold px-3 py-1 rounded-full">
                  {s.balance}
                </span>
              </div>
              <div className="p-4">
                <h3 className="font-bold text-[#0d1f35] text-sm mb-1 line-clamp-1">
                  {s.name}
                </h3>
                <p className="text-xs text-[#5a6a7e] line-clamp-2 mb-3 leading-relaxed">
                  {s.about}
                </p>
                <div className="flex items-center gap-3 text-xs text-[#5a6a7e] mb-4">
                  <span>📍 {s.location || "Bangladesh"}</span>
                  <span>⏱ {s.duration || "Flexible"}</span>
                </div>
                <div className="flex gap-2 pt-3 border-t border-[#f0ebe2]">
                  <button
                    onClick={() => setModal(s)}
                    className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-xl border border-[#e7dfd0] text-xs font-semibold text-[#0d1f35] hover:bg-red-500"
                  >
                    <FiEdit2 size={13} /> Edit
                  </button>
                  <button
                    onClick={() => handleDelete(s._id)}
                    className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-xl border border-red-100 text-xs font-semibold text-red-600 hover:bg-red-50"
                  >
                    <FiTrash2 size={13} /> Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {modal && (
        <ServiceModal
          initial={modal === "add" ? null : modal}
          onClose={() => setModal(null)}
          onSave={handleSave}
        />
      )}
    </div>
  );
};

// ─── Bookings Panel ───────────────────────────────────────────────────────────
const BookingsPanel = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [statusFilter, setFilter] = useState("all");
  const [sort, setSort] = useState("date-desc");
  const [page, setPage] = useState(1);
  const [selected, setSelected] = useState(null);

  const fetchBookings = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch(API_BOOKINGS);
      const data = await res.json();
      setBookings(data);
    } catch {
      toast.error("Failed to load bookings");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchBookings();
  }, [fetchBookings]);

  const updateStatus = async (id, newStatus) => {
    try {
      const res = await fetch(`${API_BOOKINGS}/${id}`, {
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
      const res = await fetch(`${API_BOOKINGS}/${id}`, { method: "DELETE" });
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

  const confirmed = bookings.filter((b) => b.status === "confirmed");
  const revenue = confirmed.reduce((s, b) => s + Number(b.totalAmount), 0);

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

  return (
    <div>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 mb-6">
        <StatCard label="Total" value={bookings.length} />
        <StatCard
          label="Confirmed"
          value={confirmed.length}
          color="text-green-700"
        />
        <StatCard
          label="Pending"
          value={bookings.filter((b) => b.status === "pending").length}
          color="text-yellow-600"
        />
        <StatCard
          label="Cancelled"
          value={bookings.filter((b) => b.status === "cancelled").length}
          color="text-red-600"
        />
        <StatCard
          label="Revenue"
          value={"৳" + revenue.toLocaleString()}
          color="text-[#185FA5]"
        />
      </div>

      <div className="flex flex-wrap items-center gap-3 mb-4">
        <div className="flex items-center gap-2 bg-white border border-[#e7dfd0] rounded-xl px-3 py-2 flex-1 min-w-[180px]">
          <FiSearch size={15} className="text-[#5a6a7e]" />
          <input
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setPage(1);
            }}
            placeholder="Search name, email, service…"
            className="bg-transparent outline-none text-sm flex-1 text-[#0d1f35] placeholder:text-[#a0aab4]"
          />
          {search && (
            <button onClick={() => setSearch("")} className="text-[#5a6a7e]">
              <FiX size={14} />
            </button>
          )}
        </div>

        <div className="flex gap-2 flex-wrap">
          {STATUSES.map((s) => (
            <button
              key={s}
              onClick={() => {
                setFilter(s);
                setPage(1);
              }}
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

        <button
          onClick={fetchBookings}
          className="flex items-center gap-2 px-4 py-2.5 border border-[#e7dfd0] bg-white rounded-xl hover:bg-[#f5f0e8] text-sm font-semibold text-[#5a6a7e]"
        >
          <FiRefreshCw size={15} />
        </button>
      </div>

      <div className="bg-white rounded-3xl border border-[#e7dfd0] overflow-hidden">
        {loading ? (
          <Spinner />
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full min-w-[680px]">
              <thead className="bg-[#f5f0e8] border-b border-[#e7dfd0]">
                <tr>
                  {[
                    "Service",
                    "Customer",
                    "Date",
                    "Travelers",
                    "Amount",
                    "Status",
                    "Actions",
                  ].map((h) => (
                    <th
                      key={h}
                      className={`px-5 py-3.5 text-xs font-semibold text-[#5a6a7e] uppercase tracking-wide ${
                        h === "Travelers" || h === "Actions"
                          ? "text-center"
                          : "text-left"
                      }`}
                    >
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {paginated.length === 0 ? (
                  <tr>
                    <td
                      colSpan={7}
                      className="text-center py-14 text-[#5a6a7e] text-sm"
                    >
                      No bookings found.
                    </td>
                  </tr>
                ) : (
                  paginated.map((b) => (
                    <tr
                      key={b._id}
                      onClick={() => setSelected(b)}
                      className="border-b border-[#f0ebe2] hover:bg-slate-800 cursor-pointer transition-colors"
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
                              className="p-1.5 rounded-lg text-green-600 hover:bg-green-50"
                            >
                              <FiCheckCircle size={17} />
                            </button>
                          )}
                          {b.status !== "cancelled" && (
                            <button
                              onClick={() => updateStatus(b._id, "cancelled")}
                              className="p-1.5 rounded-lg text-yellow-600 hover:bg-yellow-50"
                            >
                              <FiXCircle size={17} />
                            </button>
                          )}
                          <button
                            onClick={() => deleteBooking(b._id)}
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

        {!loading && filtered.length > PER_PAGE && (
          <div className="flex items-center justify-between px-5 py-3 border-t border-[#e7dfd0] text-xs text-[#5a6a7e]">
            <span>
              Showing {(page - 1) * PER_PAGE + 1}–
              {Math.min(page * PER_PAGE, filtered.length)} of {filtered.length}
            </span>
            <div className="flex gap-1">
              <button
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                disabled={page === 1}
                className="px-3 py-1.5 rounded-lg border border-[#e7dfd0] hover:bg-[#f5f0e8] disabled:opacity-40"
              >
                Prev
              </button>
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((n) => (
                <button
                  key={n}
                  onClick={() => setPage(n)}
                  className={`px-3 py-1.5 rounded-lg border ${n === page ? "bg-[#0d1f35] text-white border-[#0d1f35]" : "border-[#e7dfd0] hover:bg-[#f5f0e8]"}`}
                >
                  {n}
                </button>
              ))}
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

      {selected && (
        <BookingDrawer
          booking={selected}
          onClose={() => setSelected(null)}
          onUpdate={updateStatus}
          onDelete={deleteBooking}
        />
      )}
    </div>
  );
};

// ─── Root Component ───────────────────────────────────────────────────────────
const TABS = [
  { id: "bookings", label: "Bookings" },
  { id: "services", label: "Services" },
];

const AdminDashboard = () => {
  const [user] = useAuthState(auth);
  const [tab, setTab] = useState("bookings");

  const isAdmin = user?.email === ADMIN_EMAIL;

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
    <main className="min-h-screen bg-[#f5f0e8] pt-[76px] pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10">
        <div className="flex flex-wrap items-center justify-between gap-4 py-8">
          <div>
            <h1 className="text-3xl font-black text-[#0d1f35]">
              Admin Dashboard
            </h1>
            <p className="text-[#5a6a7e] mt-1 text-sm">
              Logged in as{" "}
              <span className="font-semibold text-[#0d1f35]">{user.email}</span>
            </p>
          </div>
        </div>

        <div className="flex gap-1 bg-white border border-[#e7dfd0] rounded-2xl p-1 mb-6 w-fit">
          {TABS.map((t) => (
            <button
              key={t.id}
              onClick={() => setTab(t.id)}
              className={`px-6 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 ${
                tab === t.id
                  ? "bg-[#0d1f35] text-white shadow-sm"
                  : "text-[#5a6a7e] hover:text-[#0d1f35] hover:bg-[#f5f0e8]"
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>

        {tab === "bookings" ? <BookingsPanel /> : <ServicesPanel />}
      </div>
    </main>
  );
};

export default AdminDashboard;
