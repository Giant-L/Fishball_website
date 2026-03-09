"use client";
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useTheme } from 'next-themes';
import { Sun, Moon, Monitor, User } from 'lucide-react';
import { usePathname } from 'next/navigation';

export default function MainLayout({ children }: { children: React.ReactNode }) {
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const pathname = usePathname();

  useEffect(() => setMounted(true), []);

  // 处理滚动显示/隐藏逻辑
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      if (currentScrollY > lastScrollY && currentScrollY > 80) {
        setIsVisible(false); // 向下滚动且滚动超过80px，隐藏
      } else {
        setIsVisible(true);  // 向上滚动，显示
      }
      setLastScrollY(currentScrollY);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-[#0d1117] transition-colors duration-300">
      {/* 动态顶部导航栏 */}
      <nav 
        className={`fixed w-full px-4 sm:px-8 py-3 bg-white/80 dark:bg-[#161b22]/80 backdrop-blur-md border-b border-slate-200 dark:border-gray-800 z-50 transition-transform duration-300 ease-in-out ${
          isVisible ? 'translate-y-0' : '-translate-y-full'
        }`}
      >
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <Link href="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-blue-600 rounded-xl flex items-center justify-center font-bold text-white shadow-md">鱼</div>
            <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-emerald-500 dark:from-blue-400 dark:to-emerald-400 bg-clip-text text-transparent hidden sm:block">
              YUWAN
            </span>
          </Link>

          {/* 居中核心路由 */}
          <div className="flex space-x-4 sm:space-x-8 text-sm font-medium">
            <Link href="/vehicle" className={`transition-colors ${pathname === '/vehicle' ? 'text-blue-600 dark:text-blue-400' : 'text-slate-600 dark:text-gray-400 hover:text-slate-900 dark:hover:text-white'}`}>我的车辆</Link>
            <Link href="/navigation" className={`transition-colors ${pathname === '/navigation' ? 'text-blue-600 dark:text-blue-400' : 'text-slate-600 dark:text-gray-400 hover:text-slate-900 dark:hover:text-white'}`}>智慧出行</Link>
          </div>

          {/* 右侧控件：主题切换 + 个人中心 */}
          <div className="flex items-center space-x-2 sm:space-x-4">
            {/* 主题切换器 */}
            {mounted && (
              <div className="flex bg-slate-100 dark:bg-slate-800 rounded-full p-1 border border-slate-200 dark:border-gray-700">
                <button onClick={() => setTheme('light')} className={`p-1.5 rounded-full transition-colors ${theme === 'light' ? 'bg-white shadow text-amber-500' : 'text-slate-500 hover:text-slate-900 dark:hover:text-white'}`}><Sun size={14} /></button>
                <button onClick={() => setTheme('system')} className={`p-1.5 rounded-full transition-colors ${theme === 'system' ? 'bg-white dark:bg-slate-700 shadow text-slate-900 dark:text-white' : 'text-slate-500 hover:text-slate-900 dark:hover:text-white'}`}><Monitor size={14} /></button>
                <button onClick={() => setTheme('dark')} className={`p-1.5 rounded-full transition-colors ${theme === 'dark' ? 'bg-slate-700 shadow text-blue-400' : 'text-slate-500 hover:text-slate-900 dark:hover:text-white'}`}><Moon size={14} /></button>
              </div>
            )}
            
            <Link href="/profile" className="w-9 h-9 rounded-full border-2 border-transparent hover:border-blue-500 transition-all overflow-hidden bg-slate-200 dark:bg-slate-800 flex items-center justify-center">
              <User className="text-slate-500 dark:text-gray-400" size={18} />
            </Link>
          </div>
        </div>
      </nav>

      {/* 内部页面内容挂载区 (留出固定导航栏的高度) */}
      <main className="flex-1 w-full max-w-7xl mx-auto pt-20 p-4 sm:p-8">
        {children}
      </main>
    </div>
  );
}