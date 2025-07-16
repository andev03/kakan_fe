import { useEffect, useContext, useRef } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import { UserContext } from "../../hooks/userContext";

const GoogleCallBack = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const userContext = useContext(UserContext);
  const hasRun = useRef(false);
 // Ngăn useEffect chạy lại nhiều lần

  useEffect(() => {
    if (hasRun.current) return; // Nếu đã chạy rồi, thoát luôn
    hasRun.current = true; // Đánh dấu đã chạy

    const token = searchParams.get("token");
    console.log(token);
    if (token === null) {
      console.error("Không tìm thấy token từ Google.");
      navigate("/login");
      return;
    }
    
    try {
      // Giải mã token
      const decodedToken: any = jwtDecode(token);
      // Tạo object user từ token
      const user = {
        id: decodedToken.accountId,
        userNamae: decodedToken.username,
        name: decodedToken.name,
        email: decodedToken.username,
        role: decodedToken.role,
        token: token,
      };
      console.log("user:", user);
      // Lưu user vào context nếu context hợp lệ
      if (userContext?.login) {
        userContext.login(user);
        console.log("userContext:",userContext);
      } else {
        console.warn("UserContext chưa được khởi tạo, lưu vào localStorage.");
        localStorage.setItem("user", JSON.stringify(user));
      }
      // Điều hướng theo vai trò
      if (user.role === "ROLE_Admin") {
        navigate("/admin");
      } else if (user.role === "ROLE_Approver") {
        navigate("/claim-request");
      } else {
        navigate("/");
      }
    } catch (error) {
      console.error("Lỗi khi xử lý Google Callback:", error);
      navigate("/login");
    }
  }, [searchParams]);

  return <div>Loading...</div>; // Đảm bảo component trả về JSX hợp lệ
};

export default GoogleCallBack;
