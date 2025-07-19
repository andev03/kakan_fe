"use client";

import { useEffect, useState } from "react";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import {
  BookOpen,
  Building2,
  ChevronRight,
  MapPin,
  School,
  Users,
} from "lucide-react";

import { Link, useNavigate } from "react-router-dom";
import { api } from "../hooks/api";
// import Header from "../components/header";

interface University {
  id: string;
  name: string;
  url: string;
  thongTinChung: {
    tenTruong: string;
    tenTiengAnh: string;
    maTruong: string;
    loaiTruong: string;
    heDaoTao: string;
    diaChi: string;
    sdt: string;
    email: string;
    website: string;
    facebook: string;
  };
  thongTinTuyenSinh: {
    thoiGianXetTuyen: string;
    doiTuongTuyenSinh: string;
    phamViTuyenSinh: string;
    phuongThucTuyenSinh: string;
    nguongDauVao: string;
    hocPhi: string;
  };
  nganhTuyenSinh: Array<{
    stt: string;
    tenNganh: string;
    maNganh: string;
    toHopXetTuyen: string;
    chiTieu: string;
    [key: string]: any;
  }>;
  diemChuan: Array<{
    stt: string;
    tenNganh: string;
    nam2021: string;
    nam2022: string;
    nam2023: string;
    nam2024: string;
  }>;
}
export default function TabsSection() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("tin-tuyen-sinh");
  const [universities, setUniversities] = useState<University[]>([]);
  const [__loading, setLoading] = useState<boolean>(true);
  const [__error, setError] = useState<string>("");
  const tabs = [
    { id: "tin-tuyen-sinh", label: "Tin tuyển sinh" },
    { id: "diem-chuan", label: "Điểm chuẩn" },
  ];

  const [selectedYear, setSelectedYear] = useState("2024");
  useEffect(() => {
    const fetchUniversities = async () => {
      try {
        const response = await api.get("/school/api/university");
        setUniversities(response.data.data);
      } catch (err: any) {
        setError(err.message || "Lỗi khi lấy dữ liệu");
      } finally {
        setLoading(false);
      }
    };
    fetchUniversities();
  }, []);

  const getBenchmarkScore = (universityId: string, year: string) => {
    const university = universities.find((uni) => uni.id === universityId);
    if (!university) return { nganh: "N/A", diem: "N/A" };

    const yearScores = university.diemChuan.find(
      (score) => score.stt && score.tenNganh
    );
    if (!yearScores) return { nganh: "N/A", diem: "N/A" };

    const yearKey = `nam${year}` as keyof typeof yearScores;
    const validYearKeys: Array<keyof typeof yearScores> = [
      "nam2021",
      "nam2022",
      "nam2023",
      "nam2024",
    ];
    const score = validYearKeys.includes(yearKey)
      ? yearScores[yearKey as keyof typeof yearScores]
      : undefined;

    return {
      nganh: yearScores.tenNganh || "N/A",
      diem: score === "không rõ" ? "N/A" : score || "N/A",
    };
  };

  return (
    <div className="mb-8">
      {/* Tab Navigation */}
      <div className="flex justify-center mb-6">
        <div className="bg-slate-100 p-2 rounded-lg inline-flex">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-4 py-2 text-2x1 font-medium rounded-md transition-colors ${
                activeTab === tab.id
                  ? "bg-white text-slate-900 shadow-sm"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Tab Content */}
      {activeTab === "tin-tuyen-sinh" && (
        <div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {universities.slice(0, 3).map((item) => (
              <Link key={item.id} to={`/university-details/${item.name}`}>
                <Card className="h-full hover:shadow-lg transition-shadow duration-200 cursor-pointer group ">
                  <CardHeader className="pb-4">
                    <div className="w-16 h-16 bg-gray-200 rounded-lg flex items-center justify-center mb-4 group-hover:bg-gray-300 transition-colors">
                      <Building2 className="w-8 h-8 text-gray-400" />
                    </div>
                    <CardTitle className="text-lg font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
                      {item.thongTinChung.tenTruong}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-gray-600 mb-4 line-clamp-2">
                      {item.thongTinChung.tenTiengAnh} -{" "}
                    </CardDescription>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-500">
                        {item.thongTinChung.website}
                      </span>
                      <span className="text-blue-500 text-sm font-medium group-hover:text-blue-600">
                        Xem thêm →
                      </span>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
          <div className="flex justify-center mt-6">
            <button
              onClick={() => navigate("/universities")}
              className="px-4 py-2 border border-sky-200 text-sky-500 rounded-lg hover:bg-sky-50 transition-colors flex items-center"
            >
              Xem tất cả <ChevronRight className="h-4 w-4 ml-1" />
            </button>
          </div>
        </div>
      )}

      {activeTab === "diem-chuan" && (
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-medium text-3xl">
              Điểm chuẩn các trường đại học
            </h3>
            <div className="flex gap-2">
              {["2024", "2023", "2022"].map((year) => (
                <button
                  key={year}
                  onClick={() => setSelectedYear(year)}
                  className={`px-3 py-1 text-sm border rounded-md transition-colors ${
                    selectedYear === year
                      ? "border-sky-500 bg-sky-50 text-sky-600"
                      : "border-slate-200 hover:bg-slate-50"
                  }`}
                >
                  {year}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {universities.slice(0, 3).map((item) => {
              return (
                <div
                  key={item.id}
                  className="p-4 bg-slate-50 rounded-lg hover:bg-slate-100 transition-colors"
                >
                  <div className="flex items-start gap-3">
                    <div className="bg-sky-100 text-sky-600 p-2 rounded-md">
                      <School className="h-5 w-5" />
                    </div>
                    <div>
                      <h4 className="font-medium mb-1">
                        Đại học {item.thongTinChung.tenTruong}
                      </h4>
                      <div className="flex items-center text-xs text-slate-500">
                        <MapPin className="h-3 w-3 mr-1" />
                        <span>{item.thongTinChung.diaChi}</span>
                      </div>
                    </div>
                  </div>
                  <div className="mt-3 pt-3 border-t border-slate-200">
                    <div className="flex flex-col gap-2">
                      <div className="flex justify-between text-sm">
                        <span>Ngành:</span>
                        <span className="font-medium">
                          {getBenchmarkScore(item.id, selectedYear).nganh}
                        </span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>Điểm chuẩn năm {selectedYear}:</span>
                        <span className="font-medium text-sky-600">
                          {getBenchmarkScore(item.id, selectedYear).diem}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {activeTab === "nganh-hoc" && (
        <div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {["Y khoa", "CNTT", "KTQT", "Luật", "Kiến trúc", "Công nghệ"].map(
              (item) => (
                <div
                  key={item}
                  className="bg-white rounded-lg shadow-sm  p-4 text-center hover:border-sky-200 hover:shadow-md transition-all cursor-pointer"
                >
                  <div className="bg-slate-100 w-12 h-12 mx-auto rounded-full flex items-center justify-center mb-3">
                    <BookOpen className="h-5 w-5 text-slate-500" />
                  </div>
                  <h4 className="font-medium">{item}</h4>
                  <p className="text-xs text-slate-500 mt-1">125 trường</p>
                </div>
              )
            )}
          </div>

          <div className="mt-8">
            <h3 className="font-medium text-2xl mb-4">Ngành học phổ biến</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {[1, 2, 3, 4, 5, 6].map((item) => (
                <div
                  key={item}
                  className="flex items-center p-3 bg-white rounded-lg border hover:border-sky-200 hover:shadow-sm transition-all cursor-pointer"
                >
                  <div className="bg-slate-100 w-10 h-10 rounded-md flex items-center justify-center mr-3">
                    <span className="font-medium text-slate-500">{item}</span>
                  </div>
                  <div>
                    <h4 className="font-medium">Ngành học {item}</h4>
                    <div className="flex items-center text-xs text-slate-500 mt-1">
                      <Users className="h-3 w-3 mr-1" />
                      <span>2.5k sinh viên đăng ký</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
