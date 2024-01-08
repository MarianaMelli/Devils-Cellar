import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCan, faCirclePlus } from "@fortawesome/free-solid-svg-icons";
import { faPenToSquare } from "@fortawesome/free-regular-svg-icons";
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import CategoryDeleteToast from "./Toasts/CategoryDeleteToast";

function CategoryTable() {
  const admin = useSelector((state) => state.admin);
  const [categories, setCategories] = useState([]);
  const navigate = useNavigate();

  const [showToast, setShowToast] = useState(false);

  const handleDeleteCategory = async (id) => {
    await axios({
      method: "DELETE",
      url: `${import.meta.env.VITE_API_URL}/categories/${id}`,
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
    const getCategories = async () => {
      try {
        const response = await axios({
          method: "GET",
          url: `${import.meta.env.VITE_API_URL}/categories`,
        });

        setCategories(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    getCategories();
  }, [handleDeleteCategory]);
  return (
    <div className="categories-bg table-container">
      <h1 className="tables-header">
        CATEGORIES{" "}
        <FontAwesomeIcon
          icon={faCirclePlus}
          style={{ cursor: "pointer", fontSize: "3rem" }}
          onClick={() => navigate("/new-category")}
        />
      </h1>
      <div className="category-table">
        <table className="table table-hover text-center align-middle rounded rounded-3 overflow-hidden dashboard-table">
          <thead className="align-middle">
            <tr>
              <th scope="col" className="categories-table-header header">
                Id
              </th>
              <th scope="col" className="categories-table-header header">
                Name
              </th>
              <th scope="col" className="categories-table-header header">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {categories.map((category) => (
              <tr key={category.id} className="table-content">
                <th scope="row">{category.id}</th>
                <td>{category.name}</td>
                <td>
                  <FontAwesomeIcon
                    icon={faPenToSquare}
                    style={{
                      color: "#5d5dff",
                      marginRight: "1rem",
                      cursor: "pointer",
                    }}
                    onClick={() => navigate(`/update-category/${category.id}`)}
                  />
                  <FontAwesomeIcon
                    icon={faTrashCan}
                    style={{ color: "grey", cursor: "pointer" }}
                    onClick={() => handleDeleteCategory(category.id)}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {showToast && (
        <CategoryDeleteToast
          showToast={showToast}
          setShowToast={setShowToast}
        />
      )}
    </div>
  );
}

export default CategoryTable;
