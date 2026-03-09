"use client";
import { Camera, Save, Star, LogIn, UserPlus, Link as LinkIcon, ShieldCheck, AlertCircle, Loader2 } from 'lucide-react';
import { useState, useEffect } from 'react';
import { supabase } from '@/utils/supabase'; // 确保你之前在这个路径创建了 supabase 实例

export default function ProfilePage() {
  const [session, setSession] = useState<any>(null);
  const [loading, setLoading] = useState(true); // 页面初始化加载状态
  const [authLoading, setAuthLoading] = useState(false); // 登录/注册按钮加载状态

  const [authMode, setAuthMode] = useState<'login' | 'register'>('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [agreed, setAgreed] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  // 检查是否已登录
  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setLoading(false);
    });

    // 监听登录状态变化
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => subscription.unsubscribe();
  }, []);

  // 处理注册与登录逻辑
  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');
    setSuccessMsg('');
    setAuthLoading(true);

    // 强制校验华东师大邮箱
    if (authMode === 'register' && !email.endsWith('@stu.ecnu.edu.cn')) {
      setErrorMsg('抱歉，目前仅限华东师范大学学生 (@stu.ecnu.edu.cn) 注册体验。');
      setAuthLoading(false);
      return;
    }
    
    // 强制校验用户协议
    if (authMode === 'register' && !agreed) {
      setErrorMsg('请阅读并同意《鱼丸用户协议》及位置共享条款。');
      setAuthLoading(false);
      return;
    }

    if (authMode === 'register') {
      // 执行注册
      const { error } = await supabase.auth.signUp({
        email,
        password,
      });
      if (error) {
        setErrorMsg(error.message);
      } else {
        setSuccessMsg('注册成功！为了验证身份，请前往您的邮箱点击验证链接（若找不到请检查垃圾邮件夹）。');
        // 可选：如果不强制邮箱验证，这里就会直接获得 session
      }
    } else {
      // 执行登录
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      if (error) {
        setErrorMsg('登录失败：邮箱或密码错误，或邮箱尚未验证。');
      }
    }
    setAuthLoading(false);
  };

  // 退出登录
  const handleSignOut = async () => {
    await supabase.auth.signOut();
  };

  // 页面加载中动画
  if (loading) {
    return (
      <div className="h-[60vh] flex flex-col items-center justify-center text-slate-500">
        <Loader2 className="w-10 h-10 animate-spin text-blue-500 mb-4" />
        <p>正在验证安全凭证...</p>
      </div>
    );
  }

  // ====== 未登录界面：注册与登录 ======
  if (!session) {
    return (
      <div className="max-w-md mx-auto mt-10 sm:mt-16 p-8 bg-white dark:bg-[#161b22] rounded-3xl border border-slate-200 dark:border-gray-800 shadow-xl relative overflow-hidden">
        <div className="text-center mb-8 relative z-10">
          <div className="w-16 h-16 bg-blue-600 rounded-2xl flex items-center justify-center font-bold text-white text-3xl mx-auto mb-4 shadow-lg">鱼</div>
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
            {authMode === 'login' ? '登录鱼丸安防系统' : '激活专属安防账号'}
          </h2>
          <p className="text-slate-500 text-sm mt-2">保护爱车，参与校园智慧出行</p>
        </div>

        {errorMsg && (
          <div className="mb-4 p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-900/50 rounded-xl flex items-start text-red-600 dark:text-red-400 text-sm">
            <AlertCircle className="w-5 h-5 mr-2 shrink-0 mt-0.5" />
            <p>{errorMsg}</p>
          </div>
        )}

        {successMsg && (
          <div className="mb-4 p-3 bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-200 dark:border-emerald-900/50 rounded-xl flex items-start text-emerald-600 dark:text-emerald-400 text-sm">
            <ShieldCheck className="w-5 h-5 mr-2 shrink-0 mt-0.5" />
            <p>{successMsg}</p>
          </div>
        )}

        <form className="space-y-5 relative z-10" onSubmit={handleAuth}>
          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-gray-300 mb-1">学号邮箱</label>
            <input 
              type="email" required 
              placeholder="学号@stu.ecnu.edu.cn" 
              value={email} onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-slate-50 dark:bg-[#0d1117] border border-slate-300 dark:border-gray-700 rounded-xl px-4 py-3 text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none transition-all" 
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-gray-300 mb-1">密码</label>
            <input 
              type="password" required 
              placeholder="••••••••" 
              value={password} onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-slate-50 dark:bg-[#0d1117] border border-slate-300 dark:border-gray-700 rounded-xl px-4 py-3 text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none transition-all" 
            />
          </div>

          {authMode === 'register' && (
            <div className="flex items-start mt-4">
              <input 
                type="checkbox" id="agreement" 
                checked={agreed} onChange={(e) => setAgreed(e.target.checked)}
                className="mt-1 w-4 h-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500 cursor-pointer" 
              />
              <label htmlFor="agreement" className="ml-2 block text-xs text-slate-500 dark:text-gray-400 cursor-pointer leading-relaxed">
                我已阅读并同意 <a href="#" className="text-blue-600 dark:text-blue-400 hover:underline">《鱼丸用户服务协议》</a>，并授权系统收集我的车辆匿名位置数据，以生成全校 GIS 实时流量热力图。
              </label>
            </div>
          )}
          
          <button disabled={authLoading} type="submit" className="w-full py-3 mt-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-bold transition-colors flex justify-center items-center shadow-md disabled:opacity-50">
            {authLoading ? <Loader2 className="w-5 h-5 mr-2 animate-spin" /> : (authMode === 'login' ? <LogIn className="w-5 h-5 mr-2" /> : <UserPlus className="w-5 h-5 mr-2" />)}
            {authLoading ? '处理中...' : (authMode === 'login' ? '安全登录' : '激活账号')}
          </button>
        </form>

        <p className="text-center mt-6 text-sm text-slate-500 relative z-10">
          {authMode === 'login' ? '还没绑定过终端设备？' : '已有终端账号？'}
          <button onClick={() => {setAuthMode(authMode === 'login' ? 'register' : 'login'); setErrorMsg(''); setSuccessMsg('');}} className="text-blue-600 dark:text-blue-400 font-bold ml-1 hover:underline">
            {authMode === 'login' ? '立即注册' : '返回登录'}
          </button>
        </p>
      </div>
    );
  }

  // ====== 已登录界面：个人信息与设备管理 ======
  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <header className="flex justify-between items-end">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white">个人中心</h1>
          <p className="text-slate-500 mt-2">管理您的账号与 IoT 终端设备</p>
        </div>
        <button onClick={handleSignOut} className="text-red-500 text-sm font-medium hover:bg-red-50 dark:hover:bg-red-900/20 px-4 py-2 rounded-lg transition-colors">退出登录</button>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* 左侧：个人资料卡 */}
        <div className="md:col-span-1 space-y-6">
          <div className="bg-white dark:bg-[#161b22] rounded-3xl border border-slate-200 dark:border-gray-800 shadow-sm overflow-hidden p-6 text-center">
            <div className="relative inline-block cursor-pointer group mb-4">
              <div className="w-24 h-24 rounded-full border-4 border-slate-100 dark:border-gray-800 overflow-hidden bg-slate-200 dark:bg-slate-800 mx-auto">
                <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${session.user.email}`} alt="Avatar" className="w-full h-full object-cover" />
              </div>
            </div>
            {/* 自动从真实 Supabase User 提取邮箱前缀作为用户名 */}
            <h2 className="text-xl font-bold text-slate-900 dark:text-white truncate">{session.user.email?.split('@')[0]}</h2>
            <p className="text-slate-500 dark:text-gray-400 text-sm mt-1">华东师范大学</p>
            
            <div className="mt-6 inline-flex items-center bg-amber-50 dark:bg-amber-900/20 text-amber-600 dark:text-amber-400 px-4 py-2 rounded-full text-sm font-bold border border-amber-200 dark:border-amber-900/50">
              <Star className="w-4 h-4 mr-2" fill="currentColor" /> 文明积分: 120
            </div>
          </div>
        </div>

        {/* 右侧：设备管理 */}
        <div className="md:col-span-2 space-y-6">
          <div className="bg-white dark:bg-[#161b22] rounded-3xl border border-slate-200 dark:border-gray-800 shadow-sm p-6 flex flex-col h-full">
            <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-4 flex items-center">
              <ShieldCheck className="w-5 h-5 mr-2 text-emerald-500" /> 终端绑定与位置共享
            </h3>
            
            <div className="p-4 bg-slate-50 dark:bg-[#0d1117] border border-slate-200 dark:border-gray-700 rounded-2xl mb-6 flex-1">
               <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-2">
                 <div className="mb-2 sm:mb-0">
                   <p className="font-bold text-slate-900 dark:text-white">未绑定任何车辆</p>
                   <p className="text-xs text-slate-500 font-mono mt-1">请在下方输入包装盒上的 SN 码</p>
                 </div>
               </div>
               <hr className="border-slate-200 dark:border-gray-700 my-4" />
               <div className="flex justify-between items-center">
                  <span className="text-sm text-slate-600 dark:text-gray-400">参与全校位置匿名共享 (获得更多积分)</span>
                  <input type="checkbox" defaultChecked className="toggle-checkbox w-4 h-4" />
               </div>
            </div>

            <hr className="border-slate-200 dark:border-gray-800 my-6" />
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-gray-300 mb-2">绑定新终端</label>
              <div className="flex space-x-2">
                <input type="text" placeholder="输入设备 SN 序列号" className="flex-1 bg-slate-50 dark:bg-[#0d1117] border border-slate-300 dark:border-gray-700 rounded-xl px-4 py-2 text-slate-900 dark:text-white outline-none focus:border-blue-500 transition-colors" />
                <button className="bg-slate-900 dark:bg-white text-white dark:text-slate-900 px-6 py-2 rounded-xl font-bold hover:opacity-80 transition-opacity flex items-center">
                  <LinkIcon className="w-4 h-4 mr-2" /> 绑定
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}