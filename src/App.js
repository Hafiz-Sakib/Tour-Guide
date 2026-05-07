import "./App.css";
import { Routes, Route } from "react-router-dom";

import Home from "./Components/Home/Home";
import NavBar from "./Components/Navbar/Navbar";
import Footer from "./Components/Footer/Footer";
import { BrowserRouter as Router } from "react-router-dom";
import RequireAuth from "../src/Components/Auth/RequireAuth";
import Services from "./Components/Services/Services";

import Blogs from "./Components/Pages/Blogs";
import About from "./Components/Pages/About";
import Contact from "./Components/Pages/Contact";
import NotFound from "./Components/Pages/NotFound";

import Login from "./Components/Auth/Login";
import Registration from "./Components/Auth/Registration";

import Booking from "./Components/Booking/Booking";

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

        <Route
          path="/booking/:bookingId"
          element={
            <RequireAuth>
              <Booking />
            </RequireAuth>
          }
        />

        <Route path="*" element={<NotFound />} />
      </Routes>

      <Footer />
    </div>
  );
}

export default App;
