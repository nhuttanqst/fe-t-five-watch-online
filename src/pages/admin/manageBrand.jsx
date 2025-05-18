import React, { useState, useEffect } from 'react';
import {
  createBrand,
  getBrands,
  updateBrand,
  deleteBrand,
  toggleBrandVisibility,
} from '../../apiservice/apiBrand';

const ManageBrand = () => {
  const [brands, setBrands] = useState([]);
  const [formData, setFormData] = useState({ ten: '' });
  const [editingBrandId, setEditingBrandId] = useState(null);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  useEffect(() => {
    fetchBrands();
  }, []);

  const fetchBrands = async () => {
    try {
      const response = await getBrands();
      setBrands(response.brands || []);
      setError(null);
    } catch (err) {
      setError(err.message);
      setSuccess(null);
    }
  };

  const handleInputChange = (e) => {
    setFormData({ ten: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.ten.trim()) {
      setError('Tên thương hiệu là bắt buộc');
      return;
    }

    try {
      if (editingBrandId) {
        const response = await updateBrand(editingBrandId, formData);
        setBrands(
          brands.map((brand) =>
            brand._id === editingBrandId ? response.brand : brand
          )
        );
        setSuccess('Cập nhật thương hiệu thành công');
      } else {
        const response = await createBrand(formData);
        setBrands([...brands, response.brand]);
        setSuccess('Tạo thương hiệu thành công');
      }
      setFormData({ ten: '' });
      setEditingBrandId(null);
      setError(null);
    } catch (err) {
      setError(err.message);
      setSuccess(null);
    }
  };

  const handleEdit = (brand) => {
    setFormData({ ten: brand.ten });
    setEditingBrandId(brand._id);
    setError(null);
    setSuccess(null);
  };

  const handleDelete = async (brandId) => {
    if (window.confirm('Bạn có chắc muốn xóa thương hiệu này?')) {
      try {
        await deleteBrand(brandId);
        setBrands(brands.filter((brand) => brand._id !== brandId));
        setSuccess('Xóa thương hiệu thành công');
        setError(null);
      } catch (err) {
        setError(err.message);
        setSuccess(null);
      }
    }
  };

  const handleCancelEdit = () => {
    setFormData({ ten: '' });
    setEditingBrandId(null);
    setError(null);
    setSuccess(null);
  };

  const handleToggleVisibility = async (brandId, isVisible) => {
    try {
      const response = await toggleBrandVisibility(brandId);
      setBrands(
        brands.map((brand) =>
          brand._id === brandId ? response.brand : brand
        )
      );
      setSuccess(
        `Thương hiệu đã được ${response.brand.isVisible ? 'hiển thị' : 'ẩn'}`
      );
      setError(null);
    } catch (err) {
      setError(err.message);
      setSuccess(null);
    }
  };

  return (
    <div className="container mt-4 mb-20 mx-auto">
      <h1 className="text-2xl font-bold mb-4">Quản lý Thương hiệu</h1>

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}
      {success && (
        <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4">
          {success}
        </div>
      )}

      <form onSubmit={handleSubmit} className="mb-6">
        <div className="flex flex-col md:flex-row gap-4 items-center">
          <input
            type="text"
            value={formData.ten}
            onChange={handleInputChange}
            placeholder="Nhập tên thương hiệu"
            className="w-full md:w-1/2 px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <div className="flex gap-2">
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            >
              {editingBrandId ? 'Cập nhật' : 'Thêm'}
            </button>
            {editingBrandId && (
              <button
                type="button"
                onClick={handleCancelEdit}
                className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
              >
                Hủy
              </button>
            )}
          </div>
        </div>
      </form>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border">
          <thead>
            <tr className="bg-gray-100">
              <th className="py-2 px-4 border">Mã</th>
              <th className="py-2 px-4 border">Tên Thương hiệu</th>
              <th className="py-2 px-4 border">Trạng thái</th>
              <th className="py-2 px-4 border">Hành động</th>
            </tr>
          </thead>
          <tbody>
            {brands.length === 0 ? (
              <tr>
                <td colSpan="4" className="py-2 px-4 text-center border">
                  Không có thương hiệu nào
                </td>
              </tr>
            ) : (
              brands.map((brand) => (
                <tr key={brand._id} className="hover:bg-gray-50">
                  <td className="py-2 px-4 border">{brand.ma}</td>
                  <td className="py-2 px-4 border">{brand.ten}</td>
                  <td className="py-2 px-4 border">
                    {brand.isVisible ? 'Hiển thị' : 'Ẩn'}
                  </td>
                  <td className="py-2 px-4 border flex gap-2">
                    <button
                      onClick={() => handleEdit(brand)}
                      className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600"
                    >
                      Sửa
                    </button>
                    <button
                      onClick={() => handleDelete(brand._id)}
                      className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                    >
                      Xóa
                    </button>
                    <button
                      onClick={() =>
                        handleToggleVisibility(brand._id, brand.isVisible)
                      }
                      className={`${
                        brand.isVisible ? 'bg-gray-500' : 'bg-green-500'
                      } text-white px-3 py-1 rounded hover:${
                        brand.isVisible ? 'bg-gray-600' : 'bg-green-600'
                      }`}
                    >
                      {brand.isVisible ? 'Ẩn' : 'Hiển thị'}
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageBrand;