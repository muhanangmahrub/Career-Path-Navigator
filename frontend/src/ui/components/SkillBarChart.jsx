import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend,
} from "chart.js";
import top_skill from "../../data/top_skill.json";

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);

const SkillBarChart = () => {
  const labels = top_skill.map((item) => item.skill);
  const values = top_skill.map((item) => item.count);

  const gradient = (ctx) => {
    const g = ctx.createLinearGradient(0, 0, 600, 0);
    g.addColorStop(0, "#7FAABA");
    g.addColorStop(1, "#203a43");
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

  return (
    <div className="h-[400px] md:h-[450px]">
      <Bar data={data} options={options} />
    </div>
  );
};

export default SkillBarChart;
