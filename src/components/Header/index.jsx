import logo from "../../assets/logo.png";
import searchIcon from "../../assets/search.png";
import cartIcon from "../../assets/cart.png";
import heartIcon from "../../assets/heart.png";
import userIcon from "../../assets/user.png";
import { NavLink, useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();

  return (
    <header className="w-full border-b-[#EDEDED] shadow-sm bg-white">
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
                <img width="26px" src={cartIcon} alt="Cart Icon" />
              </button>
              <button
                onClick={() => navigate("/favorite")}
                className="hover:text-red-500 cursor-pointer transition-all duration-300 hover:scale-110 hover:opacity-80"
              >
                <img width="26px" src={heartIcon} alt="Heart Icon" />
              </button>
              <button className="hover:text-red-500 cursor-pointer transition-all duration-300 hover:scale-110 hover:opacity-80">
                <img width="26px" src={userIcon} alt="User Icon" />
              </button>
            </div>
          </div>
        </div>

        <nav className="flex space-x-40 text-gray-600 text-lg font-medium mt-5">
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
