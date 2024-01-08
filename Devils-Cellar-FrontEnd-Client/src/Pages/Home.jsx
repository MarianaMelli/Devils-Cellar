import { useDispatch, useSelector } from "react-redux";
import "../App.css";
import FeaturedProducts from "../Components/FeaturedProducts";
import AgeVerificationModal from "../Components/VerificationModal";
import ResetDBModal from "../Components/ResetDBModal";
import { useEffect, useState } from "react";
import ResetDBtoast from "../Components/Toasts/ResetDBtoast";
import { toggleDatabaseToast } from "../Redux/PageSlice";

function Home() {
  const dispatch = useDispatch();

  const page = useSelector((state) => state.page);
  const [show, setShow] = useState(page.resetDB);
  const [showToast, setShowToast] = useState(false);
  useEffect(() => {
    if (page.databaseToast) {
      setShowToast(true);
      setTimeout(() => {
        setShowToast(false);
        dispatch(toggleDatabaseToast());
      }, 3000);
    }
  }, [page.databaseToast]);

  return (
    <div>
       {page.resetDB && <ResetDBModal show={show} setShow={setShow} />}
      {showToast && (
        <ResetDBtoast showToast={showToast} setShowToast={setShowToast} />
      )}
      {page.ageVerification && <AgeVerificationModal />}
      <header>
        <div className="video-bg">
          <video muted="muted" loop="loop" autoPlay="autoplay" playsInline>
            <source
              src="https://conchaytoro.com/content/uploads/2022/04/video-home_cyt_compress.mp4"
              type="video/mp4"
            ></source>
          </video>
        </div>
        <p className="slogan text-center text-white">
          Uncork your senses through our wine collection
        </p>
      </header>
      <FeaturedProducts />
    </div>
  );
}

export default Home;
