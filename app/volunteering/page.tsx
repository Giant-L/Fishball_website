import { Users } from 'lucide-react';

export default function VolunteeringPage() {
  return (
    <div className="flex flex-col items-center justify-center h-[60vh] text-slate-500 dark:text-gray-400">
      <Users size={64} className="mb-6 opacity-50" />
      <h1 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">多元共治</h1>
      <p>志愿护卫队及文明积分系统正在建设中，敬请期待...</p>
    </div>
  );
}