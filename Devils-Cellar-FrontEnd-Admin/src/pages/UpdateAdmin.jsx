import { useEffect, useState } from "react";
import "../Forms.css";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import axios from "axios";
import AdminUpdateToast from "../Components/Toasts/AdminUpdateToast";

function UpdateAdmin() {
  const admin = useSelector((state) => state.admin);
  const params = useParams();
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [avatar, setAvatar] = useState("");

  const [showToast, setShowToast] = useState(false);

  useEffect(() => {
    const getAdmin = async () => {
      const response = await axios({
        method: "GET",
        url: `${import.meta.env.VITE_API_URL}/admins/${params.id}`,
        headers: {
          Authorization: `Bearer ${admin.token}`,
        },
      });

      setFirstname(response.data.firstname);
      setLastname(response.data.lastname);
      setEmail(response.data.email);
      setAvatar(response.data.avatar);
    };
    getAdmin();
  }, []);

  const handleUpdateAdmin = async (e) => {
    e.preventDefault();

    try {
      e.preventDefault();
      const newFormData = new FormData(e.target);
      await axios({
        method: "PATCH",
        url: `${import.meta.env.VITE_API_URL}/admins/${params.id}`,
        data: newFormData,
        headers: {
          "content-type": "multipart/form-data",
          Authorization: `Bearer ${admin.token}`,
        },
      });
    } catch (error) {
      console.log(error);
    }
    setShowToast(true);
    setTimeout(() => {
      setShowToast(false);
    }, 3000);
  };

  return (
    firstname && (
      <div className="admin-form dashboard-forms">
        <h1 className="forms-header">UPDATE ADMIN</h1>
        <form className="rounded form-container" onSubmit={handleUpdateAdmin}>
          <div className="mb-3">
            <div className="d-flex align-items-center">
              <img
                src={
                  avatar.includes("blob:")
                    ? avatar
                    : `${import.meta.env.VITE_BACKET_URL}/${avatar}`
                }
                alt="admin avatar"
                className="profile-avatar"
              />
              <input
                type="file"
                className="form-control"
                id="avatar"
                placeholder="Sin archivos Seleccionados"
                name="avatar"
                onChange={(e) => {
                  const file = URL.createObjectURL(e.target.files[0]);
                  setAvatar(file);
                }}
              />
            </div>
          </div>
          <div className="mb-3">
            <label htmlFor="firstname" id="firstname" className="form-label">
              Firstname:
            </label>
            <input
              type="text"
              className="form-control"
              name="firstname"
              value={firstname}
              onChange={(e) => setFirstname(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="lastname" id="lastname" className="form-label">
              Lastname:
            </label>
            <input
              type="text"
              className="form-control"
              name="lastname"
              value={lastname}
              onChange={(e) => setLastname(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="email" id="email" className="form-label">
              Email:
            </label>
            <input
              type="text"
              className="form-control"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="button-container">
            <button className="forms-button" type="submit">
              UPDATE
            </button>
          </div>
        </form>
        {showToast && (
          <AdminUpdateToast showToast={showToast} setShowToast={setShowToast} />
        )}
      </div>
    )
  );
}

export default UpdateAdmin;
