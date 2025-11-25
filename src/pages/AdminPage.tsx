'use client';
import React, { useState, useEffect } from 'react';

export default function AdminPage() {
  const [adminKey, setAdminKey] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [users, setUsers] = useState<any[]>([]);
  const [isInitializing, setIsInitializing] = useState(false);
  
  // Form thêm mới
  const [newUser, setNewUser] = useState({ key: '', tier: 'basic', limit: 100 });

  // 1. Hàm đăng nhập
  const handleLogin = () => {
    if (adminKey) {
      setIsAuthenticated(true);
      fetchUsers();
    }
  };

  // 2. Lấy danh sách User
  const fetchUsers = async () => {
    // Corrected URL: /api/admin/user
    const res = await fetch('/api/admin/user', {
      headers: { 'x-admin-secret': adminKey }
    });
    if (res.ok) {
      const data = await res.json();
      setUsers(data.users);
    } else {
      if (res.status === 500) {
        console.error("Database might not be initialized");
      } else {
        alert('Sai mật khẩu Admin hoặc lỗi Server');
        setIsAuthenticated(false);
      }
    }
  };

  // 3. Thêm User
  const handleAddUser = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await fetch('/api/admin/user', {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json',
        'x-admin-secret': adminKey 
      },
      body: JSON.stringify(newUser)
    });

    if (res.ok) {
      alert('Đã thêm thành công!');
      setNewUser({ key: '', tier: 'basic', limit: 100 }); 
      fetchUsers(); 
    } else {
      alert('Lỗi: Có thể Key đã tồn tại.');
    }
  };

  // 4. Xóa User
  const handleDelete = async (id: number) => {
    if (!confirm('Bạn chắc chắn muốn xóa khách này?')) return;
    
    const res = await fetch(`/api/admin/user?id=${id}`, {
      method: 'DELETE',
      headers: { 'x-admin-secret': adminKey }
    });

    if (res.ok) fetchUsers();
  };
  
  // 5. Khởi tạo Database
  const handleInitDB = async () => {
      setIsInitializing(true);
      try {
        // Corrected URL: /api/setup
        const res = await fetch('/api/setup', {
            headers: { 'x-admin-secret': adminKey }
        });
        const data = await res.json();
        if (res.ok) {
            alert('Khởi tạo Database thành công! Bạn có thể bắt đầu thêm user.');
            fetchUsers();
        } else {
            alert('Lỗi: ' + (data.error || 'Không thể khởi tạo'));
        }
      } catch (e) {
          alert('Lỗi kết nối');
      } finally {
          setIsInitializing(false);
      }
  };

  // --- GIAO DIỆN ---
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="bg-white p-8 rounded shadow-md w-96">
          <h1 className="text-xl font-bold mb-4 text-center">Admin Dashboard</h1>
          <input 
            type="password" 
            className="w-full border p-2 rounded mb-4 text-black" 
            placeholder="Nhập Admin Secret Key..."
            value={adminKey}
            onChange={(e) => setAdminKey(e.target.value)}
          />
          <button onClick={handleLogin} className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700">
            Truy cập
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-8 text-black">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold text-gray-800">Quản lý Khách hàng</h1>
            <button 
                onClick={handleInitDB} 
                disabled={isInitializing}
                className="text-xs bg-gray-200 hover:bg-gray-300 text-gray-700 px-3 py-2 rounded border border-gray-300"
                title="Chạy lệnh tạo bảng trong Database lần đầu tiên"
            >
                {isInitializing ? 'Đang chạy...' : 'Khởi tạo / Reset Database'}
            </button>
        </div>

        {/* Form Thêm mới */}
        <div className="bg-white p-6 rounded shadow mb-8">
          <h2 className="font-bold mb-4 text-lg">Cấp Key Mới</h2>
          <form onSubmit={handleAddUser} className="flex gap-4 items-end flex-wrap">
            <div>
              <label className="block text-xs mb-1 text-gray-600">Client Key (Mã KH)</label>
              <input 
                required
                type="text" 
                className="border p-2 rounded w-64" 
                placeholder="VD: khach-vip-01"
                value={newUser.key}
                onChange={(e) => setNewUser({...newUser, key: e.target.value})}
              />
            </div>
            <div>
              <label className="block text-xs mb-1 text-gray-600">Gói (Tier)</label>
              <select 
                className="border p-2 rounded w-32"
                value={newUser.tier}
                onChange={(e) => setNewUser({...newUser, tier: e.target.value})}
              >
                <option value="free">Free</option>
                <option value="basic">Basic</option>
                <option value="pro">Pro</option>
              </select>
            </div>
            <div>
              <label className="block text-xs mb-1 text-gray-600">Giới hạn/ngày</label>
              <input 
                type="number" 
                className="border p-2 rounded w-24" 
                value={newUser.limit}
                onChange={(e) => setNewUser({...newUser, limit: parseInt(e.target.value)})}
              />
            </div>
            <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">
              + Thêm User
            </button>
          </form>
        </div>

        {/* Danh sách User */}
        <div className="bg-white rounded shadow overflow-hidden">
          <table className="w-full text-left">
            <thead className="bg-gray-200">
              <tr>
                <th className="p-3">ID</th>
                <th className="p-3">Client Key</th>
                <th className="p-3">Gói</th>
                <th className="p-3 text-center">Đã dùng / Giới hạn</th>
                <th className="p-3 text-right">Hành động</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user.id} className="border-b hover:bg-gray-50">
                  <td className="p-3 text-gray-500">#{user.id}</td>
                  <td className="p-3 font-mono font-bold text-blue-600">{user.client_api_key}</td>
                  <td className="p-3 uppercase text-xs font-bold text-gray-500">{user.tier}</td>
                  <td className="p-3 text-center">
                    <span className={user.usage_count >= user.daily_limit ? 'text-red-600 font-bold' : 'text-green-600'}>
                      {user.usage_count}
                    </span> 
                    <span className="text-gray-400 mx-1">/</span> 
                    {user.daily_limit}
                  </td>
                  <td className="p-3 text-right">
                    <button 
                      onClick={() => handleDelete(user.id)}
                      className="text-red-500 hover:text-red-700 text-sm font-medium"
                    >
                      Xóa
                    </button>
                  </td>
                </tr>
              ))}
              {users.length === 0 && (
                <tr>
                  <td colSpan={5} className="p-8 text-center text-gray-500">
                    {users.length === 0 ? "Chưa có dữ liệu. Hãy bấm 'Khởi tạo Database' nếu đây là lần đầu." : "Đang tải..."}
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}