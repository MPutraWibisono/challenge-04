/* eslint-disable react-hooks/exhaustive-deps */
import OwlCarousel from "react-owl-carousel";
import { useParams } from "react-router-dom";
// import { AiOutlinePlayCircle } from "react-icons/ai";
import WatchTrailer from "../components/WatchTrailer";
import { useEffect, useState } from "react";
import "../assets/css/hero.css";
import axios from "axios";
// import ReactPlayer from "react-player";

export const DetailsMovie = () => {
  const { movieId } = useParams();
  const [detailsMovie, setDetailsMovie] = useState([]);
  const [errors, setErrors] = useState({
    isError: false,
    message: null,
  });

  useEffect(() => {
    const getDetailsMovie = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/3/movie/${movieId}?language=en-US`,
          {
            headers: {
              Authorization: `Bearer ${import.meta.env.VITE_API_AUTH_TOKEN}`,
            },
          }
        );
        const { data } = response;
        // console.log([data]);
        setDetailsMovie([data]);
        setErrors({ ...errors, isError: false });
      } catch (error) {
        if (axios.isAxiosError(error)) {
          setErrors({
            ...errors,
            isError: true,
            message: error?.response?.data?.status_message || error?.message,
          });
          return;
        }

        alert(error?.message);
        setErrors({
          ...errors,
          isError: true,
          message: error?.message,
        });
      }
    };

    getDetailsMovie();
  }, []); //errors dependency

  if (errors.isError) {
    return <h1>{errors.message}</h1>;
  }

  if (detailsMovie.length === 0) {
    return <h1 className="text-center mt-5 pt-5">Please wait</h1>;
  }

  // console.log(detailsMovie);
  let action = [];
  const handleAction = () => {
    detailsMovie[0]?.genres.map((genre) => action.push(genre?.name));
  };
  handleAction();

  return (
    <OwlCarousel
      className="owl-theme"
      // autoplay
      // autoplayTimeout={10000}
      // loop
      mouseDrag={false}
      margin={0}
      items={1}
      dotsEach={1}
    >
      {detailsMovie.map((movie) => (
        <div key={movie?.id} className="items">
          <img
            src={`https://image.tmdb.org/t/p/original${movie?.backdrop_path}`}
            alt={movie?.original_title}
            className=""
          />
          <div className="judul">
            <h1 className="pb-3">{movie?.title}</h1>
            <p className="pb-2">{action.join(", ")}</p>
            <p className="pb-2">{movie?.overview}</p>
            <p>⭐{movie?.vote_average}/10</p>
            <WatchTrailer id={movie?.id} />
          </div>
        </div>
      ))}
    </OwlCarousel>
  );
};
