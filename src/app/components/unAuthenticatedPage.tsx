import { useNavigate } from "react-router-dom";
import { Card, CardContent } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Lock } from "lucide-react";

const UnAuthenticatedPage = () => {
  const navigate = useNavigate();

  return (
    <div
      className="absolute top-[300px] left-1/2 z-10 transform -translate-x-1/2 w-full max-w-sm  bg-white"
      style={{ pointerEvents: "auto" }}
    >
      <Card className="w-full shadow-lg">
        <CardContent className="p-6">
          <div className="text-center">
            <div className="mx-auto w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-4">
              <Lock className="w-6 h-6 text-blue-600" />
            </div>
            <h3 className="text-lg font-semibold mb-2">Bạn chưa đăng nhập</h3>
            <p className="text-gray-600 mb-4">
              Vui lòng đăng nhập để xem nội dung chi tiết
            </p>
            <Button
              className="w-full bg-gradient-to-r from-blue-300 to-blue-400 hover:from-blue-500 hover:to-blue-600  cursor-pointer"
              onClick={() => navigate("/login")}
            >
              Quay lại trang đăng nhập
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default UnAuthenticatedPage;
