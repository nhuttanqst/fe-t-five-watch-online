// src/components/ManageProduct.jsx
import React, { useState } from 'react';
import {
  createProduct,
  updateProduct,
  deleteProduct,
} from '../../apiservice/apiProduct';
import useWatches from '../../apiservice/useWathes';


const ManageProduct = () => {
  const { watches, loading, error: fetchError, page, setPage, limit, totalPages } = useWatches();
  const [formData, setFormData] = useState({
    tenDH: '',
    giaBan: '',
    soLuong: '',
    thuongHieu: '',
    danhMuc: '',
    moTa: '',
    hinhAnh: [],
  });
  const [editingProductId, setEditingProductId] = useState(null);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  // Xử lý thay đổi input
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Xử lý upload ảnh
  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    setFormData((prev) => ({ ...prev, hinhAnh: files }));
  };

  // Gửi form tạo hoặc cập nhật sản phẩm
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.tenDH || !formData.giaBan || !formData.soLuong) {
      setError('Vui lòng nhập tên, giá bán và số lượng sản phẩm');
      return;
    }

    try {
      if (editingProductId) {
        const response = await updateProduct(editingProductId, {
          ...formData,
          hinhAnhMoi: formData.hinhAnh,
        });
        setSuccess('Cập nhật sản phẩm thành công');
      } else {
        const response = await createProduct(formData);
        setSuccess('Tạo sản phẩm thành công');
      }
      setFormData({
        tenDH: '',
        giaBan: '',
        soLuong: '',
        thuongHieu: '',
        danhMuc: '',
        moTa: '',
        hinhAnh: [],
      });
      setEditingProductId(null);
      setError(null);
      setPage(1); // Quay lại trang đầu để làm mới danh sách
    } catch (err) {
      setError(err.message);
      setSuccess(null);
    }
  };

  // Sửa sản phẩm
  const handleEdit = (product) => {
    setFormData({
      tenDH: product.name,
      giaBan: product.price,
      soLuong: product.soLuong || '',
      thuongHieu: product.thuongHieu || '',
      danhMuc: product.category || '',
      moTa: product.moTa || '',
      hinhAnh: [],
    });
    setEditingProductId(product.id);
    setError(null);
    setSuccess(null);
  };

  // Xóa sản phẩm
  const handleDelete = async (productId) => {
    if (window.confirm('Bạn có chắc muốn xóa sản phẩm này?')) {
      try {
        await deleteProduct(productId);
        setSuccess('Xóa sản phẩm thành công');
        setError(null);
        setPage(1); // Quay lại trang đầu để làm mới danh sách
      } catch (err) {
        setError(err.message);
        setSuccess(null);
      }
    }
  };

  // Hủy chỉnh sửa
  const handleCancelEdit = () => {
    setFormData({
      tenDH: '',
      giaBan: '',
      soLuong: '',
      thuongHieu: '',
      danhMuc: '',
      moTa: '',
      hinhAnh: [],
    });
    setEditingProductId(null);
    setError(null);
    setSuccess(null);
  };

  return (
    <div className="container mt-4 mb-20 mx-auto">
      <h1 className="text-2xl font-bold mb-4">Quản lý Sản phẩm</h1>

      {(error || fetchError) && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error || fetchError}
        </div>
      )}
      {success && (
        <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4">
          {success}
        </div>
      )}

      {/* Form tạo/cập nhật sản phẩm */}
      <form onSubmit={handleSubmit} className="mb-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            type="text"
            name="tenDH"
            value={formData.tenDH}
            onChange={handleInputChange}
            placeholder="Tên sản phẩm"
            className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="number"
            name="giaBan"
            value={formData.giaBan}
            onChange={handleInputChange}
            placeholder="Giá bán"
            className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="number"
            name="soLuong"
            value={formData.soLuong}
            onChange={handleInputChange}
            placeholder="Số lượng"
            className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="text"
            name="thuongHieu"
            value={formData.thuongHieu}
            onChange={handleInputChange}
            placeholder="Thương hiệu"
            className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="text"
            name="danhMuc"
            value={formData.danhMuc}
            onChange={handleInputChange}
            placeholder="Danh mục"
            className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <textarea
            name="moTa"
            value={formData.moTa}
            onChange={handleInputChange}
            placeholder="Mô tả"
            className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="file"
            multiple
            onChange={handleImageChange}
            className="w-full px-3 py-2 border rounded"
          />
        </div>
        <div className="flex gap-2 mt-4">
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            {editingProductId ? 'Cập nhật' : 'Thêm'}
          </button>
          {editingProductId && (
            <button
              type="button"
              onClick={handleCancelEdit}
              className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
            >
              Hủy
            </button>
          )}
        </div>
      </form>

      {/* Bảng sản phẩm */}
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border">
          <thead>
            <tr className="bg-gray-100">
              <th className="py-2 px-4 border">Mã</th>
              <th className="py-2 px-4 border">Hình ảnh</th>
              <th className="py-2 px-4 border">Tên</th>
              <th className="py-2 px-4 border">Giá</th>
              <th className="py-2 px-4 border">Số lượng</th>
              <th className="py-2 px-4 border">Danh mục</th>
              <th className="py-2 px-4 border">Hành động</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan="7" className="py-2 px-4 text-center border">
                  Đang tải...
                </td>
              </tr>
            ) : watches.length === 0 ? (
              <tr>
                <td colSpan="7" className="py-2 px-4 text-center border">
                  Không có sản phẩm nào
                </td>
              </tr>
            ) : (
              watches.map((product) => (
                <tr key={product.id} className="hover:bg-gray-50">
                  <td className="py-2 px-4 border">{product.maDH}</td>
                  <td className="py-2 px-4 border">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-16 h-16 object-cover"
                    />
                  </td>
                  <td className="py-2 px-4 border">{product.name}</td>
                  <td className="py-2 px-4 border">{product.price}</td>
                  <td className="py-2 px-4 border">{product.soLuong}</td>
                  <td className="py-2 px-4 border">{product.category}</td>
                  <td className="py-2 px-4 border flex gap-2">
                    <button
                      onClick={() => handleEdit(product)}
                      className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600"
                    >
                      Sửa
                    </button>
                    <button
                      onClick={() => handleDelete(product.id)}
                      className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                    >
                      Xóa
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Phân trang */}
      <div className="flex justify-between mt-4">
        <button
          onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
          disabled={page === 1}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 disabled:bg-gray-400"
        >
          Trang trước
        </button>
        <span>
          Trang {page} / {totalPages}
        </span>
        <button
          onClick={() => setPage((prev) => Math.min(prev + 1, totalPages))}
          disabled={page === totalPages}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 disabled:bg-gray-400"
        >
          Trang sau
        </button>
      </div>
    </div>
  );
};

export default ManageProduct;