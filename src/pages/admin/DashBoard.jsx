import React, { useState, useEffect } from "react";
import { Bar, Doughnut } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from "chart.js";
import { motion, AnimatePresence } from "framer-motion";
import TFiveLogo from "../../assets/loggo.png";
import { useNavigate } from "react-router-dom";
import { getProducts, deleteProduct } from "../../apiservice/apiProduct";

import {
  getBrands,
  createBrand,
  updateBrand,
  deleteBrand,
  toggleBrandVisibility,
} from "../../apiservice/apiBrand";
import { useCurrentApp } from "../../context/app.context";
// Đăng ký các thành phần Chart.js
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

const Dashboard = () => {
  const {
     
      user,
      
    } = useCurrentApp();
  const [activeTab, setActiveTab] = useState("overview");
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  ///////////////////////////////////////////////////////////////////////////
  //CALL API Sản Phẩm VÀ Thương Hiệu
  const [products, setProducts] = useState([]);
  const [brands, setBrands] = useState([]); // State để lưu trữ thông tin thương hiệu (id: name)
  const [brandFormData, setBrandFormData] = useState({ ten: "" });
  const [editingBrandId, setEditingBrandId] = useState(null);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const navigate = useNavigate();
  useEffect(() => {
    const fetchData = async () => {
      await fetchBrandsData(); // Lấy thông tin thương hiệu
      await fetchProducts();
    };
    fetchData();
  }, []);

  const fetchBrandsData = async () => {
    try {
      const response = await getBrands();
      console.log("Brands API Response:", response);
      if (response && Array.isArray(response.brands)) {
        setBrands(response.brands);
        setError(null);
      } else {
        setError("Không có dữ liệu thương hiệu trả về từ API.");
        setBrands([]);
      }
    } catch (err) {
      console.error("Fetch Brands Error:", err);
      setError(err.message || "Có lỗi xảy ra khi lấy dữ liệu thương hiệu.");
      setBrands([]);
    }
  };
  const getBrandName = (brandId) => {
    const brand = brands.find((b) => b._id === brandId);
    return brand ? brand.ten : "Không xác định";
  };

const fetchProducts = async () => {
  try {
    const response = await getProducts(1, 30);
    console.log("Products API Response:", response);
    if (response && response.productDatas) {
      setProducts(response.productDatas);
      setError(null);
    } else {
      setError("Không có dữ liệu sản phẩm trả về từ API.");
      setProducts([]);
    }
    setSuccess(null);
  } catch (err) {
    console.error("Fetch Products Error:", err);
    setError(err.message || "Có lỗi xảy ra khi lấy dữ liệu sản phẩm.");
    setSuccess(null);
  }
};

  const handleEdit = (product) => {
    navigate(`/admin/edit/${product._id}`);
  };

  const handleDelete = async (productId) => {
    if (window.confirm("Bạn có chắc muốn xóa sản phẩm này?")) {
      try {
        await deleteProduct(productId); // Gọi API xóa sản phẩm
        setProducts(products.filter((p) => p._id !== productId));
        setSuccess("Xóa sản phẩm thành công");
        setError(null);
      } catch (err) {
        setError(err.message);
        setSuccess(null);
      }
    }
  };

  //Xử lý thương hiệu

  const handleBrandInputChange = (e) => {
    setBrandFormData({ ten: e.target.value });
  };

  const handleBrandSubmit = async (e) => {
    e.preventDefault();
    if (!brandFormData.ten.trim()) {
      setError("Tên thương hiệu là bắt buộc");
      return;
    }
    try {
      if (editingBrandId) {
        const response = await updateBrand(editingBrandId, brandFormData);
        setBrands(
          brands.map((brand) =>
            brand._id === editingBrandId ? response.brand : brand
          )
        );
        setSuccess("Cập nhật thương hiệu thành công");
      } else {
        const response = await createBrand(brandFormData);
        setBrands([...brands, response.brand]);
        setSuccess("Tạo thương hiệu thành công");
      }
      setBrandFormData({ ten: "" });
      setEditingBrandId(null);
      setError(null);
    } catch (err) {
      setError(err.message || "Có lỗi xảy ra khi lưu thương hiệu.");
      setSuccess(null);
    }
  };

  const handleEditBrand = (brand) => {
    setBrandFormData({ ten: brand.ten });
    setEditingBrandId(brand._id);
    setError(null);
    setSuccess(null);
  };

  const handleDeleteBrand = async (brandId) => {
    if (window.confirm("Bạn có chắc muốn xóa thương hiệu này?")) {
      try {
        await deleteBrand(brandId);
        setBrands(brands.filter((brand) => brand._id !== brandId));
        setSuccess("Xóa thương hiệu thành công");
        setError(null);
      } catch (err) {
        setError(err.message || "Có lỗi xảy ra khi xóa thương hiệu.");
        setSuccess(null);
      }
    }
  };

  const handleCancelEditBrand = () => {
    setBrandFormData({ ten: "" });
    setEditingBrandId(null);
    setError(null);
    setSuccess(null);
  };

  const filteredBrands = Array.isArray(brands)
    ? brands.filter((brand) =>
        brand.ten.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : [];

  const handleToggleVisibility = async (brandId, isVisible) => {
    try {
      const response = await toggleBrandVisibility(brandId);
      setBrands(
        brands.map((brand) => (brand._id === brandId ? response.brand : brand))
      );
      setSuccess(
        `Thương hiệu đã được ${response.brand.isVisible ? "hiển thị" : "ẩn"}`
      );
      setError(null);
    } catch (err) {
      setError(err.message);
      setSuccess(null);
    }
  };
  //////////////////////////////////////////////////////////////////////////////
  const orders = [
    {
      id: 1,
      customer: "Vũ Minh Thuan",
      total: "25,000,000 đ",
      status: "Đã giao",
    },
    {
      id: 2,
      customer: "Ngô Nhật Tân",
      total: "1,700,000 đ",
      status: "Đang xử lý",
    },
    { id: 3, customer: "Lê Tố Tâm", total: "1,800,000 đ", status: "Đã giao" },
    {
      id: 4,
      customer: "Nguyễn Xuân Mai",
      total: "2,800,000 đ",
      status: "Đang xử lý",
    },
    {
      id: 5,
      customer: "Trần Bảo Ngọc",
      total: "3,200,000 đ",
      status: "Đã giao",
    },
  ];

  const customers = [
    {
      id: 1,
      name: "Vũ Minh Thuan",
      email: "minhthuan2020@gmail.com",
      phone: "1900.6777",
    },
    {
      id: 2,
      name: "Ngô Nhật Tân",
      email: "nhattan@gmail.com",
      phone: "1900.6777",
    },
    { id: 3, name: "Lê Tố Tâm", email: "totam@gmail.com", phone: "1900.6777" },
    {
      id: 4,
      name: "Nguyễn Xuân Mai",
      email: "xuanmai@gmail.com",
      phone: "1900.6777",
    },
    {
      id: 5,
      name: "Trần Bảo Ngọc",
      email: "baongoc@gmail.com",
      phone: "1900.6777",
    },
  ];

  // Dữ liệu biểu đồ
  const barData = {
    labels: ["1 Aug", "2 Aug", "3 Aug", "4 Aug", "5 Aug", "6 Aug"],
    datasets: [
      {
        label: "Doanh thu (triệu đồng)",
        data: [15, 10, 25, 20, 30, 18],
        backgroundColor: "#A61C28",
        borderColor: "#A61C28",
        borderWidth: 1,
      },
    ],
  };

  const doughnutData = {
    labels: ["Desktop", "Tablet", "Mobile"],
    datasets: [
      {
        data: [63, 15, 22],
        backgroundColor: ["#A61C28", "#D4AF37", "#E5E7EB"],
        borderWidth: 1,
      },
    ],
  };

  // Lọc dữ liệu theo từ khóa tìm kiếm
  const filteredProducts = products.filter((product) =>
    product.tenDH.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredOrders = orders.filter(
    (order) =>
      order.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.total.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredCustomers = customers.filter(
    (customer) =>
      customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      customer.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Phân trang
  const paginate = (data) => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return data.slice(startIndex, startIndex + itemsPerPage);
  };

  const totalPages = (data) => Math.ceil(data.length / itemsPerPage);

  // Định nghĩa các tab
  const tabs = [
    { label: "Tổng quan", value: "overview", icon: "📊" },
    { label: "Sản phẩm", value: "products", icon: "🕒" },
    { label: "Thương Hiệu", value: "brands", icon: "📦" },
    { label: "Đơn hàng", value: "orders", icon: "📦" },
    { label: "Khách hàng", value: "customers", icon: "👥" },
    { label: "Thống kê", value: "analytics", icon: "📈" },
  ];

  // Animation variants
  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.1, duration: 0.5 },
    }),
  };

  const chartVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.5 } },
  };

  const rowVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: (i) => ({
      opacity: 1,
      x: 0,
      transition: { delay: i * 0.05, duration: 0.3 },
    }),
  };

  return (
    <div className="min-h-screen flex font-roboto bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-white shadow-lg fixed h-full">
        <div className="p-4 border-t">
          <div className="flex items-center gap-3">
            <img
              src={TFiveLogo}
              alt="Admin Avatar"
              className="h-10 w-10 rounded-full"
            />
            <div>
              <p className="text-sm font-medium text-gray-700">{user.tenNguoiDung}</p>
              <p className="text-xs text-gray-500">{user.quyen.tenQuyen}</p>
            </div>
          </div>
        </div>
        <nav className="mt-4">
          <ul>
            {tabs.map((tab) => (
              <motion.li
                key={tab.value}
                className={`px-4 py-3 cursor-pointer flex items-center gap-3 transition-colors duration-200 ${
                  activeTab === tab.value
                    ? "bg-red-700 text-white"
                    : "text-gray-700 hover:bg-gray-200"
                }`}
                onClick={() => {
                  setActiveTab(tab.value);
                  setCurrentPage(1);
                  setSearchTerm("");
                }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <span className="text-lg">{tab.icon}</span>
                {tab.label}
              </motion.li>
            ))}
          </ul>
        </nav>
      </aside>

      {/* Main Content */}
      <div className="flex-1 ml-64">
        {/* Header */}
        <header className="bg-red-700 text-white p-4 flex justify-between items-center shadow-md">
          <h1 className="text-xl font-semibold">
            Admin Dashboard - T-Five Watch
          </h1>
          <div className="flex items-center gap-3">
            <motion.button
              className="relative text-white"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              🔔
              <span className="absolute -top-1 -right-1 bg-yellow-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                3
              </span>
            </motion.button>
            <motion.button
              className="bg-yellow-600 text-white px-3 py-1 rounded hover:bg-yellow-700"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={()=>{navigate("/");}}
            >
              Quay về Trang Chủ
            </motion.button>
          </div>
        </header>

        {/* Content */}
        <main className="p-6">
          <AnimatePresence mode="wait">
            {activeTab === "overview" && (
              <motion.div
                key="overview"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
                <h2 className="text-2xl font-semibold mb-6 text-gray-800">
                  Tổng quan
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
                  {[
                    {
                      icon: "💰",
                      title: "Tổng doanh thu",
                      value: "1,900,677,777 đ",
                      change: "↓ 12% so với tháng trước",
                      changeColor: "text-red-500",
                    },
                    {
                      icon: "👥",
                      title: "Tổng khách hàng",
                      value: "1,200",
                      change: "↑ 16% so với tháng trước",
                      changeColor: "text-green-500",
                    },
                    {
                      icon: "📦",
                      title: "Tổng đơn hàng",
                      value: "320",
                      change: "↑ 8% so với tháng trước",
                      changeColor: "text-green-500",
                    },
                    {
                      icon: "📈",
                      title: "Tổng lợi nhuận",
                      value: "650,000,000 đ",
                      change: "↓ 5% so với tháng trước",
                      changeColor: "text-red-500",
                    },
                  ].map((card, index) => (
                    <motion.div
                      key={card.title}
                      className="bg-white p-6 rounded-lg shadow-md"
                      variants={cardVariants}
                      initial="hidden"
                      animate="visible"
                      custom={index}
                    >
                      <h3 className="text-red-700 font-medium flex items-center gap-2">
                        <span className="text-lg">{card.icon}</span>{" "}
                        {card.title}
                      </h3>
                      <p className="text-2xl font-bold mt-2">{card.value}</p>
                      <p className={`text-sm mt-1 ${card.changeColor}`}>
                        {card.change}
                      </p>
                    </motion.div>
                  ))}
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <motion.div
                    className="bg-white p-6 rounded-lg shadow-md"
                    variants={chartVariants}
                    initial="hidden"
                    animate="visible"
                  >
                    <h3 className="text-lg font-semibold mb-4">
                      Doanh thu 7 ngày qua
                    </h3>
                    <div className="h-64">
                      <Bar
                        data={barData}
                        options={{
                          responsive: true,
                          maintainAspectRatio: false,
                          scales: {
                            x: { title: { display: true, text: "Ngày" } },
                            y: {
                              title: {
                                display: true,
                                text: "Doanh thu (triệu đồng)",
                              },
                              beginAtZero: true,
                            },
                          },
                          animation: {
                            duration: 1000,
                            easing: "easeOutQuart",
                          },
                        }}
                      />
                    </div>
                  </motion.div>
                  <motion.div
                    className="bg-white p-6 rounded-lg shadow-md"
                    variants={chartVariants}
                    initial="hidden"
                    animate="visible"
                  >
                    <h3 className="text-lg font-semibold mb-4">
                      Lưu lượng truy cập theo thiết bị
                    </h3>
                    <div className="h-64 flex items-center justify-center">
                      <div className="w-1/2">
                        <Doughnut
                          data={doughnutData}
                          options={{
                            responsive: true,
                            maintainAspectRatio: false,
                            plugins: {
                              legend: { position: "bottom" },
                            },
                            animation: {
                              duration: 1000,
                              easing: "easeOutQuart",
                            },
                          }}
                        />
                      </div>
                    </div>
                    <div className="flex justify-center gap-4 mt-4">
                      <div className="flex items-center gap-2">
                        <span className="w-4 h-4 rounded-full bg-red-700"></span>
                        <span>Desktop - 63%</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="w-4 h-4 rounded-full bg-yellow-600"></span>
                        <span>Tablet - 15%</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="w-4 h-4 rounded-full bg-gray-300"></span>
                        <span>Mobile - 22%</span>
                      </div>
                    </div>
                  </motion.div>
                </div>
              </motion.div>
            )}

            {activeTab === "products" && (
              <motion.div
                key="products"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
                <h2 className="text-2xl font-semibold mb-6 text-gray-800">
                  Quản lý sản phẩm
                </h2>
                <div className="flex justify-between items-center mb-4">
                  <motion.input
                    type="text"
                    placeholder="Tìm kiếm sản phẩm..."
                    className="border rounded-lg p-2 w-1/3 focus:outline-none focus:ring-2 focus:ring-red-700"
                    value={searchTerm}
                    onChange={(e) => {
                      setSearchTerm(e.target.value);
                      setCurrentPage(1);
                    }}
                    whileFocus={{ scale: 1.02, transition: { duration: 0.2 } }}
                  />
                  <motion.button
                    className="bg-yellow-600 text-white px-4 py-2 rounded hover:bg-yellow-700"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => navigate("/admin/add")}
                  >
                    Thêm sản phẩm
                  </motion.button>
                </div>
                <div className="bg-white rounded-lg shadow-md overflow-x-auto">
                  <table className="min-w-full">
                    <thead className="bg-red-700 text-white">
                      <tr>
                        <th className="p-3 text-left">Mã</th>
                        <th className="p-3 text-left">Tên sản phẩm</th>
                        <th className="p-3 text-left">Hình Ảnh</th>
                        <th className="p-3 text-left">Giá</th>
                        <th className="p-3 text-left">Số Lượng</th>
                        <th className="p-3 text-left">Danh Mục</th>
                        <th className="p-3 text-left">Thương Hiệu</th>
                        <th className="p-3 text-left">Hành Động</th>
                      </tr>
                    </thead>
                    <tbody>
                      {paginate(filteredProducts).map((product, index) => (
                        <motion.tr
                          key={product._id}
                          className="border-b hover:bg-gray-50"
                          variants={rowVariants}
                          initial="hidden"
                          animate="visible"
                          custom={index}
                        >
                          <td className="p-3">{product.maDH}</td>
                          <td className="p-3">{product.tenDH}</td>

                          <td className="p-3">
                            {product.hinhAnh && product.hinhAnh.length > 0 && (
                              <img
                                src={product.hinhAnh[0].duLieuAnh}
                                alt={product.tenDH}
                                className="w-20 h-20 object-cover rounded"
                              />
                            )}
                          </td>
                          <td className="p-3">
                            {product.giaBan !== undefined &&
                            product.giaBan !== null
                              ? product.giaBan.toLocaleString("vi-VN", {
                                  style: "currency",
                                  currency: "VND",
                                })
                              : "N/A"}
                          </td>
                          <td className="p-3">{product.soLuong}</td>
                          <td className="p-3">{product.danhMuc}</td>
                          <td className="p-3">
                            {getBrandName(product.thuongHieu)}
                          </td>
                          <td className="p-3">
                            <motion.button
                              className="bg-yellow-500 text-white mr-2 cursor-pointer px-3 py-1 rounded hover:bg-yellow-600"
                              whileHover={{ scale: 1.1 }}
                              whileTap={{ scale: 0.9 }}
                              onClick={() => handleEdit(product)}
                            >
                              Sửa
                            </motion.button>
                            <motion.button
                              className="bg-red-500 text-white cursor-pointer px-3 py-1 rounded hover:bg-red-600"
                              whileHover={{ scale: 1.1 }}
                              whileTap={{ scale: 0.9 }}
                              onClick={() => handleDelete(product._id)}
                            >
                              Xóa
                            </motion.button>
                          </td>
                        </motion.tr>
                      ))}
                    </tbody>
                  </table>
                  <div className="flex justify-between items-center p-4">
                    <span>
                      Trang {currentPage} / {totalPages(filteredProducts)}
                    </span>
                    <div className="flex gap-2">
                      <motion.button
                        className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50"
                        disabled={currentPage === 1}
                        onClick={() => setCurrentPage(currentPage - 1)}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        Trước
                      </motion.button>
                      <motion.button
                        className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50"
                        disabled={currentPage === totalPages(filteredProducts)}
                        onClick={() => setCurrentPage(currentPage + 1)}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        Sau
                      </motion.button>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {activeTab === "brands" && (
              <motion.div
                key="brands"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
                <h2 className="text-2xl font-semibold mb-6 text-gray-800">
                  Quản lý Thương Hiệu
                </h2>
                <form onSubmit={handleBrandSubmit} className="mb-6">
                  <div className="flex flex-col md:flex-row gap-6 ">
                    <motion.input
                      type="text"
                      value={brandFormData.ten}
                      onChange={handleBrandInputChange}
                      placeholder="Nhập tên thương hiệu"
                      className="w-full md:w-1/3 px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-red-700"
                      whileFocus={{
                        scale: 1.02,
                        transition: { duration: 0.2 },
                      }}
                    />
                    <div className="flex gap-2">
                      <motion.button
                        type="submit"
                        className="bg-yellow-600 text-white px-4 py-2 rounded hover:bg-yellow-700"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        {editingBrandId ? "Cập nhật" : "Thêm"}
                      </motion.button>
                      {editingBrandId && (
                        <motion.button
                          type="button"
                          onClick={handleCancelEditBrand}
                          className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          Hủy
                        </motion.button>
                      )}
                    </div>
                    <motion.input
                      type="text"
                      placeholder="Tìm kiếm Thương Hiệu..."
                      className="border rounded-lg p-2 w-1/3 focus:outline-none focus:ring-2 focus:ring-red-700"
                      value={searchTerm}
                      onChange={(e) => {
                        setSearchTerm(e.target.value);
                        setCurrentPage(1);
                      }}
                      whileFocus={{
                        scale: 1.02,
                        transition: { duration: 0.2 },
                      }}
                    />
                  </div>
                </form>
                <div className="bg-white rounded-lg shadow-md overflow-x-auto">
                  <table className="min-w-full">
                    <thead className="bg-red-700 text-white">
                      <tr>
                        <th className="p-3 text-left">Mã</th>
                        <th className="p-3 text-left">Tên Thương Hiệu</th>
                        <th className="p-3 text-left">Trạng Thái</th>
                        <th className="p-3 text-left">Hành Động</th>
                      </tr>
                    </thead>
                    <tbody>
                      {paginate(filteredBrands).map((brand, index) => (
                        <motion.tr
                          key={brand._id}
                          className="border-b hover:bg-gray-50"
                          variants={rowVariants}
                          initial="hidden"
                          animate="visible"
                          custom={index}
                        >
                          <td className="p-3">{brand.ma}</td>
                          <td className="p-3">{brand.ten}</td>
                          <td className="p-3">
                            {brand.isVisible ? "Hiển thị" : "Ẩn"}
                          </td>
                          <td className="p-3">
                            <motion.button
                              className="bg-yellow-500 text-white px-3 py-1 rounded cursor-pointer hover:bg-yellow-600 mr-2"
                              whileHover={{ scale: 1.1 }}
                              whileTap={{ scale: 0.9 }}
                              onClick={() => handleEditBrand(brand)}
                            >
                              Sửa
                            </motion.button>
                            <motion.button
                              className="bg-red-500 text-white px-3 py-1 rounded cursor-pointer hover:bg-red-600"
                              whileHover={{ scale: 1.1 }}
                              whileTap={{ scale: 0.9 }}
                              onClick={() => handleDeleteBrand(brand._id)}
                            >
                              Xóa
                            </motion.button>
                            <motion.button
                              whileHover={{ scale: 1.1 }}
                              whileTap={{ scale: 0.9 }}
                              onClick={() =>
                                handleToggleVisibility(
                                  brand._id,
                                  brand.isVisible
                                )
                              }
                              className={`${
                                brand.isVisible ? "bg-gray-500" : "bg-green-500"
                              } text-white px-3 py-1 rounded ml-2 cursor-pointer hover:${
                                brand.isVisible ? "bg-gray-600" : "bg-green-600"
                              }`}
                            >
                              {brand.isVisible ? "Ẩn" : "Hiển thị"}
                            </motion.button>
                          </td>
                        </motion.tr>
                      ))}
                    </tbody>
                  </table>
                  <div className="flex justify-between items-center p-4">
                    <span>
                      Trang {currentPage} / {totalPages(filteredBrands)}
                    </span>
                    <div className="flex gap-2">
                      <motion.button
                        className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50"
                        disabled={currentPage === 1}
                        onClick={() => setCurrentPage(currentPage - 1)}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        Trước
                      </motion.button>
                      <motion.button
                        className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50"
                        disabled={currentPage === totalPages(filteredBrands)}
                        onClick={() => setCurrentPage(currentPage + 1)}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        Sau
                      </motion.button>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {activeTab === "orders" && (
              <motion.div
                key="orders"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
                <h2 className="text-2xl font-semibold mb-6 text-gray-800">
                  Quản lý đơn hàng
                </h2>
                <div className="flex justify-between items-center mb-4">
                  <motion.input
                    type="text"
                    placeholder="Tìm kiếm đơn hàng..."
                    className="border rounded-lg p-2 w-1/3 focus:outline-none focus:ring-2 focus:ring-red-700"
                    value={searchTerm}
                    onChange={(e) => {
                      setSearchTerm(e.target.value);
                      setCurrentPage(1);
                    }}
                    whileFocus={{ scale: 1.02, transition: { duration: 0.2 } }}
                  />
                </div>
                <div className="bg-white rounded-lg shadow-md overflow-x-auto">
                  <table className="min-w-full">
                    <thead className="bg-red-700 text-white">
                      <tr>
                        <th className="p-3 text-left">ID</th>
                        <th className="p-3 text-left">Khách hàng</th>
                        <th className="p-3 text-left">Tổng tiền</th>
                        <th className="p-3 text-left">Trạng thái</th>
                        <th className="p-3 text-left">Hành động</th>
                      </tr>
                    </thead>
                    <tbody>
                      {paginate(filteredOrders).map((order, index) => (
                        <motion.tr
                          key={order.id}
                          className="border-b hover:bg-gray-50"
                          variants={rowVariants}
                          initial="hidden"
                          animate="visible"
                          custom={index}
                        >
                          <td className="p-3">{order.id}</td>
                          <td className="p-3">{order.customer}</td>
                          <td className="p-3">{order.total}</td>
                          <td className="p-3">
                            <span
                              className={`px-2 py-1 rounded ${
                                order.status === "Đã giao"
                                  ? "bg-green-100 text-green-700"
                                  : "bg-yellow-100 text-yellow-700"
                              }`}
                            >
                              {order.status}
                            </span>
                          </td>
                          <td className="p-3">
                            <motion.button
                              className="text-blue-500 hover:underline"
                              whileHover={{ scale: 1.1 }}
                              whileTap={{ scale: 0.9 }}
                            >
                              Xem chi tiết
                            </motion.button>
                          </td>
                        </motion.tr>
                      ))}
                    </tbody>
                  </table>
                  <div className="flex justify-between items-center p-4">
                    <span>
                      Trang {currentPage} / {totalPages(filteredOrders)}
                    </span>
                    <div className="flex gap-2">
                      <motion.button
                        className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50"
                        disabled={currentPage === 1}
                        onClick={() => setCurrentPage(currentPage - 1)}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        Trước
                      </motion.button>
                      <motion.button
                        className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50"
                        disabled={currentPage === totalPages(filteredOrders)}
                        onClick={() => setCurrentPage(currentPage + 1)}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        Sau
                      </motion.button>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {activeTab === "customers" && (
              <motion.div
                key="customers"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
                <h2 className="text-2xl font-semibold mb-6 text-gray-800">
                  Quản lý khách hàng
                </h2>
                <div className="flex justify-between items-center mb-4">
                  <motion.input
                    type="text"
                    placeholder="Tìm kiếm khách hàng..."
                    className="border rounded-lg p-2 w-1/3 focus:outline-none focus:ring-2 focus:ring-red-700"
                    value={searchTerm}
                    onChange={(e) => {
                      setSearchTerm(e.target.value);
                      setCurrentPage(1);
                    }}
                    whileFocus={{ scale: 1.02, transition: { duration: 0.2 } }}
                  />
                </div>
                <div className="bg-white rounded-lg shadow-md overflow-x-auto">
                  <table className="min-w-full">
                    <thead className="bg-red-700 text-white">
                      <tr>
                        <th className="p-3 text-left">ID</th>
                        <th className="p-3 text-left">Tên</th>
                        <th className="p-3 text-left">Email</th>
                        <th className="p-3 text-left">Số điện thoại</th>
                        <th className="p-3 text-left">Hành động</th>
                      </tr>
                    </thead>
                    <tbody>
                      {paginate(filteredCustomers).map((customer, index) => (
                        <motion.tr
                          key={customer.id}
                          className="border-b hover:bg-gray-50"
                          variants={rowVariants}
                          initial="hidden"
                          animate="visible"
                          custom={index}
                        >
                          <td className="p-3">{customer.id}</td>
                          <td className="p-3">{customer.name}</td>
                          <td className="p-3">{customer.email}</td>
                          <td className="p-3">{customer.phone}</td>
                          <td className="p-3">
                            <motion.button
                              className="text-blue-500 hover:underline"
                              whileHover={{ scale: 1.1 }}
                              whileTap={{ scale: 0.9 }}
                            >
                              Xem chi tiết
                            </motion.button>
                          </td>
                        </motion.tr>
                      ))}
                    </tbody>
                  </table>
                  <div className="flex justify-between items-center p-4">
                    <span>
                      Trang {currentPage} / {totalPages(filteredCustomers)}
                    </span>
                    <div className="flex gap-2">
                      <motion.button
                        className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50"
                        disabled={currentPage === 1}
                        onClick={() => setCurrentPage(currentPage - 1)}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        Trước
                      </motion.button>
                      <motion.button
                        className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50"
                        disabled={currentPage === totalPages(filteredCustomers)}
                        onClick={() => setCurrentPage(currentPage + 1)}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        Sau
                      </motion.button>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {activeTab === "analytics" && (
              <motion.div
                key="analytics"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
                <h2 className="text-2xl font-semibold mb-6 text-gray-800">
                  Thống kê
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <motion.div
                    className="bg-white p-6 rounded-lg shadow-md"
                    variants={chartVariants}
                    initial="hidden"
                    animate="visible"
                  >
                    <h3 className="text-lg font-semibold mb-4">
                      Doanh thu theo tháng
                    </h3>
                    <div className="h-64">
                      <Bar
                        data={{
                          labels: [
                            "Tháng 1",
                            "Tháng 2",
                            "Tháng 3",
                            "Tháng 4",
                            "Tháng 5",
                          ],
                          datasets: [
                            {
                              label: "Doanh thu (triệu đồng)",
                              data: [500, 600, 700, 650, 800],
                              backgroundColor: "#A61C28",
                              borderColor: "#A61C28",
                              borderWidth: 1,
                            },
                          ],
                        }}
                        options={{
                          responsive: true,
                          maintainAspectRatio: false,
                          scales: {
                            x: { title: { display: true, text: "Tháng" } },
                            y: {
                              title: {
                                display: true,
                                text: "Doanh thu (triệu đồng)",
                              },
                              beginAtZero: true,
                            },
                          },
                          animation: {
                            duration: 1000,
                            easing: "easeOutQuart",
                          },
                        }}
                      />
                    </div>
                  </motion.div>
                  <motion.div
                    className="bg-white p-6 rounded-lg shadow-md"
                    variants={chartVariants}
                    initial="hidden"
                    animate="visible"
                  >
                    <h3 className="text-lg font-semibold mb-4">
                      Sản phẩm bán chạy
                    </h3>
                    <div className="h-64 flex items-center justify-center">
                      <div className="w-1/2">
                        <Doughnut
                          data={{
                            labels: [
                              "Đồng hồ Nam 1",
                              "Đồng hồ Rolex 33",
                              "Đồng hồ Cặp 1",
                            ],
                            datasets: [
                              {
                                data: [40, 35, 25],
                                backgroundColor: [
                                  "#A61C28",
                                  "#D4AF37",
                                  "#E5E7EB",
                                ],
                                borderWidth: 1,
                              },
                            ],
                          }}
                          options={{
                            responsive: true,
                            maintainAspectRatio: false,
                            plugins: {
                              legend: { position: "bottom" },
                            },
                            animation: {
                              duration: 1000,
                              easing: "easeOutQuart",
                            },
                          }}
                        />
                      </div>
                    </div>
                  </motion.div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
