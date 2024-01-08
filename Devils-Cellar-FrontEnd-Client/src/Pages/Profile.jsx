import "../styles.css/Profile.css";
import React, { useState } from "react";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { updateUser } from "../Redux/UserSlice";
import ProfileToast from "../Components/Toasts/ProfileToast";

function Profile() {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const [avatar, setAvatar] = useState("");
  const [firstname, setFirstname] = useState(user.firstname);
  const [lastname, setLastname] = useState(user.lastname);
  const [address, setAddress] = useState(user.address);
  const [phone, setPhone] = useState(user.phone);
  const [email, setEmail] = useState(user.email);
  const [showToast, setShowToast] = useState(false);

  const handleProfile = async (e) => {
    e.preventDefault();

    try {
      const newFormData = new FormData(e.target);
      const response = await axios({
        method: "PATCH",
        url: `${import.meta.env.VITE_API_URL}/users/${user.id}`,
        data: newFormData,
        headers: {
          "content-type": "multipart/form-data",
          Authorization: `Bearer ${user.token}`,
        },
      });

      console.log("User created successfully");
      dispatch(updateUser(response.data));
    } catch (error) {
      console.log(error);
    }
    setShowToast(true);
    setTimeout(() => {
      setShowToast(false);
    }, 3000);
  };

  return (
    <>
      <div
        className="bg-profile"
        style={{
          backgroundImage: `url('${
            import.meta.env.VITE_BACKET_URL
          }/bacgroundAboutUs.jpg')`,
        }}
      >
        <header
          className="bg"
          style={{
            backgroundImage: `url('${
              import.meta.env.VITE_BACKET_URL
            }/profile-header.jpg')`,
          }}
        >
          <div className="info-text">
            <h2 className="title">PROFILE</h2>
          </div>
        </header>
        <div className="container pt-5">
          <div className="container-profile">
            <div className="profiles">
              <form className="form-profile" onSubmit={handleProfile}>
                <h2 className="titulo pb-3">ACCOUNT DETAILS</h2>
                <div className="mb-3">
                  <div className="d-flex align-items-center">
                    <img
                      src={
                        avatar.includes("blob:")
                          ? avatar
                          : `${import.meta.env.VITE_BACKET_URL}/${user.avatar}`
                      }
                      alt="img"
                      className="profile-avatar"
                    />
                    <input
                      type="file"
                      className="form-control"
                      id="avatar"
                      placeholder="Sin archivos Seleccionados"
                      name="avatar"
                      onChange={(e) => setAvatar(e.target.files[0])}
                    />
                  </div>
                </div>
                <div className="form-group ">
                  <label>Firstname :</label>
                  <input
                    type="text"
                    className="form-control"
                    name="firstname"
                    value={firstname}
                    onChange={(e) => setFirstname(e.target.value)}
                  />
                </div>
                <div className="form-group">
                  <label>Lastname :</label>
                  <input
                    type="text"
                    className="form-control"
                    name="lastname"
                    value={lastname}
                    onChange={(e) => setLastname(e.target.value)}
                  />
                </div>
                <div className="form-group">
                  <label>Address :</label>
                  <input
                    type="text"
                    className="form-control"
                    name="address"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                  />
                </div>
                <div className="form-group">
                  <label>Phone :</label>
                  <input
                    type="text"
                    className="form-control"
                    name="phone"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                  />
                </div>
                <div className="form-group">
                  <label>Email :</label>
                  <input
                    type="email"
                    className="form-control"
                    name="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>

                <button type="submit">Save changes</button>
              </form>
              <form className="card-profile">
                <h2 className="titulo pb-3">MY PAYMENT METHODS</h2>

                <div className="form-group">
                  <label>Type :</label>
                  <input
                    type="text"
                    className="form-control"
                    name="type"
                    value="Credit Card"
                    readOnly
                  />
                </div>
                <div className="form-group card-details">
                  <div>
                    {" "}
                    <label>Card number :</label>
                    <input
                      type="text"
                      className="form-control"
                      name="card-number"
                      value="9876-5432-1234-5678"
                      readOnly
                    />
                  </div>
                  <div>
                    <label>Card holder :</label>
                    <input
                      type="text"
                      className="form-control"
                      name="card-holder"
                      value={`${firstname} ${lastname}`}
                      readOnly
                    />
                  </div>
                </div>
                <div className="form-group card-details">
                  <div>
                    <label>Expiration date :</label>
                    <input
                      type="text"
                      className="form-control"
                      name="expiration-date"
                      value="MM/YYYY"
                      readOnly
                    />
                  </div>

                  <div>
                    <label>CVV :</label>
                    <input
                      type="email"
                      className="form-control"
                      name="cvv"
                      value="456"
                      readOnly
                    />
                  </div>
                </div>

                <button type="submit">Save changes</button>
              </form>
            </div>
          </div>
        </div>
      </div>
      {showToast && (
        <ProfileToast showToast={showToast} setShowToast={setShowToast} />
      )}
    </>
  );
}

export default Profile;
