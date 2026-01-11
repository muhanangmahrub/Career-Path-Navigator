import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);

const SkillBarChart = () => {
  const dummyData = [
    { skill: "sales", count: 880 },
    { skill: "english", count: 720 },
    { skill: "communication", count: 500 },
    { skill: "management", count: 350 },
    { skill: "bahasa", count: 310 },
    { skill: "leadership", count: 280 },
    { skill: "manage", count: 260 },
    { skill: "c", count: 250 },
    { skill: "manager", count: 245 },
    { skill: "communication skills", count: 235 },
    { skill: "social medium", count: 230 },
    { skill: "microsoft office", count: 225 },
    { skill: "problem solve", count: 220 },
    { skill: "creative", count: 215 },
    { skill: "communicate", count: 210 },
    { skill: "brand", count: 208 },
    { skill: "accounting", count: 205 },
    { skill: "plan", count: 202 },
    { skill: "computer science", count: 200 },
    { skill: "presentation", count: 195 },
  ];

  const labels = dummyData.map((item) => item.skill);
  const values = dummyData.map((item) => item.count);

  const gradient = (ctx) => {
    const g = ctx.createLinearGradient(0, 0, 600, 0);
    g.addColorStop(0, "#373b44");
    g.addColorStop(1, "#4286f4");
    return g;
  };

  const data = {
    labels,
    datasets: [
      {
        label: "Score",
        data: values,
        backgroundColor: (context) => gradient(context.chart.ctx),
        borderRadius: 6,
      },
    ],
  };

  const options = {
    indexAxis: "y",
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      x: {
        beginAtZero: true,
      },
    },
  };

  return <Bar data={data} options={options} />;
};

export default SkillBarChart;
