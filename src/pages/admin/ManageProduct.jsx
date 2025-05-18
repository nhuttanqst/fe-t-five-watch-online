import React, { useState, useEffect } from 'react';
import { getProducts,deleteProduct } from '../../apiservice/apiProduct';
import { getBrands } from '../../apiservice/apiBrand'; // Import api lấy thương hiệu
import { useNavigate } from 'react-router-dom';

const ManageProduct = () => {
    const [products, setProducts] = useState([]);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);
    const [brands, setBrands] = useState({}); // State để lưu trữ thông tin thương hiệu (id: name)
    const navigate = useNavigate();
    useEffect(() => {
        const fetchData = async () => {
            await fetchProducts();
            await fetchBrandsData(); // Lấy thông tin thương hiệu
        };
        fetchData();
    }, []);

    const fetchProducts = async () => {
        try {
            const response = await getProducts(1, 10);
            console.log("API Response:", response);
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

    const fetchBrandsData = async () => {
        try {
            const response = await getBrands();
            if (response && response.brands) {
                // Chuyển đổi mảng thương hiệu thành một object để dễ dàng tra cứu bằng ID
                const brandsMap = {};
                response.brands.forEach(brand => {
                    brandsMap[brand._id] = brand.ten;
                });
                setBrands(brandsMap);
            } else {
                setError("Không có dữ liệu thương hiệu trả về từ API.");
                setBrands({});
            }
        } catch (err) {
            console.error("Fetch Brands Error:", err);
            setError(err.message || "Có lỗi xảy ra khi lấy dữ liệu thương hiệu.");
        }
    };



    const handleEdit = (product) => {
         navigate(`/admin2/edit/${product._id}`);
    };

    const handleDelete = async (productId) => {
        if (window.confirm('Bạn có chắc muốn xóa sản phẩm này?')) {
            try {
                await deleteProduct(productId); // Gọi API xóa sản phẩm
                setProducts(products.filter((p) => p._id !== productId));
                setSuccess('Xóa sản phẩm thành công');
                setError(null);
            } catch (err) {
                setError(err.message);
                setSuccess(null);
            }
        }
    };

    // Hàm lấy tên thương hiệu từ ID
    const getBrandName = (brandId) => {
        return brands[brandId] || 'Không xác định';
    };

    return (
        <div className="container mt-4 mb-20 mx-auto">
            <h1 className="text-2xl font-bold mb-4">Quản lý Sản phẩm</h1>

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

            <div className="mb-4">
                <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                 onClick={() => navigate("/admin2/add")}
                >
                    Thêm sản phẩm
                </button>
            </div>

            <div className="overflow-x-auto">
                <table className="min-w-full bg-white border">
                    <thead>
                        <tr className="bg-gray-100">
                            <th className="py-2 px-4 border">Mã</th>
                            <th className="py-2 px-4 border">Tên Sản phẩm</th>
                            <th className="py-2 px-4 border">Hình ảnh</th>
                            <th className="py-2 px-4 border">Giá</th>
                            <th className="py-2 px-4 border">Số lượng</th>
                            <th className="py-2 px-4 border">Danh mục</th>
                            <th className="py-2 px-4 border">Thương hiệu</th>
                            <th className="py-2 px-4 border">Hành động</th>
                        </tr>
                    </thead>
                    <tbody>
                        {products.length === 0 ? (
                            <tr>
                                <td colSpan="8" className="py-2 px-4 text-center border">
                                    Không có sản phẩm nào
                                </td>
                            </tr>
                        ) : (
                            products.map((product) => (
                                <tr key={product._id} className="hover:bg-gray-50">
                                    <td className="py-2 px-4 border">{product.maDH}</td>
                                    <td className="py-2 px-4 border">{product.tenDH}</td>
                                    <td className="py-2 px-4 border">
                                        {product.hinhAnh && product.hinhAnh.length > 0 && (
                                            <img
                                                src={product.hinhAnh[0].duLieuAnh}
                                                alt={product.tenDH}
                                                className="w-20 h-20 object-cover rounded"
                                            />
                                        )}
                                    </td>
                                    <td className="py-2 px-4 border">
                                        {product.giaBan !== undefined && product.giaBan !== null
                                            ? product.giaBan.toLocaleString('vi-VN', {
                                                style: 'currency',
                                                currency: 'VND',
                                            })
                                            : 'N/A'}
                                    </td>
                                    <td className="py-2 px-4 border">{product.soLuong}</td>
                                    <td className="py-2 px-4 border">{product.danhMuc}</td>
                                    <td className="py-2 px-4 border">{getBrandName(product.thuongHieu)}</td> {/* Hiển thị tên thương hiệu */}
                                    <td className="py-2 px-4 border flex gap-2">
                                        <button
                                            onClick={() => handleEdit(product)}
                                            className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600"
                                        >
                                            Sửa
                                        </button>
                                        <button
                                            onClick={() => handleDelete(product._id)}
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
        </div>
    );
};

export default ManageProduct;
