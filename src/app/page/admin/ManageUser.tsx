import { useState, useEffect } from "react";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "../../components/ui/avatar";
import { Badge } from "../../components/ui/badge";
import { Button } from "../../components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../../components/ui/card";
import { Input } from "../../components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../../components/ui/dropdown-menu";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "../../components/ui/hover-card";
import { ChevronDown } from "lucide-react";

import { MoreHorizontal, Search, UserPlus } from "lucide-react";
import { useUser } from "../../hooks/userContext";
import { useNavigate } from "react-router-dom";
import LogoName from "../../components/logoName";
import { api } from "../../hooks/api";
import { toast } from "react-toastify";
// Mock data for user
const mockuser = [
  {
    userId: "USR001",
    name: "Nguyễn Văn An",
    email: "nguyenvanan@email.com",
    gender: "Nam",
    dob: "15/03/1990",
    phone: "0901234567",
    address: "123 Đường ABC, Quận 1, TP.HCM",
    avatarUrl: "/placeholder.svg?height=40&width=40",
    status: "active",
    joinDate: "16:03:19 11/7/2025",
    lastActive: "2 giờ trước",
  },
  {
    userId: "USR002",
    name: "Trần Thị Bình",
    email: "tranthibinh@email.com",
    gender: "Nữ",
    dob: "22/08/1995",
    phone: "0912345678",
    address: "456 Đường XYZ, Quận 3, TP.HCM",
    avatarUrl: "/placeholder.svg?height=40&width=40",
    status: "active",
    joinDate: "16:03:19 11/7/2025",
    lastActive: "1 ngày trước",
  },
  {
    userId: "USR003",
    name: "Lê Hoàng Cường",
    email: "lehoangcuong@email.com",
    gender: "Nam",
    dob: "10/12/1988",
    phone: "0923456789",
    address: "789 Đường DEF, Quận 7, TP.HCM",
    avatarUrl: "/placeholder.svg?height=40&width=40",
    status: "blocked",
    joinDate: "16:03:19 11/7/2025",
    lastActive: "1 tuần trước",
  },
];
interface UserDto {
  userId: number;
  fullName: string;
  gender: boolean;
  email: string;
  createAt: string;
  dob: string;
  phone: string;
  address: string;
  status: boolean;
  avatarUrl: string;
}

export default function ManageUser() {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [users, setUsers] = useState<UserDto[]>([]);
  const { logout } = useUser();
  const navigate = useNavigate();
  const handleLogout = () => {
    logout(); // Xóa token và user khỏi localStorage + state
    navigate("/login"); // Điều hướng về trang login (hoặc trang chủ)
  };
  const fetchUser = async () => {
    const storedUser = localStorage.getItem("user");
    let res;
    if (storedUser) {
      try {
        const user = JSON.parse(storedUser);
        if (user.role !== "ADMIN") {
          navigate("/login");
        } else {
          res = await api.get("/user/api/admin/user-list");
          if (res.data && res.data.data) {
            setUsers(res.data.data);
            console.log("user-list", res.data.data);
          }
        }
      } catch (error) {
        console.error("Lỗi khi parse user:", error);
        navigate("/login");
      }
    } else {
      navigate("/login");
    }
  };
  useEffect(() => {
    fetchUser();
  }, []);
  const handleToggleUserStatus = async (
    userId: number,
    currentStatus: boolean
  ) => {
    const confirmMessage = currentStatus
      ? "Bạn có chắc chắn muốn chặn người dùng này không?"
      : "Bạn có chắc chắn muốn kích hoạt người dùng này không?";

    const confirmed = window.confirm(confirmMessage);
    if (!confirmed) return;

    try {
      const url = currentStatus
        ? `/user/api/admin/block-user/${userId}`
        : `/user/api/admin/active-user/${userId}`;

      const res = await api.put(url);
      console.log(res);
      if (res.data && res.data.status === 200) {
        toast.success(res.data.message || "Cập nhật thành công!");

        fetchUser();
      } else {
        toast.error("Có lỗi xảy ra!");
      }
    } catch (error) {
      console.error("Lỗi cập nhật trạng thái người dùng:", error);
      toast.error("Không thể cập nhật trạng thái người dùng");
    }
  };

  const filtereduser = users.filter((user) => {
    const matchesSearch =
      (user.fullName || "").toLowerCase().includes(searchTerm.toLowerCase()) ||
      (user.email || "").toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus =
      statusFilter === "all" ||
      (statusFilter === "active" && user.status === true) ||
      (statusFilter === "blocked" && user.status === false);

    return matchesSearch && matchesStatus;
  });

  const totaluser = users.length;
  const activeUsers = users.filter((user) => user.status === true).length;
  const blockedUsers = users.filter((user) => user.status === false).length;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <h1 className="text-5xl font-bold ml-9">
              <LogoName />
            </h1>
            <span className="text-gray-600">Admin Dashboard</span>
          </div>
          <div className="flex items-center space-x-3">
            <HoverCard openDelay={100} closeDelay={100}>
              <HoverCardTrigger className="flex items-center space-x-1 cursor-pointer px-3 py-2 hover:bg-gray-100 rounded-md transition">
                <span className="text-sm text-gray-700">Xin chào, Admin</span>
                <ChevronDown className="w-4 h-4 text-gray-700" />
              </HoverCardTrigger>
              <HoverCardContent className="w-56 p-0 bg-white border border-gray-200 rounded-lg shadow-lg z-50">
                <div className="border-t border-gray-100 my-1" />
                <button
                  onClick={handleLogout}
                  className="block w-full text-left px-4 py-2 text-blue-600 hover:bg-gray-100 hover:rounded-xl"
                >
                  Đăng xuất
                </button>
              </HoverCardContent>
            </HoverCard>
          </div>
        </div>
      </header>

      <div className="p-6 space-y-6">
        {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">
                Tổng người dùng
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{totaluser}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">
                Người dùng hoạt động
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">
                {activeUsers}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">
                Người dùng bị chặn
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-red-600">
                {blockedUsers}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">
                Tổng tương tác
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">156</div>
            </CardContent>
          </Card>
        </div>

        {/* User Management Section */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg font-semibold">
              Quản lý người dùng
            </CardTitle>
          </CardHeader>
          <CardContent>
            {/* Search and Filter Bar */}
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center space-x-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <Input
                    placeholder="Tìm kiếm người dùng..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 w-64"
                  />
                </div>
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger className="w-32">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Tất cả</SelectItem>
                    <SelectItem value="active">Hoạt động</SelectItem>
                    <SelectItem value="blocked">Bị chặn</SelectItem>
                  </SelectContent>
                </Select>
              </div>

            </div>

            {/* user Table */}
            <div className="border rounded-lg">
              <Table>
                <TableHeader>
                  <TableRow className="bg-gray-50">
                    <TableHead>Người dùng</TableHead>
                    <TableHead>User ID</TableHead>
                    <TableHead>Giới tính</TableHead>
                    <TableHead>Ngày sinh</TableHead>
                    <TableHead>Số điện thoại</TableHead>
                    <TableHead>Địa chỉ</TableHead>
                    <TableHead>Trạng thái</TableHead>
                    <TableHead>Ngày tham gia</TableHead>
                    <TableHead>Thao tác</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filtereduser.map((user) => (
                    <TableRow key={user.userId}>
                      <TableCell>
                        <div className="flex items-center space-x-3">
                          <Avatar className="h-8 w-8">
                            <AvatarImage
                              src={user.avatarUrl || "/placeholder.svg"}
                              alt={user.fullName}
                            />
                            <AvatarFallback>
                              {user.fullName?.charAt(0)}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <div className="font-medium">{user.fullName}</div>
                            <div className="text-sm text-gray-500">
                              {user.email}
                            </div>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell className="font-mono text-sm">
                        {user.userId}
                      </TableCell>
                      <TableCell>{user.gender ? "Nam" : "Nữ"}</TableCell>
                      <TableCell>{user.dob}</TableCell>
                      <TableCell>{user.phone}</TableCell>
                      <TableCell
                        className="max-w-xs truncate"
                        title={user.address}
                      >
                        {user.address}
                      </TableCell>
                      <TableCell>
                        <Badge
                          variant={user.status ? "default" : "destructive"}
                          className={
                            user.status
                              ? "bg-green-100 text-green-800 hover:bg-green-100"
                              : "bg-red-100 text-red-800 hover:bg-red-100"
                          }
                        >
                          {user.status ? "Hoạt động" : "Bị chặn"}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-sm">{user.createAt}</TableCell>

                      <TableCell>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" className="h-8 w-8 p-0">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem
                              onClick={() =>
                                handleToggleUserStatus(user.userId, user.status)
                              }
                              className={
                                user.status ? "text-red-600" : "text-green-600"
                              }
                            >
                              {user.status
                                ? "Chặn người dùng"
                                : "Kích hoạt người dùng"}
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
