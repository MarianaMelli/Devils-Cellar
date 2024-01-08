import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleInfo } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { format } from "date-fns";
import { useNavigate } from "react-router-dom";
import UpdateOrderToast from "./Toasts/UpdateOrderToast";

function OrdersTable() {
  const [orders, setOrders] = useState(null);
  const admin = useSelector((state) => state.admin);
  const statusList = ["paid", "rejected", "in transit", "delivered"];
  const [showToast, setShowToast] = useState(false);

  const navigate = useNavigate();
  useEffect(() => {
    const getOrders = async () => {
      try {
        const response = await axios({
          method: "GET",
          url: `${import.meta.env.VITE_API_URL}/orders`,
          headers: {
            Authorization: `Bearer ${admin.token}`,
          },
        });

        setOrders(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    getOrders();
  }, []);

  const handleUpdateStatus = async (orderId, e) => {
    const newState = e.target.value;
    try {
      await axios({
        method: "PATCH",
        url: `${import.meta.env.VITE_API_URL}/orders/${orderId}`,
        data: {
          status: newState,
        },
        headers: {
          Authorization: `Bearer ${admin.token}`,
        },
      });
      setShowToast(true);
      setTimeout(() => {
        setShowToast(false);
      }, 3000);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    orders && (
      <div className="orders-bg table-container">
        <h1 className="tables-header">ORDERS</h1>
        <div className="orders-table">
          <table className="table table-hover text-center align-middle rounded rounded-3 overflow-hidden dashboard-table">
            <thead className="align-middle">
              <tr>
                <th scope="col" className="orders-table-header header">
                  Id
                </th>
                <th scope="col" className="orders-table-header header">
                  Client
                </th>
                <th scope="col" className="orders-table-header header">
                  Date
                </th>
                <th scope="col" className="orders-table-header header">
                  Products
                </th>
                <th scope="col" className="orders-table-header header">
                  Total Amount
                </th>
                <th scope="col" className="orders-table-header header">
                  Payment Method
                </th>
                <th scope="col" className="orders-table-header header">
                  Status
                </th>

                <th scope="col" className="orders-table-header header">
                  Details
                </th>
              </tr>
            </thead>
            <tbody>
              {orders &&
                orders.map((order) => {
                  const orderTotalItems = order.productList.reduce(
                    (total, product) => total + product.qty,
                    0
                  );
                  return (
                    <tr key={order.id} className="table-content">
                      <td>{order.id}</td>
                      <td>
                        {typeof order.user !== "string"
                          ? `${order.user.firstname} ${order.user.lastname}`
                          : order.user}
                      </td>
                      <td>
                        {format(new Date(order.createdAt), "dd MMM yyyy")}
                      </td>
                      <td>{orderTotalItems}</td>
                      <td>
                        {order.productList.reduce(
                          (acc, item) => acc + item.qty * item.unitPrice,
                          0
                        )}
                      </td>
                      <td>{order.paymentMethod}</td>
                      <td>
                        <select
                          className="form-select"
                          aria-label="Default select example"
                          onChange={(e) => {
                            handleUpdateStatus(order.id, e);
                          }}
                          name="status"
                        >
                          <option value={order.status}>{order.status}</option>
                          {statusList.map((statusOption, index) => (
                            <option key={index} value={statusOption}>
                              {statusOption}
                            </option>
                          ))}
                        </select>
                      </td>
                      <td>
                        <FontAwesomeIcon
                          icon={faCircleInfo}
                          style={{
                            color: "orangered",
                            cursor: "pointer",
                            fontSize: "1.2rem",
                          }}
                          onClick={() => navigate(`/orders/${order.id}`)}
                        />
                      </td>
                    </tr>
                  );
                })}
            </tbody>
          </table>
        </div>
        <UpdateOrderToast showToast={showToast} setShowToast={setShowToast} />
      </div>
    )
  );
}

export default OrdersTable;
