"use client";

import {
  CheckCircle,
  CreditCard,
  Hash,
  User,
  DollarSign,
  Star,
  Gift,
} from "lucide-react";
import { Button } from "../../components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../../components/ui/card";
import { Badge } from "../../components/ui/badge";
import { Separator } from "../../components/ui/separator";
import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { api } from "../../hooks/api";

export default function PaymentSuccess() {
  // Dữ liệu thanh toán mẫu
  const location = useLocation();
  const [paymentData, setPaymentData] = useState<{
    paymentId: number;
    orderId: number;
    accountId: number;
    status: string | null;

    amount: number;
  } | null>(null);
  const [accountId, setAccountId] = useState<number>(0);
  const [status, setStatus] = useState<string | null>(null);
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const paymentId = parseInt(params.get("paymentId") || "0");
    const orderId = parseInt(params.get("orderId") || "0");
    const accountIdFromParams = parseInt(params.get("accountId") || "0");
    const amount = parseFloat(params.get("amount") || "0");
    const statusFromParams = params.get("status") || null;

    setAccountId(accountIdFromParams);
    setStatus(statusFromParams);

    setPaymentData({
      paymentId,
      orderId,
      accountId: accountIdFromParams,
      amount,
      status: statusFromParams,
    });

    console.log(accountId);
  }, [location.search]);

  // Format số tiền
  const formatCurrency = (amount?: number) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(amount ?? 0);
  };

  const handleLogin = async () => {
    try {
      const payload = {
        accountId: accountId, // 👉 thay bằng accountId thực tế, có thể lấy từ state hoặc props
        status: status, // 👉 hoặc giá trị tương ứng với role/status cần cập nhật
      };

      const response = await api.get("/user/api/updateRole", {
        params: payload,
      });

      if (response.status === 200) {
        console.log("Cập nhật role thành công");
        // Chuyển hướng về trang đăng nhập (tuỳ theo router bạn đang dùng)
        window.location.href = "/login";
      }
    } catch (error) {
      console.error("Lỗi khi cập nhật role:", error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-purple-50 flex items-center justify-center p-4">
      <div className="w-full max-w-2xl space-y-6">
        {/* Header với animation */}
        <div className="text-center space-y-4">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-green-100 rounded-full mb-4">
            <CheckCircle className="w-12 h-12 text-green-600" />
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900">
            Chúc mừng thanh toán thành công! 🎉
          </h1>
          <p className="text-lg text-gray-600">
            Cảm ơn bạn đã tin tưởng và sử dụng dịch vụ của chúng tôi
          </p>
        </div>

        {/* Card thông tin thanh toán */}
        <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
          <CardHeader className="text-center pb-4">
            <CardTitle className="text-2xl text-gray-800 flex items-center justify-center gap-2">
              <CreditCard className="w-6 h-6 text-blue-600" />
              Chi tiết thanh toán
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                <Hash className="w-5 h-5 text-gray-500" />
                <div>
                  <p className="text-sm text-gray-500">Mã thanh toán</p>
                  <p className="font-semibold text-gray-900">
                    #{paymentData?.paymentId}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                <Hash className="w-5 h-5 text-gray-500" />
                <div>
                  <p className="text-sm text-gray-500">Mã đơn hàng</p>
                  <p className="font-semibold text-gray-900">
                    #{paymentData?.orderId}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                <User className="w-5 h-5 text-gray-500" />
                <div>
                  <p className="text-sm text-gray-500">Mã tài khoản</p>
                  <p className="font-semibold text-gray-900">
                    #{paymentData?.accountId}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3 p-3 bg-gradient-to-r from-green-50 to-green-100 rounded-lg border border-green-200">
                <DollarSign className="w-5 h-5 text-green-600" />
                <div>
                  <p className="text-sm text-green-600">
                    Số tiền đã thanh toán
                  </p>
                  <p className="font-bold text-xl text-green-700">
                    {formatCurrency(paymentData?.amount)}
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Card Premium membership */}
        <Card className="shadow-lg border-0 bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 text-white">
          <CardHeader className="text-center pb-4">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-white/20 rounded-full mb-4 mx-auto">
              <Star className="w-8 h-8 text-yellow-300 fill-current" />
            </div>
            <CardTitle className="text-2xl flex items-center justify-center gap-2">
              <Gift className="w-6 h-6" />
              Chúc mừng bạn đã trở thành thành viên Premium!
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="text-center space-y-2">
              <Badge
                variant="secondary"
                className="bg-white/20 text-white border-white/30 px-4 py-2 text-lg"
              >
                ✨ PREMIUM MEMBER ✨
              </Badge>
              <p className="text-white/90 text-lg">
                Bạn đã mở khóa tất cả tính năng cao cấp!
              </p>
            </div>

            <Separator className="bg-white/20" />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-green-300" />
                <span>Truy cập không giới hạn</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-green-300" />
                <span>Hỗ trợ ưu tiên 24/7</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-green-300" />
                <span>Tính năng độc quyền</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-green-300" />
                <span>Không quảng cáo</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Action buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button
            size="lg"
            className="bg-blue-600 hover:bg-blue-700 text-white px-8"
            onClick={handleLogin}
          >
            Quay lại trang đăng nhập
          </Button>
        </div>

        {/* Footer */}
        <div className="text-center text-gray-500 text-sm">
          <p>Nếu bạn có bất kỳ câu hỏi nào, vui lòng liên hệ với chúng tôi</p>
          <p className="mt-1">
            Email: support@example.com | Hotline: 1900-xxxx
          </p>
        </div>
      </div>
    </div>
  );
}
