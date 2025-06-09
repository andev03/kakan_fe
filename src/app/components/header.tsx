import { useState } from "react";
import LogoName from "./logoName";
import { useNavigate } from "react-router-dom";
export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();
  const menuItems = [
    { label: "Diễn đàn", path: "/forum" },
    { label: "Đại Học", path: "/universities" },
    { label: "Tính điểm", path: "/calculate" },
    { label: "Liên hệ", path: "/contact" },
  ];
  const email = localStorage.getItem("email");
  const handleLogin = () => {
    navigate("/login");
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
            {!email ? (
              <button
                onClick={handleLogin}
                className="ml-2 px-4 py-2 text-sm bg-sky-500 hover:bg-sky-600 text-white rounded-md transition-colors cursor-pointer"
              >
                Đăng nhập
              </button>
            ) : (
              <button
                onClick={() => navigate("/register-premium")}
                className="ml-2 px-4 py-2 text-sm bg-sky-500 hover:bg-sky-600 text-white rounded-md transition-colors cursor-pointer"
              >
                Đăng ký Premium
              </button>
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
