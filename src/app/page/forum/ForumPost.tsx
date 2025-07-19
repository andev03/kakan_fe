import { Link, useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  Send,
  ImageIcon,
  Paperclip,
  HelpCircle,
} from "lucide-react";
import { Button } from "../../components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "../../components/ui/card";
import { Input } from "../../components/ui/input";
import { Textarea } from "../../components/ui/textarea";
import { Label } from "../../components/ui/label";

import Header from "../../components/header";
import { useEffect, useState } from "react";
import { api } from "../../hooks/api";
import { toast } from "react-toastify";

export default function CreatePostPage() {
  const [topics, setTopics] = useState([]);
  const [selectedTopics, setSelectedTopics] = useState<string[]>([]);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [accountId, setAccountId] = useState<number | null>(null);
  const navigate = useNavigate();
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user") || "{}");
    setAccountId(user.id || null);
  }, []);

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
    fetchTopics();
  }, []);

  const handleSubmit = async () => {
    const payload = {
      accountId,
      title,
      content,
      topicId: selectedTopics.map(Number), // Chuyển từ string[] sang number[]
    };
    console.log(payload);
    try {
      const response = await api.post("/forum/api/post", payload);
      if (response.data.status === 200) {
        toast.success("Tạo bài viết thành công");
        // reset form hoặc chuyển trang
        fetchTopics();
        navigate("/forum");
      }
    } catch (error: any) {
      console.error("Lỗi khi đăng bài:", error.response?.data || error.message);
      toast.error("Đăng bài thất bại!");
    }
  };

  const chunkArray = (array: any[], chunkSize: number) => {
    const result = [];
    for (let i = 0; i < array.length; i += chunkSize) {
      result.push(array.slice(i, i + chunkSize));
    }
    return result;
  };
  const chunkedTopics = chunkArray(topics, 4); // mỗi cột tối đa 4 topic

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      {/* Create Post Content */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
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

        <h1 className="text-3xl font-bold mb-8">Tạo bài viết mới</h1>

        <Card>
          <CardHeader>
            <div className="space-y-6">
              <div>
                <Label htmlFor="title" className="text-base font-medium">
                  Tiêu đề bài viết
                </Label>
                <Input
                  id="title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
              </div>

              <div>
                <Label className="text-base font-medium">Chọn chủ đề</Label>
                <div className="mt-2 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {chunkedTopics.map((group, colIndex) => (
                    <div key={colIndex} className="space-y-2">
                      {group.map((topic: any) => (
                        <label
                          key={topic.id}
                          className="flex items-center space-x-2"
                        >
                          <input
                            type="checkbox"
                            value={topic.id}
                            checked={selectedTopics.includes(
                              topic.id.toString()
                            )}
                            onChange={(e) => {
                              const value = e.target.value;
                              if (e.target.checked) {
                                setSelectedTopics((prev) => [...prev, value]);
                              } else {
                                setSelectedTopics((prev) =>
                                  prev.filter((id) => id !== value)
                                );
                              }
                            }}
                          />
                          <span>{topic.name}</span>
                        </label>
                      ))}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <div>
                <Label htmlFor="content" className="text-base font-medium">
                  Nội dung bài viết
                </Label>
                <div className="mt-2 border rounded-md">
                  <div className="flex items-center p-2 border-b bg-gray-50">
                    <Button variant="ghost" size="sm">
                      <ImageIcon className="w-4 h-4" />
                    </Button>
                    <Button variant="ghost" size="sm">
                      <Paperclip className="w-4 h-4" />
                    </Button>
                  </div>
                  <Textarea
                    id="content"
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                  />
                </div>
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex justify-between border-t pt-6">
            <div className="flex items-center text-sm text-gray-500">
              <HelpCircle className="w-4 h-4 mr-2" />
              Vui lòng tuân thủ nội quy diễn đàn khi đăng bài
            </div>
            <div className="flex space-x-4">
              <Button
                onClick={handleSubmit}
                className="bg-blue-500 hover:bg-blue-600"
              >
                <Send className="w-4 h-4 mr-2" />
                Đăng bài
              </Button>
            </div>
          </CardFooter>
        </Card>

        {/* Guidelines */}
        <Card className="mt-8">
          <CardHeader>
            <h3 className="font-bold text-lg">Hướng dẫn đăng bài</h3>
          </CardHeader>
          <CardContent>
            <ul className="text-sm text-gray-600 space-y-2 list-disc pl-5">
              <li>
                Đặt tiêu đề ngắn gọn, rõ ràng và liên quan đến nội dung bài viết
              </li>
              <li>
                Trình bày nội dung mạch lạc, dễ hiểu, có thể chia thành các đoạn
              </li>
              <li>Sử dụng ngôn ngữ lịch sự, tránh viết tắt quá nhiều</li>
              <li>
                Thêm thẻ (tags) liên quan để giúp người khác dễ dàng tìm thấy
                bài viết của bạn
              </li>
              <li>Kiểm tra lỗi chính tả trước khi đăng bài</li>
            </ul>
          </CardContent>
        </Card>
      </section>
    </div>
  );
}
