"use client";
import { Navigation, Zap, AlertTriangle } from 'lucide-react';
import dynamic from 'next/dynamic';

const CampusMap = dynamic(() => import('@/components/CampusMap'), { ssr: false });

export default function NavigationPage() {
  return (
    <div className="space-y-4 h-[calc(100vh-140px)] flex flex-col">
      <header className="shrink-0">
        <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white">智慧出行 GIS 看板</h1>
        <p className="text-slate-500 dark:text-gray-400 mt-1 text-sm">校园实时流量与充电资源可视化</p>
      </header>

      <div className="grid grid-cols-3 gap-3 shrink-0">
        <div className="bg-white dark:bg-[#161b22] p-3 rounded-2xl border border-slate-200 dark:border-gray-800 flex items-center shadow-sm">
          <div className="w-8 h-8 rounded-full bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center mr-2 shrink-0">
            <Zap className="text-emerald-600 dark:text-emerald-400 w-4 h-4" />
          </div>
          <div>
            <p className="text-[10px] text-slate-500">空闲充电桩</p>
            <p className="font-bold text-sm text-slate-900 dark:text-white">42 / 120</p>
          </div>
        </div>
        <div className="bg-white dark:bg-[#161b22] p-3 rounded-2xl border border-slate-200 dark:border-gray-800 flex items-center shadow-sm">
          <div className="w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center mr-2 shrink-0">
            <Navigation className="text-blue-600 dark:text-blue-400 w-4 h-4" />
          </div>
          <div>
            <p className="text-[10px] text-slate-500">共享定位人数</p>
            <p className="font-bold text-sm text-slate-900 dark:text-white">856 人</p>
          </div>
        </div>
        <div className="bg-white dark:bg-[#161b22] p-3 rounded-2xl border border-slate-200 dark:border-gray-800 flex items-center shadow-sm">
          <div className="w-8 h-8 rounded-full bg-amber-100 dark:bg-amber-900/30 flex items-center justify-center mr-2 shrink-0">
            <AlertTriangle className="text-amber-600 dark:text-amber-400 w-4 h-4" />
          </div>
          <div className="overflow-hidden">
            <p className="text-[10px] text-slate-500">拥堵区域</p>
            <p className="font-bold text-sm text-slate-900 dark:text-white truncate">二教、夏雨厅</p>
          </div>
        </div>
      </div>

      <div className="flex-1 w-full relative">
        <CampusMap />
      </div>
    </div>
  );
}