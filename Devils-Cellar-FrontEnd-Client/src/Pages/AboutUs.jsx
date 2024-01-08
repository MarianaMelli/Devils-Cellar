import React from "react";
import "../styles.css/AboutUs.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBootstrap,
  faCss3,
  faDiscord,
  faFigma,
  faGithub,
  faJs,
  faNodeJs,
  faReact,
  faTrello,
  faLinkedin,
  faHtml5,
} from "@fortawesome/free-brands-svg-icons";

function AboutUs() {
  return (
    <div className="about-us">
      <header
        className="header-bg-our-proyect"
        style={{
          backgroundImage: `url('${
            import.meta.env.VITE_BACKET_URL
          }/bg-our-proyect.webp')`,
        }}
      >
        <div className="about-our-p">
          <h1>ABOUT THIS PROJECT</h1>
        </div>
      </header>
      <div
        className="container-fluid image"
        style={{
          backgroundImage: `url('${
            import.meta.env.VITE_BACKET_URL
          }/about-paralax.jpg')`,
        }}
      >
        <div className="about-us-content-to-move">
          <div className="content-1">
            <h1 className="title-content">How it started</h1>
            <p>
              Devil's Cellar is an online shopping application made using the
              MERN stack. It was created as the final project during a Coding
              Bootcamp at{" "}
              <a
                href="https://ha.dev/cursos/bootcamp-desarrollo-web"
                target="_blank"
                className="about-link"
              >
                Hack Academy
              </a>
              , a specialized institution offering programming courses. The
              Bootcamp is an intense, immersive full-time program spanning three
              months and totaling 600 hours. Its main aim is to train students
              as Full Stack Developers. This project serves to demonstrate the
              practical use of the various technologies taught throughout the
              Bootcamp. Developed by a team of four students over three weeks,
              each student contributed approximately 150 hours. The app is fully
              functional, designed with user-friendliness and easy navigation in
              mind. This section provides insight into the journey behind the
              scenes of building Devil's Cellar and offers a comprehensive
              understanding of the app's development process.
            </p>
          </div>
        </div>
        <div className="about-us-content-to-move">
          <div className="content-2">
            <h1 className="title-content">Technologies and Tools</h1>
            <p>
              During the bootcamp, we explored a broad spectrum of technologies
              covering both back-end and front-end development. Our hands-on
              experience extended to working with databases and utilizing
              practical tools to streamline our work. To efficiently manage
              tasks within our team, we used Trello as our project management
              tool. We structured the project into three sprints, relying on
              Github as our main platform for collaboration. Discord played a
              pivotal role in maintaining seamless communication throughout the
              development phase. To enhance our productivity for this project,
              we specifically selected a set of tools.
            </p>
            <div className="pt-3">
              <div className="logos-container">
                <div className="logo">
                  <FontAwesomeIcon icon={faHtml5} className="fa-3x" />
                  <span>HTML</span>
                </div>
                <div className="logo">
                  <FontAwesomeIcon icon={faCss3} className="fa-3x" />
                  <span>CSS3</span>
                </div>
                <div className="logo">
                  <FontAwesomeIcon icon={faJs} className="fa-3x" />
                  <span>JS</span>
                </div>
                <div className="logo">
                  <FontAwesomeIcon icon={faBootstrap} className="fa-3x" />
                  <span>Boostrap</span>
                </div>
                <div className="logo">
                  <FontAwesomeIcon icon={faFigma} className="fa-3x" />
                  <span>Figma</span>{" "}
                </div>
                <div className="logo">
                  <FontAwesomeIcon icon={faGithub} className="fa-3x" />
                  <span>GitHub</span>
                </div>
                <div className="logo">
                  <img
                    src={`${import.meta.env.VITE_BACKET_URL}/mongodb-logo.png`}
                    alt="redux logo"
                    className="logo-img"
                  />
                  <span>MongoDB</span>
                </div>
                <div className="logo">
                  <FontAwesomeIcon icon={faNodeJs} className="fa-3x" />
                  <span>NodeJs</span>
                </div>
                <div className="logo">
                  <FontAwesomeIcon icon={faReact} className="fa-3x" />
                  <span>React.js</span>
                </div>
                <div className="logo">
                  <FontAwesomeIcon icon={faTrello} className="fa-3x" />
                  <span>Trello</span>
                </div>
                <div className="logo">
                  <img
                    src={`${import.meta.env.VITE_BACKET_URL}/redux-icon.png`}
                    alt="redux logo"
                    className="logo-img"
                  />
                  <span>Redux</span>
                </div>
                <div className="express-logo">
                  <img
                    src={`${import.meta.env.VITE_BACKET_URL}/express-logo.png`}
                    alt="express logo"
                    className="express-img"
                  />
                  <span>Express</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="about-us-content-to-move">
          <div className="content-3">
            <h1 className="title-content">Project Design</h1>
            <p>
              In drawing inspiration from websites like "Concha y Toro" and
              "Casillero del Diablo," we sought to incorporate elements that
              resonated with their successful design and user interface
              approaches. These renowned websites served as valuable references,
              guiding our design principles and aesthetic choices for Devil's
              Cellar. By analyzing their layout, navigation, visual elements,
              and overall user experience, we aimed to imbue our e-commerce app
              with similar qualities of elegance, ease of use, and engagement.
              Elements such as compelling imagery, intuitive navigation,
              detailed product showcases, and seamless user journeys were
              elements we sought to emulate, ensuring our platform would evoke
              the same allure and captivation that these established brands
              deliver through their online presence.
            </p>
          </div>
        </div>
        <div className="about-us-content-box">
          <div className="content-4">
            <h1 className="title-content">Project Organization - MER</h1>
            <p>
              Our main goal was to establish the foundational requirements for
              the backend before moving forward. We began by outlining the
              primary tasks and then meticulously crafted an entity relationship
              diagram. This diagram specifically outlined the core connections
              between various entities such as Users, Products, Orders,
              Categories, and Admins
            </p>
            <div className="mer">
              <img
                className="mer-image"
                src={`${import.meta.env.VITE_BACKET_URL}/mer-bg.png`}
                alt="MER"
              />
              <img
                className="mer-image"
                src={`${import.meta.env.VITE_BACKET_URL}/mer2-bg.png`}
                alt="MER"
              />
            </div>
          </div>
        </div>
        <div className="about-us-content-box">
          <div className="content-5">
            <h1 className="title-content">Admin Dashboard</h1>
            <p>
              In our e-commerce platform, we provide an admin panel dashboard
              that enables users to delete, update, or create products,
              categories, and customers. Additionally, they can monitor order
              statuses and make necessary modifications.
            </p>
            <div className="admin-dash">
              <img
                className="admin-image"
                src={`${import.meta.env.VITE_BACKET_URL}/dashboard-admin.png`}
                alt="admin-dashboard"
              />
            </div>
            <div className="admin-dash">
              <h2 className="my-4">
                To test our Admin dashboard, you can follow these steps:
              </h2>
              <div className="w-60">
                <p>
                  1. Visit{" "}
                  <a
                    href={`${import.meta.env.VITE_ADMIN_URL}`}
                    target="_blank"
                    className="about-link"
                  >
                    our admin login page.
                  </a>
                </p>
                <p>2. Use the email address "admin@test.com" as your email.</p>
                <p>3. Input "1234" as the password.</p>
                <p>4.Click on the login button or submit the form.</p>
              </div>
              <h4 className="mt-4 w-60 text-center ">
                Now you can access the admin dashboard with the provided login
                data. Happy testing!
              </h4>
            </div>
          </div>
        </div>
        <div className="about-us-content-box">
          <div className="content-6">
            <h1 className="title-content our-team-title">Our Team</h1>
            <div className="team">
              <div className="team-member">
                <div className="team-member-image-container">
                  <img
                    src={`${import.meta.env.VITE_BACKET_URL}/bg-ceci.png`}
                    alt="Cecilia's profile image"
                    className="team-member-image image-ceci"
                  />
                </div>
                <div className="text-center d-flex align-items-center flex-column">
                  <h4 className="team-member-name">Cecilia Ugartemendia</h4>
                  Full Stack Web Developer
                  <div className="team-socials">
                    <a
                      href="https://www.linkedin.com/in/cecilia-ugartemendia/"
                      target="_blank"
                    >
                      <FontAwesomeIcon
                        icon={faLinkedin}
                        className="fs-3 mx-3"
                      />
                    </a>
                    <a href="https://github.com/Ceciliaugarte" target="_blank">
                      {" "}
                      <FontAwesomeIcon icon={faGithub} className="fs-3 mx-3" />
                    </a>
                  </div>
                </div>
              </div>
              <div className="team-member">
                <div className="team-member-image-container">
                  <img
                    src={`${import.meta.env.VITE_BACKET_URL}/marcelo.png`}
                    alt="Marcelo's profile image"
                    className="team-member-image"
                  />
                </div>
                <div className="text-center d-flex align-items-center flex-column">
                  <h4 className="team-member-name">Marcelo Vidal</h4>
                  Full Stack Web Developer
                  <div className="team-socials">
                    <a
                      href="https://www.linkedin.com/in/vidal-marcelo/"
                      target="_blank"
                    >
                      <FontAwesomeIcon
                        icon={faLinkedin}
                        className="fs-3 mx-3"
                      />
                    </a>
                    <a href="https://github.com/VidalMarcelo" target="_blank">
                      {" "}
                      <FontAwesomeIcon icon={faGithub} className="fs-3 mx-3" />
                    </a>
                  </div>
                </div>
              </div>
              <div className="team-member">
                <div className="team-member-image-container">
                  <img
                    src={`${import.meta.env.VITE_BACKET_URL}/mariana.png`}
                    alt="Mariana's profile image"
                    className="team-member-image"
                  />
                </div>
                <div className="text-center d-flex align-items-center flex-column">
                  <h4 className="team-member-name">Mariana Melli</h4>
                  Full Stack Web Developer
                  <div className="team-socials">
                    <a
                      href="https://www.linkedin.com/in/mariana-melli/"
                      target="_blank"
                    >
                      <FontAwesomeIcon
                        icon={faLinkedin}
                        className="fs-3 mx-3"
                      />
                    </a>
                    <a href="https://github.com/MarianaMelli" target="_blank">
                      {" "}
                      <FontAwesomeIcon icon={faGithub} className="fs-3 mx-3" />
                    </a>
                  </div>
                </div>
              </div>
              <div className="team-member">
                <div className="team-member-image-container">
                  <img
                    src={`${import.meta.env.VITE_BACKET_URL}/patricio.png`}
                    alt="Patricio's profile image"
                    className="team-member-image"
                  />
                </div>
                <div className="text-center d-flex align-items-center flex-column">
                  <h4 className="team-member-name">Patricio Torres</h4>
                  Full Stack Web Developer
                  <div className="team-socials">
                    <a
                      href="https://www.linkedin.com/in/patricio-torres/"
                      target="_blank"
                    >
                      <FontAwesomeIcon
                        icon={faLinkedin}
                        className="fs-3 mx-3"
                      />
                    </a>
                    <a href="https://github.com/patoo15" target="_blank">
                      {" "}
                      <FontAwesomeIcon icon={faGithub} className="fs-3 mx-3" />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AboutUs;
