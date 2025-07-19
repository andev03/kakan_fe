import { Search } from "lucide-react";
import { useState } from "react";
import universitiesData from "../data/all_schools_info.json";

export default function HeroSection() {
  const [__query, setQuery] = useState("");
  const [universities] = useState(universitiesData || []);
  const [results, setResults] = useState<string[]>([]);

  // useEffect(() => {
  //   const fetchSchools = async () => {
  //     try {
  //       const response = await axios.get("/api/schools"); // hoặc URL đầy đủ nếu cần
  //       setSchools(response.data); // Giả sử response.data là mảng tên trường
  //     } catch (error) {
  //       console.error("Lỗi khi lấy danh sách trường:", error);
  //     }
  //   };

  //   fetchSchools();
  // }, []);

  const handleSearch = (e : any) => {
    const value = e.target.value;
    setQuery(value);

    if (value.trim() === "") {
      setResults([]);
      return;
    }

    const filtered = universities.filter((uni) =>
      uni.thong_tin_chung.ten_truong.toLowerCase().includes(value.toLowerCase())
    );
    setResults(filtered.map((school) => school.thong_tin_chung.ten_truong));
  };

  return (
    <section className="bg-gradient-to-r from-sky-500 to-sky-600 rounded-xl p-8 mb-8 shadow-md">
      <h2 className="text-white text-xl md:text-3xl font-medium mb-4 text-center">
        Tìm trường mong muốn của bạn
      </h2>
      <div className="flex max-w-2xl mx-auto relative">
        <input
          type="text"
          // value={query}
          onChange={handleSearch}
          placeholder="Nhập tên trường, mã trường hoặc địa điểm..."
          className="w-full pr-12 h-12 px-4 border-0 rounded-lg shadow-lg focus:outline-none focus:ring-2 focus:ring-sky-300 bg-white"
        />
        <button className="absolute right-0 top-0 h-12 w-12 flex items-center justify-center text-slate-400 hover:text-slate-600 transition-colors">
          <Search className="h-5 w-5" />
        </button>
      </div>
      {results.length > 0 && (
        <div className="mt-4 bg-white rounded-lg shadow-lg p-4 ">
            <ul className="space-y-2">
              {results.length > 0 ? (
                results.map((result, index) => (
                  <li
                    key={index}
                    className="text-sky-600 hover:text-sky-800 cursor-pointer transition-colors"
                  >
                    {result}
                  </li>
                ))
              ) : (
                <li className="text-gray-500">Không tìm thấy kết quả</li>
              )}
            </ul>
          </div>
      )}
    </section>
  );
}
