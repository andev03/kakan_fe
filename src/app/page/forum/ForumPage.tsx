import { Link, useNavigate } from "react-router-dom";
import {
  Search,
  Clock,
  PlusCircle,
  ThumbsUp,
  MessageCircle,
  CheckCircle,
  Star,
} from "lucide-react";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "../../components/ui/card";

import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "../../components/ui/tabs";
import Header from "../../components/header";
import { useEffect, useState } from "react";
import { api } from "../../hooks/api";

interface PostDto {
  id: string;
  title: string;
  accountName: string;
  content: string;
  likeCount: number;
  commentCount: number;
  status: string;
  createdAt: string;
  topicName: string;
  liked: boolean;
}

// Dữ liệu mẫu cho các chủ đề phổ biến


export default function ForumPage() {
  const navigate = useNavigate();
  const [posts, setPosts] = useState<PostDto[]>([]);
  const [tab, setTab] = useState("all");
  const [myPosts, setMyPosts] = useState<PostDto[]>([]);
  const [searchTerm, setSearchTerm] = useState("");

  const accountId = JSON.parse(localStorage.getItem("user") || "{}").accountId;

  const [__loading, setLoading] = useState<boolean>(true);
  const [__error, setError] = useState<string | null>(null);
  const storedUser = localStorage.getItem("user");
  const user = JSON.parse(storedUser || "{}");
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setLoading(true);

        let res;

        if (storedUser) {
          const accountId = parseInt(user?.id); // hoặc Number(user.id)
          res = await api.get(`/forum/api/posts/all/${accountId}`);
          console.log(res);
        } else {
          res = await api.get("/forum/api/posts/admin");
        }

        if (res.data && res.data.data) {
          setPosts(res.data.data);
        } else {
          throw new Error("Invalid data format from API");
        }
      } catch (err: any) {
        console.error("Error fetching posts:", err);
        setError(err.message || "Failed to fetch posts");
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  useEffect(() => {
    const fetchMyPosts = async () => {
      const accountId = JSON.parse(localStorage.getItem("user") || "{}").id;

      try {
        if (tab === "my-posts" && accountId) {
          const response = await api.get(`/forum/api/posts/${accountId}`);
          console.log("my-post", response);
          if (response.data.status === 200) {
            setMyPosts(response.data.data);
          } else {
            console.warn("Có lỗi khi lấy bài viết:", response.data.message);
          }
        }
      } catch (error: any) {
        console.error("Lỗi khi gọi API lấy bài viết của tôi:", error);
      }
    };

    fetchMyPosts();
  }, [tab, accountId]);
  const filteredMyPosts = myPosts
    .filter((post) => post.status !== "DELETED")
    .filter((post) =>
      post.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
  const filteredPosts = posts
    .filter((post) => post.status === "ACTIVE")
    .filter((post) =>
      post.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      {/* Forum Header */}
      <section className="bg-gradient-to-r from-blue-400 to-blue-600 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div>
              <h1 className="text-4xl font-bold mb-2">Diễn đàn tuyển sinh</h1>
              <p className="text-xl text-blue-100">
                Nơi chia sẻ và trao đổi thông tin tuyển sinh
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Forum Content */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Main Content */}
          <div className="lg:w-3/4">
            {/* Search and Filter */}
            <div className="mb-8">
              <div className="relative">
                <Input
                  type="text"
                  placeholder="Tìm kiếm bài viết..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full py-2 pl-10 pr-4 rounded-lg"
                />
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              </div>
            </div>

            {/* Tabs */}
            <Tabs
              defaultValue="all"
              value={tab}
              onValueChange={setTab}
              className="mb-8 "
            >
              <TabsList className="grid grid-cols-4 mb-6 bg-gray-100">
                <TabsTrigger value="all">Tất cả</TabsTrigger>
                <TabsTrigger value="my-posts">Bài viết của tôi</TabsTrigger>
              </TabsList>
              <TabsContent value="all">
                <div className="space-y-6">
                  {filteredPosts.length > 0 ? (
                    filteredPosts.map((post) => (
                      <Link key={post.id} to={`/forum-details/${post.id}`}>
                        <Card className="hover:shadow-md transition-shadow duration-200 cursor-pointer mb-5">
                          <CardHeader className="pb-2">
                            <div className="flex justify-between">
                              <div className="flex items-center space-x-4">
                                <div>
                                  <p className="text-sm font-medium">
                                    {post.accountName}
                                  </p>
                                  <div className="flex items-center text-xs text-gray-500">
                                    <Clock className="w-3 h-3 mr-1" />
                                    {new Date(post.createdAt).toLocaleString(
                                      "vi-VN"
                                    )}
                                  </div>
                                </div>
                              </div>
                            </div>
                          </CardHeader>
                          <CardContent>
                            <h3 className="text-xl font-bold mb-2 text-gray-900">
                              {post.title}
                            </h3>
                            <p className="text-gray-600 line-clamp-2 mb-4">
                              {post.content}
                            </p>
                            <div className="flex flex-wrap gap-2">
                              {/* tags nếu cần */}
                            </div>
                          </CardContent>
                          <CardFooter className="border-t pt-4">
                            <div className="flex justify-between w-full text-sm text-gray-500">
                              <div className="flex space-x-6">
                                <div className="flex space-x-4">
                                  <Button
                                    variant="ghost"
                                    size="sm"
                                    className="flex items-center"
                                  >
                                    <ThumbsUp
                                      className={`w-4 h-4 mr-2 ${
                                        post?.liked
                                          ? "text-blue-500"
                                          : "text-gray-500"
                                      }`}
                                      fill={post?.liked ? "#3b82f6" : "none"}
                                    />
                                    {post?.liked ? "Đã thích" : "Thích"}(
                                    {post.likeCount})
                                  </Button>
                                </div>
                                <div className="flex items-center">
                                  <MessageCircle className="w-4 h-4 mr-1" />
                                  {post.commentCount}
                                </div>
                              </div>
                            </div>
                          </CardFooter>
                        </Card>
                      </Link>
                    ))
                  ) : (
                    <div className="text-center text-gray-500">
                      {searchTerm
                        ? "Không tìm thấy bài viết phù hợp."
                        : "Hiện chưa có bài viết nào."}
                    </div>
                  )}
                </div>
              </TabsContent>

              <TabsContent value="my-posts">
                <div className="space-y-6">
                  {filteredMyPosts.length > 0 ? (
                    filteredMyPosts.map((post) => (
                      <Link key={post.id} to={`/forum-details/${post.id}`}>
                        <Card className="hover:shadow-md transition-shadow duration-200 cursor-pointer mb-5">
                          <CardHeader className="pb-2">
                            <div className="flex justify-between">
                              <div className="flex items-center space-x-4">
                                <div>
                                  <p className="text-sm font-medium">
                                    {post.accountName}
                                  </p>
                                  <div className="flex items-center text-xs text-gray-500">
                                    <Clock className="w-3 h-3 mr-1" />
                                    {new Date(post.createdAt).toLocaleString(
                                      "vi-VN"
                                    )}
                                  </div>
                                </div>
                              </div>
                            </div>
                          </CardHeader>
                          <CardContent>
                            <h3 className="text-xl font-bold mb-2 text-gray-900">
                              {post.title}
                            </h3>

                            {post.status !== "ACTIVE" && (
                              <p className="text-sm font-semibold text-red-500 mb-2 uppercase">
                                {post.status === "BLOCKED" &&
                                  "Bài viết đã bị chặn"}
                                {post.status === "DELETED" &&
                                  "Bài viết đã bị xoá"}
                              </p>
                            )}
                            <p className="text-gray-600 line-clamp-2 mb-4">
                              {post.content}
                            </p>
                            <div className="flex flex-wrap gap-2">
                              {/* topic tags */}
                            </div>
                          </CardContent>
                          <CardFooter className="border-t pt-4">
                            <div className="flex justify-between w-full text-sm text-gray-500">
                              <div className="flex space-x-6">
                                <div className="flex space-x-4">
                                  <Button
                                    variant="ghost"
                                    size="sm"
                                    className="flex items-center"
                                    disabled={post.status === "BLOCKED"}
                                  >
                                    <ThumbsUp
                                      className={`w-4 h-4 mr-2 ${
                                        post?.liked
                                          ? "text-blue-500"
                                          : "text-gray-500"
                                      }`}
                                      fill={post?.liked ? "#3b82f6" : "none"}
                                    />
                                    {post?.liked ? "Đã thích" : "Thích"}(
                                    {post.likeCount})
                                  </Button>
                                </div>
                                <div className="flex items-center">
                                  <MessageCircle className="w-4 h-4 mr-1" />
                                  {post.commentCount}
                                </div>
                              </div>
                            </div>
                          </CardFooter>
                        </Card>
                      </Link>
                    ))
                  ) : (
                    <div className="text-center text-gray-500">
                      {searchTerm
                        ? "Không tìm thấy bài viết phù hợp."
                        : "Bạn chưa có bài viết nào."}
                    </div>
                  )}
                </div>
              </TabsContent>
            </Tabs>
          </div>

          {/* Sidebar */}
          <div className="lg:w-1/4 space-y-8">
            {/* Create Post Card */}
            <Card>
              <CardHeader className="pb-2">
                <h3 className="font-bold text-lg">Tham gia thảo luận</h3>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 text-sm mb-4">
                  Đặt câu hỏi, chia sẻ kinh nghiệm hoặc tìm kiếm thông tin tuyển
                  sinh.
                </p>
                <button
                  onClick={() => navigate("/forum-post")}
                  className="w-full flex items-center justify-center bg-black text-white p-2 cursor-pointer "
                >
                  <PlusCircle className="w-4 h-4 mr-2" />
                  Tạo bài viết mới
                </button>
              </CardContent>
            </Card>

            {/* Popular Topics */}
            {user?.role !== "PREMIUM" && (
              <Card>
                <CardHeader className="pb-2 bg-gradient-to-r from-blue-600 to-blue-500 text-white rounded-t-lg">
                  <h3 className="font-bold text-lg flex items-center gap-2">
                    <Star className="w-5 h-5 text-yellow-300" />
                    KAKAN Premium
                  </h3>
                  <p className="text-sm mt-1">
                    Trải nghiệm đầy đủ các tính năng cao cấp của KAKAN
                  </p>
                </CardHeader>

                <CardContent className="text-sm text-gray-800 space-y-3 mt-3">
                  <div className="flex gap-2 items-start">
                    <CheckCircle className="w-4 h-4 text-green-500 mt-0.5" />
                    <span>
                      Tra cứu thông tin học bạ từ mọi nơi về hệ thống tuyển sinh
                    </span>
                  </div>
                  <div className="flex gap-2 items-start">
                    <CheckCircle className="w-4 h-4 text-green-500 mt-0.5" />
                    <span>Hiển thị học lực và điểm số chi tiết</span>
                  </div>
                  <div className="flex gap-2 items-start">
                    <CheckCircle className="w-4 h-4 text-green-500 mt-0.5" />
                    <span>So sánh thành tích học tập</span>
                  </div>
                  <div className="flex gap-2 items-start">
                    <CheckCircle className="w-4 h-4 text-green-500 mt-0.5" />
                    <span>Tư vấn tuyển sinh AI dựa trên điểm và sở thích</span>
                  </div>
                  <div className="flex gap-2 items-start">
                    <CheckCircle className="w-4 h-4 text-green-500 mt-0.5" />
                    <span>Cập nhật thông tin tuyển sinh liên tục</span>
                  </div>
                  <div className="flex gap-2 items-start">
                    <CheckCircle className="w-4 h-4 text-green-500 mt-0.5" />
                    <span>Không giới hạn số lần tra cứu</span>
                  </div>
                  <div className="flex gap-2 items-start">
                    <CheckCircle className="w-4 h-4 text-green-500 mt-0.5" />
                    <span>Ưu tiên hỗ trợ kỹ thuật 24/7</span>
                  </div>
                  <div className="flex gap-2 items-start">
                    <CheckCircle className="w-4 h-4 text-green-500 mt-0.5" />
                    <span>Truy cập báo cáo phân tích chuyên sâu</span>
                  </div>

                  <p className="text-xs text-gray-500 italic">
                    Chúng tôi cam kết cung cấp thông tin chính xác nhất. Nếu bạn
                    không hài lòng, hoàn tiền 100% trong 7 ngày đầu tiên.
                  </p>

                  <button
                    onClick={() => navigate("/register-premium")}
                    className="w-full bg-blue-600 text-white font-semibold py-2 rounded mt-2 hover:bg-blue-700 transition"
                  >
                    Đăng ký Premium ngay
                  </button>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
