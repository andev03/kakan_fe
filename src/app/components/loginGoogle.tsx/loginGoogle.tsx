import { useEffect, useContext, useRef } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { UserContext } from "../../hooks/userContext";
import { toast } from "react-toastify";

const GoogleCallBack = () => {
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");
  const username = decodeURIComponent(searchParams.get("username")!);

  const role = searchParams.get("role");
  const navigate = useNavigate();
  const userContext = useContext(UserContext);
  const hasRun = useRef(false);
  // Ngăn useEffect chạy lại nhiều lần

  useEffect(() => {
    if (hasRun.current) return; // Nếu đã chạy rồi, thoát luôn
    hasRun.current = true; // Đánh dấu đã chạy

    console.log(token);
    if (token === null) {
      console.error("Không tìm thấy token từ Google.");
      toast.error("Tài khoản của bạn đã bị khóa hoặc không hợp lệ.");
      navigate("/login");
      return;
    }

    try {
      // Giải mã token
      // Tạo object user từ token
      const user = {
        username: decodeURIComponent(username),
        role: role ?? "",
        token: token,
      };
      console.log("user:", user);
      // Lưu user vào context nếu context hợp lệ
      if (userContext?.login) {
        userContext.login(user);
        console.log("userContext:", userContext);
      } else {
        console.warn("UserContext chưa được khởi tạo, lưu vào localStorage.");
        localStorage.setItem("user", JSON.stringify(user));
      }
      // Điều hướng theo vai trò
      if (user.role === "STUDENT") {
        navigate("/");
      } else if (user.role === "STAFF") {
        navigate("/manage-posts");
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
