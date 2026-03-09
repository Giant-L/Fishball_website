"use client";
import { ShieldAlert, ShieldCheck, BatteryMedium, Signal } from 'lucide-react';
import { useState } from 'react';
import dynamic from 'next/dynamic';

// 动态引入地图组件，关闭 SSR（重要！）
const CampusMap = dynamic(() => import('@/components/CampusMap'), { 
  ssr: false, 
  loading: () => <div className="w-full h-full flex items-center justify-center bg-slate-100 dark:bg-slate-800 animate-pulse rounded-3xl"><p className="text-slate-500">卫星地图加载中...</p></div> 
});

export default function VehiclePage() {
  const [isLocked, setIsLocked] = useState(false);

  return (
    <div className="space-y-6">
      <header className="mb-4">
        <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white">我的车辆</h1>
        <p className="text-slate-500 dark:text-gray-400 mt-1 text-sm">您的专属非机动车安防终端控制台</p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1 space-y-6">
          <div className="bg-white dark:bg-[#161b22] p-6 rounded-3xl border border-slate-200 dark:border-gray-800 shadow-sm">
            <div className="flex justify-between items-center mb-6">
              <h3 className="font-bold text-slate-900 dark:text-white">电子围栏状态</h3>
              <span className={`px-3 py-1 rounded-full text-xs font-bold ${isLocked ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-500/20 dark:text-emerald-400' : 'bg-slate-100 text-slate-600 dark:bg-gray-800 dark:text-gray-400'}`}>
                {isLocked ? '已布防' : '已撤防'}
              </span>
            </div>
            
            <button 
              onClick={() => setIsLocked(!isLocked)}
              className={`w-full py-4 rounded-2xl flex items-center justify-center font-bold text-lg transition-all ${
                isLocked 
                  ? 'bg-slate-100 text-slate-700 hover:bg-slate-200 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700' 
                  : 'bg-blue-600 text-white hover:bg-blue-700 shadow-lg shadow-blue-500/30'
              }`}
            >
              {isLocked ? <ShieldCheck className="mr-2" /> : <ShieldAlert className="mr-2" />}
              {isLocked ? '点击撤防' : '一键布防 (开启异常报警)'}
            </button>
          </div>

          <div className="bg-white dark:bg-[#161b22] p-6 rounded-3xl border border-slate-200 dark:border-gray-800 shadow-sm grid grid-cols-2 gap-4">
            <div>
              <p className="text-slate-500 dark:text-gray-400 text-xs mb-1">终端电量</p>
              <div className="flex items-center text-slate-900 dark:text-white font-mono font-bold text-xl">
                <BatteryMedium className="w-5 h-5 text-emerald-500 mr-2" /> 84%
              </div>
            </div>
            <div>
              <p className="text-slate-500 dark:text-gray-400 text-xs mb-1">通信信号</p>
              <div className="flex items-center text-slate-900 dark:text-white font-mono font-bold text-xl">
                <Signal className="w-5 h-5 text-blue-500 mr-2" /> 优
              </div>
            </div>
          </div>
        </div>

        {/* 右侧：真实的交互式地图 */}
        <div className="lg:col-span-2 h-[450px] lg:h-[600px] w-full relative">
           <CampusMap />
        </div>
      </div>
    </div>
  );
}