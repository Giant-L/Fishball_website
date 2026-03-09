"use client";
import Link from 'next/link';
import { ShieldCheck, Map, Users, Sun, Moon, Monitor } from 'lucide-react';
import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';

export default function HomePage() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center p-4 bg-slate-50 dark:bg-[#0d1117] transition-colors duration-300">
      <div className="absolute top-0 left-0 w-full h-full bg-blue-500/5 dark:bg-blue-900/10 pointer-events-none"></div>
      
      {/* 右上角：明暗切换和头像 */}
      <div className="absolute top-4 right-4 flex items-center space-x-3 z-50">
        {mounted && (
          <div className="flex bg-white/80 dark:bg-slate-800/80 backdrop-blur rounded-full p-1 border border-slate-200 dark:border-gray-700 shadow-sm">
            <button onClick={() => setTheme('light')} className={`p-1.5 rounded-full ${theme === 'light' ? 'bg-slate-100 dark:bg-slate-700 text-amber-500' : 'text-slate-400'}`}><Sun size={16} /></button>
            <button onClick={() => setTheme('system')} className={`p-1.5 rounded-full ${theme === 'system' ? 'bg-slate-100 dark:bg-slate-700 text-slate-800 dark:text-white' : 'text-slate-400'}`}><Monitor size={16} /></button>
            <button onClick={() => setTheme('dark')} className={`p-1.5 rounded-full ${theme === 'dark' ? 'bg-slate-100 dark:bg-slate-700 text-blue-400' : 'text-slate-400'}`}><Moon size={16} /></button>
          </div>
        )}
        <Link href="/profile" className="w-10 h-10 rounded-full overflow-hidden shadow-md">
          <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=lijiaye" alt="Profile" />
        </Link>
      </div>

      {/* Hero 标题区：紧凑、主次分明 */}
      <div className="text-center w-full max-w-2xl z-10 mt-10 mb-8">
        {/* 倾斜的鱼字 Logo */}
        <div className="w-16 h-16 bg-blue-600 rounded-2xl rotate-[-10deg] flex items-center justify-center font-bold text-white text-3xl mx-auto mb-6 shadow-lg">鱼</div>
        
        {/* 主标题极大 */}
        <h1 className="text-5xl md:text-6xl font-black tracking-tight text-blue-600 dark:text-blue-400 leading-none mb-2">
          鱼丸 YUWAN
        </h1>
        {/* 副标题明显变小且颜色变深 */}
        <h2 className="text-3xl md:text-4xl font-bold text-slate-800 dark:text-white tracking-tight mb-4">
          智慧校园
        </h2>
        
        <p className="text-sm md:text-base text-slate-500 dark:text-gray-400 px-4">
          基于时空大数据与轻量级物联网，提供找车导航、失窃预警与车位引导。
        </p>
      </div>

      {/* 核心功能导航：卡片更紧凑 */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full max-w-4xl z-10">
        <Link href="/vehicle" className="p-6 bg-white dark:bg-[#161b22] border border-slate-200 dark:border-gray-800 rounded-3xl shadow-sm">
          <ShieldCheck className="mb-3 text-blue-600 dark:text-blue-400" size={32} />
          <h2 className="text-lg font-bold mb-1 text-slate-900 dark:text-white">我的车辆</h2>
          <p className="text-xs text-slate-500">实时精准定位，一键开启安防电子围栏。</p>
        </Link>
        <Link href="/navigation" className="p-6 bg-white dark:bg-[#161b22] border border-slate-200 dark:border-gray-800 rounded-3xl shadow-sm">
          <Map className="mb-3 text-emerald-600 dark:text-emerald-400" size={32} />
          <h2 className="text-lg font-bold mb-1 text-slate-900 dark:text-white">智慧出行</h2>
          <p className="text-xs text-slate-500">查阅充电桩空闲状态与全校 GIS 实时热力图。</p>
        </Link>
        <div className="p-6 bg-slate-50 dark:bg-[#161b22]/40 border border-slate-200 dark:border-gray-800/50 rounded-3xl opacity-80">
          <Users className="mb-3 text-slate-400" size={32} />
          <h2 className="text-lg font-bold mb-1 text-slate-700 dark:text-gray-300">多元共治</h2>
          <p className="text-xs text-slate-500">加入志愿护卫队，参与校园交通秩序引导。</p>
        </div>
      </div>
    </div>
  );
}