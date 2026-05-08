import "./App.css";
import { Routes, Route } from "react-router-dom";

import Home from "./Components/Home/Home";
import NavBar from "./Components/Navbar/Navbar";
import Footer from "./Components/Footer/Footer";
import RequireAuth from "../src/Components/Auth/RequireAuth";
import Services from "./Components/Services/Services";

import Blogs from "./Components/Pages/Blogs";
import About from "./Components/Pages/About";
import Contact from "./Components/Pages/Contact";
import NotFound from "./Components/Pages/NotFound";

import Login from "./Components/Auth/Login";
import Registration from "./Components/Auth/Registration";
import ForgotPassword from "./Components/Auth/ForgotPassword";

import Booking from "./Components/Booking/Booking";
import MyBookings from "./Components/MyBookings/MyBookings";
import AdminDashboard from "./Components/Admin/AdminDashboard";

function App() {
  return (
    <div className="App">
      <NavBar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/services" element={<Services />} />
        <Route path="/blogs" element={<Blogs />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Registration />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route
          path="/booking/:bookingId"
          element={
            <RequireAuth>
              <Booking />
            </RequireAuth>
          }
        />
        <Route
          path="/my-bookings"
          element={
            <RequireAuth>
              <MyBookings />
            </RequireAuth>
          }
        />
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="*" element={<NotFound />} />
      </Routes>

      <Footer />
    </div>
  );
}

export default App;
