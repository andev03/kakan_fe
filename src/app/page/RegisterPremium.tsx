"use client";

import { useState } from "react";

import {
  ArrowLeft,
  CheckCircle,
  Shield,
  Star,
  Clock,
  Database,
  BookOpen,
} from "lucide-react";
import LogoName from "../components/logoName";

export default function PremiumRegisterPage() {
  const [paymentMethod, setPaymentMethod] = useState("momo");

  const premiumFeatures = [
    {
      title: "Tra cứu thông tin học bạ",
      description:
        "Tìm kiếm thông tin học bạ từ mọi nơi về hệ thống tuyển sinh",
      icon: Database,
    },
    {
      title: "Dữ liệu điểm số chi tiết",
      description: "Hiển thị hoa và điểm số của mình trong các kỳ thi",
      icon: Star,
    },
    {
      title: "So sánh thành tích học tập",
      description:
        "Tra cứu thông tin về các trường học và so sánh thành tích học của bạn",
      icon: BookOpen,
    },
    {
      title: "Tư vấn tuyển sinh AI",
      description:
        "Nhận tư vấn tuyển sinh từ AI dựa trên điểm số và sở thích của bạn",
      icon: Shield,
    },
    {
      title: "Cập nhật thông tin liên tục",
      description:
        "Nhận thông báo khi có thông tin tuyển sinh mới từ các trường",
      icon: Clock,
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-50 to-white">
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center mb-8">
          <a
            onClick={() => window.history.back()}
            className="flex items-center text-sky-500 hover:text-sky-600 mr-4 transition-colors cursor-pointer"
          >
            <ArrowLeft className="h-4 w-4 mr-1" />
            <span>Quay lại</span>
          </a>
        </div>

        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-2">
            Đăng Ký <span className="text-x1">{LogoName()}</span> Premium
          </h1>
          <p className="text-slate-600 max-w-2xl mx-auto">
            Nâng cấp tài khoản của bạn lên Premium để trải nghiệm đầy đủ các
            tính năng và dịch vụ của KAKAN
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 items-start max-w-6xl mx-auto">
          {/* Thông tin đăng ký */}
          <div>
            <div className="bg-white rounded-lg shadow-lg border-0 p-6">
              <div className="mb-6">
                <h2 className="text-xl font-semibold mb-2">
                  Thông tin đăng ký
                </h2>
                <p className="text-slate-600">
                  Vui lòng điền đầy đủ thông tin để đăng ký KAKAN Premium
                </p>
              </div>

              <div className="space-y-4">
                <div className="space-y-2">
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-slate-700"
                  >
                    Email
                  </label>
                  <input
                    id="email"
                    type="email"
                    placeholder="email@example.com"
                    className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent"
                  />
                </div>
                <div className="space-y-2">
                  <label
                    htmlFor="phone"
                    className="block text-sm font-medium text-slate-700"
                  >
                    Số điện thoại
                  </label>
                  <input
                    id="phone"
                    type="tel"
                    placeholder="0912 345 678"
                    className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent"
                  />
                </div>
                <div className="space-y-2">
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium text-slate-700"
                  >
                    Họ và tên
                  </label>
                  <input
                    id="name"
                    placeholder="Nguyễn Văn A"
                    className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent"
                  />
                </div>

                <div className="pt-4">
                  <div className="mt-4">
                    <div className="border border-sky-100 rounded-lg p-4">
                      <div className="flex justify-between items-center">
                        <div>
                          <h3 className="font-medium">Gói hàng tháng</h3>
                          <p className="text-sm text-slate-500">
                            Thanh toán mỗi tháng
                          </p>
                        </div>
                        <div className="text-right">
                          <div className="text-2xl font-bold text-sky-600">
                            30.000đ
                          </div>
                          <div className="text-sm text-slate-500">
                            mỗi tháng
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="pt-4">
                  <label className="block text-sm font-medium text-slate-700 mb-3">
                    Phương thức thanh toán
                  </label>
                  <div className="space-y-3">
                    {[
                      { id: "banking", label: "Internet Banking", icon: null },
                      {
                        id: "momo",
                        label: "Ví điện tử (MoMo, ZaloPay)",
                        icon: null,
                      },
                    ].map((method) => (
                      <div
                        key={method.id}
                        className="flex items-center space-x-2 border rounded-md p-3 cursor-pointer hover:border-sky-200 transition-colors"
                        onClick={() => setPaymentMethod(method.id)}
                      >
                        <input
                          type="radio"
                          id={method.id}
                          name="paymentMethod"
                          value={method.id}
                          checked={paymentMethod === method.id}
                          onChange={(e) => setPaymentMethod(e.target.value)}
                          className="text-sky-500 focus:ring-sky-500"
                        />
                        <label
                          htmlFor={method.id}
                          className="flex items-center cursor-pointer flex-1"
                        >
                          <span>{method.label}</span>
                        </label>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="mt-6">
                <button className="w-full h-12 bg-sky-500 hover:bg-sky-600 text-white rounded-lg transition-colors mb-3">
                  Thanh toán 30.000đ
                </button>
                <p className="text-xs text-center text-slate-500">
                  Bằng cách nhấn vào nút thanh toán, bạn đồng ý với{" "}
                  <a className="text-sky-500 hover:underline">
                    Điều khoản sử dụng
                  </a>{" "}
                  và{" "}
                  <a className="text-sky-500 hover:underline">
                    Chính sách bảo mật
                  </a>{" "}
                  của chúng tôi.
                </p>
              </div>
            </div>
          </div>

          {/* Thông tin Premium */}
          <div>
            <div className="bg-gradient-to-br from-sky-500 to-sky-600 text-white rounded-lg shadow-lg border-0 p-6 sticky top-8">
              <div className="mb-6">
                <h2 className="text-2xl font-bold">KAKAN Premium</h2>
                <p className="text-sky-100">
                  Trải nghiệm đầy đủ các tính năng cao cấp của KAKAN
                </p>
              </div>

              <div className="space-y-6">
                <div className="space-y-4">
                  {premiumFeatures.map((feature, index) => (
                    <div key={index} className="flex items-start gap-3">
                      <div className="bg-white/10 p-2 rounded-full">
                        <feature.icon className="h-5 w-5 text-sky-100" />
                      </div>
                      <div>
                        <h3 className="font-medium">{feature.title}</h3>
                        <p className="text-sm text-sky-100">
                          {feature.description}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="bg-white/10 rounded-lg p-4">
                  <h3 className="font-medium mb-2">
                    Quyền lợi thành viên Premium
                  </h3>
                  <ul className="space-y-2">
                    {[
                      "Không giới hạn số lần tra cứu thông tin",
                      "Ưu tiên hỗ trợ kỹ thuật 24/7",
                      "Cập nhật thông tin tuyển sinh sớm nhất",
                      "Tư vấn tuyển sinh cá nhân hóa",
                      "Truy cập các báo cáo phân tích chuyên sâu",
                    ].map((benefit, index) => (
                      <li key={index} className="flex items-center gap-2">
                        <CheckCircle className="h-4 w-4 text-sky-100 shrink-0" />
                        <span className="text-sm">{benefit}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="bg-white/10 rounded-lg p-4">
                  <h3 className="font-medium mb-2">Cam kết của chúng tôi</h3>
                  <p className="text-sm text-sky-100">
                    Chúng tôi cam kết cung cấp thông tin chính xác và đầy đủ
                    nhất về tuyển sinh. Nếu bạn không hài lòng, chúng tôi sẽ
                    hoàn tiền 100% trong vòng 7 ngày đầu tiên.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
