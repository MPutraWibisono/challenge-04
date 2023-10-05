/* eslint-disable react/prop-types */
/* eslint-disable react-hooks/exhaustive-deps */
import axios from "axios";
import { useEffect, useState } from "react";
import { AiOutlinePlayCircle } from "react-icons/ai";

const WatchTrailer = ({ id }) => {
  const [trailer, setTrailer] = useState([]);

  const [errors, setErrors] = useState({
    isError: false,
    message: null,
  });

  useEffect(() => {
    const getTrailer = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/3/movie/${id}/videos?language=en-US`,
          {
            headers: {
              Authorization: `Bearer ${import.meta.env.VITE_API_AUTH_TOKEN}`,
            },
          }
        );
        const { data } = response;

        setTrailer(data?.results);
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

    getTrailer();
  }, []); //errors dependency

  if (errors.isError) {
    return <h1>{errors.message}</h1>;
  }

  if (trailer.length === 0) {
    return <h1 className="text-center mt-5 pt-5">Please wait</h1>;
  }
  //   console.log(trailer);
  let trailerKey = null;
  for (const result of trailer) {
    if (result.type === "Trailer") {
      trailerKey = result.key;
      break;
    } else {
      trailerKey = result.key;
    }
  }

  return (
    <>
      <a
        href={`https://www.youtube.com/watch?v=${trailerKey}`}
        target="_blank"
        rel="noopener noreferrer"
        className="text-decoration-none"
      >
        <button className="btn btn-danger rounded-pill d-flex align-items-center column-gap-1">
          <AiOutlinePlayCircle />
          WATCH TRAILER
        </button>
      </a>
    </>
  );
};

export default WatchTrailer;
