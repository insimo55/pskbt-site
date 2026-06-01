import dynamic from "next/dynamic";
import { useMemo } from "react";
// ИЗМЕНЕНИЕ 1: Правильный импорт из JSON файла
import workRegionsData from "../data/work-regions.json"; 

interface Region {
  id: string;
  name: string;
  image: string;
  description: string;
  fields: string[];
}

// ----> ВОТ ГЛАВНОЕ ИЗМЕНЕНИЕ <----
// Достаем массив из импортированного объекта
const workRegions: Region[] = workRegionsData.workRegions;

// Дополнительная проверка на случай, если JSON пустой или имеет другую структуру
if (!Array.isArray(workRegions)) {
  console.error("Ошибка: work-regions.json не содержит массив 'workRegions'");
  // Можно вернуть заглушку или пустой компонент
}

export default function WorkGeographySection() {
  const Map = useMemo(() => dynamic(
    () => import('./InteractiveRegionsMap'), // Путь к нашему новому компоненту
    { 
      loading: () => <div className="h-[600px] w-full bg-gray-200 rounded-2xl animate-pulse flex items-center justify-center"><p>Загрузка карты...</p></div>,
      ssr: false 
    }
  ), []);

  return (
      <div className="container-custom text-center">
        
        <p className="max-w-3xl mx-auto text-lg text-gray-600 mb-12 mt-8">
          Мы реализовали проекты в ключевых нефтегазоносных регионах России. Кликните на маркер на карте, чтобы узнать подробности о нашей работе.
        </p>

        {/* Все остается как было, передаем типизированную переменную */}
        <Map workRegions={workRegions} />
      </div>
  );
}
