"use client";

import { useEffect, useState } from "react";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../../components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../../components/ui/dialog";
import { Label } from "../../components/ui/label";
import { Textarea } from "../../components/ui/textarea";

import {
  Search,
  Building2,
  MapPin,
  Phone,
  Mail,
  Globe,
  Users,
  Calendar,
  Pencil,
  Trash2,
} from "lucide-react";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "../../components/ui/tabs";
import { StaffHeader } from "../../components/staff-header";
import { api } from "../../hooks/api";
import { toast } from "react-toastify";
import ConfirmDeleteDialog from "../../components/confirmDelete";

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

export default function ManageUniversities() {
  const [universities, setUniversities] = useState<University[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedUniversity, setSelectedUniversity] =
    useState<University | null>(null);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [editingUniversity, setEditingUniversity] = useState<University | null>(
    null
  );
  const [__loading, setLoading] = useState<boolean>(true);
  const [__error, setError] = useState<string>("");

  const fetchUniversities = async () => {
    try {
      const response = await api.get("/school/api/university");
      console.log(response);
      setUniversities(response.data.data);
      console.log(response.data.data);
    } catch (err: any) {
      setError(err.message || "Lỗi khi lấy dữ liệu");
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchUniversities();
  }, []);

  const filteredUniversities = universities.filter((university) => {
    const matchesSearch =
      university.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      university.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      university.thongTinChung.tenTiengAnh
        .toLowerCase()
        .includes(searchTerm.toLowerCase());

    return matchesSearch;
  });

  const handleEditUniversity = () => {
    if (editingUniversity) {
      setUniversities(
        universities.map((uni) =>
          uni.id === editingUniversity.id ? editingUniversity : uni
        )
      );
      setEditingUniversity(null);
      setIsEditDialogOpen(false);
      if (selectedUniversity?.id === editingUniversity.id) {
        setSelectedUniversity(editingUniversity);
      }
    }
  };

  const handleDeleteUniversity = async (name: string) => {
    setSelectedUniversity(null);

    try {
      const response = await api.delete("/school/api/university", {
        params: { name }, // gửi dưới dạng ?name=XYZ
      });

      if (response.data.status === 200) {
        toast.success("Xoá thành công!");
        // Xoá trên giao diện
        fetchUniversities(); // Cập nhật lại danh sách
      } else {
        toast.error(response.data.message || "Xoá thất bại");
      }
    } catch (error: any) {
      console.error("Lỗi xoá:", error);
      toast.error(error.response?.data?.message || "Lỗi hệ thống khi xoá");
    }
  };

  if (selectedUniversity) {
    return (
      <div className="min-h-screen bg-gray-50">
        {/* Header */}
        <StaffHeader />
        <div className="flex items-center space-x-4 ml-37 mt-5">
          <Button
            variant="outline"
            onClick={() => selectedUniversity && setSelectedUniversity(null)}
          >
            ← Quay lại
          </Button>
          <h1 className="text-2xl font-bold tsext-gray-900">
            Thông tin chi tiết
          </h1>
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* University Header */}
          <Card className="mb-6  relative">
            <CardContent className="p-6">
              <div className="flex items-start space-x-4">
                <div className="w-16 h-16 bg-blue-600 rounded-lg flex items-center justify-center">
                  <Building2 className="h-8 w-8 text-white" />
                </div>
                <div className="flex-1">
                  <h1 className="text-2xl font-bold text-blue-600 mb-2">
                    {selectedUniversity.name}
                  </h1>
                  <p className="text-gray-600 mb-1">
                    Mã trường: {selectedUniversity.thongTinChung.maTruong}
                  </p>
                  <p className="text-gray-600 mb-2">
                    {selectedUniversity.thongTinChung.tenTiengAnh}
                  </p>
                  <div className="flex items-center text-gray-500">
                    <MapPin className="h-4 w-4 mr-1" />
                    {selectedUniversity.thongTinChung.diaChi}
                  </div>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    setEditingUniversity(selectedUniversity); // Cập nhật dữ liệu hiện tại
                    setIsEditDialogOpen(true); // Mở Dialog
                  }}
                >
                  <Pencil className="w-4 h-4 mr-1" />
                  Chỉnh sửa
                </Button>
                <ConfirmDeleteDialog
                  title={`Xác nhận xoá trường "${selectedUniversity.name}"`}
                  description="Bạn có chắc chắn muốn xoá trường này không?"
                  onConfirm={() =>
                    handleDeleteUniversity(selectedUniversity.name)
                  }
                  trigger={
                    <Button variant="outline" size="sm">
                      <Trash2 className="w-4 h-4 mr-1" />
                      Xóa
                    </Button>
                  }
                />
              </div>
            </CardContent>
          </Card>

          {/* Detailed Information */}
          <Tabs defaultValue="general" className="space-y-6">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="general">Thông tin chung</TabsTrigger>
              <TabsTrigger value="admission">Thông tin tuyển sinh</TabsTrigger>
              <TabsTrigger value="majors">Ngành tuyển sinh</TabsTrigger>
              <TabsTrigger value="scores">Điểm chuẩn</TabsTrigger>
            </TabsList>

            <TabsContent value="general">
              <Card>
                <CardHeader>
                  <CardTitle>Thông tin chung</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="flex items-center space-x-2">
                      <MapPin className="h-4 w-4 text-gray-500" />
                      <div>
                        <p className="text-sm text-gray-500">Địa chỉ</p>
                        <p className="font-medium">
                          {selectedUniversity.thongTinChung.diaChi}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Phone className="h-4 w-4 text-gray-500" />
                      <div>
                        <p className="text-sm text-gray-500">Điện thoại</p>
                        <p className="font-medium">
                          {selectedUniversity.thongTinChung.sdt}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Mail className="h-4 w-4 text-gray-500" />
                      <div>
                        <p className="text-sm text-gray-500">Email</p>
                        <p className="font-medium">
                          {selectedUniversity.thongTinChung.email}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Globe className="h-4 w-4 text-gray-500" />
                      <div>
                        <p className="text-sm text-gray-500">Website</p>
                        <p className="font-medium">
                          {selectedUniversity.thongTinChung.website}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Calendar className="h-4 w-4 text-gray-500" />
                      <div>
                        <p className="text-sm text-gray-500">Hệ đào tạo</p>
                        <p className="font-medium">
                          {selectedUniversity.thongTinChung.heDaoTao}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Building2 className="h-4 w-4 text-gray-500" />
                      <div>
                        <p className="text-sm text-gray-500">Loại hình</p>
                        <p className="font-medium">
                          {selectedUniversity.thongTinChung.loaiTruong}
                        </p>
                      </div>
                    </div>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 mb-2">Mô tả</p>
                    {/* <p className="text-gray-700">
                      {selectedUniversity.thongTinChung.moTa}
                    </p> */}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="admission">
              <Card>
                <CardHeader>
                  <CardTitle>Thông tin tuyển sinh</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <p className="text-sm text-gray-500 mb-1">
                      Phương thức tuyển sinh
                    </p>
                    <p className="font-medium">
                      {selectedUniversity.thongTinTuyenSinh.phuongThucTuyenSinh}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 mb-1">
                      Đối tượng tuyển sinh
                    </p>
                    <p className="font-medium">
                      {selectedUniversity.thongTinTuyenSinh.doiTuongTuyenSinh}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 mb-1">
                      Thời gian xét tuyển
                    </p>
                    <p className="font-medium">
                      {selectedUniversity.thongTinTuyenSinh.thoiGianXetTuyen
                        ? selectedUniversity.thongTinTuyenSinh.thoiGianXetTuyen
                        : "Chưa cập nhật"}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 mb-1">
                      Phạm vi xét tuyển
                    </p>
                    <p className="font-medium">
                      {selectedUniversity.thongTinTuyenSinh.phamViTuyenSinh}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 mb-1">
                      Phương thức xét tuyển
                    </p>
                    <p className="font-medium">
                      {selectedUniversity.thongTinTuyenSinh.phuongThucTuyenSinh}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 mb-1">Học phí</p>
                    <p className="font-medium">
                      {selectedUniversity.thongTinTuyenSinh.hocPhi}
                    </p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="majors">
              <Card>
                <CardHeader>
                  <CardTitle>Ngành tuyển sinh</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="overflow-x-auto">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>STT</TableHead>
                          <TableHead>Tên ngành</TableHead>
                          <TableHead>Mã ngành</TableHead>
                          <TableHead>Tổ hợp xét tuyển</TableHead>
                          <TableHead>Chỉ tiêu</TableHead>
                          <TableHead>Ghi chú</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {selectedUniversity.nganhTuyenSinh.map((major) => (
                          <TableRow key={major.stt}>
                            <TableCell>{major.stt}</TableCell>
                            <TableCell className="font-medium">
                              {major.tenNganh}
                            </TableCell>
                            <TableCell>{major.maNganh}</TableCell>
                            <TableCell>{major.toHopXetTuyen}</TableCell>
                            <TableCell>
                              {major.chiTieu ? major.chiTieu : "Không rõ"}
                            </TableCell>
                            <TableCell>
                              {major.ghiChu ? major.ghiChu : "Không rõ"}
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="scores">
              <Card>
                <CardHeader>
                  <CardTitle>Điểm chuẩn các năm</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="overflow-x-auto">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>STT</TableHead>
                          <TableHead>Tên ngành</TableHead>
                          <TableHead>2021</TableHead>
                          <TableHead>2022</TableHead>
                          <TableHead>2023</TableHead>
                          <TableHead>2024</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {selectedUniversity.diemChuan.map((score) => (
                          <TableRow key={score.stt}>
                            <TableCell>{score.stt}</TableCell>
                            <TableCell className="font-medium">
                              {score.tenNganh}
                            </TableCell>
                            <TableCell>{score.nam2021}</TableCell>
                            <TableCell>{score.nam2022}</TableCell>
                            <TableCell>{score.nam2023}</TableCell>
                            <TableCell>{score.nam2024}</TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
        {/* Edit Dialog */}
        <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
          <DialogContent className="sm:max-w-[900px] max-h-[80vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Chỉnh sửa thông tin trường</DialogTitle>
              <DialogDescription>
                Cập nhật thông tin trường đại học
              </DialogDescription>
            </DialogHeader>
            {editingUniversity && (
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-3 gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="edit-name">Tên trường</Label>
                    <Input
                      id="edit-name"
                      value={editingUniversity.name}
                      onChange={(e) =>
                        setEditingUniversity({
                          ...editingUniversity,
                          name: e.target.value,
                        })
                      }
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="edit-englishName">Tên tiếng Anh</Label>
                    <Input
                      id="edit-englishName"
                      value={editingUniversity.thongTinChung.tenTiengAnh}
                      onChange={(e) =>
                        setEditingUniversity({
                          ...editingUniversity,
                          thongTinChung: {
                            ...editingUniversity.thongTinChung,
                            tenTiengAnh: e.target.value,
                          },
                        })
                      }
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="edit-code">Mã trường</Label>
                    <Input
                      id="edit-code"
                      value={editingUniversity.thongTinChung.maTruong}
                      onChange={(e) =>
                        setEditingUniversity({
                          ...editingUniversity,
                          thongTinChung: {
                            ...editingUniversity.thongTinChung,
                            maTruong: e.target.value,
                          },
                        })
                      }
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="edit-website">Website</Label>
                    <Input
                      id="edit-website"
                      value={editingUniversity.url}
                      onChange={(e) =>
                        setEditingUniversity({
                          ...editingUniversity,
                          url: e.target.value,
                        })
                      }
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="edit-address">Địa chỉ</Label>
                    <Textarea
                      id="edit-address"
                      value={editingUniversity.thongTinChung.diaChi}
                      onChange={(e) =>
                        setEditingUniversity({
                          ...editingUniversity,
                          thongTinChung: {
                            ...editingUniversity.thongTinChung,
                            diaChi: e.target.value,
                          },
                        })
                      }
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="edit-phone">Điện thoại</Label>
                    <Input
                      id="edit-phone"
                      value={editingUniversity.thongTinChung.sdt}
                      onChange={(e) =>
                        setEditingUniversity({
                          ...editingUniversity,
                          thongTinChung: {
                            ...editingUniversity.thongTinChung,
                            sdt: e.target.value,
                          },
                        })
                      }
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="edit-email">Email</Label>
                    <Input
                      id="edit-email"
                      value={editingUniversity.thongTinChung.email}
                      onChange={(e) =>
                        setEditingUniversity({
                          ...editingUniversity,
                          thongTinChung: {
                            ...editingUniversity.thongTinChung,
                            email: e.target.value,
                          },
                        })
                      }
                    />
                  </div>
                </div>
              </div>
            )}
            <DialogFooter>
              <Button
                variant="outline"
                onClick={() => setIsEditDialogOpen(false)}
              >
                Hủy
              </Button>
              <Button
                onClick={handleEditUniversity}
                className="bg-blue-600 hover:bg-blue-700"
              >
                Cập nhật
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <StaffHeader />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Tổng số trường
              </CardTitle>
              <Building2 className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{universities.length}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Trường công lập
              </CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">
                {
                  universities.filter((u) =>
                    u.thongTinChung.loaiTruong.includes("Công lập")
                  ).length
                }
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Trường dân lập
              </CardTitle>
              <Building2 className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-blue-600">
                {
                  universities.filter((u) =>
                    u.thongTinChung.loaiTruong.includes("Dân lập")
                  ).length
                }
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Controls */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>
              Tìm thấy {filteredUniversities.length} trường đại học
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col sm:flex-row gap-4 mb-6">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  placeholder="Tìm kiếm trường đại học..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>

            {/* Universities Grid */}
            <div className="space-y-4">
              {filteredUniversities.map((university) => (
                <Card
                  key={university.id}
                  className="cursor-pointer hover:shadow-md transition-shadow"
                  onClick={() => setSelectedUniversity(university)}
                >
                  <CardContent className="p-6">
                    <div className="flex items-start space-x-4">
                      <div className="w-16 h-16 bg-blue-600 rounded-lg flex items-center justify-center flex-shrink-0">
                        <Building2 className="h-8 w-8 text-white" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="text-lg font-semibold text-blue-600 mb-1">
                          {university.name}
                        </h3>
                        <p className="text-sm text-gray-600 mb-1">
                          Mã trường: {university.thongTinChung.maTruong}
                        </p>
                        <p className="text-sm text-gray-600 mb-2">
                          {university.thongTinChung.tenTiengAnh}
                        </p>
                        <div className="flex items-center text-sm text-gray-500">
                          <MapPin className="h-4 w-4 mr-1 flex-shrink-0" />
                          <span className="truncate">
                            {university.thongTinChung.diaChi}
                          </span>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span className="text-blue-600 text-sm font-medium">
                          Xem chi tiết →
                        </span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {filteredUniversities.length === 0 && (
              <div className="text-center py-8 text-gray-500">
                Không tìm thấy trường đại học nào phù hợp
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
