import { faChartLine } from "@fortawesome/free-solid-svg-icons";
import { faBookmark, faGem } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";

function DashboardPanel() {
  return (
    <div className="dashboard-panel-bg ">
      <div className="box-dashboard">
        <div className="weekly-sales card-dashboard">
          <h2 className="text-center pb-4 border-bottom">
            Weekly Sales
            <span className="ms-4">
              <FontAwesomeIcon icon={faChartLine} />
            </span>
          </h2>
          <h3 className="text-center mt-5 fw-bold">15.000 UYU</h3>
          <h5 className="text-center mt-5">Increased by 60%</h5>
        </div>
        <div className="weekly-orders card-dashboard">
          <h2 className="text-center pb-4 border-bottom">
            Weekly Orders
            <span className="ms-4">
              <FontAwesomeIcon icon={faBookmark} />
            </span>
          </h2>
          <h3 className="text-center mt-5 fw-bold">45.633</h3>
          <h5 className="text-center mt-5">Decreased by 10%</h5>
        </div>
        <div className="visitors-online card-dashboard">
          <h2 className="text-center pb-4 border-bottom">
            Visitors Online
            <span className="ms-4">
              <FontAwesomeIcon icon={faGem} />
            </span>
          </h2>
          <h3 className="text-center mt-5 fw-bold">104.005</h3>
          <h5 className="text-center mt-5">Increased by 5%</h5>
        </div>
      </div>
    </div>
  );
}

export default DashboardPanel;
