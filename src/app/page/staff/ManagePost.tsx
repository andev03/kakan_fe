"use client";

import { useEffect, useState } from "react";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Badge } from "../../components/ui/badge";
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
  DialogTrigger,
} from "../../components/ui/dialog";
import { Label } from "../../components/ui/label";
import { Textarea } from "../../components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../components/ui/select";

import {
  Search,
  Plus,
  Trash2,
  Ban,
  MoreHorizontal,

} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../../components/ui/dropdown-menu";

import { useNavigate } from "react-router-dom";
import { api } from "../../hooks/api";
import { toast } from "react-toastify";
import { StaffHeader } from "../../components/staff-header";
import ConfirmDeleteDialog from "../../components/confirmDelete";

interface PostDto {
  id: string;
  title: string;
  accountName: string;
  content: string;
  likeCount: number;
  commentCount: number;
  status: string;
  createdAt: string;
  topicName: string[];
  liked: boolean;
}

export default function ManagePost() {
  const [posts, setPosts] = useState<PostDto[]>([]);

  const [topics, setTopics] = useState<{ id: number; name: string }[]>([]);

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("Tất cả");
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [openDeleteDialogPostId, setOpenDeleteDialogPostId] = useState<
    string | null
  >(null);

  const [accountId, setAccountId] = useState<number | null>(null);
  const [newPost, setNewPost] = useState({
    title: "",
    content: "",
    topicId: [] as number[],
    accountId: "",
  });

  const navigate = useNavigate();
  const fetchPost = async () => {
    const storedUser = localStorage.getItem("user");
    let res;
    if (storedUser) {
      try {
        const user = JSON.parse(storedUser);
        if (user.role !== "STAFF") {
          navigate("/login");
        } else {
          setAccountId(user.id);
          res = await api.get("/forum/api/posts/admin");
          if (res.data && res.data.data) {
            setPosts(res.data.data);
            console.log("post", res.data.data);
          } else {
            throw new Error("Invalid data format from API");
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

  const fetchTopics = async () => {
    try {
      const response = await api.get("/forum/api/topics");
      if (response.data.status === 200) {
        setTopics(response.data.data);
      }
    } catch (error) {
      console.error("Lỗi khi tải danh sách chủ đề:", error);
    }
  };
  useEffect(() => {
    fetchPost();
    fetchTopics();
  }, []);

  const filteredPosts = posts.filter((post) => {
    const matchesSearch =
      post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.content.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus =
      selectedStatus === "Tất cả" || post.status === selectedStatus;

    return matchesSearch && matchesStatus;
  });

  const handleCreatePost = async () => {
    // Kiểm tra dữ liệu trước khi gửi
    if (!newPost.title || !newPost.content || newPost.topicId.length === 0) {
      toast.error("Vui lòng điền đầy đủ tiêu đề, nội dung và chọn chủ đề.");
      return;
    }

    try {
      const payload = {
        title: newPost.title,
        content: newPost.content,
        topicId: newPost.topicId, // mảng string
        accountId: accountId, // từ localStorage
      };
      console.log(payload);
      const res = await api.post("/forum/api/post", payload);
      console.log("create", res);
      toast.success("Tạo bài viết thành công!");

      fetchPost(); // Reload danh sách bài viết

      // Reset form
      setNewPost({
        title: "",
        content: "",
        topicId: [],
        accountId: "",
      });

      setIsCreateDialogOpen(false); // Đóng dialog
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Không thể tạo bài viết.");
    }
  };

  const handleDeletePost = async (postId: string) => {
    try {
      await api.delete(`/forum/api/post/${postId}`);
      toast.success("Xóa bài viết thành công");

      // Optional: gọi lại API lấy danh sách bài viết
      fetchPost();
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Không thể xóa bài viết");
    }
  };

  const handleToggleStatus = async (postId: string) => {
    try {
      await api.put(`/forum/api/post/${postId}/block`);
      toast.success("Đã cập nhật trạng thái bài viết");
      fetchPost();
    } catch (error: any) {
      toast.error(
        error.response?.data?.message || "Không thể cập nhật trạng thái"
      );
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <StaffHeader />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Tổng bài viết
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{posts.length}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Bài viết hoạt động
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">
                {posts.filter((p) => p.status === "ACTIVE").length}
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Bài viết bị chặn
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-red-600">
                {posts.filter((p) => p.status === "BLOCKED").length}
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Tổng lượt thích
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {posts.reduce((sum, post) => sum + post.likeCount, 0)}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Controls */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Quản lý bài viết</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col sm:flex-row gap-4 mb-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  placeholder="Tìm kiếm bài viết..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>

              <Select value={selectedStatus} onValueChange={setSelectedStatus}>
                <SelectTrigger className="w-full sm:w-48">
                  <SelectValue placeholder="Trạng thái" />
                </SelectTrigger>
                <SelectContent className="bg-white">
                  <SelectItem value="Tất cả">Tất cả</SelectItem>
                  <SelectItem value="ACTIVE">Hoạt động</SelectItem>
                  <SelectItem value="BLOCKED">Chặn</SelectItem>
                  <SelectItem value="DELETED">Xóa</SelectItem>
                </SelectContent>
              </Select>
              <Dialog
                open={isCreateDialogOpen}
                onOpenChange={setIsCreateDialogOpen}
              >
                <DialogTrigger asChild>
                  <Button className="bg-blue-600 hover:bg-blue-700">
                    <Plus className="h-4 w-4 mr-2" />
                    Tạo bài viết
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[600px] bg-white">
                  <DialogHeader>
                    <DialogTitle>Tạo bài viết mới</DialogTitle>
                    <DialogDescription>
                      Điền thông tin để tạo bài viết mới
                    </DialogDescription>
                  </DialogHeader>
                  <div className="grid gap-4 py-4">
                    <div className="grid gap-2">
                      <Label htmlFor="title">Tiêu đề</Label>
                      <Input
                        id="title"
                        value={newPost.title}
                        onChange={(e) =>
                          setNewPost({ ...newPost, title: e.target.value })
                        }
                        placeholder="Nhập tiêu đề bài viết"
                      />
                    </div>
                    <div className="grid gap-2">
                      <Label>Chủ đề</Label>
                      <div className="flex flex-wrap gap-2">
                        {topics.map((topic) => (
                          <label
                            key={topic.id}
                            className="flex items-center space-x-2 border px-2 py-1 rounded cursor-pointer"
                          >
                            <input
                              type="checkbox"
                              checked={newPost.topicId.includes(topic.id)}
                              onChange={(e) => {
                                const isChecked = e.target.checked;
                                setNewPost((prev) => ({
                                  ...prev,
                                  topicId: isChecked
                                    ? [...prev.topicId, topic.id]
                                    : prev.topicId.filter(
                                        (id) => id !== topic.id
                                      ),
                                }));
                              }}
                            />
                            <span>{topic.name}</span>
                          </label>
                        ))}
                      </div>
                    </div>

                    <div className="grid gap-2">
                      <Label htmlFor="content">Nội dung</Label>
                      <Textarea
                        id="content"
                        value={newPost.content}
                        onChange={(e) =>
                          setNewPost({ ...newPost, content: e.target.value })
                        }
                        placeholder="Nhập nội dung bài viết"
                        rows={6}
                      />
                    </div>
                  </div>
                  <DialogFooter>
                    <Button
                      variant="outline"
                      onClick={() => setIsCreateDialogOpen(false)}
                    >
                      Hủy
                    </Button>
                    <Button
                      onClick={handleCreatePost}
                      className="bg-blue-600 hover:bg-blue-700 text-white"
                    >
                      Tạo bài viết
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </div>

            {/* Posts Table */}
            <div className="border rounded-lg">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Tiêu đề</TableHead>
                    <TableHead>Tác giả</TableHead>
                    <TableHead>Danh mục</TableHead>
                    <TableHead>Trạng thái</TableHead>
                    <TableHead>Ngày tạo</TableHead>
                    <TableHead>Tương tác</TableHead>
                    <TableHead className="text-right">Thao tác</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredPosts.map((post) => (
                    <TableRow key={post.id}>
                      <TableCell className="font-medium max-w-xs">
                        <div className="truncate" title={post.title}>
                          {post.title}
                        </div>
                      </TableCell>
                      <TableCell>{post.accountName}</TableCell>
                      <TableCell className="flex flex-col gap-1">
                        {post.topicName.map((topic: any, index: any) => (
                          <Badge
                            key={index}
                            variant="outline"
                            className="my-1 "
                          >
                            {topic}
                          </Badge>
                        ))}
                      </TableCell>
                      <TableCell>
                        <Badge
                          variant={
                            post.status === "ACTIVE"
                              ? "default"
                              : post.status === "BLOCKED"
                              ? "destructive"
                              : "outline"
                          }
                          className={
                            post.status === "ACTIVE"
                              ? "bg-green-100 text-green-800"
                              : post.status === "BLOCKED"
                              ? "bg-red-100 text-red-800"
                              : "bg-gray-100 text-gray-800"
                          }
                        >
                          {post.status === "ACTIVE"
                            ? "Hoạt động"
                            : post.status === "BLOCKED"
                            ? "Bị chặn"
                            : "Đã xóa"}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        {" "}
                        {post?.createdAt
                          ? new Date(post.createdAt).toLocaleString("vi-VN")
                          : ""}
                      </TableCell>
                      <TableCell>
                        <div className="text-sm text-gray-500">
                          {post.likeCount} thích • {post.commentCount} bình luận
                        </div>
                      </TableCell>
                      <TableCell className="text-right">
                        {post.status !== "DELETED" && (
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" className="h-8 w-8 p-0">
                                <MoreHorizontal className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>

                            <DropdownMenuContent
                              align="end"
                              className="bg-white"
                            >
                              {/* Nếu KHÔNG phải BLOCKED thì hiển thị tùy chọn Chặn/Bỏ chặn */}
                              {post.status !== "BLOCKED" && (
                                <DropdownMenuItem
                                  onClick={() => handleToggleStatus(post.id)}
                                >
                                  <Ban className="mr-2 h-4 w-4" />
                                  {post.status === "ACTIVE"
                                    ? "Chặn"
                                    : "Bỏ chặn"}
                                </DropdownMenuItem>
                              )}

                              {/* Xóa luôn hiển thị nếu không phải DELETED */}
                              <DropdownMenuItem
                                className="text-red-600"
                                onClick={() =>
                                  setOpenDeleteDialogPostId(post.id)
                                }
                              >
                                <Trash2 className="w-4 h-4" />
                                <p className="ml-3">Xóa</p>
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        )}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
              {openDeleteDialogPostId && (
                <ConfirmDeleteDialog
                  title={`Xác nhận xoá bài viết "${openDeleteDialogPostId}"`}
                  description="Bạn có chắc chắn muốn xoá bài viết này không?"
                  onConfirm={() => {
                    handleDeletePost(openDeleteDialogPostId);
                  }}
                  open={!!openDeleteDialogPostId}
                  onOpenChange={(open) => {
                    if (!open) setOpenDeleteDialogPostId(null);
                  }}
                />
              )}
            </div>

            {filteredPosts.length === 0 && (
              <div className="text-center py-8 text-gray-500">
                Không tìm thấy bài viết nào phù hợp với bộ lọc
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
