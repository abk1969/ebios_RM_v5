import React from 'react';
import { Target, Shield, AlertTriangle, GitBranch, BarChart2 } from 'lucide-react';
import { EBIOS_WORKSHOPS } from '../../constants/ebiosWorkshops';

interface StepNavigationProps {
  currentWorkshop: number;
  workshops: typeof EBIOS_WORKSHOPS;
  onWorkshopClick: (id: number) => void;
  isWorkshopComplete: (id: number) => boolean;
}

export function StepNavigation({
  currentWorkshop,
  workshops,
  onWorkshopClick,
  isWorkshopComplete,
}: StepNavigationProps) {
  return (
    <nav className="bg-white shadow-sm rounded-lg p-4 mb-8">
      <ol className="flex items-center">
        {workshops.map((workshop, index) => {
          const Icon = workshop.icon;
          const isActive = currentWorkshop === workshop.id;
          const isCompleted = isWorkshopComplete(workshop.id);
          const isClickable = workshop.id === 1 || isWorkshopComplete(workshop.id - 1);

          return (
            <li 
              key={workshop.id}
              className={`flex-1 relative ${
                index !== workshops.length - 1 ? 'after:content-[""] after:absolute after:top-1/2 after:w-full after:h-0.5 after:bg-gray-200' : ''
              }`}
            >
              <button
                onClick={() => isClickable && onWorkshopClick(workshop.id)}
                disabled={!isClickable}
                className={`
                  relative z-10 flex flex-col items-center group
                  ${isClickable ? 'cursor-pointer' : 'cursor-not-allowed opacity-50'}
                `}
              >
                <span className={`
                  w-10 h-10 flex items-center justify-center rounded-full
                  ${isActive ? 'bg-blue-600 text-white' : 
                    isCompleted ? 'bg-green-500 text-white' : 
                    'bg-gray-200 text-gray-500'}
                `}>
                  <Icon className="w-5 h-5" />
                </span>
                
                <div className="absolute top-12 opacity-0 group-hover:opacity-100 transition-opacity bg-gray-800 text-white text-sm rounded p-2 w-48 text-center">
                  <p className="font-medium">{workshop.title}</p>
                  <p className="text-xs mt-1">{workshop.description}</p>
                </div>
              </button>
            </li>
          );
        })}
      </ol>
    </nav>
  );
}