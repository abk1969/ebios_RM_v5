import React from 'react';

interface ScaleSelectorProps {
  value: number;
  onChange: (value: number) => void;
  scale: number[]; // Par exemple, [1, 2, 3, 4]
  labels: string[]; // Par exemple, ['Négligeable', 'Modéré', 'Important', 'Critique']
}

const ScaleSelector: React.FC<ScaleSelectorProps> = ({
  value,
  onChange,
  scale,
  labels,
}) => {
  return (
    <div className="flex items-center space-x-4">
      {scale.map((level, index) => (
        <button
          key={level}
          className={`px-4 py-2 rounded-md ${
            value === level
              ? 'bg-blue-500 text-white'
              : 'bg-gray-200 text-gray-700'
          }`}
          onClick={() => onChange(level)}
        >
          {labels[index]}
        </button>
      ))}
    </div>
  );
};

export default ScaleSelector;