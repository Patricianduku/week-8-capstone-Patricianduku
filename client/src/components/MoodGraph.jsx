import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const MoodGraph = ({ entries }) => {
  // Prepare data for the chart
  const chartData = entries
    .slice()
    .reverse() // Show oldest to newest
    .map(entry => {
      const d = new Date(entry.date);
      const day = String(d.getDate()).padStart(2, '0');
      const month = String(d.getMonth() + 1).padStart(2, '0');
      const year = d.getFullYear();
      return {
        date: `${day}/${month}/${year}`,
        mood: entry.mood,
        fullDate: entry.date,
        title: entry.title
      };
    });

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-white dark:bg-gray-800 p-3 border border-gray-200 dark:border-gray-600 rounded-lg shadow-lg">
          <p className="font-medium text-gray-900 dark:text-gray-100">{data.title}</p>
          <p className="text-sm text-gray-600 dark:text-gray-400">{label}</p>
          <p className="text-sm">
            <span className="font-medium">Mood: </span>
            <span className={`${getMoodColor(data.mood)} font-medium`}>
              {data.mood}/10
            </span>
          </p>
        </div>
      );
    }
    return null;
  };

  const getMoodColor = (mood) => {
    if (mood <= 3) return 'text-red-600';
    if (mood <= 6) return 'text-yellow-600';
    return 'text-green-600';
  };

  const getLineColor = () => {
    const avgMood = chartData.reduce((sum, entry) => sum + entry.mood, 0) / chartData.length;
    if (avgMood <= 3) return '#dc2626';
    if (avgMood <= 6) return '#d97706';
    return '#16a34a';
  };

  if (chartData.length === 0) {
    return (
      <div className="h-64 flex items-center justify-center text-gray-500 dark:text-gray-400">
        <div className="text-center">
          <p className="text-lg font-medium mb-2">No mood data yet</p>
          <p className="text-sm">Start journaling to see your mood trends</p>
        </div>
      </div>
    );
  }

  return (
    <div className="h-64">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={chartData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" className="dark:stroke-gray-600" />
          <XAxis 
            dataKey="date" 
            stroke="#6b7280"
            className="dark:stroke-gray-400"
            fontSize={12}
          />
          <YAxis 
            domain={[1, 10]}
            stroke="#6b7280"
            className="dark:stroke-gray-400"
            fontSize={12}
            label={{ value: 'Mood', angle: -90, position: 'insideLeft' }}
          />
          <Tooltip content={<CustomTooltip />} />
          <Line 
            type="monotone" 
            dataKey="mood" 
            stroke={getLineColor()}
            strokeWidth={3}
            dot={{ fill: getLineColor(), strokeWidth: 2, r: 4 }}
            activeDot={{ r: 6, stroke: getLineColor(), strokeWidth: 2 }}
          />
        </LineChart>
      </ResponsiveContainer>
      
      {/* Mood Legend */}
      <div className="flex justify-center space-x-6 mt-4 text-xs">
        <div className="flex items-center space-x-1">
          <div className="w-3 h-3 bg-red-500 rounded-full"></div>
          <span className="text-gray-600 dark:text-gray-400">Low (1-3)</span>
        </div>
        <div className="flex items-center space-x-1">
          <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
          <span className="text-gray-600 dark:text-gray-400">Medium (4-6)</span>
        </div>
        <div className="flex items-center space-x-1">
          <div className="w-3 h-3 bg-green-500 rounded-full"></div>
          <span className="text-gray-600 dark:text-gray-400">High (7-10)</span>
        </div>
      </div>
    </div>
  );
};

export default MoodGraph;