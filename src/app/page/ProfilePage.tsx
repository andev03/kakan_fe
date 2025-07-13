import { useEffect } from "react";
import Header from "../components/header";
import { useState } from "react";
import { Button } from "../components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Textarea } from "../components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../components/ui/select";
import { Avatar, AvatarFallback, AvatarImage } from "../components/ui/avatar";
import {
  CalendarDays,
  Edit,
  Save,
  MessageSquare,
  Calculator,
  GraduationCap,
  Phone,
  MapPin,
} from "lucide-react";
import { api } from "../hooks/api";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

interface UserDTO {
  userId: number;
  fullName: string;
  gender: boolean;
  dob: string; // dạng ISO string, bạn có thể định dạng lại sau
  phone: string;
  address: string;
  avatarUrl: string;
  gpa: number;
  avatarFile?: File;
}
export default function ProfilePage() {
  const [isEditing, setIsEditing] = useState(false);
  const [userInfo, setUserInfo] = useState<UserDTO | null>(null);
  const [__loading, setLoading] = useState<boolean>(true);
  const navigate = useNavigate();
  const fetchUserInfo = async () => {
    try {
      const response = await api.get("/user/api/user/information/");
      console.log("profile", response);
      if (response.data.status === 200) {
        setUserInfo(response.data.data);
      } else {
        console.error(
          "Không lấy được thông tin người dùng:",
          response.data.message
        );
      }
    } catch (error: any) {
      console.error("Lỗi khi gọi API thông tin người dùng:", error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchUserInfo();
  }, []);

  const convertToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = (error) => reject(error);
    });
  };

  const handleSave = async () => {
    setIsEditing(false);
    console.log("Saving user info:", userInfo);

    try {
      let avatarBase64 = userInfo?.avatarUrl;

      if (userInfo?.avatarFile instanceof File) {
        avatarBase64 = await convertToBase64(userInfo.avatarFile);
      }
      const userData = {
        fullName: userInfo?.fullName,
        phone: userInfo?.phone,
        address: userInfo?.address,
        // gender: userInfo?.gender,
        // dob: userInfo?.dob,
        avatarUrl: avatarBase64,
      };

      console.log("update thong tin ", userData);
      const response = await api.put("/user/api/user/information", userData);

      if (response.data.status === 200) {
        toast.success("Cập nhật thành công");
        fetchUserInfo();
        console.log("update thanh cong", response);
      } else {
        console.error("Cập nhật thất bại:", response);
        toast.error(response.data.message || "Cập nhật thất bại");
      }
    } catch (error: any) {
      console.error("Lỗi cập nhật:", error);
      toast.error(error.response?.data?.message || "Lỗi hệ thống");
    }
  };

  const handleInputChange = (field: string, value: any) => {
    setUserInfo((prev) => {
      if (!prev) return prev;
      return {
        ...prev,
        [field]: value,
      };
    });
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("vi-VN");
  };
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <Header />

      <div className="max-w-6xl mx-auto p-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Profile Information Card */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle className="text-2xl">Thông tin cá nhân</CardTitle>
                  <CardDescription>
                    Quản lý thông tin tài khoản của bạn
                  </CardDescription>
                </div>
                <Button
                  onClick={() =>
                    isEditing ? handleSave() : setIsEditing(true)
                  }
                  className="bg-blue-600 hover:bg-blue-700"
                >
                  {isEditing ? (
                    <>
                      <Save className="w-4 h-4 mr-2" />
                      Lưu
                    </>
                  ) : (
                    <>
                      <Edit className="w-4 h-4 mr-2" />
                      Chỉnh sửa
                    </>
                  )}
                </Button>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Avatar Section */}
                <div className="flex items-center gap-4">
                  <Avatar className="w-20 h-20">
                    <AvatarImage
                      src={userInfo?.avatarUrl || "/placeholder.svg"}
                      alt={userInfo?.fullName}
                    />
                    <AvatarFallback className="text-lg">
                      {userInfo?.fullName
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>

                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) {
                        handleInputChange("avatarFile", file); // lưu file vào state
                      }
                    }}
                  />

                  <div>
                    <h3 className="text-lg font-semibold">
                      {userInfo?.fullName}
                    </h3>
                    <p className="text-gray-500">ID: {userInfo?.userId}</p>
                  </div>
                </div>

                {/* Form Fields */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="fullName">Họ và tên</Label>
                    {isEditing ? (
                      <Input
                        id="fullName"
                        value={userInfo?.fullName}
                        onChange={(e) =>
                          handleInputChange("fullName", e.target.value)
                        }
                      />
                    ) : (
                      <div className="p-2 bg-gray-50 rounded border">
                        {userInfo?.fullName}
                      </div>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="gender">Giới tính</Label>
                    {isEditing ? (
                      <Select
                        value={userInfo?.gender ? "true" : "false"}
                        onValueChange={(value) =>
                          handleInputChange("gender", value === "true")
                        }
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="true">Nam</SelectItem>
                          <SelectItem value="false">Nữ</SelectItem>
                        </SelectContent>
                      </Select>
                    ) : (
                      <div className="p-2 bg-gray-50 rounded border">
                        {userInfo?.gender ? "Nam" : "Nữ"}
                      </div>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="dob">Ngày sinh</Label>
                    {isEditing ? (
                      <Input
                        id="dob"
                        type="date"
                        value={userInfo?.dob}
                        onChange={(e) =>
                          handleInputChange("dob", e.target.value)
                        }
                      />
                    ) : (
                      <div className="p-2 bg-gray-50 rounded border flex items-center gap-2">
                        <CalendarDays className="w-4 h-4 text-gray-500" />
                        {formatDate(userInfo?.dob || "")}
                      </div>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="phone">Số điện thoại</Label>
                    {isEditing ? (
                      <Input
                        id="phone"
                        value={userInfo?.phone}
                        onChange={(e) =>
                          handleInputChange("phone", e.target.value)
                        }
                      />
                    ) : (
                      <div className="p-2 bg-gray-50 rounded border flex items-center gap-2">
                        <Phone className="w-4 h-4 text-gray-500" />
                        {userInfo?.phone}
                      </div>
                    )}
                  </div>

                  <div className="space-y-2 md:col-span-2">
                    <Label htmlFor="address">Địa chỉ</Label>
                    {isEditing ? (
                      <Textarea
                        id="address"
                        value={userInfo?.address}
                        onChange={(e) =>
                          handleInputChange("address", e.target.value)
                        }
                        rows={2}
                      />
                    ) : (
                      <div className="p-2 bg-gray-50 rounded border flex items-start gap-2">
                        <MapPin className="w-4 h-4 text-gray-500 mt-1" />
                        {userInfo?.address}
                      </div>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="gpa">GPA</Label>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Shortcuts Card */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Truy cập nhanh</CardTitle>
                <CardDescription>Các tính năng thường dùng</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button
                  variant="outline"
                  className="w-full justify-start h-12 hover:bg-blue-50 hover:border-blue-200 bg-transparent"
                  onClick={() => navigate("/forum")}
                >
                  <MessageSquare className="w-5 h-5 mr-3 text-blue-600" />
                  <div className="text-left">
                    <div className="font-medium">Diễn đàn</div>
                    <div className="text-xs text-gray-500">
                      Thảo luận và chia sẻ
                    </div>
                  </div>
                </Button>

                <Button
                  variant="outline"
                  className="w-full justify-start h-12 hover:bg-green-50 hover:border-green-200 bg-transparent"
                  onClick={() => navigate("/calculate")}
                >
                  <Calculator className="w-5 h-5 mr-3 text-green-600" />
                  <div className="text-left">
                    <div className="font-medium">Tính điểm</div>
                    <div className="text-xs text-gray-500">
                      Tính điểm xét tuyển
                    </div>
                  </div>
                </Button>

                <Button
                  variant="outline"
                  className="w-full justify-start h-12 hover:bg-purple-50 hover:border-purple-200 bg-transparent"
                  onClick={() => navigate("/universities")}
                >
                  <GraduationCap className="w-5 h-5 mr-3 text-purple-600" />
                  <div className="text-left">
                    <div className="font-medium">Đại học</div>
                    <div className="text-xs text-gray-500">
                      Thông tin trường học
                    </div>
                  </div>
                </Button>
              </CardContent>
            </Card>

            {/* Quick Stats Card */}
            <Card>
              <CardHeader>
                <CardTitle>Thống kê</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Tài khoản từ</span>
                  <span className="font-medium">2024</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Trạng thái</span>
                  <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs">
                    Đã xác thực
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Cấp độ</span>
                  <span className="font-medium">Học sinh</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
