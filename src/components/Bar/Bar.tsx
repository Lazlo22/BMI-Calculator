import React from 'react';
import {Line} from 'react-chartjs-2';
import {ScriptableContext} from "chart.js";
import {
    Chart as ChartJS,
    CategoryScale,
    Tooltip,
    Legend,
    LineElement,
    PointElement,
    LinearScale,
    Title,
    Filler
} from 'chart.js';

interface IBarProps {
    labelData: string[];
    bmiData: number[];
}

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    Filler
);

ChartJS.defaults.color = "#fff";

const Bar = ({labelData, bmiData}: IBarProps) => {
    const data = {
        labels: labelData,
        datasets: [
            {
                label: 'BMI',
                data: bmiData,
                backgroundColor: (context: ScriptableContext<"line">) => {
                    const ctx = context.chart.ctx;
                    const gradient = ctx.createLinearGradient(63, 81, 181, 700);

                    gradient.addColorStop(0, '#FF9551');
                    gradient.addColorStop(1, 'rgba(250,174,50,0)');

                    return gradient;
                },
                borderColor: '#fff',
                pointRadius: 6,
                pointHoverRadius: 8,
                pointHoverBorderColor: '#fff',
                pointHoverBorderWidth: 2,
                fill: true
            }
        ]
    };

    const options = {
        responsive: true,
        tension: 0.25,
        scales: {
            y: {
                beginAtZero: true,
                grid: {
                    display: false
                }
            },
            x: {
                grid: {
                    display: false
                }
            }
        }
    };

    return (<Line data={data} options={options}/>);
};

export default Bar;
