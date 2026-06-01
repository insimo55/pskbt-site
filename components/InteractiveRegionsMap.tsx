"use client";

import { useState, useEffect, useRef } from "react";
import { MapContainer, TileLayer, Marker,AttributionControl  } from "react-leaflet";
import { motion, AnimatePresence } from "framer-motion";
import { FiMapPin } from "react-icons/fi";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

// --- Определяем типы для TypeScript ---
interface Region {
  id: string; // Должен совпадать с 'name' в GeoJSON
  name: string;
  image: string;
  description: string;
  fields: string[];
}

interface Feature {
  type: string;
  properties: { name: string };
  geometry: { type: string; coordinates: [number, number] };
  id: number;
}

interface GeoJsonData {
  type: string;
  features: Feature[];
}

// Карточка с информацией о регионе
const RegionInfoCard = ({ region, onClose }: { region: Region | null; onClose: () => void; }) => {
  if (!region) return null;

  return (
    <AnimatePresence>
      {region && ( // Показываем компонент только если есть `region`
        <motion.div
          key={region.id}
          // Анимация: панель выезжает справа, занимая 100% ширины, и уезжает обратно
          initial={{ x: "100%" }}
          animate={{ x: 0 }}
          exit={{ x: "100%" }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
          // Стили: позиционируем абсолютно на всю высоту карты справа
          className="absolute top-0 right-0 bottom-0 w-full max-w-sm md:max-w-md bg-white/80 backdrop-blur-xl shadow-2xl z-[1000] border-l border-gray-200 flex flex-col"
        >
          {/* Изображение остается "приклеенным" сверху */}
          <div className="relative flex-shrink-0">
            <img src={region.image} alt={region.name} className="w-full h-48 object-center" />
            <button
              onClick={onClose}
              className="absolute top-4 right-4 text-white bg-black/40 rounded-full p-2 hover:bg-black/60 transition-colors focus:outline-none focus:ring-2 focus:ring-white"
              aria-label="Закрыть"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          
          {/* Этот блок будет занимать все оставшееся место и прокручиваться */}
          <div className="p-6 overflow-y-auto">
            <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2">{region.name}</h3>
            <p className="text-base text-gray-700 mb-6">{region.description}</p>
            <h4 className="text-base sm:text-lg font-semibold text-gray-800 mb-3 border-b pb-2">Ключевые месторождения:</h4>
            <ul className="space-y-2">
              {region.fields.map((field, i) => (
                <li key={i} className="flex items-start text-base text-gray-800">
                  <FiMapPin className="w-5 h-5 mr-3 mt-1 text-primary-500 flex-shrink-0" />
                  <span>{field}</span>
                </li>
              ))}
            </ul>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

// НОВЫЙ компонент для кастомного анимированного маркера
const CustomPointMarker = ({ feature, onClick, isActive }: { feature: Feature; onClick: () => void; isActive: boolean; }) => {
  const icon = L.divIcon({
    className: "custom-marker-icon",
    html: `
      <div class="marker-pin-wrapper">
        <div class="marker-pin ${isActive ? 'active' : ''}"></div>
        <div class="marker-pulse"></div>
      </div>
    `,
    iconSize: [40, 40],
    iconAnchor: [20, 40],
  });

  // ВНИМАНИЕ: Leaflet использует [lat, lon], а GeoJSON - [lon, lat]. Меняем их местами!
  const position: [number, number] = [feature.geometry.coordinates[1], feature.geometry.coordinates[0]];

  return (
    <Marker
      position={position}
      icon={icon}
      eventHandlers={{
        click: onClick,
      }}
    />
  );
};
// --- Основной компонент карты ---
// --- Основной компонент карты (ИЗМЕНЕН) ---
// --- Основной компонент карты (с изменениями в логике) ---
export default function InteractiveRegionsMap({ workRegions }: { workRegions: Region[] }) {
  const [geoJsonData, setGeoJsonData] = useState<GeoJsonData | null>(null);
  const [activeRegion, setActiveRegion] = useState<Region | null>(null);
  const mapRef = useRef<L.Map | null>(null);

  useEffect(() => {
    fetch('/russia_regions.geojson')
      .then(res => res.json())
      .then(data => setGeoJsonData(data));
  }, []);

  // --- ИЗМЕНЕНИЕ 2: Обновленная логика кликов и смещения карты ---
  const handleMarkerClick = (feature: Feature) => {
    const regionData = workRegions.find(r => r.id === feature.properties.name);
    
    if (regionData && mapRef.current) {
      setActiveRegion(regionData);
      const [lon, lat] = feature.geometry.coordinates;
      
      // Плавно летим к точке
      mapRef.current.flyTo([lat, lon], 7, { duration: 1 });

      // И плавно СДВИГАЕМ карту влево, чтобы панель не перекрывала маркер
      // Ширина панели ~384px (max-w-sm). Сдвигаем на половину этой ширины.
      const panelWidth = 384; 
      mapRef.current.panBy([-panelWidth / 2, 0], { duration: 0.7 });
    }
  };

  const handleCloseCard = () => {
    setActiveRegion(null);
    // Возвращаем карту в исходное центральное положение
    mapRef.current?.flyTo([60, 90], 3, { duration: 1.5 });
  };
  
  if (!geoJsonData) {
    return <div className="h-[600px] flex items-center justify-center bg-gray-200 rounded-2xl">Загрузка данных карты...</div>;
  }

  return (
    // Добавляем overflow-hidden, чтобы выезжающая панель не выходила за пределы контейнера
    <div className="relative w-full h-[600px] md:h-[700px] rounded-2xl overflow-hidden shadow-lg z-10">
      <MapContainer
        center={[60, 90]}
        zoom={3}
        scrollWheelZoom={true}
        className="w-full h-full bg-gray-100"
        ref={mapRef}
        attributionControl={false}
      >
        <TileLayer
  attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
/>
        <AttributionControl position="bottomright" prefix={false} />
        
        {geoJsonData.features.map(feature => {
          const hasData = workRegions.some(r => r.id === feature.properties.name);
          if (!hasData) return null;

          return (
            <CustomPointMarker
              key={feature.id}
              feature={feature}
              isActive={activeRegion?.id === feature.properties.name}
              onClick={() => handleMarkerClick(feature)}
            />
          );
        })}
      </MapContainer>
      
      {/* Рендерим нашу новую, большую панель */}
      <RegionInfoCard region={activeRegion} onClose={handleCloseCard} />
    </div>
  );
}
