import {
  Mail,
  Phone,
  MapPin,
  Globe,
  Users,
  BookOpen,
  Award,
} from "lucide-react";
import Header from "../components/header";
import Footer from "../components/footer";

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-400 to-blue-600 rounded-xl p-6 mb-8 shadow-md text-white py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Liên hệ với chúng tôi
          </h1>
          <p className="text-xl text-blue-100 max-w-3xl mx-auto">
            Chúng tôi luôn sẵn sàng hỗ trợ bạn trong hành trình tìm kiếm trường
            đại học phù hợp
          </p>
        </div>
      </section>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid lg:grid-cols-2 gap-12">
          {/* About Section */}
          <div className="space-y-8">
            {/* About Card */}
            <div className="bg-white rounded-lg shadow-md border border-gray-200">
              <div className="p-6 border-b border-gray-200">
                <h2 className="text-2xl font-semibold text-blue-600 flex items-center gap-2">
                  <Globe className="h-6 w-6" />
                  Về KAKAN
                </h2>
              </div>
              <div className="p-6 space-y-4">
                <p className="text-gray-700 leading-relaxed">
                  KAKAN là hệ thống tra cứu tuyển sinh hàng đầu tại Sài Gòn,
                  được thiết kế để hỗ trợ học sinh, phụ huynh và các nhà giáo
                  dục trong việc tìm kiếm thông tin chính xác về các trường đại
                  học, điểm chuẩn và quy trình tuyển sinh.
                </p>
                <p className="text-gray-700 leading-relaxed">
                  Với cơ sở dữ liệu được cập nhật liên tục và giao diện thân
                  thiện, chúng tôi cam kết mang đến trải nghiệm tốt nhất cho
                  người dùng trong việc định hướng tương lai học tập.
                </p>
              </div>
            </div>

            {/* Features Card */}
            <div className="bg-white rounded-lg shadow-md border border-gray-200">
              <div className="p-6 border-b border-gray-200">
                <h3 className="text-xl font-semibold text-blue-600 flex items-center gap-2">
                  <Award className="h-5 w-5" />
                  Tính năng nổi bật
                </h3>
              </div>
              <div className="p-6">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="flex items-center gap-3">
                    <BookOpen className="h-5 w-5 text-blue-500" />
                    <span className="text-gray-700">Tra cứu điểm chuẩn</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Users className="h-5 w-5 text-blue-500" />
                    <span className="text-gray-700">Tư vấn tuyển sinh</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Globe className="h-5 w-5 text-blue-500" />
                    <span className="text-gray-700">Thông tin trường học</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Award className="h-5 w-5 text-blue-500" />
                    <span className="text-gray-700">Tính điểm thi</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Information */}
          <div className="space-y-8">
            {/* Contact Info Card */}
            <div className="bg-white rounded-lg shadow-md border border-gray-200">
              <div className="p-6 border-b border-gray-200">
                <h2 className="text-2xl font-semibold text-blue-600">
                  Thông tin liên hệ
                </h2>
                <p className="text-gray-600 mt-1">
                  Liên hệ với chúng tôi qua các kênh thông tin dưới đây
                </p>
              </div>
              <div className="p-6 space-y-6">
                {/* Address */}
                <div className="flex items-start gap-4">
                  <div className="bg-blue-100 p-3 rounded-lg flex-shrink-0">
                    <MapPin className="h-6 w-6 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">
                      Địa chỉ
                    </h3>
                    <p className="text-gray-700">
                      123 Đường Nguyễn Văn Cừ, Quận 5<br />
                      Thành phố Hồ Chí Minh, Việt Nam
                    </p>
                  </div>
                </div>

                {/* Phone */}
                <div className="flex items-start gap-4">
                  <div className="bg-blue-100 p-3 rounded-lg flex-shrink-0">
                    <Phone className="h-6 w-6 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">
                      Số điện thoại
                    </h3>
                    <p className="text-gray-700">
                      Hotline:{" "}
                      <a
                        href="tel:+84901234567"
                        className="text-blue-600 hover:underline"
                      >
                        0901 234 567
                      </a>
                      <br />
                      Tư vấn:{" "}
                      <a
                        href="tel:+84987654321"
                        className="text-blue-600 hover:underline"
                      >
                        0987 654 321
                      </a>
                    </p>
                  </div>
                </div>

                {/* Email */}
                <div className="flex items-start gap-4">
                  <div className="bg-blue-100 p-3 rounded-lg flex-shrink-0">
                    <Mail className="h-6 w-6 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">Email</h3>
                    <p className="text-gray-700">
                      Hỗ trợ:{" "}
                      <a
                        href="mailto:support@kakan.edu.vn"
                        className="text-blue-600 hover:underline"
                      >
                        support@kakan.edu.vn
                      </a>
                      <br />
                      Tư vấn:{" "}
                      <a
                        href="mailto:tuvan@kakan.edu.vn"
                        className="text-blue-600 hover:underline"
                      >
                        tuvan@kakan.edu.vn
                      </a>
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Working Hours Card */}
            <div className="bg-white rounded-lg shadow-md border border-gray-200">
              <div className="p-6 border-b border-gray-200">
                <h3 className="text-xl font-semibold text-blue-600">
                  Giờ làm việc
                </h3>
              </div>
              <div className="p-6">
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-700">Thứ 2 - Thứ 6:</span>
                    <span className="font-medium text-gray-900">
                      8:00 - 17:30
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-700">Thứ 7:</span>
                    <span className="font-medium text-gray-900">
                      8:00 - 12:00
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-700">Chủ nhật:</span>
                    <span className="font-medium text-red-500">Nghỉ</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Important Note */}
            <div className="bg-blue-50 p-6 rounded-lg border border-blue-200">
              <h3 className="font-semibold text-blue-900 mb-2">
                Lưu ý quan trọng
              </h3>
              <p className="text-blue-800 text-sm leading-relaxed">
                Để được hỗ trợ nhanh nhất, vui lòng liên hệ qua hotline trong
                giờ làm việc. Đối với các câu hỏi phức tạp, chúng tôi khuyến
                khích bạn gửi email để được tư vấn chi tiết.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
}
