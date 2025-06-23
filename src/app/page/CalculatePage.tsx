"use client";

import { Calculator, Award, Info } from "lucide-react";
import { useEffect, useState } from "react";

import axios from "axios";
import Header from "../components/header";
import Footer from "../components/footer";
import UnAuthenticatedPage from "../components/unAuthenticatedPage";

export default function TinhDiemPage() {
  const [scores, setScores] = useState({
    toan: "",
    nguvan: "",
    ngoaingu: "",
    vatli_lichsu: "",
    hoa_dia: "",
    sinh_gdcd: "",
    trungbinh: "",
    khuyenkhich: "",
    uutien: "",
  });

  const [result, setResult] = useState<{ totalScore: number } | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    // Check if user has email in localStorage
    const email = localStorage.getItem("email");
    setIsAuthenticated(!!email);
  }, []);

  const handleInputChange = (field: string, value: string) => {
    setScores((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const submitScores = async () => {
    try {
      setLoading(true);
      setError(null);

      // Gửi dữ liệu đến API backend bằng axios
      // const response = await api.post("/api/calculate-score", scores);

      // Giả sử dữ liệu trả về nằm trong response.data
      // setResult(response.data);
    } catch (err) {
      // Kiểm tra xem lỗi có phải là AxiosError không
      if (axios.isAxiosError(err)) {
        // Xử lý lỗi từ axios
        setError(err.response?.data?.message || err.message);
      } else {
        setError("Đã xảy ra lỗi");
      }
    } finally {
      setLoading(false);
    }
  };
  const resetForm = () => {
    setScores({
      toan: "",
      nguvan: "",
      ngoaingu: "",
      vatli_lichsu: "",
      hoa_dia: "",
      sinh_gdcd: "",
      trungbinh: "",
      khuyenkhich: "",
      uutien: "",
    });
    setResult(null);
    setError(null);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <Header />

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-400 to-blue-600 text-white py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Tính điểm xét tuyển
          </h1>
          <p className="text-xl text-blue-100 max-w-3xl mx-auto">
            Công cụ tính điểm xét tuyển đại học chính xác và nhanh chóng
          </p>
        </div>
      </section>

      {/* Main Content */}
      <div
        className={`${
          !isAuthenticated ? "blur-sm pointer-events-none select-none" : ""
        } max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16`}
      >
        {/* <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16"> */}
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Form Section */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-md border border-gray-200">
              <div className="p-6 border-b border-gray-200">
                <h2 className="text-2xl font-semibold text-blue-600 flex items-center gap-2">
                  <Calculator className="h-6 w-6" />
                  Nhập điểm các môn thi
                </h2>
                <p className="text-gray-600 mt-1">
                  Vui lòng nhập điểm các môn để tính điểm xét tuyển
                </p>
              </div>

              <div className="p-6 space-y-6">
                {/* Điểm các môn chính */}
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Nhập điểm môn Toán:{" "}
                      <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="number"
                      min="0"
                      max="10"
                      step="0.25"
                      value={scores.toan}
                      onChange={(e) =>
                        handleInputChange("toan", e.target.value)
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="0.00"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Nhập điểm môn Ngữ văn:{" "}
                      <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="number"
                      min="0"
                      max="10"
                      step="0.25"
                      value={scores.nguvan}
                      onChange={(e) =>
                        handleInputChange("nguvan", e.target.value)
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="0.00"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Nhập điểm môn Ngoại ngữ:{" "}
                      <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="number"
                      min="0"
                      max="10"
                      step="0.25"
                      value={scores.ngoaingu}
                      onChange={(e) =>
                        handleInputChange("ngoaingu", e.target.value)
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="0.00"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Nhập điểm môn Vật lí (hoặc Lịch sử):{" "}
                      <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="number"
                      min="0"
                      max="10"
                      step="0.25"
                      value={scores.vatli_lichsu}
                      onChange={(e) =>
                        handleInputChange("vatli_lichsu", e.target.value)
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="0.00"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Nhập điểm môn Hóa học (hoặc Địa lí):{" "}
                      <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="number"
                      min="0"
                      max="10"
                      step="0.25"
                      value={scores.hoa_dia}
                      onChange={(e) =>
                        handleInputChange("hoa_dia", e.target.value)
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="0.00"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Nhập điểm môn Sinh học (hoặc GDCD):{" "}
                      <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="number"
                      min="0"
                      max="10"
                      step="0.25"
                      value={scores.sinh_gdcd}
                      onChange={(e) =>
                        handleInputChange("sinh_gdcd", e.target.value)
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="0.00"
                    />
                  </div>
                </div>

                {/* Điểm bổ sung */}
                <div className="border-t pt-6">
                  <h3 className="text-lg font-medium text-gray-900 mb-4">
                    Điểm bổ sung
                  </h3>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Nhập điểm trung bình cả năm lớp 12:
                      </label>
                      <input
                        type="number"
                        min="0"
                        max="10"
                        step="0.1"
                        value={scores.trungbinh}
                        onChange={(e) =>
                          handleInputChange("trungbinh", e.target.value)
                        }
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        placeholder="0.0"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Nhập điểm khuyến khích (nếu có):
                      </label>
                      <input
                        type="number"
                        min="0"
                        max="5"
                        step="0.5"
                        value={scores.khuyenkhich}
                        onChange={(e) =>
                          handleInputChange("khuyenkhich", e.target.value)
                        }
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        placeholder="0.0"
                      />
                    </div>

                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Nhập điểm ưu tiên (nếu có):
                      </label>
                      <input
                        type="number"
                        min="0"
                        max="5"
                        step="0.5"
                        value={scores.uutien}
                        onChange={(e) =>
                          handleInputChange("uutien", e.target.value)
                        }
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        placeholder="0.0"
                      />
                    </div>
                  </div>
                </div>

                {/* Buttons */}
                <div className="flex gap-4 pt-6 border-t">
                  <button
                    onClick={submitScores}
                    disabled={loading}
                    className={`flex-1 bg-blue-600 hover:bg-blue-700 text-white py-3 px-6 rounded-md font-medium transition-colors flex items-center justify-center gap-2 ${
                      loading ? "opacity-70 cursor-not-allowed" : ""
                    }`}
                  >
                    {loading ? (
                      <>
                        <svg
                          className="animate-spin -ml-1 mr-2 h-5 w-5 text-white"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                        >
                          <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                          ></circle>
                          <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                          ></path>
                        </svg>
                        Đang xử lý...
                      </>
                    ) : (
                      <>
                        <Calculator className="h-5 w-5" />
                        Tính điểm
                      </>
                    )}
                  </button>
                  <button
                    onClick={resetForm}
                    disabled={loading}
                    className={`px-6 py-3 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors ${
                      loading ? "opacity-70 cursor-not-allowed" : ""
                    }`}
                  >
                    Làm mới
                  </button>
                </div>

                {/* Error message */}
                {error && (
                  <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-md">
                    <p className="text-sm text-red-600">{error}</p>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Result & Info Section */}
          <div className="space-y-6">
            {/* Result */}
            {result && (
              <div className="bg-white rounded-lg shadow-md border border-gray-200">
                <div className="p-6 border-b border-gray-200">
                  <h3 className="text-xl font-semibold text-blue-600 flex items-center gap-2">
                    <Award className="h-5 w-5" />
                    Kết quả
                  </h3>
                </div>
                <div className="p-6">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-blue-600 mb-2">
                      {result.totalScore.toFixed(2)}
                    </div>
                    <p className="text-gray-600">Điểm xét tuyển</p>
                  </div>
                  <div className="mt-4 p-4 bg-blue-50 rounded-lg">
                    <p className="text-sm text-blue-800">
                      Điểm này được tính dựa trên công thức xét tuyển của Bộ
                      Giáo dục và Đào tạo
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Info */}
            <div className="bg-white rounded-lg shadow-md border border-gray-200">
              <div className="p-6 border-b border-gray-200">
                <h3 className="text-xl font-semibold text-blue-600 flex items-center gap-2">
                  <Info className="h-5 w-5" />
                  Hướng dẫn
                </h3>
              </div>
              <div className="p-6 space-y-3">
                <div className="text-sm text-gray-700">
                  <p className="font-medium mb-2">Cách tính điểm:</p>
                  <ul className="space-y-1 text-xs">
                    <li>• Điểm 6 môn thi THPT</li>
                    <li>• Điểm TB lớp 12 × 0.5</li>
                    <li>• Điểm khuyến khích</li>
                    <li>• Điểm ưu tiên</li>
                  </ul>
                </div>
                <div className="text-sm text-gray-700">
                  <p className="font-medium mb-2">Lưu ý:</p>
                  <ul className="space-y-1 text-xs">
                    <li>• Điểm từ 0 đến 10</li>
                    <li>• Có thể nhập số thập phân</li>
                    <li>• Các trường có dấu * là bắt buộc</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {!isAuthenticated && <UnAuthenticatedPage />}
      {/* Footer */}
      <Footer />
    </div>
  );
}
