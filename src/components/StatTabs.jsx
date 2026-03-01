import { useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Dot } from 'recharts';

const weekData = [
    { day: 'Man', value: 25.2, kwh: 32.8, cost: 89.56 },
    { day: 'Tir', value: 28.5, kwh: 36.0, cost: 99.32 },
    { day: 'Ons', value: 29.3, kwh: 29.3, cost: 81.04 },
    { day: 'Tor', value: 22.8, kwh: 24.5, cost: 71.20 },
    { day: 'Fre', value: 26.1, kwh: 28.9, cost: 85.40 },
    { day: 'Lør', value: 24.5, kwh: 26.7, cost: 79.10 },
    { day: 'Søn', value: 23.0, kwh: 25.2, cost: 73.80 },
];

const CustomDot = (props) => {
    const { cx, cy, index } = props;
    if (index === 2) {
        return (
            <g>
                <circle cx={cx} cy={cy} r={6} fill="#0f407b" stroke="white" strokeWidth={3} />
                <rect x={cx - 12} y={cy + 50} width={24} height={40} fill="#f0f4ff" rx={4} />
                <rect
                    x={cx - 10}
                    y={cy + 55}
                    width={20}
                    height={30}
                    fill="url(#gradient)"
                    rx={2}
                />
            </g>
        );
    }
    return null;
};

const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
        return (
            <div style={{
                background: 'white',
                padding: '8px 12px',
                borderRadius: '8px',
                boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
                fontSize: '14px',
                fontWeight: '500'
            }}>
                {payload[0].value} kWh
            </div>
        );
    }
    return null;
};

export default function StatTabs() {
    const [period, setPeriod] = useState('Ugentligt');
    const [activeExpense, setActiveExpense] = useState('Ons');

    return (
        <div className="stat-tabs">
            <div className="stat-tabs__header">
                <h2 className="stat-tabs__title">Forbrug</h2>
                <button className="stat-tabs__see-all">
                    {period} <img src="../public/icons/icon_drop-down.png" alt="" />
                </button>
            </div>

            <div className="stat-tabs__chart">

                <ResponsiveContainer width="100%" height={250}>
                    <LineChart data={weekData} margin={{ top: 20, right: 20, left: -20, bottom: 5 }}>
                        <defs>
                            <linearGradient id="gradient" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="0%" stopColor="#0f407b" stopOpacity={0.3} />
                                <stop offset="100%" stopColor="#0f407b" stopOpacity={0.05} />
                            </linearGradient>
                            <linearGradient id="lineGradient" x1="0" y1="0" x2="1" y2="0">
                                <stop offset="0%" stopColor="#0f407b" />
                                <stop offset="40%" stopColor="#0f407b" />
                                <stop offset="60%" stopColor="#d1d5db" stopOpacity={0.5} />
                                <stop offset="100%" stopColor="#d1d5db" stopOpacity={0.3} />
                            </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="0" stroke="transparent" />
                        <XAxis
                            dataKey="day"
                            axisLine={false}
                            tickLine={false}
                            tick={{ fill: '#9ca3af', fontSize: 12 }}
                        />
                        <YAxis hide />
                        <Tooltip content={<CustomTooltip />} />
                        <Line
                            type="monotone"
                            dataKey="value"
                            stroke="url(#lineGradient)"
                            strokeWidth={3}
                            dot={<CustomDot />}
                            activeDot={false}
                        />
                    </LineChart>
                </ResponsiveContainer>
            </div>

            <div className="stat-tabs__expenses-section">
                <div className="stat-tabs__header">
                    <h2 className="stat-tabs__title">Udgifter</h2>
                </div>
                <div className="stat-tabs__expenses-list">
                    {weekData.map((item) => (
                        <button
                            key={item.day}
                            className={`stat-tabs__expense-card ${activeExpense === item.day ? 'active' : ''}`}
                            onClick={() => setActiveExpense(item.day)}
                        >
                            <img 
                                src={activeExpense === item.day ? '../public/icons/icon_expenses_on.png' : '../public/icons/icon_expenses_off.png'} 
                                alt={item.day}
                                className="stat-tabs__expense-icon"
                            />
                            <div className="stat-tabs__expense-info">
                                <h3 className="stat-tabs__expense-day">{item.day}</h3>
                                <p className="stat-tabs__expense-kwh">{item.kwh} kWh</p>
                            </div>
                            <span className="stat-tabs__expense-cost">Kr. {item.cost.toFixed(2)}</span>
                        </button>
                    ))}
                </div>
            </div>
        </div>


    );
}