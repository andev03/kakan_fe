import { useState } from "react";
import LogoName from "./logoName";
import { useNavigate, Link } from "react-router-dom";
import { ChevronDown, User } from "lucide-react";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "./ui/hover-card";
import { useUser } from "../hooks/userContext";
export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { logout } = useUser();
  const navigate = useNavigate();
  const menuItems = [
    { label: "Diễn đàn", path: "/forum" },
    { label: "Đại Học", path: "/universities" },
    { label: "Tính điểm", path: "/calculate" },
    { label: "Liên hệ", path: "/contact" },
  ];
  const user = localStorage.getItem("user");
  const role = user ? JSON.parse(user).role : null;
  const handleLogin = () => {
    navigate("/login");
  };
  const handleLogout = () => {
    logout(); // Xóa token và user khỏi localStorage + state
    navigate("/login"); // Điều hướng về trang login (hoặc trang chủ)
  };
  return (
    <header className=" bg-white border-b sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <div className="text-4xl font-bold mr-8 ">
              <LogoName />
            </div>
            <h1 className="text-sky-600 text-sm md:text-base hidden sm:block">
              Hệ thống tra cứu tuyển sinh SaiGon
            </h1>
          </div>
          <nav className="hidden md:flex space-x-1">
            {menuItems.map((item) => (
              <button
                key={item.label}
                onClick={() => navigate(item.path)}
                className="px-3 py-2 text-sm text-slate-600 hover:text-sky-600 hover:bg-slate-50  cursor-pointer"
              >
                {item.label}
              </button>
            ))}
            {!user ? (
              <button
                onClick={handleLogin}
                className="ml-2 px-4 py-2 text-sm bg-sky-500 hover:bg-sky-600 text-white rounded-md transition-colors cursor-pointer"
              >
                Đăng nhập
              </button>
            ) : (
              <div className="flex items-center justify-between">
                {role !== "PREMIUM" && (
                  <button
                    onClick={() => navigate("/register-premium")}
                    className="px-4 py-2 text-sm bg-sky-500 hover:bg-sky-600 text-white rounded-md transition-colors cursor-pointer"
                  >
                    Đăng ký Premium
                  </button>
                )}

                <HoverCard openDelay={100} closeDelay={100}>
                  <HoverCardTrigger className="flex items-center space-x-1 cursor-pointer px-3 py-2 hover:bg-gray-100 rounded-md transition">
                    <User className="w-5 h-5 text-gray-700" />
                    <ChevronDown className="w-4 h-4 text-gray-700" />
                  </HoverCardTrigger>
                  <HoverCardContent className="w-56 p-0 bg-white border border-gray-200 rounded-lg shadow-lg z-50">
                    <Link
                      to="/customer/dashboard"
                      className="block px-4 py-2 text-gray-700 hover:bg-gray-100 hover:rounded-xl"
                    >
                      Thông tin cá nhân
                    </Link>
                    <div className="border-t border-gray-100 my-1" />
                    <button
                      onClick={handleLogout}
                      className="block w-full text-left px-4 py-2 text-blue-600 hover:bg-gray-100 hover:rounded-xl"
                    >
                      Đăng xuất
                    </button>
                  </HoverCardContent>
                </HoverCard>
              </div>
            )}
          </nav>
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 border border-slate-200 rounded-md hover:bg-slate-50"
          >
            <span className="sr-only">Menu</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="4" x2="20" y1="12" y2="12" />
              <line x1="4" x2="20" y1="6" y2="6" />
              <line x1="4" x2="20" y1="18" y2="18" />
            </svg>
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t">
            <nav className="flex flex-col space-y-2">
              {[
                "Kỳ thi sắp tới",
                "Tuyển sinh",
                "Điểm chuẩn",
                "Thời gian",
                "Liên hệ",
              ].map((item) => (
                <button
                  key={item}
                  className="px-3 py-2 text-sm text-slate-600 hover:text-sky-600 hover:bg-slate-50 rounded-md transition-colors text-left"
                >
                  {item}
                </button>
              ))}
              <button className="mt-2 px-4 py-2 text-sm bg-sky-500 hover:bg-sky-600 text-white rounded-md transition-colors">
                Đăng nhập
              </button>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
