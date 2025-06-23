import { Search, Building2, MapPin, Users, Calendar } from "lucide-react";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Card, CardContent } from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import Header from "../components/header";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { api } from "../hooks/api";

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
export default function UniversitiesPage() {
  const [universities, setUniversities] = useState<University[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");
  useEffect(() => {
    const fetchUniversities = async () => {
      try {
        const response = await api.get("/school/api/university");
        console.log(response);
        setUniversities(response.data.data);
      } catch (err: any) {
        setError(err.message || "Lỗi khi lấy dữ liệu");
      } finally {
        setLoading(false);
      }
    };
    fetchUniversities();
  }, []);
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      {/* Page Header */}
      <section className="bg-gradient-to-r from-blue-400 to-blue-600 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold mb-4">
              Danh sách tất cả các trường đại học
            </h1>
            <p className="text-xl text-blue-100 mb-8">
              Khám phá thông tin tuyển sinh của các trường đại học hàng đầu
            </p>

            {/* Search Bar */}
            <div className="relative max-w-2xl mx-auto">
              <Input
                type="text"
                placeholder="Tìm kiếm theo tên trường, địa điểm..."
                className="w-full py-4 px-6 text-lg rounded-full bg-white text-gray-900 pr-12"
              />
              <Search className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-6 h-6" />
            </div>
          </div>
        </div>
      </section>

      {/* Universities List */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Stats */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold text-gray-900">
              Tìm thấy {universities.length} trường đại học
            </h2>
            <div className="flex items-center space-x-4">
              <Button variant="outline" size="sm">
                Sắp xếp theo tên
              </Button>
              <Button variant="outline" size="sm">
                Lọc theo khu vực
              </Button>
            </div>
          </div>
        </div>

        {/* Universities Grid */}
        <div className="space-y-6">
          {universities.map((university) => (
            <Link
              key={university.id}
              to={`/university-details/${university.name}`}
            >
              <Card className="hover:shadow-lg transition-all duration-200 cursor-pointer group border-l-4 border-l-blue-500">
                <CardContent className="p-6">
                  <div className="flex items-center space-x-6">
                    {/* Left side - University Icon and Basic Info */}
                    <div className="flex-shrink-0">
                      <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center group-hover:from-blue-600 group-hover:to-blue-700 transition-colors">
                        <Building2 className="w-10 h-10 text-white" />
                      </div>
                    </div>

                    {/* Middle - University Details */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center mb-2">
                        <h3 className="text-xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors">
                          {university.name}
                        </h3>
                      </div>
                      <p className="text-gray-600 mb-3 line-clamp-2">
                        Mã trường: {university.thongTinChung.maTruong}
                      </p>
                      <p className="text-gray-600 mb-3 line-clamp-2">
                        {university.thongTinChung.tenTiengAnh}
                      </p>
                      <div className="flex items-center text-gray-500 mb-3">
                        <MapPin className="w-4 h-4 mr-2" />
                        <span className="text-sm">
                          {university.thongTinChung.diaChi}
                        </span>
                      </div>
                    </div>

                    {/* Right side - Stats and Actions */}
                    <div className="flex-shrink-0 text-right space-y-4">
                      <div className="space-y-2">
                        <div className="text-blue-500 text-sm font-medium group-hover:text-blue-600 transition-colors">
                          Xem chi tiết →
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>

        {/* Load More */}
        <div className="text-center mt-12">
          <Button
            variant="outline"
            className="border-blue-500 text-blue-500 hover:bg-blue-50"
          >
            Tải thêm trường đại học
          </Button>
        </div>
      </section>

      {/* Quick Stats */}
      <section className="bg-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-3xl font-bold text-blue-600 mb-2">
                {universities.length}
              </div>
              <div className="text-gray-600">Trường đại học</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-green-600 mb-2">
                {/* {universities.reduce((total, uni) => total + uni.majors.length, 0)} */}
              </div>
              <div className="text-gray-600">Ngành học</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-purple-600 mb-2">
                {/* {universities.reduce(
                  // (total, uni) => total + uni.majors.reduce((sum, major) => sum + major.quota, 0),
                  0,
                )} */}
              </div>
              <div className="text-gray-600">Chỉ tiêu tuyển sinh</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-orange-600 mb-2">
                2025
              </div>
              <div className="text-gray-600">Năm tuyển sinh</div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
