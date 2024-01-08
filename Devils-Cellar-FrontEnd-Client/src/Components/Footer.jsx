import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebookF,
  faInstagram,
  faYoutube,
} from "@fortawesome/free-brands-svg-icons";
import NavBarFooter from "./NavBarFooter";
import FooterToast from "./Toasts/FooterToast";

const Footer = () => {
  const [inputFooter, setInputFooter] = useState("");

  return (
    <>
      <div className="fade-top"></div>
      <footer
        className="bg-dark text-light text-center pb-5"
        style={{
          position: "relative",
          backgroundImage: `url('${
            import.meta.env.VITE_BACKET_URL
          }/bg-footer.webp')`,
        }}
      >
        <div className="container position-relative">
          <div className="row">
            <div className="col-lg-6 mx-auto">
              <p className="follow-p">FOLLOW US</p>
              <div className="d-flex justify-content-center">
                <a href="enlace-de-tu-facebook" className="text-light mx-4 p-2">
                  <FontAwesomeIcon icon={faFacebookF} size="2x" />
                </a>
                <a href="enlace-de-tu-twitter" className="text-light mx-4 p-2">
                  <FontAwesomeIcon icon={faInstagram} size="2x" />
                </a>
                <a
                  href="enlace-de-tu-instagram"
                  className="text-light mx-4 p-2"
                >
                  <FontAwesomeIcon icon={faYoutube} size="2x" />
                </a>
              </div>
              <div className="mt-4 d-flex flex-column align-items-center">
                <p className="subscribe-p">
                  <span>SUBSCRIBE TO OUR </span>
                  <span className="newsletter">NEWSLETTER</span>
                </p>

                <div className="input-group input-container">
                  <input
                    type="email"
                    value={inputFooter}
                    onChange={(e) => setInputFooter(e.target.value)}
                    className="form-control rounded-start-pill p-3 input-footer"
                    placeholder="Insert your email..."
                  />
                  <FooterToast setInputFooter={setInputFooter} />
                </div>
              </div>
            </div>
          </div>
        </div>
        <p className="copyright">
          &copy; 2023 Devil's Cellar - Cecilia Ugartemendia - Marcelo Vidal -
          Mariana Melli - Patricio Torres{" "}
        </p>
        <NavBarFooter />
      </footer>
    </>
  );
};

export default Footer;
