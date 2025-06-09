import { Link, useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  ThumbsUp,
  MessageCircle,
  Share2,
  Bookmark,
  Flag,
  Clock,
  Tag,
  Eye,
  Lock,
} from "lucide-react";
import { Button } from "../../components/ui/button";
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
import { Separator } from "../../components/ui/separator";
import { Textarea } from "../../components/ui/textarea";
import { useParams } from "react-router-dom";
import Header from "../../components/header";
import { useEffect, useState } from "react";
import Footer from "../../components/footer";
import UnAuthenticatedPage from "../../components/unAuthenticatedPage";

interface PostPageProps {
  params: {
    id: string;
  };
}

// Dữ liệu mẫu cho chi tiết bài đăng
const postData = {
  id: 1,
  title: "Điểm chuẩn Đại học Y Dược năm 2025 dự kiến thế nào?",
  content:
    "Mình đang chuẩn bị thi đại học năm 2025 và muốn đăng ký vào ngành Y Đa khoa. Các anh chị có thông tin gì về điểm chuẩn dự kiến không ạ?\n\nMình đã tìm hiểu sơ qua và thấy điểm chuẩn những năm gần đây khá cao, dao động từ 26-28 điểm. Mình muốn biết với tình hình hiện tại thì điểm chuẩn năm 2025 có khả năng tăng hay giảm không?\n\nNgoài ra, mình cũng muốn hỏi thêm về các phương thức xét tuyển khác ngoài điểm thi THPT như xét học bạ, đánh giá năng lực, v.v. Trường Y có những phương thức nào và tỷ lệ trúng tuyển ra sao?\n\nCảm ơn mọi người đã đọc và chia sẻ!",
  author: {
    name: "Nguyễn Văn A",
    avatar: "/placeholder.svg?height=40&width=40",
    role: "Học sinh lớp 12",
    joinDate: "Tháng 3, 2024",
    posts: 15,
  },
  createdAt: "2 giờ trước",
  updatedAt: "1 giờ trước",
  tags: ["Điểm chuẩn", "Y Dược", "Tuyển sinh 2025"],
  likes: 15,
  views: 124,
  isHot: true,
};

// Dữ liệu mẫu cho các bình luận
const comments = [
  {
    id: 1,
    author: {
      name: "Trần Thị B",
      avatar: "/placeholder.svg?height=40&width=40",
      role: "Sinh viên Y1",
    },
    content:
      "Chào bạn, mình là sinh viên năm nhất ngành Y đa khoa. Theo kinh nghiệm của mình, điểm chuẩn Y đa khoa thường dao động từ 26-28 điểm như bạn đã nói. Năm nay có thể sẽ tăng nhẹ do xu hướng nhiều học sinh đăng ký vào ngành Y.\n\nVề phương thức xét tuyển, trường mình có 3 phương thức chính:\n1. Xét điểm thi THPT (70% chỉ tiêu)\n2. Xét học bạ (20% chỉ tiêu)\n3. Xét tuyển thẳng và ưu tiên (10% chỉ tiêu)\n\nBạn nên chuẩn bị kỹ cho kỳ thi THPT vì đây vẫn là phương thức chính nhé!",
    createdAt: "1 giờ trước",
    likes: 8,
  },
  {
    id: 2,
    author: {
      name: "Lê Văn C",
      avatar: "/placeholder.svg?height=40&width=40",
      role: "Giáo viên THPT",
    },
    content:
      "Theo nhận định của mình, điểm chuẩn Y Dược năm 2025 có thể sẽ tăng nhẹ khoảng 0.5-1 điểm so với năm 2024. Lý do là số lượng thí sinh đăng ký vào ngành Y ngày càng nhiều, trong khi chỉ tiêu không tăng nhiều.\n\nBạn nên đặt mục tiêu từ 27.5 điểm trở lên để đảm bảo cơ hội trúng tuyển nhé.",
    createdAt: "45 phút trước",
    likes: 5,
  },
  {
    id: 3,
    author: {
      name: "Phạm Thị D",
      avatar: "/placeholder.svg?height=40&width=40",
      role: "Sinh viên Y3",
    },
    content:
      "Mình bổ sung thêm là ngoài điểm số, bạn cũng nên quan tâm đến việc chuẩn bị hồ sơ xét tuyển thật kỹ. Đặc biệt nếu bạn xét học bạ, cần đảm bảo điểm trung bình các môn xét tuyển đạt từ 8.0 trở lên trong 5 học kỳ THPT.\n\nNếu bạn có thành tích tốt trong các kỳ thi học sinh giỏi cấp tỉnh/thành phố trở lên, hãy cân nhắc phương thức xét tuyển thẳng.",
    createdAt: "30 phút trước",
    likes: 3,
  },
];

// Dữ liệu mẫu cho các bài viết liên quan
const relatedPosts = [
  {
    id: 2,
    title: "Kinh nghiệm ôn thi khối B đạt điểm cao",
    comments: 24,
    views: 320,
  },
  {
    id: 3,
    title: "So sánh chất lượng đào tạo Y khoa giữa các trường",
    comments: 18,
    views: 256,
  },
  {
    id: 4,
    title: "Học Y Dược ra trường làm gì?",
    comments: 32,
    views: 412,
  },
];

export default function PostPage() {
  const postId = useParams();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Check if user has email in localStorage
    const email = localStorage.getItem("email");
    setIsAuthenticated(!!email);
  }, []);
  return (
    <div className="relative min-h-screen bg-gray-50">
      <Header />

      {/* Post Content */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Breadcrumb */}
        <div className="mb-6">
          <Link
            to="/forum"
            className="inline-flex items-center text-blue-600 hover:text-blue-800"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Quay lại diễn đàn
          </Link>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          <div
            className={`${
              !isAuthenticated ? "blur-sm pointer-events-none select-none" : ""
            } w-full flex flex-col lg:flex-row gap-8`}
          >
            <div className="lg:w-3/4">
              {/* Post */}
              <Card className="mb-8">
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-start">
                    <div>
                      <h1 className="text-2xl font-bold mb-2">
                        {postData.title}
                      </h1>
                      <div className="flex flex-wrap gap-2 mb-4">
                        {postData.tags.map((tag, index) => (
                          <Badge
                            key={index}
                            variant="secondary"
                            className="bg-gray-100"
                          >
                            <Tag className="w-3 h-3 mr-1" />
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    {postData.isHot && (
                      <Badge variant="destructive" className="bg-orange-500">
                        HOT
                      </Badge>
                    )}
                  </div>
                  <div className="flex items-center space-x-4">
                    <Avatar className="w-12 h-12">
                      <AvatarImage
                        src={postData.author.avatar || "/placeholder.svg"}
                        alt={postData.author.name}
                      />
                      <AvatarFallback>
                        {postData.author.name.charAt(0)}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-medium">{postData.author.name}</p>
                      <p className="text-sm text-gray-500">
                        {postData.author.role}
                      </p>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="text-sm text-gray-500 mb-4 flex items-center">
                    <Clock className="w-4 h-4 mr-1" />
                    Đăng {postData.createdAt} • Cập nhật {postData.updatedAt}
                  </div>
                  <div className="prose max-w-none">
                    {postData.content.split("\n\n").map((paragraph, index) => (
                      <p key={index} className="mb-4">
                        {paragraph}
                      </p>
                    ))}
                  </div>
                </CardContent>
                <CardFooter className="border-t pt-4">
                  <div className="flex justify-between w-full">
                    <div className="flex space-x-4">
                      <Button
                        variant="ghost"
                        size="sm"
                        className="flex items-center"
                      >
                        <ThumbsUp className="w-4 h-4 mr-2" />
                        Thích ({postData.likes})
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="flex items-center"
                      >
                        <MessageCircle className="w-4 h-4 mr-2" />
                        Bình luận ({comments.length})
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="flex items-center"
                      >
                        <Share2 className="w-4 h-4 mr-2" />
                        Chia sẻ
                      </Button>
                    </div>
                    <div className="flex space-x-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        className="flex items-center"
                      >
                        <Bookmark className="w-4 h-4 mr-2" />
                        Lưu
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="flex items-center"
                      >
                        <Flag className="w-4 h-4 mr-2" />
                        Báo cáo
                      </Button>
                    </div>
                  </div>
                </CardFooter>
              </Card>

              {/* Comments */}
              <div className="mb-8">
                <h2 className="text-xl font-bold mb-6">
                  Bình luận ({comments.length})
                </h2>

                {/* Comment Form */}
                <Card className="mb-6">
                  <CardContent className="pt-6">
                    <Textarea
                      placeholder="Viết bình luận của bạn..."
                      className="mb-4"
                      rows={4}
                    />
                    <div className="flex justify-end">
                      <Button>Đăng bình luận</Button>
                    </div>
                  </CardContent>
                </Card>

                {/* Comments List */}
                <div className="space-y-6">
                  {comments.map((comment) => (
                    <Card key={comment.id}>
                      <CardContent className="pt-6">
                        <div className="flex items-start space-x-4 mb-4">
                          <Avatar>
                            <AvatarImage
                              src={comment.author.avatar || "/placeholder.svg"}
                              alt={comment.author.name}
                            />
                            <AvatarFallback>
                              {comment.author.name.charAt(0)}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <div className="flex items-center">
                              <p className="font-medium">
                                {comment.author.name}
                              </p>
                              <span className="mx-2 text-gray-300">•</span>
                              <p className="text-sm text-gray-500">
                                {comment.author.role}
                              </p>
                            </div>
                            <p className="text-xs text-gray-500">
                              {comment.createdAt}
                            </p>
                          </div>
                        </div>
                        <div className="prose max-w-none ml-12">
                          {comment.content
                            .split("\n\n")
                            .map((paragraph, index) => (
                              <p key={index} className="mb-4">
                                {paragraph}
                              </p>
                            ))}
                        </div>
                        <div className="flex items-center space-x-4 mt-4 ml-12">
                          <Button
                            variant="ghost"
                            size="sm"
                            className="flex items-center text-sm"
                          >
                            <ThumbsUp className="w-3 h-3 mr-1" />
                            Thích ({comment.likes})
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="flex items-center text-sm"
                          >
                            <MessageCircle className="w-3 h-3 mr-1" />
                            Trả lời
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="lg:w-1/4 space-y-8">
              {/* Author Info */}
              <Card>
                <CardHeader className="pb-2">
                  <h3 className="font-bold text-lg">Thông tin tác giả</h3>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center space-x-4 mb-4">
                    <Avatar className="w-16 h-16">
                      <AvatarImage
                        src={postData.author.avatar || "/placeholder.svg"}
                        alt={postData.author.name}
                      />
                      <AvatarFallback>
                        {postData.author.name.charAt(0)}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-medium">{postData.author.name}</p>
                      <p className="text-sm text-gray-500">
                        {postData.author.role}
                      </p>
                    </div>
                  </div>
                  <Separator className="my-4" />
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Tham gia:</span>
                      <span>{postData.author.joinDate}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Bài viết:</span>
                      <span>{postData.author.posts}</span>
                    </div>
                  </div>
                  <div className="mt-4">
                    <Button variant="outline" size="sm" className="w-full">
                      Xem tất cả bài viết
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Related Posts */}
              <Card>
                <CardHeader className="pb-2">
                  <h3 className="font-bold text-lg">Bài viết liên quan</h3>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {relatedPosts.map((post) => (
                      <div
                        key={post.id}
                        className="border-b pb-4 last:border-0 last:pb-0"
                      >
                        <Link
                          to={`/forum/post/${post.id}`}
                          className="font-medium hover:text-blue-600 block mb-2"
                        >
                          {post.title}
                        </Link>
                        <div className="flex text-xs text-gray-500">
                          <div className="flex items-center mr-4">
                            <MessageCircle className="w-3 h-3 mr-1" />
                            {post.comments} bình luận
                          </div>
                          <div className="flex items-center">
                            <Eye className="w-3 h-3 mr-1" />
                            {post.views} lượt xem
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Forum Rules */}
              <Card>
                <CardHeader className="pb-2">
                  <h3 className="font-bold text-lg">Nội quy diễn đàn</h3>
                </CardHeader>
                <CardContent>
                  <ul className="text-sm text-gray-600 space-y-2 list-disc pl-5">
                    <li>Tôn trọng các thành viên khác</li>
                    <li>Không đăng nội dung vi phạm pháp luật</li>
                    <li>Không spam hoặc quảng cáo trái phép</li>
                    <li>Sử dụng ngôn ngữ lịch sự, không chửi thề</li>
                    <li>Không đăng thông tin cá nhân của người khác</li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>
      {!isAuthenticated && <UnAuthenticatedPage />}
      <Footer />
    </div>
  );
}
