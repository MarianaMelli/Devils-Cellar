import { Routes, Route } from "react-router-dom";
import "./App.css";
import Navbar from "./Components/Navbar";
import SideBar from "./Components/SideBar";
import ClientsTable from "./Components/ClientsTable";
import DashboardPanel from "./Components/DashboardPanel";
import AdminsTable from "./Components/AdminsTable";
import ProductsTable from "./Components/ProductsTable";
import CategoryTable from "./Components/CategoryTable";
import OrdersTable from "./Components/OrdersTable";
import NewAdmin from "./pages/NewAdmin";
import UpdateAdmin from "./pages/UpdateAdmin";
import NewProduct from "./pages/NewProduct";
import UpdateProduct from "./pages/UpdateProduct";
import NewCategory from "./pages/NewCategory";
import UpdateCategory from "./pages/UpdateCategory";
import { useLocation } from "react-router-dom";

import Login from "./pages/Login";
import { useSelector } from "react-redux";
import ProtectedRoute from "./Components/ProtectedRoute";
import ErrorPage from "./pages/ErrorPage";
import OrderDetail from "./Components/OrderDetail";

function App() {
  const location = useLocation();
  const admin = useSelector((state) => state.admin);
  return (
    <div className="dashboard-container" style={{backgroundImage:`url('${import.meta.env.VITE_BACKET_URL}/corchos-vino-sobre-mesa.jpg')`}}>
      {location.pathname !== "/login" && <Navbar />}
      {location.pathname !== "/login" && <SideBar />}

      <Routes>
        <Route path="/login" element={<Login />} />
        <Route  element={<ProtectedRoute admin={admin} />}>
          <Route path="/" element={<DashboardPanel />} />
          <Route path="/clients" element={<ClientsTable />} />
          <Route path="/administrators" element={<AdminsTable />} />
          <Route path="/products" element={<ProductsTable />} />
          <Route path="/categories" element={<CategoryTable />} />
          <Route path="/orders" element={<OrdersTable />} />
          <Route path="/orders/:id" element={<OrderDetail/>}></Route>
          <Route path="/new-admin" element={<NewAdmin />} />
          <Route path="/update-admin/:id" element={<UpdateAdmin />} />
          <Route path="/new-product" element={<NewProduct />} />
          <Route path="/update-product/:id" element={<UpdateProduct />} />
          <Route path="/new-category" element={<NewCategory />} />
          <Route path="/update-category/:id" element={<UpdateCategory />} />
        </Route>
        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </div>
  );
}

export default App;
