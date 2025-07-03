import { MessageCircle } from "lucide-react";
import LogoName from "./logoName";
import { useState, useEffect } from "react";
import { api } from "../hooks/api";

export default function ChatSupport() {
  const storedUser = localStorage.getItem("user");
  const user = storedUser ? JSON.parse(storedUser) : null;
  const isPremium = user?.role === "PREMIUM";

  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<
    { sender: string; content: string }[]
  >([]);

  useEffect(() => {
    if (isPremium) {
      setMessages([
        {
          sender: "ai",
          content:
            "Xin chào! Tôi là KAKAN AI, có thể hỗ trợ bạn về tuyển sinh, điểm chuẩn và ngành học. Bạn muốn hỏi gì?",
        },
      ]);
    }
  }, [isPremium]);

  const handleSend = async () => {
    if (!input.trim()) return;

    setMessages((prev) => [...prev, { sender: "user", content: input }]);

    try {
      setInput("");
      const res = await api.post("/admission/api/chat-messages", {
        senderId: user?.id,
        message: input,
      });

      const contentRaw = res.data?.data?.chatAI?.content;

      let replyText = "Phản hồi không hợp lệ từ hệ thống.";
      try {
        const parsed = JSON.parse(contentRaw);
        replyText =
          parsed?.candidates?.[0]?.content?.parts?.[0]?.text || replyText;
      } catch (jsonErr) {
        console.error("Lỗi parse JSON từ AI:", jsonErr);
      }

      setMessages((prev) => [...prev, { sender: "ai", content: replyText }]);
    } catch (error) {
      console.error("Lỗi gửi tin nhắn:", error);
      setMessages((prev) => [
        ...prev,
        { sender: "ai", content: "Đã có lỗi xảy ra khi gửi tin nhắn." },
      ]);
    }

    setInput("");
  };
  return (
    <section className="bg-white rounded-lg shadow-sm border p-3 mb-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <h2 className="font-medium text-lg flex items-center">
          <MessageCircle className="h-5 w-5 mr-2 text-sky-500" />
          Chat hỏi với AI
        </h2>
        <span className="px-2 py-1 text-xs text-green-500 border border-green-200 bg-green-50 rounded-full">
          Online
        </span>
      </div>

      {/* Intro */}
      <div className="bg-slate-50 rounded-lg p-4 mb-4">
        <p className="text-center text-slate-600">
          Bạn cần tư vấn về tuyển sinh? AI tư vấn của KAKAN sẽ giúp bạn trả lời
          các câu hỏi về điểm chuẩn, ngành học và thông tin tuyển sinh.
        </p>
      </div>

      {/* Chat Box nếu là PREMIUM */}
      {isPremium && (
        <div className="flex flex-col max-h-64 overflow-y-auto bg-slate-100 rounded-lg p-3 space-y-2 mb-4">
          {messages.map((msg, idx) => (
            <div
              key={idx}
              className={`inline-block px-4 py-2 rounded-lg text-sm break-words
        ${
          msg.sender === "user"
            ? "bg-sky-500 text-white self-end ml-auto max-w-[70%] text-right"
            : "bg-white text-slate-700 self-start max-w-[70%]"
        }
      `}
            >
              {msg.content.split("*").map((line, i) => (
                <p key={i} className="whitespace-pre-line">
                  {line.trim()}
                </p>
              ))}
            </div>
          ))}
        </div>
      )}

      {/* Input */}
      <div className="flex gap-2">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter" && isPremium && input.trim()) {
              handleSend();
            }
          }}
          placeholder="Nhập câu hỏi của bạn..."
          disabled={!isPremium}
          className={`flex-1 h-12 px-4 border rounded-lg focus:outline-none transition-all
          ${
            isPremium
              ? "border-slate-200 focus:ring-2 focus:ring-sky-500 focus:border-transparent"
              : "bg-slate-100 border-slate-200 cursor-not-allowed text-slate-400"
          }`}
        />
        <button
          onClick={handleSend}
          disabled={!isPremium || !input.trim()}
          className={`h-12 px-6 rounded-lg transition-colors 
          ${
            isPremium
              ? "bg-sky-500 hover:bg-sky-600 text-white"
              : "bg-slate-300 text-white cursor-not-allowed"
          }`}
        >
          Gửi
        </button>
      </div>

      {/* Cảnh báo nếu không phải Premium */}
      {!isPremium && (
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
      )}
    </section>
  );
}
