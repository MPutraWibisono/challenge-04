import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Register from "./pages/Register";
import Navbar from "./components/Navbars";
import Footer from "./components/Footer";
import SearchMovies from "./pages/SearchMovie";
import { DetailsMovie } from "./pages/DetailsMovie";
// import { useState } from "react";

const App = () => {
  // const [searchQuery, setsearchQuery] = useState("");

  // const handleSearch = (cari) => {
  //   setsearchQuery(cari);
  // };

  return (
    <>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/search" element={<SearchMovies />} />
          <Route path="/register" element={<Register />} />
          <Route path="/details/:movieId" element={<DetailsMovie />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </>
  );
};

export default App;
