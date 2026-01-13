import React from 'react';

interface SummaryCardProps {
  title: string;
  value: string;
  icon: React.ElementType;
  colorClass: string;
  desc: string;
}

const SummaryCard: React.FC<SummaryCardProps> = ({ title, value, icon: Icon, colorClass, desc }) => (
  <div className={`bg-white shadow-xl rounded-2xl p-6 flex-1 min-w-[280px] border-l-4 ${colorClass} transition duration-300 hover:shadow-2xl hover:scale-[1.01]`}>
    <div className="flex items-center justify-between">
      <h2 className="text-sm font-semibold text-gray-500 uppercase">{title}</h2>
      <div className={`text-2xl p-3 rounded-full ${colorClass.replace('border-', 'bg-').replace('600', '100').replace('700', '100')}`}>
        <Icon className={`${colorClass.replace('border-', 'text-')}`} />
      </div>
    </div>
    <p className="text-3xl font-bold mt-2 text-gray-800 tracking-tight">{value}</p>
    <p className="text-xs text-gray-400 mt-1">{desc}</p>
  </div>
);

export default SummaryCard;