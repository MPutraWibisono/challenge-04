/* eslint-disable react-hooks/exhaustive-deps */
import { Container, Row, Col } from "react-bootstrap";
import Hero from "../components/Hero";
import MovieItems from "../components/MovieItems";
import axios from "axios";
import { useEffect, useState } from "react";
import { AiOutlineArrowDown } from "react-icons/ai";

const Home = () => {
  const [popularMovies, setPopularMovies] = useState([]);
  const [show, setShow] = useState(false);
  const [errors, setErrors] = useState({
    isError: false,
    message: null,
  });

  useEffect(() => {
    const getPopularMovies = async () => {
      try {
        const response = await axios.get(
          `${
            import.meta.env.VITE_API_URL
          }/3/movie/popular?language=en-US&page=1`,
          {
            headers: {
              Authorization: `Bearer ${import.meta.env.VITE_API_AUTH_TOKEN}`,
            },
          }
        );
        const { data } = response;

        setPopularMovies(data?.results);
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

    getPopularMovies();
  }, []); //errors dependency

  if (errors.isError) {
    return <h1>{errors.message}</h1>;
  }

  if (popularMovies.length === 0) {
    return <h1 className="text-center mt-5 pt-5">Please wait</h1>;
  }

  let fullPopulars;
  switch (show) {
    case true:
      fullPopulars = popularMovies;
      break;
    default:
      fullPopulars = popularMovies.slice(0, 4);
      break;
  }

  return (
    <>
      <Hero />
      <Container fluid>
        <Row className="py-3 mt-4">
          <Col>
            <h1>Popular Movies</h1>
          </Col>
          <Col className="text-end">
            <button
              id="arrow"
              className="btn btn-link text-decoration-none text-danger"
              onClick={() => {
                setShow(!show);
              }}
            >
              See All Movie{" "}
              <span
                style={{
                  transition: "transform 0.5s",
                  display: "inline-block",
                  transform: show ? "rotate(180deg)" : "rotate(0deg)",
                }}
              >
                <AiOutlineArrowDown />
              </span>
            </button>
          </Col>
        </Row>
      </Container>
      <Container fluid>
        <Row className="g-3">
          {fullPopulars.map((popular) => (
            <Col md={3} className="pb-5" key={popular?.id}>
              <MovieItems
                id={popular?.id}
                title={popular?.title}
                overview={popular?.overview}
                imageURL={
                  import.meta.env.VITE_API_IMAGE_URL + popular?.poster_path
                }
              />
            </Col>
          ))}
        </Row>
      </Container>
    </>
  );
};

export default Home;
