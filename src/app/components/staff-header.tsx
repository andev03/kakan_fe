import React from "react";
import LogoName from "./logoName";
import { Link } from "react-router-dom";
import { Button } from "../components/ui/button";
import { ChevronDown, Building2, FileText } from "lucide-react";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "../components/ui/hover-card";
import { useUser } from "../hooks/userContext";
import { useNavigate } from "react-router-dom";

export const StaffHeader = () => {
  const navigate = useNavigate();
  const { logout } = useUser();
  const handleLogout = () => {
    logout(); // Xóa token và user khỏi localStorage + state
    navigate("/login"); // Điều hướng về trang login (hoặc trang chủ)
  };

  return (
    <>
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <h1 className="text-5xl font-bold">
                <LogoName />
              </h1>
              <span className="text-xl text-gray-500 ml-8">
                Staff Dashboard
              </span>
            </div>
            <div className="flex items-center space-x-4">
              <nav className="flex items-center space-x-2">
                <Link to="/manage-post">
                  <Button variant="outline">
                    <FileText className="h-4 w-4 mr-2" />
                    Quản lý bài viết
                  </Button>
                </Link>
                <Link to="/manage-universities">
                  <Button variant="outline">
                    <Building2 className="h-4 w-4 mr-2" />
                    Quản lý trường ĐH
                  </Button>
                </Link>
              </nav>
              <div className="border-l border-gray-200 pl-4 flex items-center space-x-3">
                <HoverCard openDelay={100} closeDelay={100}>
                  <HoverCardTrigger className="flex items-center space-x-1 cursor-pointer px-3 py-2 hover:bg-gray-100 rounded-md transition">
                    <span className="text-sm text-gray-700">
                      Xin chào, Staff
                    </span>
                    <ChevronDown className="w-4 h-4 text-gray-700" />
                  </HoverCardTrigger>
                  <HoverCardContent className="w-56 p-0 bg-white border border-gray-200 rounded-lg shadow-lg z-50">
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
            </div>
          </div>
        </div>
      </header>
    </>
  );
};
