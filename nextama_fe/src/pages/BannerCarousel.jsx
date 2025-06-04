import React, { useState, useEffect } from 'react';

const BannerCarousel = () => {
  const [loading, setLoading] = useState(true);
  const [imageErrors, setImageErrors] = useState({});

  const banners = [
    {
      id: 1,
      image: "/assets/banner1.jpg",
      alt: "Adobe Creative Cloud",
      price: "570.000đ",
      description: "Sáng tạo không giới hạn với bộ phần mềm Adobe ngày đầu tiên",
    },
    {
      id: 2,
      image: "/assets/banner1.jpg",
      alt: "ChatGPT",
      price: "120.000đ",
      description: "Khám phá sức mạnh AI giúp bạn tối ưu hóa công việc",
    },
    {
      id: 3,
      image: "/assets/banner1.jpg",
      alt: "Netflix",
      price: "12.000đ",
      description: "Truyền hình & Kho phim khổng lồ",
    },
    {
      id: 4,
      image: "/assets/banner1.jpg",
      alt: "Duolingo",
      price: "250.000đ",
      description: "Học tập không giới hạn với các ngôn ngữ",
    },
  ];

  // Kiểm tra khi tất cả hình ảnh đã tải xong
  useEffect(() => {
    const imagePromises = banners.map((banner) => {
      return new Promise((resolve) => {
        const img = new window.Image();
        img.src = banner.image;
        img.onload = () => resolve({ id: banner.id, success: true });
        img.onerror = () => {
          setImageErrors((prev) => ({ ...prev, [banner.id]: true }));
          resolve({ id: banner.id, success: false });
        };
      });
    });

    Promise.all(imagePromises).then(() => {
      setTimeout(() => setLoading(false), 300);
    });
  }, []);

  if (loading) {
    return (
      <div className="w-full h-64 md:h-80 lg:h-96 bg-gray-200 dark:bg-gray-700 animate-pulse flex items-center justify-center overflow-hidden">
        <div className="text-gray-500 dark:text-gray-400 text-lg">Đang tải banner...</div>
      </div>
    );
  }

  return (
    // CONTAINER CỐ ĐỊNH - KHÔNG CHO TRÀN
    <div className="w-full h-64 md:h-80 lg:h-96 bg-gray-100 dark:bg-gray-800 p-2 overflow-hidden">
      {/* Container chia đều màn hình - CỐ ĐỊNH CHIỀU CAO */}
      <div className="w-full h-full flex gap-2 overflow-hidden">
        {/* Banner trái - 50% width */}
        <div className="w-1/2 h-full overflow-hidden">
          <div className="w-full h-full bg-gradient-to-br from-purple-600 to-purple-900 rounded-lg overflow-hidden relative group cursor-pointer">
            <img
              src={banners[0].image}
              alt={banners[0].alt}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-80"
              onError={(e) => {
                e.target.style.display = 'none';
              }}
            />
            {/* Overlay gradient */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent"></div>
            
            {/* Text content - CỐ ĐỊNH VỊ TRÍ */}
            <div className="absolute bottom-4 left-4 right-4 max-h-20 overflow-hidden">
              <h3 className="text-lg md:text-xl font-bold text-white mb-1 truncate">
                {banners[0].alt}
              </h3>
              <p className="text-xs md:text-sm text-white/90 mb-2 line-clamp-1">
                {banners[0].description}
              </p>
              <p className="text-sm md:text-base font-semibold text-yellow-400 truncate">
                Chỉ từ {banners[0].price}
              </p>
            </div>
          </div>
        </div>

        {/* Banner phải - 50% width */}
        <div className="w-1/2 h-full flex flex-col gap-2 overflow-hidden">
          {/* Banner trên - 50% height */}
          <div className="flex-1 overflow-hidden">
            <div className="w-full h-full bg-gradient-to-br from-teal-600 to-teal-900 rounded-lg overflow-hidden relative group cursor-pointer">
              <img
                src={banners[1].image}
                alt={banners[1].alt}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-80"
                onError={(e) => {
                  e.target.style.display = 'none';
                }}
              />
              {/* Overlay gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent"></div>
              
              {/* Text content - CỐ ĐỊNH VỊ TRÍ */}
              <div className="absolute bottom-3 left-3 right-3 max-h-16 overflow-hidden">
                <h3 className="text-sm md:text-base font-bold text-white mb-1 truncate">
                  {banners[1].alt}
                </h3>
                <p className="text-xs text-white/90 mb-1 truncate">
                  {banners[1].description}
                </p>
                <p className="text-xs md:text-sm font-semibold text-yellow-400 truncate">
                  Chỉ từ {banners[1].price}
                </p>
              </div>
            </div>
          </div>

          {/* Banner dưới - 50% height */}
          <div className="flex-1 flex gap-2 overflow-hidden">
            {/* Netflix Banner */}
            <div className="w-1/2 overflow-hidden">
              <div className="w-full h-full bg-gradient-to-br from-red-600 to-red-900 rounded-lg overflow-hidden relative group cursor-pointer">
                <img
                  src={banners[2].image}
                  alt={banners[2].alt}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-80"
                  onError={(e) => {
                    e.target.style.display = 'none';
                  }}
                />
                {/* Overlay gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent"></div>
                
                {/* Text content - CỐ ĐỊNH VỊ TRÍ */}
                <div className="absolute bottom-2 left-2 right-2 max-h-12 overflow-hidden">
                  <h3 className="text-xs md:text-sm font-bold text-white mb-1 truncate">
                    {banners[2].alt}
                  </h3>
                  <p className="text-xs font-semibold text-yellow-400 truncate">
                    {banners[2].price}
                  </p>
                </div>
              </div>
            </div>

            {/* Duolingo Banner */}
            <div className="w-1/2 overflow-hidden">
              <div className="w-full h-full bg-gradient-to-br from-green-600 to-green-900 rounded-lg overflow-hidden relative group cursor-pointer">
                <img
                  src={banners[3].image}
                  alt={banners[3].alt}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-80"
                  onError={(e) => {
                    e.target.style.display = 'none';
                  }}
                />
                {/* Overlay gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent"></div>
                
                {/* Text content - CỐ ĐỊNH VỊ TRÍ */}
                <div className="absolute bottom-2 left-2 right-2 max-h-12 overflow-hidden">
                  <h3 className="text-xs md:text-sm font-bold text-white mb-1 truncate">
                    {banners[3].alt}
                  </h3>
                  <p className="text-xs font-semibold text-yellow-400 truncate">
                    {banners[3].price}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BannerCarousel;
