import React from 'react';
import s from './chart.module.css'
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const data = [
  { day: "Lun", voitures: 12 },
  { day: "Mar", voitures: 18 },
  { day: "Mer", voitures: 9 },
  { day: "Jeu", voitures: 20 },
  { day: "Ven", voitures: 15 },
  { day: "Sam", voitures: 25 },
  { day: "Dim", voitures: 10 },
];
const Chart = () => {
    return (
      <div className={s.chart}>
        <h1>Nombre de voiture entré par jour</h1>
        <ResponsiveContainer>
          <AreaChart
            data={data}
            margin={{ top: 20, right: 30, left: 0, bottom: 0 }}
          >
            <defs>
              <linearGradient id="colorVoitures" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#4f46e5" stopOpacity={0.8} />
                <stop offset="95%" stopColor="#4f46e5" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="day" />
            <YAxis />
            <Tooltip />
            <Area
              type="monotone"
              dataKey="voitures"
              stroke="#4f46e5"
              fillOpacity={1}
              fill="url(#colorVoitures)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    );
}

export default Chart;
