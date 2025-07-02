import { Link, useNavigate } from "react-router-dom";
import {
  Search,
  MessageSquare,
  Clock,
  Tag,
  PlusCircle,
  ThumbsUp,
  MessageCircle,
  Eye,
} from "lucide-react";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "../../components/ui/card";
import { Badge } from "../../components/ui/badge";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "../../components/ui/avatar";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "../../components/ui/tabs";
import Header from "../../components/header";
import { useEffect, useState } from "react";
import { api } from "../../hooks/api";

// Dữ liệu mẫu cho các bài đăng diễn đàn
const forumPosts = [
  {
    id: 1,
    title: "Điểm chuẩn Đại học Y Dược năm 2025 dự kiến thế nào?",
    content:
      "Mình đang chuẩn bị thi đại học năm 2025 và muốn đăng ký vào ngành Y Đa khoa. Các anh chị có thông tin gì về điểm chuẩn dự kiến không ạ?",
    author: {
      name: "Nguyễn Văn A",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    createdAt: "2 giờ trước",
    tags: ["Điểm chuẩn", "Y Dược", "Tuyển sinh 2025"],
    likes: 15,
    comments: 8,
    views: 124,
    isHot: true,
  },
  {
    id: 2,
    title: "Hồ sơ xét tuyển Đại học Bách Khoa cần những gì?",
    content:
      "Mình muốn xét tuyển vào Đại học Bách Khoa nhưng chưa rõ cần chuẩn bị những giấy tờ gì. Mong mọi người chia sẻ kinh nghiệm ạ.",
    author: {
      name: "Trần Thị B",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    createdAt: "5 giờ trước",
    tags: ["Hồ sơ xét tuyển", "Bách Khoa", "Kinh nghiệm"],
    likes: 10,
    comments: 12,
    views: 98,
    isHot: false,
  },
  {
    id: 3,
    title: "So sánh ngành Công nghệ thông tin giữa các trường top đầu",
    content:
      "Mình đang phân vân giữa ngành CNTT của ĐH Bách Khoa, ĐH CNTT và ĐH FPT. Mọi người có thể cho mình xin ý kiến về chất lượng đào tạo, cơ hội việc làm không ạ?",
    author: {
      name: "Lê Văn C",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    createdAt: "1 ngày trước",
    tags: ["CNTT", "So sánh", "Ngành học"],
    likes: 32,
    comments: 24,
    views: 256,
    isHot: true,
  },
  {
    id: 4,
    title: "Kinh nghiệm ôn thi khối A1 đạt điểm cao",
    content:
      "Mình vừa thi đại học khối A1 năm nay và đạt 27.5 điểm. Mình muốn chia sẻ một số kinh nghiệm ôn thi cho các bạn khóa sau.",
    author: {
      name: "Phạm Thị D",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    createdAt: "2 ngày trước",
    tags: ["Kinh nghiệm", "Ôn thi", "Khối A1"],
    likes: 45,
    comments: 18,
    views: 320,
    isHot: true,
  },
  {
    id: 5,
    title: "Học bổng dành cho tân sinh viên năm 2025",
    content:
      "Mình muốn tìm hiểu về các chương trình học bổng dành cho tân sinh viên năm 2025. Các trường nào có chính sách học bổng tốt nhất?",
    author: {
      name: "Hoàng Văn E",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    createdAt: "3 ngày trước",
    tags: ["Học bổng", "Tân sinh viên", "2025"],
    likes: 28,
    comments: 15,
    views: 210,
    isHot: false,
  },
];

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
const popularTopics = [
  { name: "Điểm chuẩn", count: 156 },
  { name: "Tuyển sinh", count: 124 },
  { name: "Học bổng", count: 98 },
  { name: "Ngành học", count: 87 },
  { name: "Kinh nghiệm", count: 76 },
  { name: "Ôn thi", count: 65 },
];

export default function ForumPage() {
  const navigate = useNavigate();
  const [posts, setPosts] = useState<PostDto[]>([]);

  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setLoading(true);

        const storedUser = localStorage.getItem("user");

        let res;

        if (storedUser) {
          const user = JSON.parse(storedUser);
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
                  className="w-full py-2 pl-10 pr-4 rounded-lg"
                />
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              </div>
            </div>

            {/* Tabs */}
            <Tabs defaultValue="all" className="mb-8 ">
              <TabsList className="grid grid-cols-4 mb-6 bg-gray-100">
                <TabsTrigger value="all">Tất cả</TabsTrigger>
                <TabsTrigger value="hot">Nổi bật</TabsTrigger>
                <TabsTrigger value="unanswered">Chưa trả lời</TabsTrigger>
                <TabsTrigger value="my-posts">Bài viết của tôi</TabsTrigger>
              </TabsList>
              <TabsContent value="all">
                {/* Posts List */}
                <div className="space-y-6">
                  {posts.map((post) => (
                    <Link key={post.id} to={`/forum-details/${post.id}`}>
                      <Card className="hover:shadow-md transition-shadow duration-200 cursor-pointer">
                        <CardHeader className="pb-2">
                          <div className="flex justify-between">
                            <div className="flex items-center space-x-4">
                              {/* <Avatar>
                                <AvatarImage
                                  src={post.author.avatar || "/placeholder.svg"}
                                  alt={post.author.name}
                                />
                                <AvatarFallback>
                                  {post.author.name.charAt(0)}
                                </AvatarFallback>
                              </Avatar> */}
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
                            <Badge
                              variant="destructive"
                              className="bg-orange-500"
                            >
                              HOT
                            </Badge>
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
                            {/* topic  */}
                            {/* {post.tags.map((tag, index) => (
                              <Badge
                                key={index}
                                variant="secondary"
                                className="bg-gray-100"
                              >
                                <Tag className="w-3 h-3 mr-1" />
                                {tag}
                              </Badge>
                            ))} */}
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
                                    fill={post?.liked ? "#3b82f6" : "none"} // Màu nền khi đã thích
                                  />
                                  {post?.liked ? "Đã thích" : "Thích"} 
                                  
                                   ({post.likeCount})
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
                  ))}
                </div>

                {/* Pagination */}
                <div className="flex justify-center mt-8">
                  <div className="flex space-x-1">
                    <Button variant="outline" size="sm" disabled>
                      Trước
                    </Button>
                    <Button variant="outline" size="sm" className="bg-blue-50">
                      1
                    </Button>
                    <Button variant="outline" size="sm">
                      2
                    </Button>
                    <Button variant="outline" size="sm">
                      3
                    </Button>
                    <Button variant="outline" size="sm">
                      Sau
                    </Button>
                  </div>
                </div>
              </TabsContent>
              <TabsContent value="hot">
                <div className="p-8 text-center text-gray-500">
                  <MessageSquare className="w-12 h-12 mx-auto mb-4 text-gray-300" />
                  <h3 className="text-lg font-medium mb-2">Bài viết nổi bật</h3>
                  <p>Hiển thị các bài viết được quan tâm nhiều nhất</p>
                </div>
              </TabsContent>
              <TabsContent value="unanswered">
                <div className="p-8 text-center text-gray-500">
                  <MessageSquare className="w-12 h-12 mx-auto mb-4 text-gray-300" />
                  <h3 className="text-lg font-medium mb-2">
                    Bài viết chưa có câu trả lời
                  </h3>
                  <p>Hiển thị các bài viết chưa có ai trả lời</p>
                </div>
              </TabsContent>
              <TabsContent value="my-posts">
                <div className="p-8 text-center text-gray-500">
                  <MessageSquare className="w-12 h-12 mx-auto mb-4 text-gray-300" />
                  <h3 className="text-lg font-medium mb-2">Bài viết của bạn</h3>
                  <p>Vui lòng đăng nhập để xem bài viết của bạn</p>
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
                  className="w-full flex items-center justify-center bg-black text-white p-2 "
                >
                  <PlusCircle className="w-4 h-4 mr-2" />
                  Tạo bài viết mới
                </button>
              </CardContent>
            </Card>

            {/* Popular Topics */}
            <Card>
              <CardHeader className="pb-2">
                <h3 className="font-bold text-lg">Chủ đề phổ biến</h3>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {popularTopics.map((topic, index) => (
                    <div
                      key={index}
                      className="flex justify-between items-center"
                    >
                      <div className="flex items-center">
                        <Tag className="w-4 h-4 mr-2 text-blue-500" />
                        <span className="text-gray-700">{topic.name}</span>
                      </div>
                      <Badge variant="secondary">{topic.count}</Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
}
