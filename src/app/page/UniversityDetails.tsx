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
  Search,
  MapPin,
  Phone,
  Mail,
  Globe,
  GraduationCap,
} from "lucide-react";
import universitiesData from "../data/all_schools_info.json";
import Header from "../components/header";
import { useParams } from "react-router-dom";
interface University {
  id: string;
  name: string;
  url: string;
  thong_tin_chung: {
    ten_truong: string;
    ten_tieng_anh: string;
    ma_truong: string;
    loai_truong: string;
    he_dao_tao: string;
    dia_chi: string;
    sdt: string;
    email: string;
    website: string;
    facebook: string;
  };
  thong_tin_tuyen_sinh: {
    thoi_gian_xet_tuyen: string;
    doi_tuong_tuyen_sinh: string;
    pham_vi_tuyen_sinh: string;
    phuong_thuc_tuyen_sinh: string;
    nguong_dau_vao: string;
    hoc_phi: string;
  };
  nganh_tuyen_sinh: any[];
  diem_chuan: any[];
}

export default function UniversityDetails() {
  const { id } = useParams();
  const [universities] = useState<University[]>(
    universitiesData.map((uni) => ({
      ...uni,
      id: String(uni.id),
    }))
  );
  const [selectedUniversity, setSelectedUniversity] =
    useState<University | null>(null);

  useEffect(() => {
    const university = universities.find((uni) => uni.id === id);
    if (university) {
      setSelectedUniversity(university);
    }
  }, [id, universities]);

  console.log(selectedUniversity);
  const getTypeColor = (type: string) => {
    switch (type) {
      case "Công lập":
        return "bg-green-100 text-green-800";
      case "Dân lập":
        return "bg-blue-100 text-blue-800";
      case "Quân sự":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

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
                      {selectedUniversity.thong_tin_chung.ten_truong}
                    </CardTitle>
                    <CardDescription className="text-lg">
                      {selectedUniversity.thong_tin_chung.ten_tieng_anh}
                    </CardDescription>
                  </div>
                  <div className="flex gap-2">
                    <Badge
                      className={getTypeColor(
                        selectedUniversity.thong_tin_chung.loai_truong
                      )}
                    >
                      {selectedUniversity.thong_tin_chung.loai_truong}
                    </Badge>
                    <Badge variant="outline">
                      {selectedUniversity.thong_tin_chung.ma_truong}
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
                          {selectedUniversity.thong_tin_chung.dia_chi}
                        </p>
                      </div>
                    </div>
                    {selectedUniversity.thong_tin_chung.sdt && (
                      <div className="flex items-center space-x-3">
                        <Phone className="w-5 h-5 text-gray-500" />
                        <div>
                          <p className="font-medium">Điện thoại</p>
                          <p className="text-gray-600">
                            {selectedUniversity.thong_tin_chung.sdt}
                          </p>
                        </div>
                      </div>
                    )}
                  </div>
                  <div className="space-y-4">
                    {selectedUniversity.thong_tin_chung.email && (
                      <div className="flex items-center space-x-3">
                        <Mail className="w-5 h-5 text-gray-500" />
                        <div>
                          <p className="font-medium">Email</p>
                          <p className="text-gray-600">
                            {selectedUniversity.thong_tin_chung.email}
                          </p>
                        </div>
                      </div>
                    )}
                    {selectedUniversity.thong_tin_chung.website && (
                      <div className="flex items-center space-x-3">
                        <Globe className="w-5 h-5 text-gray-500" />
                        <div>
                          <p className="font-medium">Website</p>
                          <a
                            href={selectedUniversity.thong_tin_chung.website}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-600 hover:underline"
                          >
                            {selectedUniversity.thong_tin_chung.website}
                          </a>
                        </div>
                      </div>
                    )}
                    <div className="flex items-start space-x-3">
                      <GraduationCap className="w-5 h-5 text-gray-500 mt-1" />
                      <div>
                        <p className="font-medium">Hệ đào tạo</p>
                        <p className="text-gray-600">
                          {selectedUniversity.thong_tin_chung.he_dao_tao}
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
                  {selectedUniversity.thong_tin_tuyen_sinh
                    .doi_tuong_tuyen_sinh && (
                    <div>
                      <h4 className="font-medium mb-2">Đối tượng tuyển sinh</h4>
                      <p className="text-gray-600 text-sm">
                        {
                          selectedUniversity.thong_tin_tuyen_sinh
                            .doi_tuong_tuyen_sinh
                        }
                      </p>
                    </div>
                  )}
                  {selectedUniversity.thong_tin_tuyen_sinh
                    .pham_vi_tuyen_sinh && (
                    <div>
                      <h4 className="font-medium mb-2">Phạm vi tuyển sinh</h4>
                      <p className="text-gray-600 text-sm">
                        {
                          selectedUniversity.thong_tin_tuyen_sinh
                            .pham_vi_tuyen_sinh
                        }
                      </p>
                    </div>
                  )}
                  {selectedUniversity.thong_tin_tuyen_sinh.hoc_phi && (
                    <div>
                      <h4 className="font-medium mb-2">Học phí</h4>
                      <p className="text-gray-600 text-sm">
                        {selectedUniversity.thong_tin_tuyen_sinh.hoc_phi}
                      </p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Majors */}
            {selectedUniversity.nganh_tuyen_sinh &&
              selectedUniversity.nganh_tuyen_sinh.length > 0 && (
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
                          {selectedUniversity.nganh_tuyen_sinh
                            .filter((major) => major.STT)
                            .map((major, index) => (
                              <tr key={index} className="hover:bg-gray-50">
                                <td className="border border-gray-300 px-4 py-2">
                                  {major.STT}
                                </td>
                                <td className="border border-gray-300 px-4 py-2">
                                  {major.ten_nganh}
                                </td>
                                <td className="border border-gray-300 px-4 py-2">
                                  {major.ma_nganh}
                                </td>
                                <td className="border border-gray-300 px-4 py-2">
                                  {major.to_hop_xet_tuyen}
                                </td>
                                <td className="border border-gray-300 px-4 py-2">
                                  {major.chi_tieu
                                    ? major.chi_tieu
                                    : major.ghi_chu}
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
            {selectedUniversity.diem_chuan &&
              selectedUniversity.diem_chuan.length > 0 && (
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
                          {selectedUniversity.diem_chuan
                            .filter((score) => score.STT)
                            .map((score, index) => (
                              <tr key={index} className="hover:bg-gray-50">
                                <td className="border border-gray-300 px-4 py-2">
                                  {score.STT}
                                </td>
                                <td className="border border-gray-300 px-4 py-2">
                                  {score.ten_nganh}
                                </td>
                                <td className="border border-gray-300 px-4 py-2">
                                  {score.nam_2021}
                                </td>
                                <td className="border border-gray-300 px-4 py-2">
                                  {score.nam_2022}
                                </td>
                                <td className="border border-gray-300 px-4 py-2">
                                  {score.nam_2023}
                                </td>
                                <td className="border border-gray-300 px-4 py-2">
                                  {score.nam_2024}
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
  //                     {university.thong_tin_chung.ten_truong}
  //                   </CardTitle>
  //                   <CardDescription className="text-sm">
  //                     {university.thong_tin_chung.ten_tieng_anh}
  //                   </CardDescription>
  //                 </div>
  //                 <Badge
  //                   className={getTypeColor(
  //                     university.thong_tin_chung.loai_truong
  //                   )}
  //                 >
  //                   {university.thong_tin_chung.loai_truong}
  //                 </Badge>
  //               </div>
  //             </CardHeader>
  //             <CardContent>
  //               <div className="space-y-3">
  //                 <div className="flex items-start space-x-2">
  //                   <MapPin className="w-4 h-4 text-gray-500 mt-1 flex-shrink-0" />
  //                   <p className="text-sm text-gray-600 line-clamp-2">
  //                     {university.thong_tin_chung.dia_chi}
  //                   </p>
  //                 </div>

  //                 {university.thong_tin_chung.sdt && (
  //                   <div className="flex items-center space-x-2">
  //                     <Phone className="w-4 h-4 text-gray-500" />
  //                     <p className="text-sm text-gray-600">
  //                       {university.thong_tin_chung.sdt}
  //                     </p>
  //                   </div>
  //                 )}

  //                 <div className="flex items-center space-x-2">
  //                   <GraduationCap className="w-4 h-4 text-gray-500" />
  //                   <p className="text-sm text-gray-600 line-clamp-1">
  //                     {university.thong_tin_chung.he_dao_tao}
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
