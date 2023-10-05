/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import axios from "axios";
import { Container, Row, Col } from "react-bootstrap";
import MovieItems from "../components/MovieItems";

const SearchMovies = () => {
  const [searchMovie, setsearchMovie] = useState([]);
  const [notFound, setNotFound] = useState();
  const [searchParams] = useSearchParams();
  const [errors, setErrors] = useState({
    isError: false,
    message: null,
  });
  const query = searchParams.get("query");

  useEffect(() => {
    const getSearch = async () => {
      try {
        // alert(query);
        // const page = 1;
        const response = await axios.get(
          `${
            import.meta.env.VITE_API_URL
          }/3/search/movie?query=${query}&include_adult=false&language=en-US&page=1`,
          {
            headers: {
              Authorization: `Bearer ${import.meta.env.VITE_API_AUTH_TOKEN}`,
            },
          }
        );
        const { data } = response;

        setNotFound(data?.total_results);
        setsearchMovie(data?.results);
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

    getSearch();
  }, [searchParams]); //errors dependency

  if (errors.isError) {
    return <h1>{errors.message}</h1>;
  }

  if (searchMovie.length === 0) {
    if (notFound === 0) {
      return (
        <h1 className="text-center mt-5 pt-5">&quot;{query}&quot; Not Found</h1>
      );
    }
    return <h1 className="text-center mt-5 pt-5">Searching</h1>;
  }

  return (
    <Container fluid>
      <Row>
        <h2 className="mt-5 p-5">Search Result &quot;{query}&quot; </h2>
      </Row>
      <Row className="g-3">
        {searchMovie.map((list) => (
          <Col md={3} className="pb-5" key={list?.id}>
            <MovieItems
              id={list?.id}
              title={list?.original_title}
              overview={list?.overview}
              imageURL={import.meta.env.VITE_API_IMAGE_URL + list?.poster_path}
            />
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default SearchMovies;
