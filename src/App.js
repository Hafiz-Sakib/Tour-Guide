import "./App.css";
import { Routes, Route } from "react-router-dom";
import Home from "./Components/HomePage/Home";
import NavBar from "./Components/NavBar/NavBar";
import Footer from "./Components/Footer/Footer";
import Services from "./Components/Services/Services";
import Blogs from "./Components/Blogs/Blogs";
import About from "./Components/About Me/About";
import NotFound from "./Components/NotFound/NotFound";
import Login from "./Components/Login/Login";
import Registration from "./Components/Registration/Registration";
import Booking from "./Components/Booking/Booking";
import RequireAuth from "./Components/Auth/RequireAuth";

function App() {
  return (
    <div className="App">
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Services" element={<Services />} />
        <Route
          path="/Booking/:BookingId"
          element={
            <RequireAuth>
              <Booking />
            </RequireAuth>
          }
        />
        <Route path="/Blogs" element={<Blogs />}></Route>
        <Route path="/About" element={<About />}></Route>
        <Route path="/Login" element={<Login />}></Route>
        <Route path="/Registration" element={<Registration />}></Route>
        <Route path="*" element={<NotFound />}></Route>
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
