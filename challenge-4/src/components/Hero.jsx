/* eslint-disable react/prop-types */
import OwlCarousel from "react-owl-carousel";
import "../assets/css/hero.css";
import WatchTrailer from "./WatchTrailer";

const Hero = ({ rated }) => {
  return (
    <>
      <OwlCarousel
        className="owl-theme"
        autoplay
        autoplayTimeout={10000}
        loop
        margin={0}
        items={1}
        dotsEach={1}
      >
        {rated.map((movie) => (
          <div key={movie?.id} className="items">
            <img
              src={`https://image.tmdb.org/t/p/original${movie?.backdrop_path}`}
              alt={movie?.original_title}
              className=""
            />
            <div className="judul">
              <h1 className="pb-3">{movie?.title}</h1>
              <p className="pb-2">{movie?.overview}</p>
              <WatchTrailer id={movie?.id} />
            </div>
          </div>
        ))}
      </OwlCarousel>
    </>
  );
};

export default Hero;
