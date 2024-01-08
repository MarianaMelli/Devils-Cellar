import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCan } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import UserDeleteToast from "./Toasts/UserDeleteToast";

function ClientsTable() {
  const [users, setUsers] = useState([]);
  const admin = useSelector((state) => state.admin);

  const [showToast, setShowToast] = useState(false);

  const handleDeleteUser = async (id) => {
    try {
      await axios({
        method: "DELETE",
        url: `${import.meta.env.VITE_API_URL}/users/${id}`,
        headers: {
          Authorization: `Bearer ${admin.token}`,
        },
      });
      console.log(`The user with id: ${id} was deleted`);
    } catch (error) {
      console.log(error);
    }

    setShowToast(true);
    setTimeout(() => {
      setShowToast(false);
    }, 3000);
  };

  useEffect(() => {
    const getClients = async () => {
      try {
        const response = await axios({
          method: "GET",
          url: `${import.meta.env.VITE_API_URL}/users`,
          headers: {
            Authorization: `Bearer ${admin.token}`,
          },
        });

        setUsers(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    getClients();
  }, [handleDeleteUser]);

  return (
    <div className="clients-bg table-container">
      <h1 className="tables-header">CLIENTS</h1>
      <div className="clients-table">
        <table className="table table-hover text-center align-middle rounded rounded-3 overflow-hidden dashboard-table">
          <thead className="align-middle">
            <tr>
              <th scope="col" className="clients-table-header header">
                Id
              </th>
              <th scope="col" className="clients-table-header header">
                Firstname
              </th>
              <th scope="col" className="clients-table-header header">
                Lastname
              </th>
              <th scope="col" className="clients-table-header header">
                Email
              </th>
              <th scope="col" className="clients-table-header header">
                Address
              </th>
              <th scope="col" className="clients-table-header header">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id} className="table-content">
                <th scope="row">{user.id}</th>
                <td>{user.firstname}</td>
                <td>{user.lastname}</td>
                <td>{user.email}</td>
                <td>{user.address}</td>
                <td>
                  {user.email !== "user@test.com" && (
                    <FontAwesomeIcon
                      icon={faTrashCan}
                      style={{
                        color: "grey",
                        marginRight: "1rem",
                        cursor: "pointer",
                      }}
                      onClick={() => handleDeleteUser(user.id)}
                    />
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {showToast && (
        <UserDeleteToast showToast={showToast} setShowToast={setShowToast} />
      )}
    </div>
  );
}

export default ClientsTable;
