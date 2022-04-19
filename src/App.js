import "./App.css";
import { Routes, Route } from "react-router-dom";
import Home from "./Components/HomePage/Home";
import NavBar from "./Components/NavBar/NavBar";
import Footer from "./Components/Footer/Footer";
import Services from "./Components/Services/Service";
import Blogs from "./Components/Blogs/Blogs";
import About from "./Components/About Me/About";
import NotFound from "./Components/NotFound/NotFound";

function App() {
  return (
    <div className="App">
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Services" element={<Services />} />
        <Route path="/Blogs" element={<Blogs />}></Route>
        <Route path="/About" element={<About />}></Route>
        <Route path="*" element={<NotFound />}></Route>
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
