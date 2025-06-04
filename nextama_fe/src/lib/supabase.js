import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://qazdscwsithsjwfeqarg.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFhemRzY3dzaXRoc2p3ZmVxYXJnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDc0ODQ3MzEsImV4cCI6MjA2MzA2MDczMX0.MNgV1W5Rebqlnd9yJY8WylmFriU3Zrn08JM34B7aXXE';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Giả lập hàm làm mới token (cần điều chỉnh theo backend thực tế)
async function refreshToken() {
  try {
    const response = await fetch('https://app.toolsngon.com/api/token/refresh/', {
      method: 'POST',
      body: JSON.stringify({ refresh: localStorage.getItem('refreshToken') }),
      headers: { 'Content-Type': 'application/json' }
    });
    if (!response.ok) throw new Error('Làm mới token thất bại');
    const data = await response.json();
    localStorage.setItem('token', data.access);
    return data.access;
  } catch (error) {
    console.error('Error refreshing token:', error);
    throw error;
  }
}

// Hàm gọi API với Supabase và xử lý token
export const fetchWithAuth = async (endpoint, options = {}) => {
  try {
    let token = localStorage.getItem('token');
    if (!token) {
      token = await refreshToken();
    }
    const response = await fetch(`https://app.toolsngon.com/api/${endpoint}`, {
      ...options,
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
        ...options.headers
      }
    });
    if (!response.ok) {
      if (response.status === 401) {
        token = await refreshToken();
        const retry = await fetch(`https://app.toolsngon.com/api/${endpoint}`, {
          ...options,
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
            ...options.headers
          }
        });
        if (!retry.ok) throw new Error(`Lỗi: ${retry.status}`);
        return await retry.json();
      }
      throw new Error(`Lỗi: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error('Lỗi khi gọi API:', error.message);
    throw error;
  }
};

// Ví dụ hàm lấy dữ liệu sản phẩm
export const fetchProducts = async () => {
  try {
    const data = await fetchWithAuth('products');
    return data;
  } catch (error) {
    console.error('Lỗi khi lấy sản phẩm:', error);
    return null;
  }
};