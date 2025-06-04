import React, { useRef } from "react"; // Thêm useRef để tham chiếu đến DOM
import { Link } from "react-router-dom";
import {
  Package,
  Radio,
  Layers,
  Search,
  ShoppingBag,
  Zap,
  Percent,
  Gift,
  Headphones,
  Shirt,
  Smartphone,
  Laptop,
  Home as HomeIconLucide,
  Baby,
  Sparkles as SparklesIcon,
  BookOpen,
  Bike,
  Heart,
  MessageSquare,
  Send,
} from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import ProductCard from "@/components/ProductCard.jsx";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import BannerCarousel from "./BannerCarousel";

const CountdownTimer = ({ targetDate }) => {
  const calculateTimeLeft = () => {
    const difference = +new Date(targetDate) - +new Date();
    let timeLeft = {};

    if (difference > 0) {
      timeLeft = {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      };
    }
    return timeLeft;
  };

  const [timeLeft, setTimeLeft] = React.useState(calculateTimeLeft());

  React.useEffect(() => {
    const timer = setTimeout(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);
    return () => clearTimeout(timer);
  });

  const timerComponents = [];
  Object.keys(timeLeft).forEach((interval) => {
    if (
      !timeLeft[interval] &&
      interval !== "seconds" &&
      interval !== "minutes" &&
      interval !== "hours"
    ) {
      return;
    }
    timerComponents.push(
      <span
        key={interval}
        className="font-mono bg-white/20 text-white px-2 py-1 rounded text-sm md:text-md"
      >
        {String(timeLeft[interval] || 0).padStart(2, "0")}
      </span>
    );
  });

  return timerComponents.length ? (
    <div className="flex items-center space-x-1 md:space-x-2">
      {timerComponents.reduce(
        (acc, curr, idx) =>
          idx === 0
            ? [curr]
            : [
                ...acc,
                <span
                  key={`sep-${idx}`}
                  className="text-white text-sm md:text-md"
                >
                  :
                </span>,
                curr,
              ],
        []
      )}
    </div>
  ) : (
    <span className="font-mono bg-white/20 text-white px-2 py-1 rounded text-sm md:text-md">
      Hết giờ!
    </span>
  );
};

const HomePage = () => {
  const { toast } = useToast();
  const flashSaleEndDate = new Date(
    Date.now() + 2 * 60 * 60 * 1000 + 30 * 60 * 1000
  ); // 2 hours 30 minutes from now
  const categoryRef = useRef(null); // Tham chiếu đến container danh mục

  const scroll = (direction) => {
    if (categoryRef.current) {
      // Tính toán scroll amount dựa trên viewport width và số items muốn hiển thị
      const containerWidth = categoryRef.current.offsetWidth;
      const itemsToShow = window.innerWidth >= 768 ? 5 : 4; // Desktop: 5 items, Mobile: 4 items
      const scrollAmount = (containerWidth / itemsToShow) * 3; // Cuộn 3 items mỗi lần

      categoryRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  const categories = [
    { name: "Thời trang Nam", icon: Shirt, link: "/category/thoi-trang-nam" },
    { name: "Điện thoại", icon: Smartphone, link: "/category/dien-thoai" },
    { name: "Laptop", icon: Laptop, link: "/category/laptop" },
    { name: "Mẹ & Bé", icon: Baby, link: "/category/me-be" },
    { name: "Nhà cửa", icon: HomeIconLucide, link: "/category/nha-cua" },
    { name: "Sắc đẹp", icon: SparklesIcon, link: "/category/sac-dep" },
    { name: "Bách hóa", icon: ShoppingBag, link: "/category/bach-hoa" },
    { name: "Sách", icon: BookOpen, link: "/category/sach" },
    { name: "Thể thao", icon: Bike, link: "/category/the-thao" },
    { name: "Deal Sốc", icon: Zap, link: "/category/deal-soc", special: true },
    { name: "Voucher", icon: Percent, link: "/vouchers", special: true },
    { name: "Quà tặng", icon: Gift, link: "/gifts", special: true },
    { name: "Ô tô - Xe máy", icon: Bike, link: "/category/oto-xemay" },
    { name: "Đồ gia dụng", icon: HomeIconLucide, link: "/category/dogiadung" },
    { name: "Văn phòng phẩm", icon: BookOpen, link: "/category/vanphongpham" },
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
      image_description:
        "Chuột máy tính không dây màu đen thiết kế công thái học",
      alt: "Chuột không dây ergonomic đen",
      location: "Hà Nội",
    },
  ];

  const feedItems = [
    {
      id: 1,
      user: "Fashionista Boutique",
      content:
        "✨ BST Thu/Đông 2025 đã cập bến! Khám phá ngay những item trendy nhất mùa này. #NewCollection #AutumnWinter",
      image_description: "Người mẫu trình diễn bộ sưu tập thu đông",
      alt: "Bộ sưu tập thu đông 2025",
      avatar:
        "https://api.dicebear.com/7.x/personas/svg?seed=FashionistaBoutique",
    },
    {
      id: 2,
      user: "TechHub Store",
      content:
        "🔥 Deal sốc cuối tuần! Giảm giá đến 50% cho các dòng điện thoại và phụ kiện. Số lượng có hạn! #TechSale #WeekendDeals",
      image_description: "Các sản phẩm công nghệ đang giảm giá",
      alt: "Sản phẩm công nghệ sale",
      avatar: "https://api.dicebear.com/7.x/bottts/svg?seed=TechHubStore",
    },
    {
      id: 3,
      user: "HomeDecor Ideas",
      content:
        "🌿 Mang không gian xanh vào nhà với những mẫu chậu cây mini siêu xinh. Trang trí nhà cửa chưa bao giờ dễ dàng đến thế! #HomeDecor #MiniPlants",
      image_description: "Chậu cây mini trang trí nhà cửa",
      alt: "Chậu cây mini",
      avatar: "https://api.dicebear.com/7.x/micah/svg?seed=HomeDecorIdeas",
    },
  ];

  return (
    <div className="space-y-8 md:space-y-10">
      <BannerCarousel /> {/* Gọi component BannerCarousel tại đây */}
      {/* Carousel ngang cho danh mục với nút bấm */}
      <div className="relative px-2 md:px-4">
        {/* Nút cuộn trái */}
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

        {/* Container chứa các danh mục */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="overflow-x-hidden select-none touch-none mx-8"
          ref={categoryRef}
        >
          {/* Inner container với grid layout để hiển thị đúng số lượng items */}
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

        {/* Nút cuộn phải */}
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
      {/* Phần còn lại của trang giữ nguyên */}
      <Card className="shadow-lg border-primary/30 dark:border-primary/50">
        <CardHeader className="bg-gradient-to-r from-orange-500 to-red-600 text-white rounded-t-lg p-4 md:p-5">
          <CardTitle className="text-xl md:text-2xl flex items-center justify-between">
            <div className="relative flex items-center">
              {/* Icon sấm sét */}
              <Zap className="h-6 w-6 md:h-7 md:w-7 animate-pulse z-10" />

              {/* Lửa lớn hơn, nằm trên đầu sấm sét */}
              <img
                src="/assets/fire-2.gif"
                alt="fire"
                className="absolute -top-20 -left-5 mt-2 h-20 w-20 object-contain z-20 pointer-events-none"
              />

              {/* Text Flash Sale */}
              <span className="ml-2 font-semibold">Flash Sale</span>
            </div>

            <CountdownTimer targetDate={flashSaleEndDate} />
          </CardTitle>
        </CardHeader>

        <CardContent className="p-3 md:p-4 grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
          {products.slice(0, 4).map((product) => (
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
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.6 }}
        className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6"
      >
        <Link
          to="/category/uu-dai-dac-biet"
          className="block rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow"
        >
          <img
            className="w-full h-40 md:h-56 object-cover"
            alt="Special offers banner"
            src="https://images.unsplash.com/photo-1560884124-6ad1e0cdf737"
          />
        </Link>
        <Link
          to="/category/hang-moi-ve"
          className="block rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow"
        >
          <img
            className="w-full h-40 md:h-56 object-cover"
            alt="New arrivals banner"
            src="https://images.unsplash.com/photo-1615978552266-a69811218caf"
          />
        </Link>
      </motion.div>
      <section>
        <h2 className="text-xl md:text-2xl font-semibold mb-4 flex items-center">
          <Radio className="mr-2 h-6 w-6 text-primary" /> ShopeeCharm Live
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {[
            {
              title: "Livestream Thời Trang Hot Trend",
              shop: "Trendy Style",
              image_description: "Người mẫu trình diễn thời trang live",
              alt: "Livestream thời trang",
            },
            {
              title: "Unbox Đồ Công Nghệ Mới Nhất",
              shop: "Gadget World",
              image_description: "Người unbox đồ công nghệ",
              alt: "Livestream công nghệ",
            },
            {
              title: "Mẹo Vặt Nhà Bếp Hay Ho",
              shop: "Kitchen Helper",
              image_description: "Đầu bếp đang nấu ăn live",
              alt: "Livestream nấu ăn",
            },
          ].map((live, i) => (
            <Card
              key={i}
              className="overflow-hidden glassmorphism hover:shadow-lg transition-shadow"
            >
              <Link to={`/live/${i + 1}`} className="block">
                <div className="relative">
                  <img
                    className="w-full h-48 object-cover"
                    alt={live.alt}
                    src="https://images.unsplash.com/photo-1690721606848-ac5bdcde45ea"
                  />
                  <Badge
                    variant="destructive"
                    className="absolute top-2 left-2 text-xs"
                  >
                    LIVE
                  </Badge>
                  <div className="absolute bottom-2 left-2 bg-black/50 text-white px-2 py-1 rounded text-xs flex items-center">
                    <Headphones className="h-3 w-3 mr-1" /> 1.2k đang xem
                  </div>
                </div>
                <CardContent className="p-3">
                  <p className="font-semibold truncate group-hover:text-primary">
                    {live.title}
                  </p>
                  <p className="text-sm text-muted-foreground">{live.shop}</p>
                </CardContent>
              </Link>
            </Card>
          ))}
        </div>
      </section>
      <section>
        <h2 className="text-xl md:text-2xl font-semibold mb-4 flex items-center">
          <Layers className="mr-2 h-6 w-6 text-primary" /> ShopeeCharm Feed
        </h2>
        <div className="space-y-4 md:space-y-6">
          {feedItems.map((item) => (
            <Card
              key={item.id}
              className="shadow-sm hover:shadow-md transition-shadow"
            >
              <CardHeader className="p-3 md:p-4">
                <div className="flex items-center space-x-3">
                  <img
                    className="h-10 w-10 md:h-11 md:w-11 rounded-full border"
                    alt={`${item.user} avatar`}
                    src={item.avatar}
                  />
                  <div>
                    <span className="font-semibold text-sm md:text-md">
                      {item.user}
                    </span>
                    <p className="text-xs text-muted-foreground">2 giờ trước</p>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="px-3 pb-1 md:px-4 md:pb-2">
                <p className="mb-2 text-sm md:text-md whitespace-pre-line">
                  {item.content}
                </p>
                <img
                  className="w-full h-auto rounded-md object-cover max-h-96 border"
                  alt={item.alt}
                  src="https://images.unsplash.com/photo-1675023112817-52b789fd2ef0"
                />
              </CardContent>
              <CardFooter className="flex justify-around p-1 md:p-2 border-t">
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-muted-foreground hover:text-primary w-full"
                >
                  <Heart className="mr-1.5 h-4 w-4" /> Thích
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-muted-foreground hover:text-primary w-full"
                >
                  <MessageSquare className="mr-1.5 h-4 w-4" /> Bình luận
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-muted-foreground hover:text-primary w-full"
                >
                  <Send className="mr-1.5 h-4 w-4" /> Chia sẻ
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </section>
    </div>
  );
};

export default HomePage;
