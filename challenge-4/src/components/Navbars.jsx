/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import {
  Navbar,
  Container,
  Nav,
  InputGroup,
  Form,
  Button,
} from "react-bootstrap";
import { Link } from "react-router-dom";
import "../assets/css/navbar.css";
import { BsSearch } from "react-icons/bs";
import { useState } from "react";
// import { useSearchParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const Navbars = () => {
  const [value, setValue] = useState("");
  const navigate = useNavigate();
  // const [searchParams, setSearchParams] = useSearchParams();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!value) return alert("Isi dulu masse!!");
    // setSearchParams({ query: value });

    navigate(`/search/?query=${value}`);
  };

  return (
    <>
      <Navbar bg="transparent " fixed="top">
        <Container fluid className="d-flex justify-content-between px-5 ">
          <Navbar.Brand className="" href="/">
            Movielist
          </Navbar.Brand>
          <Form
            onSubmit={handleSubmit}
            className="mb-3 pt-3 d-flex justify-content-center w-50"
          >
            <Form.Control
              placeholder="What do you want to watch?"
              aria-label="What do you want to watch?"
              className=" border rounded-start-pill border-end-0 border-danger bg-transparent"
              onChange={(e) => setValue(e.target.value)}
            />
            <Button
              type="submit"
              className="border rounded-end-pill border-start-0 border-danger bg-transparent"
            >
              <BsSearch color="white" />
            </Button>
          </Form>
          <Nav className="d-flex">
            <Link to={"/register"} className="disabled-link">
              {/*izin di disabled dulu buttonnya 🙏:)*/}
              <button className="btn btn-outline-danger rounded-pill me-2">
                Login
              </button>
            </Link>
            <Link to={"/register"} className="disabled-link">
              {/*izin di disabled dulu buttonnya 🙏:)*/}
              <button className="btn btn-danger rounded-pill text-decoration-none text-light">
                Register
              </button>
            </Link>
          </Nav>
        </Container>
      </Navbar>
    </>
  );
};

export default Navbars;
