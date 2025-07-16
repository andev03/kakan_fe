"use client";

import { useEffect, useState } from "react";

import { Eye, EyeOff, ArrowRight, CheckCircle } from "lucide-react";
import LogoName from "../components/logoName";
import { useNavigate } from "react-router-dom";
import { useUser } from "../hooks/userContext";
import { api } from "../hooks/api";
import { toast } from "react-toastify";

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [activeTab, setActiveTab] = useState("login");
  const [__error, setError] = useState("");
  const [__isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    // Xoá token và thông tin user trong localStorage khi vào trang Login
    localStorage.removeItem("token");
    localStorage.removeItem("user");
  }, []);

  const { login } = useUser();

  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const [formRegister, setFormRegister] = useState({
    fullName: "",
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    gender: true,
    dob: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleChangeRegister = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormRegister((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      const response = await api.post("/user/api/login", {
        username: formData.username,
        password: formData.password,
      });
      console.log("dang nhap", response);
      const { data } = response.data;
      console.log(response.data.status);
      if (response.data.status == 401 || response.data.status == 404) {
        toast.error(response.data.message);
      }

      if (data) {
        login(data);
        const role = data.role;
        console.log("ROLE", role);
        switch (role) {
          case "ADMIN":
            navigate("/manage-user");
            break;
          case "STUDENT":
            navigate("/");
            break;
          case "STAFF":
            navigate("/manage-post");
            break;
          default:
            navigate("/");
        }
      } else {
        setError("Đăng nhập thất bại: Không có dữ liệu người dùng.");
      }
    } catch (err: any) {
      setError(
        err.response?.data?.message || "Có lỗi xảy ra. Vui lòng thử lại sau!"
      );
      console.error("Login error:", err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleRegister = async () => {
    const { username, fullName, email, password, confirmPassword, dob } =
      formRegister;

    if (
      !username ||
      !fullName ||
      !email ||
      !password ||
      !confirmPassword ||
      !dob
    ) {
      toast.warn(" Vui lòng nhập đầy đủ thông tin!");
      return;
    }

    if (password !== confirmPassword) {
      toast.error("❌ Mật khẩu xác nhận không khớp!");
      return;
    }

    try {
      const res = await api.post("/user/api/register", {
        ...formRegister,
        // convert string → boolean
      });
      console.log(res);
      if (res.data.status === 200) {
        toast.success("🎉 Đăng ký thành công, vui lòng đăng nhập!");
        setActiveTab("login");
      } else {
        toast.error(res.data.message || "Đăng ký thất bại.");
      }
    } catch (err: any) {
      toast.error(err?.response?.data?.message || "Đăng ký thất bại!");
    }
  };

  const handleGoogleLogin = async () => {
    try {
      // const response = await api.get("/user/api/login-with-google");
      // const loginUrl = response.data.loginUrl;
      // console.log(loginUrl);
      // if (!loginUrl) {
      //   throw new Error("Google Sign-in URL not received.");
      // }
      window.location.href =
        "http://localhost:8003/oauth2/authorization/google";
      // window.location.href = loginUrl;
    } catch (error) {
      console.error("Lỗi Google Login:", error);
      setError("Could not connect to Google, please try again.");
    }
  };

  return (
    <div className="min-h-screen bg-cyan-50 from-sky-50 to-white flex flex-col items-center justify-center">
      <div className="w-full max-w-5xl">
        <div className="text-center mb-6">
          <h1 className="text-6xl font-bold">
            <LogoName />
          </h1>
          <p className="text-sky-600 text-lg mt-1">
            Hệ thống tra cứu tuyển sinh SaiGon
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 items-stretch">
          {/* Premium Card */}
          <div className="border-0 shadow-lg bg-gradient-to-br from-sky-500 to-sky-600 text-white rounded-lg">
            <div className="p-6">
              <h2 className="text-2xl font-bold mb-2">KAKAN Premium</h2>
              <p className="text-sky-100 mb-4">KAKAN Premium là gì?</p>
            </div>
            <div className="px-6 pb-6 space-y-4">
              <p>
                KAKAN Premium cho phép bạn trải nghiệm được tất cả các dịch vụ
                của chúng tôi như:
              </p>

              <div className="space-y-2">
                {[
                  "Tìm kiếm thông tin học bạ từ mọi nơi về hệ thống tuyển sinh",
                  "Dữ liệu hiển thị hoa và điểm số của mình trong các kỳ thi",
                  "Tra cứu thông tin về các trường học và so sánh thành tích học của bạn trong quá trình tuyển sinh",
                  "Trực tiếp đưa ra quyết định đúng đắn hơn cho việc học tập",
                ].map((feature, index) => (
                  <div key={index} className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-sky-100 shrink-0 mt-0.5" />
                    <p className="text-sky-50">{feature}</p>
                  </div>
                ))}
              </div>

              <div className="mt-8 bg-white/10 rounded-lg p-4 text-center">
                <p className="text-sm text-sky-100">Chỉ với</p>
                <p className="text-3xl font-bold">30.000đ / tháng</p>
              </div>
            </div>
            <div className="p-6 pt-0">
              <button className="w-full bg-white text-sky-600 hover:bg-gray-50 font-medium py-3 px-4 rounded-md  flex items-center justify-center ">
                Hãy đăng nhập để có thể mua gói Premium
                <ArrowRight className="ml-2 h-4 w-4" />
              </button>
            </div>
          </div>

          {/* Login Card */}
          <div className="border-0 shadow-lg bg-white rounded-lg">
            <div className="p-6">
              <h2 className="text-xl font-medium italic text-center mb-6">
                Chào mừng bạn đến với{" "}
                <span className="text-2xl ml-1 not-italic">{LogoName()} !</span>
              </h2>
            </div>
            <div className="px-6 pb-6">
              {/* Custom Tabs */}

              <div className="w-full mb-6">
                <div className="grid grid-cols-2 bg-gray-100 rounded-lg p-1 cursor-pointer">
                  <button
                    onClick={() => setActiveTab("login")}
                    className={`py-2 px-4 rounded-md font-medium transition-colors ${
                      activeTab === "login"
                        ? "bg-white text-gray-900 shadow-sm cursor-pointer"
                        : "text-gray-600 hover:text-gray-900 cursor-pointer"
                    }`}
                  >
                    Đăng nhập
                  </button>
                  <button
                    onClick={() => setActiveTab("register")}
                    className={`py-2 px-4 rounded-md font-medium transition-colors ${
                      activeTab === "register"
                        ? "bg-white text-gray-900 shadow-sm cursor-pointer"
                        : "text-gray-600 hover:text-gray-900 cursor-pointer"
                    }`}
                  >
                    Đăng ký
                  </button>
                </div>
              </div>

              {/* Login Tab */}
              {activeTab === "login" && (
                <form onSubmit={handleLogin}>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <input
                        type="text"
                        name="username"
                        placeholder="Tên đăng nhập"
                        onChange={handleChange}
                        className="w-full h-12 px-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent"
                      />
                    </div>

                    <div className="space-y-2 relative">
                      <input
                        type={showPassword ? "text" : "password"}
                        name="password"
                        onChange={handleChange}
                        placeholder="Mật khẩu"
                        className="w-full h-12 px-3 pr-10 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-3 text-gray-500 hover:text-gray-700"
                      >
                        {showPassword ? (
                          <EyeOff className="h-5 w-5" />
                        ) : (
                          <Eye className="h-5 w-5" />
                        )}
                      </button>
                    </div>

                    <div className="text-right">
                      <a
                        href="#"
                        className="text-sky-500 hover:text-sky-600 text-sm"
                      >
                        Quên mật khẩu?
                      </a>
                    </div>

                    <button
                      type="submit"
                      className="w-full h-12 mt-2 bg-sky-500 hover:bg-sky-600 text-white font-medium rounded-md cursor-pointer"
                    >
                      Đăng nhập
                    </button>
                  </div>
                </form>
              )}
              <div className="relative my-6">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-300"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-white text-gray-500">hoặc</span>
                </div>
              </div>

              {/* Google Login Button */}
              <button
                onClick={handleGoogleLogin}
                type="button"
                className="w-full h-12 border border-gray-300 hover:border-gray-400 bg-white hover:bg-gray-50 text-gray-700 font-medium rounded-md cursor-pointer flex items-center justify-center gap-3 transition-colors"
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24">
                  <path
                    fill="#4285F4"
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  />
                  <path
                    fill="#34A853"
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  />
                  <path
                    fill="#FBBC05"
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                  />
                  <path
                    fill="#EA4335"
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                  />
                </svg>
                Đăng nhập bằng Google
              </button>

              {/* Register Tab */}
              {activeTab === "register" && (
                <div className="space-y-4">
                  <div className="space-y-2">
                    <input
                      type="text"
                      name="fullName"
                      placeholder="Họ và tên"
                      onChange={handleChangeRegister}
                      className="w-full h-12 px-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent"
                    />
                  </div>

                  <div className="space-y-2">
                    <input
                      type="text"
                      name="username"
                      placeholder="Tên đăng nhập"
                      onChange={handleChangeRegister}
                      className="w-full h-12 px-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent"
                    />
                  </div>

                  <div className="space-y-2">
                    <input
                      type="email"
                      name="email"
                      placeholder="Email"
                      onChange={handleChangeRegister}
                      className="w-full h-12 px-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent"
                    />
                  </div>

                  <div className="space-y-2 relative">
                    <input
                      type={showPassword ? "text" : "password"}
                      name="password"
                      placeholder="Mật khẩu"
                      onChange={handleChangeRegister}
                      className="w-full h-12 px-3 pr-10 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-3 text-gray-500 hover:text-gray-700"
                    >
                      {showPassword ? (
                        <EyeOff className="h-5 w-5" />
                      ) : (
                        <Eye className="h-5 w-5" />
                      )}
                    </button>
                  </div>

                  <div className="space-y-2">
                    <input
                      type="password"
                      name="confirmPassword"
                      placeholder="Xác nhận mật khẩu"
                      onChange={handleChangeRegister}
                      className="w-full h-12 px-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-sm text-gray-600">Giới tính</label>
                    <div className="flex gap-4">
                      <label className="flex items-center gap-1">
                        <input
                          type="radio"
                          name="gender"
                          value="true"
                          checked={formRegister.gender === true}
                          onChange={() =>
                            setFormRegister((prev) => ({
                              ...prev,
                              gender: true,
                            }))
                          }
                        />
                        Nam
                      </label>
                      <label className="flex items-center gap-1">
                        <input
                          type="radio"
                          name="gender"
                          value="false"
                          checked={formRegister.gender === false}
                          onChange={() =>
                            setFormRegister((prev) => ({
                              ...prev,
                              gender: false,
                            }))
                          }
                        />
                        Nữ
                      </label>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <input
                      type="date"
                      name="dob"
                      onChange={handleChangeRegister}
                      className="w-full h-12 px-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent"
                    />
                  </div>

                  <button
                    onClick={handleRegister}
                    type="button"
                    className="w-full h-12 mt-2 bg-sky-500 hover:bg-sky-600 text-white font-medium rounded-md cursor-pointer"
                  >
                    Đăng ký
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="text-center mt-8 text-gray-500 text-sm">
          © 2025 KAKAN - Hệ thống tra cứu tuyển sinh SaiGon
        </div>
      </div>
    </div>
  );
}
