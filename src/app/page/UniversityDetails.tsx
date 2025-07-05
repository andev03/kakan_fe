"use client";

import { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import { Button } from "../components/ui/button";
import {
  MapPin,
  Phone,
  Mail,
  Globe,
  GraduationCap,
} from "lucide-react";
import Header from "../components/header";
import { useParams } from "react-router-dom";
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

export default function UniversityDetail() {
  const { name } = useParams(); // URL dạng /university/:id, ở đây `id` chính là `name`
  const [selectedUniversity, setSelectedUniversity] =
    useState<University | null>(null);
  const [__loading, setLoading] = useState<boolean>(true);
  const [__error, setError] = useState<string>("");

  useEffect(() => {
    const fetchUniversity = async () => {
      try {
        const response = await api.get(`/school/api/university/search`, {
          params: { name },
        });
        console.log(name);
        if (response.data?.data) {
          setSelectedUniversity(response.data.data);
          console.log(response.data.data);
        } else {
          setError("University not found");
        }
      } catch (err: any) {
        setError("Error fetching university");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    if (name) fetchUniversity();
  }, [name]);

  console.log(selectedUniversity);

  if (selectedUniversity) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        {/* Header */}
        <div className=" bg-gray-50 ">
          <div className="max-w-7xl mx-auto px-4 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <Button variant="outline" onClick={() => window.history.back()}>
                  ← Quay lại
                </Button>
                <h1 className="text-2xl font-bold tsext-gray-900">
                  Thông tin chi tiết
                </h1>
              </div>
            </div>
          </div>
        </div>

        {/* University Detail */}
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="grid gap-8">
            {/* Basic Info */}
            <Card>
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle className="text-3xl mb-2">
                      {selectedUniversity.thongTinChung.tenTruong}
                    </CardTitle>
                    <CardDescription className="text-lg">
                      {selectedUniversity.thongTinChung.tenTiengAnh}
                    </CardDescription>
                  </div>
                  <div className="flex gap-2">
                    <Badge
                      className={selectedUniversity.thongTinChung.loaiTruong}
                    >
                      {selectedUniversity.thongTinChung.loaiTruong}
                    </Badge>
                    <Badge variant="outline">
                      {selectedUniversity.thongTinChung.maTruong}
                    </Badge>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div className="flex items-start space-x-3">
                      <MapPin className="w-5 h-5 text-gray-500 mt-1" />
                      <div>
                        <p className="font-medium">Địa chỉ</p>
                        <p className="text-gray-600">
                          {selectedUniversity.thongTinChung.diaChi}
                        </p>
                      </div>
                    </div>
                    {selectedUniversity.thongTinChung.sdt && (
                      <div className="flex items-center space-x-3">
                        <Phone className="w-5 h-5 text-gray-500" />
                        <div>
                          <p className="font-medium">Điện thoại</p>
                          <p className="text-gray-600">
                            {selectedUniversity.thongTinChung.sdt}
                          </p>
                        </div>
                      </div>
                    )}
                  </div>
                  <div className="space-y-4">
                    {selectedUniversity.thongTinChung.email && (
                      <div className="flex items-center space-x-3">
                        <Mail className="w-5 h-5 text-gray-500" />
                        <div>
                          <p className="font-medium">Email</p>
                          <p className="text-gray-600">
                            {selectedUniversity.thongTinChung.email}
                          </p>
                        </div>
                      </div>
                    )}
                    {selectedUniversity.thongTinChung.website && (
                      <div className="flex items-center space-x-3">
                        <Globe className="w-5 h-5 text-gray-500" />
                        <div>
                          <p className="font-medium">Website</p>
                          <a
                            href={selectedUniversity.thongTinChung.website}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-600 hover:underline"
                          >
                            {selectedUniversity.thongTinChung.website}
                          </a>
                        </div>
                      </div>
                    )}
                    <div className="flex items-start space-x-3">
                      <GraduationCap className="w-5 h-5 text-gray-500 mt-1" />
                      <div>
                        <p className="font-medium">Hệ đào tạo</p>
                        <p className="text-gray-600">
                          {selectedUniversity.thongTinChung.heDaoTao}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Admission Info */}
            <Card>
              <CardHeader>
                <CardTitle>Thông tin tuyển sinh</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {selectedUniversity.thongTinTuyenSinh.doiTuongTuyenSinh && (
                    <div>
                      <h4 className="font-medium mb-2">Đối tượng tuyển sinh</h4>
                      <p className="text-gray-600 text-sm">
                        {selectedUniversity.thongTinTuyenSinh.doiTuongTuyenSinh}
                      </p>
                    </div>
                  )}
                  {selectedUniversity.thongTinTuyenSinh.phamViTuyenSinh && (
                    <div>
                      <h4 className="font-medium mb-2">Phạm vi tuyển sinh</h4>
                      <p className="text-gray-600 text-sm">
                        {selectedUniversity.thongTinTuyenSinh.phamViTuyenSinh}
                      </p>
                    </div>
                  )}
                  {selectedUniversity.thongTinTuyenSinh.hocPhi && (
                    <div>
                      <h4 className="font-medium mb-2">Học phí</h4>
                      <p className="text-gray-600 text-sm">
                        {selectedUniversity.thongTinTuyenSinh.hocPhi}
                      </p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Majors */}
            {selectedUniversity.nganhTuyenSinh &&
              selectedUniversity.nganhTuyenSinh.length > 0 && (
                <Card>
                  <CardHeader>
                    <CardTitle>Ngành tuyển sinh</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="overflow-x-auto">
                      <table className="w-full border-collapse border border-gray-300">
                        <thead>
                          <tr className="bg-gray-50">
                            <th className="border border-gray-300 px-4 py-2 text-left">
                              STT
                            </th>
                            <th className="border border-gray-300 px-4 py-2 text-left">
                              Tên ngành
                            </th>
                            <th className="border border-gray-300 px-4 py-2 text-left">
                              Mã ngành
                            </th>
                            <th className="border border-gray-300 px-4 py-2 text-left">
                              Tổ hợp xét tuyển
                            </th>
                            <th className="border border-gray-300 px-4 py-2 text-left">
                              Chỉ tiêu
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          {selectedUniversity.nganhTuyenSinh
                            .filter((major) => major.stt)
                            .map((major, index) => (
                              <tr key={index} className="hover:bg-gray-50">
                                <td className="border border-gray-300 px-4 py-2">
                                  {major.stt}
                                </td>
                                <td className="border border-gray-300 px-4 py-2">
                                  {major.tenNganh}
                                </td>
                                <td className="border border-gray-300 px-4 py-2">
                                  {major.maNganh}
                                </td>
                                <td className="border border-gray-300 px-4 py-2">
                                  {major.toHopXetTuyen}
                                </td>
                                <td className="border border-gray-300 px-4 py-2">
                                  {major.chiTieu ? major.chiTieu : major.ghiChu}
                                </td>
                              </tr>
                            ))}
                        </tbody>
                      </table>
                    </div>
                  </CardContent>
                </Card>
              )}

            {/* Scores */}
            {selectedUniversity.diemChuan &&
              selectedUniversity.diemChuan.length > 0 && (
                <Card>
                  <CardHeader>
                    <CardTitle>Điểm chuẩn các năm</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="overflow-x-auto">
                      <table className="w-full border-collapse border border-gray-300">
                        <thead>
                          <tr className="bg-gray-50">
                            <th className="border border-gray-300 px-4 py-2 text-left">
                              STT
                            </th>
                            <th className="border border-gray-300 px-4 py-2 text-left">
                              Ngành
                            </th>
                            <th className="border border-gray-300 px-4 py-2 text-left">
                              2021
                            </th>
                            <th className="border border-gray-300 px-4 py-2 text-left">
                              2022
                            </th>
                            <th className="border border-gray-300 px-4 py-2 text-left">
                              2023
                            </th>
                            <th className="border border-gray-300 px-4 py-2 text-left">
                              2024
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          {selectedUniversity.diemChuan
                            .filter((score) => score.stt)
                            .map((score, index) => (
                              <tr key={index} className="hover:bg-gray-50">
                                <td className="border border-gray-300 px-4 py-2">
                                  {score.stt}
                                </td>
                                <td className="border border-gray-300 px-4 py-2">
                                  {score.tenNganh}
                                </td>
                                <td className="border border-gray-300 px-4 py-2">
                                  {score.nam2021}
                                </td>
                                <td className="border border-gray-300 px-4 py-2">
                                  {score.nam2022}
                                </td>
                                <td className="border border-gray-300 px-4 py-2">
                                  {score.nam2023}
                                </td>
                                <td className="border border-gray-300 px-4 py-2">
                                  {score.nam2024}
                                </td>
                              </tr>
                            ))}
                        </tbody>
                      </table>
                    </div>
                  </CardContent>
                </Card>
              )}
          </div>
        </div>
      </div>
    );
  }

  // return (
  //   <div className="min-h-screen bg-gray-50">
  //     {/* Header */}
  //     <div className="bg-white shadow-sm border-b">
  //       <div className="max-w-7xl mx-auto px-4 py-6">
  //         <div className="text-center mb-6">
  //           <h1 className="text-3xl font-bold text-gray-900 mb-2">
  //             Hệ thống tra cứu tuyển sinh SaiGon
  //           </h1>
  //           <p className="text-gray-600">
  //             Thông tin chi tiết về các trường đại học và tuyển sinh
  //           </p>
  //         </div>

  //         {/* Search */}
  //         <div className="relative max-w-md mx-auto">
  //           <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
  //           <Input
  //             type="text"
  //             placeholder="Tìm kiếm trường đại học..."
  //             value={searchTerm}
  //             onChange={(e) => setSearchTerm(e.target.value)}
  //             className="pl-10"
  //           />
  //         </div>
  //       </div>
  //     </div>

  //     {/* University List */}
  //     <div className="max-w-7xl mx-auto px-4 py-8">
  //       <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
  //         {filteredUniversities.map((university, index) => (
  //           <Card
  //             key={index}
  //             className="hover:shadow-lg transition-shadow cursor-pointer"
  //           >
  //             <CardHeader>
  //               <div className="flex items-start justify-between">
  //                 <div className="flex-1">
  //                   <CardTitle className="text-lg mb-2 line-clamp-2">
  //                     {university.thongTinChung.ten_truong}
  //                   </CardTitle>
  //                   <CardDescription className="text-sm">
  //                     {university.thongTinChung.ten_tieng_anh}
  //                   </CardDescription>
  //                 </div>
  //                 <Badge
  //                   className={getTypeColor(
  //                     university.thongTinChung.loai_truong
  //                   )}
  //                 >
  //                   {university.thongTinChung.loai_truong}
  //                 </Badge>
  //               </div>
  //             </CardHeader>
  //             <CardContent>
  //               <div className="space-y-3">
  //                 <div className="flex items-start space-x-2">
  //                   <MapPin className="w-4 h-4 text-gray-500 mt-1 flex-shrink-0" />
  //                   <p className="text-sm text-gray-600 line-clamp-2">
  //                     {university.thongTinChung.dia_chi}
  //                   </p>
  //                 </div>

  //                 {university.thongTinChung.sdt && (
  //                   <div className="flex items-center space-x-2">
  //                     <Phone className="w-4 h-4 text-gray-500" />
  //                     <p className="text-sm text-gray-600">
  //                       {university.thongTinChung.sdt}
  //                     </p>
  //                   </div>
  //                 )}

  //                 <div className="flex items-center space-x-2">
  //                   <GraduationCap className="w-4 h-4 text-gray-500" />
  //                   <p className="text-sm text-gray-600 line-clamp-1">
  //                     {university.thongTinChung.he_dao_tao}
  //                   </p>
  //                 </div>

  //                 <div className="pt-3">
  //                   <Button
  //                     onClick={() => setSelectedUniversity(university)}
  //                     className="w-full"
  //                   >
  //                     Xem chi tiết
  //                   </Button>
  //                 </div>
  //               </div>
  //             </CardContent>
  //           </Card>
  //         ))}
  //       </div>

  //       {filteredUniversities.length === 0 && (
  //         <div className="text-center py-12">
  //           <p className="text-gray-500">
  //             Không tìm thấy trường đại học nào phù hợp với từ khóa tìm kiếm.
  //           </p>
  //         </div>
  //       )}
  //     </div>
  //   </div>
  // );
}
