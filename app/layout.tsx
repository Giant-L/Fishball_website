import 'leaflet/dist/leaflet.css'; 
import './globals.css'
import type { Metadata } from 'next'
import { ThemeProvider } from 'next-themes'

export const metadata: Metadata = {
  title: '鱼丸 YUWAN | 智慧校园安防',
  description: '基于时空大数据与轻量级物联网的非机动车智能安防系统',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    // suppressHydrationWarning 必须加，防止 next-themes 导致的客户端/服务端属性不匹配报错
    <html lang="zh" suppressHydrationWarning>
      <body className="bg-slate-50 dark:bg-[#0d1117] text-slate-900 dark:text-gray-200 min-h-screen transition-colors duration-300">
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}