// src/components/MainMenuTabs.jsx

import React from 'react';
import { NavLink } from 'react-router-dom';

const categories = [
  'Xem Phim',
  'Nghe Nhạc',
  'Thời trang nam',
  'Thời trang nữ',
  'Đồ gia dụng',
  'Sức khỏe & Sắc đẹp',
];

const MainMenuTabs = () => {
  return (
    <nav className="flex space-x-6 py-2 border-t border-border/50 text-sm">
      {categories.map((item) => (
        <NavLink
          key={item}
          to={`/category/${item.toLowerCase().replace(/ & /g, '-').replace(/ /g, '-')}`}
          className={({ isActive }) =>
            `hover:text-primary transition-colors pb-1 ${
              isActive ? 'text-primary border-b-2 border-primary font-semibold' : 'text-muted-foreground'
            }`
          }
        >
          {item}
        </NavLink>
      ))}
      <NavLink
        to="/flash-sale"
        className={({ isActive }) =>
          `hover:text-primary transition-colors pb-1 text-red-500 font-semibold ${
            isActive ? 'border-b-2 border-red-500' : ''
          }`
        }
      >
        Flash Sale
      </NavLink>
    </nav>
  );
};

export default MainMenuTabs;
