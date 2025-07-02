"use client";

import { Calculator, Award, Info } from "lucide-react";
import { useEffect, useState } from "react";

import axios from "axios";
import Header from "../components/header";
import Footer from "../components/footer";
import UnAuthenticatedPage from "../components/unAuthenticatedPage";
import { toast } from "react-toastify";
import { api } from "../hooks/api";

export default function TinhDiemPage() {
  type SubjectKey =
    | "toan"
    | "nguvan"
    | "ngoaingu"
    | "vatli"
    | "hoahoc"
    | "sinhhoc"
    | "lichsu"
    | "dialy"
    | "congnghe"
    | "tinhoc";

  const [scores, setScores] = useState<
    Record<SubjectKey, { 10: string; 11: string; 12: string }>
  >({
    toan: { 10: "", 11: "", 12: "" },
    nguvan: { 10: "", 11: "", 12: "" },
    ngoaingu: { 10: "", 11: "", 12: "" },
    vatli: { 10: "", 11: "", 12: "" },
    hoahoc: { 10: "", 11: "", 12: "" },
    sinhhoc: { 10: "", 11: "", 12: "" },
    lichsu: { 10: "", 11: "", 12: "" },
    dialy: { 10: "", 11: "", 12: "" },

    congnghe: { 10: "", 11: "", 12: "" },

    tinhoc: { 10: "", 11: "", 12: "" },
  });

  const [result, setResult] = useState({ gpa: 0 });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    // Check if user has email in localStorage
    const user = localStorage.getItem("user");
    setIsAuthenticated(!!user);
  }, []);

  const handleScoreChange = (
    subject: SubjectKey,
    year: 10 | 11 | 12,
    value: string
  ) => {
    setScores((prevScores) => ({
      ...prevScores,
      [subject]: {
        ...prevScores[subject],
        [year]: value,
      },
    }));
  };
  const buildSubjectScores = () => {
    return Object.entries(scores).map(([subject, years]) => ({
      subject,
      scoreYear10: parseFloat(years["10"]) || 0,
      scoreYear11: parseFloat(years["11"]) || 0,
      scoreYear12: parseFloat(years["12"]) || 0,
    }));
  };

  const submitScores = async () => {
    try {
      const user = JSON.parse(localStorage.getItem("user") || "{}");
      const accountId = user.id;

      if (!accountId) {
        toast.error("Không tìm thấy người dùng. Vui lòng đăng nhập lại.");
        return;
      }

      const subjectScores = buildSubjectScores();

      setLoading(true);
      setError(null);

      const response = await api.post(`/user/api/calculate/gpa`, {
        subjectScores,
      });
      console.log("diem", response);
      const data = response.data;
      if (data.status === 200) {
        setResult(data.data);
        toast.success("Tính GPA thành công!");
      } else {
        toast.error("Tính điểm thất bại: " + data.message);
      }
    } catch (err: any) {
      toast.error("Lỗi hệ thống. Vui lòng thử lại sau!");
      console.error("Submit score error:", err);
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setScores({
      toan: { 10: "", 11: "", 12: "" },
      nguvan: { 10: "", 11: "", 12: "" },
      ngoaingu: { 10: "", 11: "", 12: "" },
      vatli: { 10: "", 11: "", 12: "" },
      hoahoc: { 10: "", 11: "", 12: "" },
      sinhhoc: { 10: "", 11: "", 12: "" },
      lichsu: { 10: "", 11: "", 12: "" },
      dialy: { 10: "", 11: "", 12: "" },
      congnghe: { 10: "", 11: "", 12: "" },
      tinhoc: { 10: "", 11: "", 12: "" },
    });
    setResult({ gpa: 0 });
    setError(null);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <section className="bg-gradient-to-r from-blue-400 to-blue-600 text-white py-10">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Tính điểm xét tuyển
          </h1>
          <p className="text-xl text-blue-100 max-w-3xl mx-auto">
            Công cụ tính điểm xét tuyển đại học chính xác và nhanh chóng
          </p>
        </div>
      </section>

      <div
        className={`${
          !isAuthenticated ? "blur-sm pointer-events-none select-none" : ""
        } max-w-6xl mx-auto px-4 py-16`}
      >
        <div className="grid lg:grid-cols-3 gap-8">
          {/* FORM NHẬP ĐIỂM */}
          <div className="lg:col-span-2 bg-white rounded-lg shadow-md border border-gray-200">
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-2xl font-semibold text-blue-600 flex items-center gap-2">
                <Calculator className="h-6 w-6" />
                Nhập điểm các môn học
              </h2>
              <p className="text-gray-600 mt-1">
                Vui lòng nhập điểm từng môn cho cả 3 năm học
              </p>
            </div>

            <div className="p-6 space-y-6">
              {/* Nhập điểm từng môn theo từng năm */}
              {[
                "toan",
                "nguvan",
                "ngoaingu",
                "vatli",
                "hoahoc",
                "sinhhoc",
                "lichsu",
                "dialy",
                "congnghe",
                "tinhoc",
              ].map((subject) => (
                <div key={subject}>
                  <label className="block text-sm font-medium text-gray-700 mb-2 capitalize">
                    {subject === "toan"
                      ? "Toán"
                      : subject === "nguvan"
                      ? "Ngữ văn"
                      : subject === "ngoaingu"
                      ? "Ngoại ngữ"
                      : subject === "vatli"
                      ? "Vật lí"
                      : subject === "hoahoc"
                      ? "Hóa học"
                      : subject === "sinhhoc"
                      ? "Sinh học"
                      : subject === "lichsu"
                      ? "Lịch sử"
                      : subject === "dialy"
                      ? "Địa lý"
                      : subject === "congnghe"
                      ? "Công nghệ"
                      : subject === "tinhoc"
                      ? "Tin hoc"
                      : ""}{" "}
                  </label>
                  <div className="grid grid-cols-3 gap-4">
                    {[10, 11, 12].map((year) => (
                      <input
                        key={year}
                        type="number"
                        min="0"
                        max="10"
                        step="0.25"
                        value={
                          scores[subject as SubjectKey][year as 10 | 11 | 12]
                        }
                        onChange={(e) =>
                          handleScoreChange(
                            subject as SubjectKey,
                            year as 10 | 11 | 12,
                            e.target.value
                          )
                        }
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder={`Năm ${year}`}
                      />
                    ))}
                  </div>
                </div>
              ))}

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
                  className="px-6 py-3 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors"
                >
                  Làm mới
                </button>
              </div>
              {error && (
                <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-md">
                  <p className="text-sm text-red-600">{error}</p>
                </div>
              )}
            </div>
          </div>

          {/* RESULT + INFO */}
          <div className="space-y-6">
            <div className="space-y-6">
              <div className="bg-white rounded-lg shadow-md border border-gray-200">
                <div className="p-6 border-b border-gray-200">
                  <h3 className="text-xl font-semibold text-blue-600 flex items-center gap-2">
                    <Award className="h-5 w-5" />
                    Kết quả tính GPA
                  </h3>
                </div>
                <div className="p-6 text-center">
                  <div className="text-4xl font-bold text-green-600 mb-2">
                    {result.gpa.toFixed(2)}
                  </div>
                  <p className="text-gray-600">Điểm GPA của bạn</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-md border border-gray-200">
              <div className="p-6 border-b border-gray-200">
                <h3 className="text-xl font-semibold text-blue-600 flex items-center gap-2">
                  <Info className="h-5 w-5" />
                  Hướng dẫn
                </h3>
              </div>
              <div className="p-6 space-y-3 text-sm text-gray-700">
                <p className="font-medium">Cách tính điểm:</p>
                <ul className="space-y-1 text-xs">
                  <li>• Trung bình điểm các môn lớp 10, 11, 12</li>
                  <li>• Cộng điểm khuyến khích và ưu tiên (nếu có)</li>
                </ul>
                <p className="font-medium pt-4">Lưu ý:</p>
                <ul className="space-y-1 text-xs">
                  <li>• Điểm từ 0 đến 10</li>
                  <li>• Có thể nhập số thập phân (0.25, 0.5,...)</li>
                  <li>• Tất cả môn đều cần nhập đủ cả 3 năm</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      {!isAuthenticated && <UnAuthenticatedPage />}
      <Footer />
    </div>
  );
}
