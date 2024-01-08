import React, { useEffect, useState } from "react";
import "../styles.css/Buttons.css";
import { useNavigate } from "react-router-dom";
import Cart from "../Components/Cart";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowUp, faWineGlassEmpty } from "@fortawesome/free-solid-svg-icons";

function Buttons() {
  const navigate = useNavigate();
  const [showButton, setShowButton] = useState(false);

  const handleScroll = () => {
    const isTop = window.scrollY < 100;
    setShowButton(!isTop);
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    const scrollHandler = () => {
      handleScroll();
    };
    window.onscroll = scrollHandler;
    return () => {
      window.onscroll = null;
    };
  }, []);

  return (
    <div className="buttons-fixed">
      <div className="icon-button">
        <FontAwesomeIcon
          onClick={() => {
            navigate("/our-wines");
            scrollToTop();
          }}
          icon={faWineGlassEmpty}
          style={{
            fontSize: "1.8rem",
            cursor: "pointer",
            "@media (max-width: 767px)": {
              fontSize: "0.5rem",
            },
          }}
        />
      </div>
      <div className="icon-button">
        <p
          className="btn-about text-center pt-3"
          onClick={() => {
            navigate("/about-this-project");
            scrollToTop();
          }}
          style={{ cursor: "pointer" }}
        >
          ABOUT THIS PROJECT
        </p>
      </div>
      <div className="icon-button">
        <Cart placement={"end"} name={"end"} />
      </div>
      <div className="icon-button">
        <a
          className="btn-about text-center text-decoration-none"
          href={`${import.meta.env.VITE_ADMIN_URL}`}
          target="_blank"
        >
          ADMIN
        </a>
      </div>
      {showButton && (
        <div className="arrow arrow-color" onClick={scrollToTop}>
          <FontAwesomeIcon
            icon={faArrowUp}
            style={{
              fontSize: "1.8rem",
              cursor: "pointer",
              "@media (max-width: 767px)": {
                fontSize: "0.5rem",
              },
            }}
          />
        </div>
      )}
    </div>
  );
}

export default Buttons;
