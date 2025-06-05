import React, { useRef } from "react";
import { Link } from "react-router-dom";
import {
  Package,
  Radio,
  Layers,
  Search,
  Bot,
  Zap,
  Percent,
  Gift,
  Headphones,
  Shirt,
  Clapperboard,
  Music,
  Pipette,
  Briefcase,
  Sparkles as SparklesIcon,
  BookOpen,
  Bike,
  Heart,
  MessageSquare,
  Send,
  GraduationCap,
} from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "@/components/ui/card";
import ProductCard from "@/components/ProductCard.jsx";
import { useToast } from "@/components/ui/use-toast";
import BannerCarousel from "./BannerCarousel";

const HomePage = () => {
  const { toast } = useToast();
  const categoryRef = useRef(null);

  const scroll = (direction) => {
    if (categoryRef.current) {
      const containerWidth = categoryRef.current.offsetWidth;
      const itemsToShow = window.innerWidth >= 768 ? 5 : 4;
      const scrollAmount = (containerWidth / itemsToShow) * 3;

      categoryRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  const categories = [
    { name: "Học Tập", icon: GraduationCap, link: "/category/study" },
    { name: "Xem Phim", icon: Clapperboard, link: "/category/movies" },
    { name: "Nghe Nhạc", icon: Music, link: "/category/music" },
    { name: "Làm Việc", icon: Briefcase, link: "/category/work" },
    { name: "Thiết kế - Đồ họa", icon: Pipette, link: "/category/design" },
    { name: "Sắc đẹp", icon: SparklesIcon, link: "/category/sac-dep" },
    { name: "AI", icon: Bot, link: "/category/AI" },
    { name: "Sách", icon: BookOpen, link: "/category/sach" },
    { name: "Thể thao", icon: Bike, link: "/category/the-thao" },
    { name: "Deal Sốc", icon: Zap, link: "/category/deal-soc", special: true },
    { name: "Voucher", icon: Percent, link: "/vouchers", special: true },
    { name: "Quà tặng", icon: Gift, link: "/gifts", special: true },
    { name: "Ô tô - Xe máy", icon: Bike, link: "/category/oto-xemay" },
    { name: "Đồ gia dụng", icon: Pipette, link: "/category/dogiadung" },
    { name: "Văn phòng phẩm", icon: BookOpen, link: "/category/vanphongpham" },
  ];

  const flashSaleProducts = [
    {
      id: "1",
      name: "Adobe 80GB",
      description: "Adobe 80GB Acc Cổ 1 Năm Ở Thịnh",
      price: "1.100.000 đ",
      image: "https://example.com/adobe.png",
      discountPercentage: 88,
      tags: ["KHÔNG"],
      sold: 5,
      total: 5,
      alt: "Adobe 80GB",
    },
    {
      id: "2",
      name: "CURSOR AI",
      description: "Cursor Chính Số 1 Năm (BH 1 Tháng)",
      price: "500.000 đ",
      image: "https://example.com/cursor.png",
      discountPercentage: 93,
      tags: ["KHÔNG"],
      sold: 0,
      total: 10,
      alt: "Cursor AI",
    },
    {
      id: "3",
      name: "CURSOR AI",
      description: "Cursor Chính Số 1 Năm (KHÔNG)",
      price: "500.000 đ",
      image: "https://example.com/cursor.png",
      discountPercentage: 93,
      tags: ["KHÔNG"],
      sold: 0,
      total: 10,
      alt: "Cursor AI",
    },
    {
      id: "4",
      name: "Key Windows 10/11",
      description: "Gói 1 Key Windows 10/11 Pro Key",
      price: "130.000 đ",
      image: "https://example.com/windows.png",
      discountPercentage: 25,
      tags: ["NEW", "KHÔNG"],
      sold: 6,
      total: 11,
      alt: "Key Windows 10/11",
    },
  ];

  const products = [
    {
      id: "1",
      name: "Áo Thun Nam Cotton In Hình",
      price: "189.000₫",
      originalPrice: "250.000₫",
      rating: 4.8,
      soldCount: 1200,
      image_description: "Áo thun nam màu đen in hình cá tính",
      alt: "Áo thun nam đen",
      location: "TP.HCM",
    },
    {
      id: "2",
      name: "Tai Nghe Bluetooth Không Dây XYZ",
      price: "450.000₫",
      rating: 4.9,
      soldCount: 3500,
      image_description: "Tai nghe không dây màu trắng hiện đại",
      alt: "Tai nghe Bluetooth trắng",
      location: "Hà Nội",
    },
    {
      id: "3",
      name: "Đèn Bàn LED Chống Cận Thị",
      price: "220.000₫",
      originalPrice: "300.000₫",
      rating: 4.7,
      soldCount: 850,
      image_description: "Đèn bàn LED màu trắng gấp gọn",
      alt: "Đèn bàn LED trắng",
      location: "Đà Nẵng",
    },
    {
      id: "4",
      name: "Bình Giữ Nhiệt Inox 500ml",
      price: "150.000₫",
      rating: 4.9,
      soldCount: 2100,
      image_description: "Bình giữ nhiệt màu bạc sang trọng",
      alt: "Bình giữ nhiệt inox bạc",
      location: "TP.HCM",
    },
    {
      id: "5",
      name: "Giày Sneaker Nam Năng Động",
      price: "550.000₫",
      originalPrice: "700.000₫",
      rating: 4.6,
      soldCount: 980,
      image_description: "Giày sneaker nam màu xám phối cam",
      alt: "Giày sneaker nam xám cam",
      location: "Hà Nội",
    },
    {
      id: "6",
      name: "Son Kem Lì Hàn Quốc Chính Hãng",
      price: "199.000₫",
      rating: 4.8,
      soldCount: 5000,
      image_description: "Thỏi son kem lì màu đỏ cam quyến rũ",
      alt: "Son kem lì đỏ cam",
      location: "Toàn quốc",
    },
    {
      id: "7",
      name: "Nồi Chiên Không Dầu Đa Năng 5L",
      price: "1.290.000₫",
      originalPrice: "1.800.000₫",
      rating: 4.9,
      soldCount: 750,
      image_description: "Nồi chiên không dầu màu đen hiện đại",
      alt: "Nồi chiên không dầu đen",
      location: "TP.HCM",
    },
    {
      id: "8",
      name: "Chuột Máy Tính Không Dây Ergonomic",
      price: "280.000₫",
      rating: 4.7,
      soldCount: 1500,
      image_description: "Chuột máy tính không dây màu đen thiết kế công thái học",
      alt: "Chuột không dây ergonomic đen",
      location: "Hà Nội",
    },
  ];

  return (
    <div className="space-y-8 md:space-y-10">
      <BannerCarousel />
      <div className="relative px-2 md:px-4">
        <Button
          variant="outline"
          size="icon"
          className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white shadow-lg rounded-full p-2 hover:bg-gray-50 transition-colors"
          onClick={() => scroll("left")}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            className="h-4 w-4"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 19l-7-7 7-7"
            />
          </svg>
        </Button>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="overflow-x-hidden select-none touch-none mx-8"
          ref={categoryRef}
        >
          <div className="flex space-x-4 md:space-x-6 pb-4 w-max">
            {categories.map((category) => (
              <Link
                key={category.name}
                to={category.link}
                className={`flex-shrink-0 flex flex-col items-center justify-center text-center p-4 md:p-5 rounded-xl hover:shadow-lg transition-all duration-300
                  ${
                    category.special
                      ? "bg-gradient-to-br from-primary/10 to-primary/20 hover:from-primary/20 hover:to-primary/30 dark:from-primary/20 dark:to-primary/30 dark:hover:from-primary/30 dark:hover:to-primary/40"
                      : "bg-card hover:bg-accent dark:bg-slate-800 dark:hover:bg-slate-700"
                  } 
                  w-[140px] md:w-[160px] min-h-[140px] md:min-h-[160px]`}
              >
                <div
                  className={`p-3 md:p-4 rounded-full mb-3 md:mb-4 ${
                    category.special ? "bg-primary/20" : "bg-primary/10"
                  }`}
                >
                  <category.icon
                    className={`h-8 w-8 md:h-10 md:w-10 ${
                      category.special ? "text-primary" : "text-primary"
                    }`}
                  />
                </div>
                <span
                  className={`text-sm md:text-base font-medium ${
                    category.special ? "text-primary" : "text-foreground"
                  } text-center leading-tight`}
                >
                  {category.name}
                </span>
              </Link>
            ))}
          </div>
        </motion.div>

        <Button
          variant="outline"
          size="icon"
          className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white shadow-lg rounded-full p-2 hover:bg-gray-50 transition-colors"
          onClick={() => scroll("right")}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            className="h-4 w-4"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 5l7 7-7 7"
            />
          </svg>
        </Button>
      </div>

<Card className="shadow-lg border-primary/30 dark:border-primary/50">
  <CardHeader className="bg-gradient-to-r from-orange-500 to-red-600 text-whit p-4 md:p-5 rounded-t-lg">
    <CardTitle
      className="text-xl md:text-2xl flex items-center w-full p-2 rounded-xl"
      style={{
        background:
          'linear-gradient(to right, #fcd34d 40%, #fde68a 60%)', // từ vàng đậm sang vàng nhạt mềm mại
      }}
    >
      <div className="relative flex items-center">
        <div className="mr-2 scale-[2.5] transform origin-center">
          <img
            src="/assets/fire-2.gif"
            alt="fire"
            className="h-16 w-16 object-contain -mt-12"
          />
        </div>
        <span className="font-semibold">Flash sale dele deal sốc!</span>
      </div>
    </CardTitle>
  </CardHeader>

  <CardContent className="p-3 md:p-4 grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 bg-gradient-to-r from-orange-500 to-red-600 text-white p-4 md:p-5 rounded-b-lg">
    {flashSaleProducts.map((product) => (
      <ProductCard key={product.id} product={product} />
    ))}
  </CardContent>
</Card>



      <section>
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl md:text-2xl font-semibold">Gợi Ý Hôm Nay</h2>
          <Link to="/category" className="text-sm text-primary hover:underline">
            Xem tất cả
          </Link>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 md:gap-4">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>
    </div>
  );
};

export default HomePage;