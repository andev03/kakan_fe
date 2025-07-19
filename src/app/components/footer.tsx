import { MapPin } from "lucide-react";
import LogoName from "./logoName";

export default function Footer() {
  return (
    <footer className="bg-white border-t py-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <div className="text-4xl font-bold mb-4">
           <LogoName/>
            </div>
            <p className="text-sm text-slate-500 mb-4">
              Hệ thống tra cứu thông tin tuyển sinh hàng đầu tại Việt Nam, cung
              cấp thông tin chính xác và đầy đủ về các trường đại học, cao đẳng.
            </p>
            <div className="flex space-x-4">
              <a
                href="#"
                className="text-slate-400 hover:text-sky-500 transition-colors"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
                </svg>
              </a>
              <a
                href="#"
                className="text-slate-400 hover:text-sky-500 transition-colors"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                  <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
                </svg>
              </a>
              <a
                href="#"
                className="text-slate-400 hover:text-sky-500 transition-colors"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
                </svg>
              </a>
            </div>
          </div>

          <div>
            <h3 className="font-medium mb-4">Liên kết nhanh</h3>
            <ul className="space-y-2 text-sm">
              {[
                "Trang chủ",
                "Tìm kiếm trường",
                "Điểm chuẩn",
                "Tin tức tuyển sinh",
                "Ngành học",
                "Học bổng",
              ].map((item) => (
                <li key={item}>
                  <a
                    href="#"
                    className="text-slate-500 hover:text-sky-500 transition-colors"
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-medium mb-4">Hỗ trợ</h3>
            <ul className="space-y-2 text-sm">
              {[
                "Hướng dẫn sử dụng",
                "Câu hỏi thường gặp",
                "Điều khoản sử dụng",
                "Chính sách bảo mật",
                "Liên hệ",
              ].map((item) => (
                <li key={item}>
                  <a
                    href="#"
                    className="text-slate-500 hover:text-sky-500 transition-colors"
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-medium mb-4">Liên hệ</h3>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start">
                <MapPin className="h-5 w-5 mr-2 text-slate-400" />
                <span className="text-slate-500">
                  123 Nguyễn Văn Linh, Quận 7, TP. Hồ Chí Minh
                </span>
              </li>
              <li className="flex items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="mr-2 text-slate-400"
                >
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                </svg>
                <span className="text-slate-500">0123 456 789</span>
              </li>
              <li className="flex items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="mr-2 text-slate-400"
                >
                  <rect width="20" height="16" x="2" y="4" rx="2" />
                  <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                </svg>
                <span className="text-slate-500">support@kakan.edu.vn</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-8 pt-6 border-t text-center text-sm text-slate-500">
          <p>
            © 2025 KAKAN - Hệ thống tra cứu tuyển sinh SaiGon. Tất cả quyền được
            bảo lưu.
          </p>
        </div>
      </div>
    </footer>
  );
}
