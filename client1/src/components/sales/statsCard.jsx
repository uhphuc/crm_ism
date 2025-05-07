const StatsCard = ({ title, value, change, isPositive, icon }) => {
    return (
      <div className="bg-white p-6 rounded-lg shadow">
        <div className="flex justify-between">
          <div>
            <p className="text-sm font-medium text-gray-500">{title}</p>
            <p className="text-2xl font-semibold mt-1">{value}</p>
            <p className={`text-sm mt-2 ${isPositive ? 'text-green-600' : 'text-red-600'}`}>
              {change} {isPositive ? '↑' : '↓'}
            </p>
          </div>
          <div className="h-12 w-12 rounded-full bg-opacity-20 flex items-center justify-center">
            {icon}
          </div>
        </div>
      </div>
    );
  };
  
  export default StatsCard;