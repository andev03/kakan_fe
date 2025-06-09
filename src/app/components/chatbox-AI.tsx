import { MessageCircle } from "lucide-react";
import LogoName from "./logoName";

export default function ChatSupport() {
  return (
    <section className="bg-white rounded-lg shadow-sm border p-3 mb-8">
      <div className="flex items-center justify-between mb-4">
        <h2 className="font-medium text-lg flex items-center">
          <MessageCircle className="h-5 w-5 mr-2 text-sky-500" />
          Chat hỏi với AI
        </h2>
        <span className="px-2 py-1 text-xs text-green-500 border border-green-200 bg-green-50 rounded-full">
          Online
        </span>
      </div>

      <div className="bg-slate-50 rounded-lg p-4 mb-4">
        <p className="text-center text-slate-600">
          Bạn cần tư vấn về tuyển sinh? AI tư vấn của KAKAN sẽ giúp bạn trả lời
          các câu hỏi về điểm chuẩn, ngành học và thông tin tuyển sinh.
        </p>
      </div>

      <div className="flex gap-2">
        <input
          type="text"
          placeholder="Nhập câu hỏi của bạn..."
          className="flex-1 h-12 px-4 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent"
        />
        <button className="h-12 px-6 bg-sky-500 hover:bg-sky-600 text-white rounded-lg transition-colors">
          Gửi
        </button>
      </div>

      <div className="mt-4 text-center">
        <p className="text-sm text-slate-500">
          Bạn cần phải có <span>{LogoName()}</span> Premium để có thể sử dụng
          dịch vụ này
        </p>
        <div className="mt-2 space-x-2">
          <a
            href="/register-premium"
            className="px-4 py-2 border border-sky-200 text-sky-500 rounded-lg hover:bg-sky-50 transition-colors"
          >
            Đăng ký {LogoName()} Premium
          </a>
        </div>
      </div>
    </section>
  );
}
