import { Link } from "react-router-dom";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../components/ui/select";
import Header from "../../components/header";

export default function CreatePostPage() {
  return (
    <div className="min-h-screen bg-gray-50">
     <Header/>

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
                  placeholder="Nhập tiêu đề bài viết (tối đa 100 ký tự)"
                  className="mt-2"
                />
              </div>

              <div>
                <Label htmlFor="category" className="text-base font-medium">
                  Chọn chủ đề
                </Label>
                <Select>
                  <SelectTrigger className="mt-2">
                    <SelectValue placeholder="Chọn chủ đề cho bài viết" />
                  </SelectTrigger>
                  <SelectContent className="bg-white ">
                    <SelectItem value="admission">Tuyển sinh</SelectItem>
                    <SelectItem value="score">Điểm chuẩn</SelectItem>
                    <SelectItem value="major">Ngành học</SelectItem>
                    <SelectItem value="experience">
                      Chia sẻ kinh nghiệm
                    </SelectItem>
                    <SelectItem value="scholarship">Học bổng</SelectItem>
                    <SelectItem value="qa">Hỏi đáp</SelectItem>
                  </SelectContent>
                </Select>
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
                    placeholder="Nhập nội dung bài viết của bạn..."
                    className="border-0 rounded-none focus-visible:ring-0 focus-visible:ring-offset-0"
                    rows={12}
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="tags" className="text-base font-medium">
                  Thẻ
                </Label>
                <Input
                  id="tags"
                  placeholder="Nhập các thẻ, phân cách bằng dấu phẩy (ví dụ: tuyển sinh, đại học, 2025)"
                  className="mt-2"
                />
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex justify-between border-t pt-6">
            <div className="flex items-center text-sm text-gray-500">
              <HelpCircle className="w-4 h-4 mr-2" />
              Vui lòng tuân thủ nội quy diễn đàn khi đăng bài
            </div>
            <div className="flex space-x-4">
              <Button variant="outline">Lưu nháp</Button>
              <Button className="bg-blue-500 hover:bg-blue-600">
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
