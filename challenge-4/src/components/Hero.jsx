/* eslint-disable react/prop-types */
import OwlCarousel from "react-owl-carousel";
import "../assets/css/hero.css";
import axios from "axios";
import { useEffect, useState } from "react";
import WatchTrailer from "./WatchTrailer";
// import ReactPlayer from "react-player";

const Hero = () => {
  const [rated, setRated] = useState([]);

  useEffect(() => {
    const getRatedMovies = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/3/account/${
            import.meta.env.VITE_API_MY_ID
          }/favorite/movies?language=en-US&page=1&sort_by=created_at.asc`,
          {
            headers: {
              Authorization: `Bearer ${import.meta.env.VITE_API_AUTH_TOKEN}`,
            },
          }
        );
        const { data } = response;
        // console.log(data?.results);
        setRated(data?.results);
      } catch (error) {
        if (axios.isAxiosError(error)) {
          alert(error?.response?.data?.status_message);
          return;
        }
        alert(error?.message);
      }
    };
    getRatedMovies();
  }, []);
  // if (rated.length === 0) {
  //   return <h1>Loading...</h1>;
  // }
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
              <h1 className="pb-3">{movie?.original_title}</h1>
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
