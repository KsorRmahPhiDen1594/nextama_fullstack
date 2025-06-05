import React from 'react';
import { Link } from 'react-router-dom';
import ProductCard from '@/components/ProductCard.jsx';

const OverviewCards = ({ products }) => {
  return (
    <section>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl md:text-2xl font-semibold">Sản phẩm bán chạy</h2>
        <Link to="/category" className="text-sm text-primary hover:underline">
          Xem tất cả
        </Link>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 md:gap-4">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

      {/* Tiếp tục với các phần tử khác */}
      <div className="flex justify-between items-center mb-4 mt-4">
        <h2 className="text-xl md:text-2xl font-semibold">Thiết kế – Đồ hoạ</h2>
        <Link to="/category" className="text-sm text-primary hover:underline">
          Xem tất cả
        </Link>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 md:gap-4">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
      
      {/* Tiếp tục với các phần tử khác */}
      <div className="flex justify-between items-center mb-4 mt-4">
        <h2 className="text-xl md:text-2xl font-semibold">AI</h2>
        <Link to="/category" className="text-sm text-primary hover:underline">
          Xem tất cả
        </Link>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 md:gap-4">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

      {/* Tiếp tục với các phần tử khác */}
      <div className="flex justify-between items-center mb-4 mt-4">
        <h2 className="text-xl md:text-2xl font-semibold">Làm việc</h2>
        <Link to="/category" className="text-sm text-primary hover:underline">
          Xem tất cả
        </Link>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 md:gap-4">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

      {/* Tiếp tục với các phần tử khác */}
      <div className="flex justify-between items-center mb-4 mt-4">
        <h2 className="text-xl md:text-2xl font-semibold">Học tập</h2>
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
  );
};

export default OverviewCards;