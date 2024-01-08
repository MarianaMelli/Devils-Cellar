import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCan, faCirclePlus } from "@fortawesome/free-solid-svg-icons";
import { faPenToSquare } from "@fortawesome/free-regular-svg-icons";
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import AdminDeleteToast from "./Toasts/AdminDeleteToast";

function AdminsTable() {
  const admin = useSelector((state) => state.admin);
  const [admins, setAdmins] = useState([]);
  const navigate = useNavigate();

  const [showToast, setShowToast] = useState(false);

  const handleDeleteAdmin = async (id) => {
    await axios({
      method: "DELETE",
      url: `${import.meta.env.VITE_API_URL}/admins/${id}`,
      headers: {
        Authorization: `Bearer ${admin.token}`,
      },
    });
    setShowToast(true);
    setTimeout(() => {
      setShowToast(false);
    }, 3000);
  };
  useEffect(() => {
    const getAdmins = async () => {
      try {
        const response = await axios({
          method: "GET",
          url: `${import.meta.env.VITE_API_URL}/admins`,
          headers: {
            Authorization: `Bearer ${admin.token}`,
          },
        });

        setAdmins(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    getAdmins();
  }, [handleDeleteAdmin]);

  return (
    <div className="admins-bg table-container">
      <h1 className="tables-header">
        ADMINISTRATORS{" "}
        <FontAwesomeIcon
          icon={faCirclePlus}
          style={{ cursor: "pointer", fontSize: "3rem" }}
          onClick={() => navigate("/new-admin")}
        />
      </h1>
      <div className="admin-table">
        <table className="table table-hover text-center align-middle rounded rounded-3 overflow-hidden dashboard-table">
          <thead className="align-middle">
            <tr>
              <th scope="col" className="admins-table-header header">
                Id
              </th>
              <th scope="col" className="admins-table-header header">
                Firstname
              </th>
              <th scope="col" className="admins-table-header header">
                Lastname
              </th>
              <th scope="col" className="admins-table-header header">
                Email
              </th>
              <th scope="col" className="admins-table-header header">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {admins.map((admin) => (
              <tr key={admin.id} className="table-content">
                <th scope="row">{admin.id}</th>
                <td>{admin.firstname}</td>
                <td>{admin.lastname}</td>
                <td>{admin.email}</td>

                <td>
                  {admin.email !== "admin@test.com" && (
                    <>
                      <FontAwesomeIcon
                        icon={faPenToSquare}
                        style={{
                          color: "#5d5dff",
                          marginRight: "1rem",
                          cursor: "pointer",
                        }}
                        onClick={() => navigate(`/update-admin/${admin.id}`)}
                      />

                      <FontAwesomeIcon
                        icon={faTrashCan}
                        onClick={() => handleDeleteAdmin(admin.id)}
                        style={{ color: "grey", cursor: "pointer" }}
                      />
                    </>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {showToast && (
        <AdminDeleteToast showToast={showToast} setShowToast={setShowToast} />
      )}
    </div>
  );
}

export default AdminsTable;
