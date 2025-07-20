import { useEffect, useState } from "react";
import ChatSupport from "../components/chatbox-AI";
import Footer from "../components/footer";
import Header from "../components/header";
import HeroSection from "../components/hero-section";
import TabsSection from "../components/tabs-section";
import { api } from "../hooks/api";
import {
  Dialog,
  DialogContent,
} from "../components/ui/dialog";

export default function HomePage() {
  const user = JSON.parse(localStorage.getItem("user") || "{}");
  const [order, setOrder] = useState<any>(null);
  const [expired, setExpired] = useState<boolean>(false);

  useEffect(() => {
    const fetchOrder = async () => {
      if (!user?.id || user.role !== "PREMIUM") return;
      try {
        const response = await api.get(`/order/api/orders/${user.id}`);
        const orderData = response.data.data;
        console.log(response);
        setOrder(orderData);

        if (orderData.status === "EXPIRED") {
          setExpired(true);
          console.log("Đơn hàng hết hạn!");
        }
      } catch (error) {
        console.error("Error fetching order:", error);
      }
    };

    fetchOrder();
  }, []);

  const handleUpdateRole = async () => {
    if (!user.id || !order) return;

    try {
      const payload = {
        accountId: user.id,
        status: order.status,
      };
      const response = await api.post("/user/api/updateRole/student", payload);
      console.log("Role updated:", response.data);
      window.location.href = "/login";
    } catch (error) {
      alert("Không thể cập nhật vai trò. Vui lòng thử lại.");
    }
  };
  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <Header />
      <HeroSection />
      <TabsSection />
      <ChatSupport />
      <Footer />
      <Dialog open={expired}>
        <DialogContent className="z-[999] max-w-md mx-auto text-center">
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-2xl font-semibold text-red-600 mb-4">
              Phiên đăng nhập đã hết hạn
            </h2>
            <p className="mb-6 text-yellow-500">
              Tài khoản PREMIUM của bạn đã hết hạn. Vui lòng đăng nhập lại để
              tiếp tục sử dụng dịch vụ.
            </p>

            <button
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
              onClick={handleUpdateRole}
            >
              Đăng nhập lại
            </button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
