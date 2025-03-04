import { NavLink, useNavigate } from "react-router-dom";
import logo from "../../assets/logo.png";
import searchIcon from "../../assets/search.png";
import cartIcon from "../../assets/cart.png";
import heartIcon from "../../assets/heart.png";
import userIcon from "../../assets/user.png";
import { Badge } from "antd";
import { useCurrentApp } from "../../context/app.context";

const Header = () => {
  const { favorite } = useCurrentApp();
  const navigate = useNavigate();
  const brands = [
    { id: 1, name: "Rolex", category: "men" },
    { id: 2, name: "Omega", category: "men" },
    { id: 3, name: "Tag Heuer", category: "men" },
    { id: 4, name: "Chanel", category: "women" },
    { id: 5, name: "Cartier", category: "women" },
    { id: 6, name: "Gucci", category: "women" },
    { id: 7, name: "Tissot", category: "couple" },
    { id: 8, name: "Seiko", category: "couple" },
    { id: 9, name: "Casio", category: "couple" },
];

  
  return (
    <header className="w-full border-b-2 border-b-[#EDEDED] shadow-sm bg-white">
      <div className="container mx-auto flex flex-col items-center pt-4 pb-1 px-6">
        <div className="w-full flex items-center justify-between py-6">
          <div
            onClick={() => navigate("/")}
            className="absolute left-1/2 transform -translate-x-1/2 cursor-pointer"
          >
            <img src={logo} alt="T-Five Watch" className="h-35" />
          </div>

          <div className="flex items-center space-x-6 ml-auto">
            <div className="relative w-72">
              <input
                type="text"
                placeholder="Tìm sản phẩm hoặc thương hiệu"
                className="w-full border-none rounded-xl px-10 py-2 text-black text-sm focus:outline-none focus:border-black-400 bg-[#E7E7E8]"
              />
              <span className="absolute left-2 top-2 cursor-pointer">
                <img width="20px" src={searchIcon} alt="Search Icon" />
              </span>
            </div>

            <div className="flex space-x-7 text-gray-600 text-lg mr-[100px]">
              <button
                onClick={() => navigate("/cart")}
                className="hover:text-red-500 cursor-pointer transition-all duration-300 hover:scale-110 hover:opacity-80"
              >
                <Badge count={0} size={"small"} showZero>
                  <img width="26px" src={cartIcon} alt="Cart Icon" />
                </Badge>
              </button>
              <button
                onClick={() => navigate("/favorite")}
                className="hover:text-red-500 cursor-pointer transition-all duration-300 hover:scale-110 hover:opacity-80"
              >
                <Badge count={favorite.length ?? 0} size={"small"} showZero>
                  <img width="26px" src={heartIcon} alt="Heart Icon" />
                </Badge>
              </button>
              <button
                onClick={() => navigate("/login")}
                className="hover:text-red-500 cursor-pointer transition-all duration-300 hover:scale-110 hover:opacity-80"
              >
                <img width="26px" src={userIcon} alt="User Icon" />
              </button>
            </div>
          </div>
        </div>

        <nav className="flex space-x-40 text-black text-lg font-medium mt-5">
          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive
                ? "text-red-500 border-b-2 border-red-500 pb-1 transition-colors duration-300"
                : "hover:text-red-500 transition-colors duration-300"
            }
          >
            TRANG CHỦ
          </NavLink>

          {/* Dropdown for Nam */}
         
          <div className="relative group">
              <NavLink
                to="/men"
                className={({ isActive }) =>
                  isActive
                    ? "text-red-500 border-b-2 border-red-500 pb-1 transition-colors duration-300"
                    : "hover:text-red-500 transition-colors duration-300"
                }
              >
                NAM
              </NavLink>
            <div className="absolute left-0 top-8 hidden group-hover:block bg-white divide-y divide-gray-100 rounded-lg shadow-sm w-44 z-10">
              <ul className="py-2 text-sm text-gray-700">
              <li className="px-4 py-2 font-bold text-gray-900">Thương Hiệu </li>
                        {brands
                  .filter((brand) => brand.category === "men")
                  .map((brand) => (
                    <li key={brand.id}>
                      <NavLink
                        to={`/men/${brand.name.toLowerCase().replace(" ", "-")}`}
                        className="block px-4 py-2 hover:bg-gray-100"
                      >
                        {brand.name}
                      </NavLink>
                    </li>
                  ))}
              </ul>
            </div>
          </div>

          {/* Dropdown for Nữ */}
          <div className="relative group">
          <NavLink
                to="/women"
                className={({ isActive }) =>
                  isActive
                    ? "text-red-500 border-b-2 border-red-500 pb-1 transition-colors duration-300"
                    : "hover:text-red-500 transition-colors duration-300"
                }
              >
                NỮ
              </NavLink>
            <div className="absolute left-0 top-8 hidden group-hover:block bg-white divide-y divide-gray-100 rounded-lg shadow-sm w-44 z-10">
            <ul className="py-2 text-sm text-gray-700">
              <li className="px-4 py-2 font-bold text-gray-900">Thương Hiệu </li>
                        {brands
                  .filter((brand) => brand.category === "women")
                  .map((brand) => (
                    <li key={brand.id}>
                      <NavLink
                        to={`/men/${brand.name.toLowerCase().replace(" ", "-")}`}
                        className="block px-4 py-2 hover:bg-gray-100"
                      >
                        {brand.name}
                      </NavLink>
                    </li>
                  ))}
              </ul>
            </div>
          </div>

          {/* Dropdown for Couple */}
          <div className="relative group">
          <NavLink
                to="/couple"
                className={({ isActive }) =>
                  isActive
                    ? "text-red-500 border-b-2 border-red-500 pb-1 transition-colors duration-300"
                    : "hover:text-red-500 transition-colors duration-300"
                }
              >
                CẶP ĐÔI
              </NavLink>
            <div className="absolute left-0 top-8 hidden group-hover:block bg-white divide-y divide-gray-100 rounded-lg shadow-sm w-44 z-10">
            <ul className="py-2 text-sm text-gray-700">
              <li className="px-4 py-2 font-bold text-gray-900">Thương Hiệu </li>
                        {brands
                  .filter((brand) => brand.category === "couple")
                  .map((brand) => (
                    <li key={brand.id}>
                      <NavLink
                        to={`/men/${brand.name.toLowerCase().replace(" ", "-")}`}
                        className="block px-4 py-2 hover:bg-gray-100"
                      >
                        {brand.name}
                      </NavLink>
                    </li>
                  ))}
              </ul>
            </div>
          </div>

          <NavLink
            to="/contact"
            className={({ isActive }) =>
              isActive
                ? "text-red-500 border-b-2 border-red-500 pb-1 transition-colors duration-300"
                : "hover:text-red-500 transition-colors duration-300"
            }
          >
            LIÊN HỆ
          </NavLink>
        </nav>
      </div>
    </header>
  );
};

export default Header;
