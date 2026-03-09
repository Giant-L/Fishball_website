"use client";
import { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css'; // 必须引入，否则地图会碎掉

// 修复 Leaflet 默认图标在 Next.js 中的丢失问题
const customIcon = new L.Icon({
  iconUrl: 'https://cdn.rawgit.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
});

// 定义华东师范大学两个校区的中心点坐标
const CAMPUS = {
  minhang: { lat: 31.0318, lng: 121.4543, name: '闵行校区' },
  putuo: { lat: 31.2265, lng: 121.4050, name: '普陀校区' }
};

// 地图控制器组件：负责平滑移动和限制滑动范围
function MapController({ center, setMapInstance }: { center: any, setMapInstance: any }) {
  const map = useMap();
  useEffect(() => {
    setMapInstance(map);
    // 设置边界：中心点上下左右约 2 公里范围
    const bounds = L.latLngBounds(
      [center.lat - 0.02, center.lng - 0.02],
      [center.lat + 0.02, center.lng + 0.02]
    );
    map.setMaxBounds(bounds);
    map.flyTo(center, 16); // 切换校区时的飞行动画
  }, [center, map, setMapInstance]);
  return null;
}

export default function CampusMap() {
  const [activeCampus, setActiveCampus] = useState(CAMPUS.minhang);
  const [mapInstance, setMapInstance] = useState<L.Map | null>(null);

  // 模拟车辆当前位置（在当前校区中心点附近）
  const vehiclePos = { lat: activeCampus.lat + 0.002, lng: activeCampus.lng + 0.001 };

  const handleLocateVehicle = () => {
    if (mapInstance) mapInstance.flyTo(vehiclePos, 17);
  };

  return (
    <div className="relative w-full h-full rounded-3xl overflow-hidden shadow-inner">
      {/* 悬浮控制面板 */}
      <div className="absolute top-4 left-4 z-[400] bg-white/90 dark:bg-slate-900/90 backdrop-blur-md p-2 rounded-2xl shadow-lg border border-slate-200 dark:border-gray-700 flex flex-col space-y-2">
        <div className="flex bg-slate-100 dark:bg-slate-800 p-1 rounded-xl">
          <button 
            onClick={() => setActiveCampus(CAMPUS.minhang)}
            className={`px-3 py-1 text-xs font-bold rounded-lg transition-all ${activeCampus.name === '闵行校区' ? 'bg-white dark:bg-slate-600 shadow text-blue-600 dark:text-blue-400' : 'text-slate-500'}`}
          >闵行</button>
          <button 
            onClick={() => setActiveCampus(CAMPUS.putuo)}
            className={`px-3 py-1 text-xs font-bold rounded-lg transition-all ${activeCampus.name === '普陀校区' ? 'bg-white dark:bg-slate-600 shadow text-blue-600 dark:text-blue-400' : 'text-slate-500'}`}
          >普陀</button>
        </div>
        <button 
          onClick={handleLocateVehicle}
          className="bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold py-2 rounded-xl flex items-center justify-center transition-colors shadow-md"
        >
          📍 回到我的车
        </button>
      </div>

      <MapContainer 
        center={[activeCampus.lat, activeCampus.lng]} 
        zoom={16} 
        minZoom={14} // 限制缩放，防止看到全中国
        className="w-full h-full z-0 dark:brightness-75 dark:contrast-125 dark:hue-rotate-180 dark:invert transition-all duration-300" 
        zoomControl={false}
      >
        {/* CartoDB 清新卡通风格图层 */}
        <TileLayer url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png" />
        <MapController center={activeCampus} setMapInstance={setMapInstance} />
        <Marker position={[vehiclePos.lat, vehiclePos.lng]} icon={customIcon} />
      </MapContainer>
    </div>
  );
}