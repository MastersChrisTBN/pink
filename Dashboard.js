import React from 'react';
import { LayoutGrid, Users, BarChart3, Settings, Bell, Search } from 'lucide-react';
import StatCard from './StatCard';

const Dashboard = () => {
  return (
    <div className="flex min-h-screen">
      {/* Sidebar - Kontras tinggi dengan background gelap */}
      <aside className="w-64 bg-slate-900 text-white hidden md:flex flex-col">
        <div className="p-6 text-2xl font-bold tracking-tight border-b border-slate-800">
          PRO<span className="text-blue-400">DASH</span>
        </div>
        <nav className="flex-1 p-4 space-y-2">
          <NavItem icon={<LayoutGrid size={20} />} label="Dashboard" active />
          <NavItem icon={<Users size={20} />} label="Customers" />
          <NavItem icon={<BarChart3 size={20} />} label="Analytics" />
          <NavItem icon={<Settings size={20} />} label="Settings" />
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col">
        {/* Header - Putih bersih dengan border bawah yang jelas */}
        <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-8 sticky top-0 z-10">
          <div className="relative w-96">
            <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-400">
              <Search size={18} />
            </span>
            <input 
              type="text" 
              className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
              placeholder="Cari data..."
            />
          </div>
          <div className="flex items-center gap-4">
            <button className="p-2 text-gray-500 hover:bg-gray-100 rounded-full relative">
              <Bell size={20} />
              <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
            </button>
            <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-white font-bold text-xs">
              AD
            </div>
          </div>
        </header>

        {/* Dashboard Content */}
        <div className="p-8 max-w-7xl mx-auto w-full">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-slate-900">Ringkasan Performa</h1>
            <p className="text-slate-500 mt-1">Selamat datang kembali, admin. Berikut adalah data hari ini.</p>
          </div>

          {/* Grid Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <StatCard title="Total Pendapatan" value="Rp 24.500.000" change="+12.5%" color="blue" />
            <StatCard title="Pengguna Baru" value="1,240" change="+3.2%" color="green" />
            <StatCard title="Tingkat Konversi" value="4.8%" change="-0.4%" color="purple" />
          </div>

          {/* Table Area */}
          <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden">
            <div className="p-6 border-b border-gray-100 flex justify-between items-center">
              <h2 className="font-bold text-lg">Transaksi Terakhir</h2>
              <button className="text-blue-600 font-semibold text-sm hover:underline">Lihat Semua</button>
            </div>
            <table className="w-full text-left">
              <thead>
                <tr className="bg-gray-50 text-gray-500 text-xs uppercase tracking-wider">
                  <th className="px-6 py-4">ID Transaksi</th>
                  <th className="px-6 py-4">Pelanggan</th>
                  <th className="px-6 py-4">Status</th>
                  <th className="px-6 py-4 text-right">Jumlah</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {[1, 2, 3].map((i) => (
                  <tr key={i} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 font-medium">#TRX-00{i}</td>
                    <td className="px-6 py-4">User {i}</td>
                    <td className="px-6 py-4">
                      <span className="px-3 py-1 rounded-full text-xs font-semibold bg-green-100 text-green-700">
                        Selesai
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right font-bold text-slate-700">Rp 450.000</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
};

const NavItem = ({ icon, label, active = false }) => (
  <div className={`flex items-center gap-3 px-4 py-3 rounded-lg cursor-pointer transition-all ${
    active ? 'bg-blue-600 text-white' : 'text-slate-400 hover:bg-slate-800 hover:text-white'
  }`}>
    {icon}
    <span className="font-medium">{label}</span>
  </div>
);

export default Dashboard;