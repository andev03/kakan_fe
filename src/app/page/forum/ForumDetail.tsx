import { Link } from "react-router-dom";
import { ArrowLeft, ThumbsUp, Clock, X } from "lucide-react";
import { Button } from "../../components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "../../components/ui/card";
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
import { api } from "../../hooks/api";

// Dữ liệu mẫu cho chi tiết bài đăng

// Dữ liệu mẫu cho các bình luận

// Dữ liệu mẫu cho các bài viết liên quan

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
  userInformationDto: UserInformationDto;
}
interface CommentDto {
  id: string;
  accountId: number;
  content: string;
  createdAt: string;
  accountName: string;
}

interface UserInformationDto {
  accountId: number;
  fullName: string;
  avatarUrl: string;
  dob: string;
  gender: boolean;
  address: string;
  phone: string;
}

export default function PostPage() {
  const { postId } = useParams();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [accountId, setAccountId] = useState<number | null>(null);
  const [comments, setComments] = useState<CommentDto[]>([]);
  const [commentContent, setCommentContent] = useState("");
  const [post, setPost] = useState<PostDto | null>(null);
  const [likedUsers, setLikedUsers] = useState<string[]>([]);
  const [showLikedUsers, setShowLikedUsers] = useState(false);

  const [__loading, setLoading] = useState(true);
  const [__error, setError] = useState("");
  useEffect(() => {
    const userString = localStorage.getItem("user");
    if (userString) {
      const user = JSON.parse(userString);
      setIsAuthenticated(true);
      setAccountId(user.id);
      console.log("Đã load user từ localStorage:", user.id);
    } else {
      setIsAuthenticated(false);
      setAccountId(null);
    }
  }, []);

  const fetchPost = async () => {
    try {
      console.log("id", postId);
      const response = await api.get(`/forum/api/post/${postId}/${accountId}`);
      console.log("post", response);

      if (response.status === 200) {
        setPost(response.data.data);
        // Dữ liệu thực tế nằm trong `data.data`
      }
    } catch (error) {
      console.error("Lỗi khi lấy bài viết:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (postId && accountId) {
      fetchPost();
    }
  }, [postId, accountId]);

  const fetchComments = async () => {
    try {
      setLoading(true);
      const res = await api.get(`/forum/api/comments/${postId}`);
      if (res.data && res.data.data) {
        setComments(res.data.data);
        console.log("comment", res);
      } else {
        throw new Error("Invalid comment data");
      }
    } catch (err: any) {
      console.error("Error loading comments:", err);
      setError(err.message || "Failed to load comments");
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    if (postId) {
      fetchComments();
    }
  }, [postId]);

  const handleLike = async () => {
    try {
      if (!postId || !accountId) return;

      await api.put(`/forum/api/post/${postId}/${accountId}/like`);

      // Fetch lại dữ liệu bài viết để cập nhật likeCount & isLikedByCurrentUser
      fetchPost();
    } catch (error) {
      console.error("Lỗi khi like:", error);
    }
  };

  const handlePostComment = async () => {
    if (!commentContent.trim()) return;

    try {
      const res = await api.post(`/forum/api/comment/${postId}`, {
        message: commentContent,
        accountId: accountId, // nếu backend cần thêm accountId
      });

      console.log("Bình luận thành công:", res);
      setCommentContent(""); // Xoá nội dung trong Textarea sau khi gửi
      fetchComments(); // Gọi lại API để hiển thị bình luận mới
    } catch (err) {
      console.error("Lỗi khi gửi bình luận:", err);
    }
  };

  const fetchLikedUsers = async () => {
    try {
      const res = await api.get(`/forum/api/post/${postId}/like`);
      setLikedUsers(res.data.data); // giả sử trả về mảng tên
      setShowLikedUsers(true);
    } catch (err) {
      console.error("Lỗi khi tải danh sách người thích:", err);
    }
  };

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
                      <h1 className="text-2xl font-bold mb-2">{post?.title}</h1>
                      {/* <div className="flex flex-wrap gap-2 mb-4">
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
                      </div> */}
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    {/* <Avatar className="w-12 h-12">
                      <AvatarImage
                        src={postData.author.avatar || "/placeholder.svg"}
                        alt={postData.author.name}
                      />
                      <AvatarFallback>
                        {postData.author.name.charAt(0)}
                      </AvatarFallback>
                    </Avatar> */}
                    <div>
                      <p className="font-medium">{post?.accountName}</p>
                      {/* <p className="text-sm text-gray-500">
                        {postData.author.role}
                      </p> */}
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="text-sm text-gray-500 mb-4 flex items-center">
                    <Clock className="w-4 h-4 mr-1" />
                    {post?.createdAt
                      ? new Date(post.createdAt).toLocaleString("vi-VN")
                      : ""}
                  </div>
                  <div className="prose max-w-none">
                    {post?.content.split("\n\n")}
                  </div>
                </CardContent>
                <CardFooter className="border-t pt-4">
                  <div className="flex justify-between w-full">
                    <div className="flex space-x-4">
                      <Button
                        variant="ghost"
                        size="sm"
                        className="flex items-center cursor-pointer"
                        onClick={handleLike}
                      >
                        <ThumbsUp
                          className={`w-4 h-4 mr-2 ${
                            post?.liked ? "text-blue-500" : "text-gray-500"
                          }`}
                          fill={post?.liked ? "#3b82f6" : "none"} // Màu nền khi đã thích
                        />
                        {post?.liked ? "Đã thích" : "Thích"}
                      </Button>
                      <div className="relative inline-block">
                        <p
                          onClick={fetchLikedUsers}
                          className="text-sm text-gray-500 hover:underline cursor-pointer mt-2"
                        >
                          {post?.likeCount} người đã thích
                        </p>

                        {showLikedUsers && (
                          <div className="absolute left-0 mt-2 bg-white border border-gray-300 rounded shadow-lg z-10 w-60">
                            <div className="p-4">
                              <div className="flex justify-between mb-3">
                                <h3 className="font-semibold text-lg">
                                  Người đã thích
                                </h3>
                                <button
                                  onClick={() => setShowLikedUsers(false)}
                                  className=" text-gray-500 hover:underline "
                                >
                                  <X className="text-sm" />
                                </button>
                              </div>
                              <ul className="space-y-1 max-h-60 overflow-y-auto">
                                {likedUsers.map((name, index) => (
                                  <li
                                    key={index}
                                    className="text-gray-700 text-sm"
                                  >
                                    {name}
                                  </li>
                                ))}
                              </ul>
                            </div>
                          </div>
                        )}
                      </div>
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
                      value={commentContent}
                      onChange={(e) => setCommentContent(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === "Enter" && !e.shiftKey) {
                          e.preventDefault(); // tránh xuống dòng
                          handlePostComment();
                        }
                      }}
                    />
                    <div className="flex justify-end ">
                      <Button
                        onClick={handlePostComment}
                        className="cursor-pointer border-1"
                      >
                        Đăng bình luận
                      </Button>
                    </div>
                  </CardContent>
                </Card>

                {/* Comments List */}
                <div className="space-y-6">
                  {comments.map((comment) => (
                    <Card key={comment.id}>
                      <CardContent className="pt-6">
                        <div className="flex items-start space-x-4 mb-4">
                          {/* <Avatar>
                            <AvatarImage
                              src={comment.author.avatar || "/placeholder.svg"}
                              alt={comment.author.name}
                            />
                            <AvatarFallback>
                              {comment.author.name.charAt(0)}
                            </AvatarFallback>
                          </Avatar> */}
                          <div>
                            <div className="flex items-center">
                              <p className="font-medium">{comment.accountId}</p>
                              <span className="mx-2 text-gray-300">•</span>
                              <p className="font-medium">
                                {comment?.accountName}
                              </p>
                            </div>
                            <p className="text-xs text-gray-500">
                              {comment?.createdAt
                                ? new Date(comment.createdAt).toLocaleString(
                                    "vi-VN"
                                  )
                                : ""}
                            </p>
                          </div>
                        </div>
                        <div className="prose max-w-none ml-12">
                          {comment.content.split("\n\n")}
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
                        src={
                          post?.userInformationDto.avatarUrl ||
                          "/placeholder.svg"
                        }
                      />
                      <AvatarFallback>
                        {post?.userInformationDto.fullName.charAt(0)}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-medium">
                        {post?.userInformationDto.fullName}
                      </p>
                      <p className="text-sm text-gray-500">
                        {post?.userInformationDto.dob}
                      </p>
                    </div>
                  </div>
                  <Separator className="my-4" />
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Giới tính:</span>
                      <span>
                        {post?.userInformationDto.gender ? "Nam" : "Nữ"}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Số điện thoại:</span>
                      <span>{post?.userInformationDto.phone}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Địa chỉ:</span>
                      <span>{post?.userInformationDto.address}</span>
                    </div>
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
