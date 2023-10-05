import { Button } from "react-bootstrap";
// import { Link } from "react-router-dom";
import { useState } from "react";
import { AiOutlineArrowUp } from "react-icons/ai";
import "../assets/css/footer.css";

const Footer = () => {
  const [visible, setVisible] = useState(false);

  const toggleVisible = () => {
    const scrolled = document.documentElement.scrollTop;
    if (scrolled > 300) {
      setVisible(true);
    } else if (scrolled <= 300) {
      //   setVisible(false);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };
  window.addEventListener("scroll", toggleVisible);

  const footer = document.querySelector("footer");
  if (footer) {
    // Memeriksa apakah elemen <footer> ditemukan
    window.addEventListener("scroll", function () {
      if (window.scrollY > 10) {
        footer.classList.remove("d-none");
      } else {
        footer.classList.add("d-none");
      }
    });
  }

  return (
    <>
      <footer className="bg-transparent footer d-none">
        <div className="container">
          <div className="row">
            <div className="col d-flex align-items-center">
              <a href="/" className="text-decoration-none ">
                <p className="brands m-0">Movielist</p>
              </a>
            </div>
            <div className="col d-flex align-items-center justify-content-center">
              <Button
                onClick={scrollToTop}
                className=" btn-danger rounded-pill d-flex align-items-center column-gap-1 "
                style={{ display: visible ? "inline" : "none" }}
              >
                <AiOutlineArrowUp />
                Back to the Top
              </Button>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;
