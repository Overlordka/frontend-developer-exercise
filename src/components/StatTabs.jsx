import { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Dot } from 'recharts';
import { getWeeklyEnergyConsumption } from '../scripts/fetch.js';

const dayNames = ['Søn', 'Man', 'Tir', 'Ons', 'Tor', 'Fre', 'Lør'];
const weekOrder = ['Man', 'Tir', 'Ons', 'Tor', 'Fre', 'Lør', 'Søn'];

function getDayName(dateString) {
    if (!dateString) {
        return '';
    }

    const [year, month, day] = dateString.split('-').map(Number);
    const date = new Date(year, month - 1, day);

    return dayNames[date.getDay()];
}

const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length && payload[0].value != null) {
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
    const [activeExpense, setActiveExpense] = useState('');
    const [weeklyData, setWeeklyData] = useState([]);

    const chartData = weekOrder.map((day) => {
        const existingItem = weeklyData.find((item) => item.day === day);

        return existingItem ?? {
            day,
            value: null,
        };
    });

    useEffect(() => {
        const fetchWeeklyData = async () => {
            const data = await getWeeklyEnergyConsumption();
            const mappedData = data.map((item) => ({
                ...item,
                day: getDayName(item.date),
                value: item.kwh_usage,
            }));

            setWeeklyData(mappedData);
            setActiveExpense(mappedData[mappedData.length - 1]?.day ?? '');
        };
        fetchWeeklyData();
    }, []);

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
                    <LineChart data={chartData} margin={{ top: 20, right: 20, left: 20, bottom: 5 }}>
                        <defs>
                            <linearGradient id="gradient" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="0%" stopColor="#0f407b" stopOpacity={0.3} />
                                <stop offset="100%" stopColor="#0f407b" stopOpacity={0.05} />
                            </linearGradient>
                            <linearGradient id="lineGradient" x1="0" y1="0" x2="1" y2="0">
                                <stop offset="0%" stopColor="#0f407b" />
                                <stop offset="100%" stopColor="#0f407b"  />
                            </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="0" stroke="transparent" />
                        <XAxis
                            dataKey="day"
                            axisLine={false}
                            tickLine={false}
                            interval={0}
                            minTickGap={0}
                            tick={{ fill: '#9ca3af', fontSize: 12 }}
                        />
                        <YAxis hide />
                        <Tooltip content={<CustomTooltip />} />
                        <Line
                            type="monotone"
                            dataKey="value"
                            stroke="url(#lineGradient)"
                            strokeWidth={3}
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
                    {weeklyData.map((item) => (
                        <button
                            key={item.date}
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
                                <p className="stat-tabs__expense-kwh">{item.kwh_usage.toFixed(1)} kWh</p>
                            </div>
                            <span className="stat-tabs__expense-cost">Kr. {item.total_price.toFixed(2)}</span>
                        </button>
                    ))}
                </div>
            </div>
        </div>


    );
}