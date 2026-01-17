import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import edu_data from "../../data/education_by_job_function.json";
import { useState } from "react";
import { CircleArrowLeft, CircleArrowRight } from "lucide-react";

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

export default function EduBarChart() {
  const levels = ["sma", "smk", "d3", "d4", "s1", "s2", "s3"];
  const itemsPerPage = 3;

  const LEVEL_COLORS = {
    sma: "#5A9CB5",
    smk: "#FACE68",
    d3: "#FAAC68",
    d4: "#FA6868",
    s1: "#76153C",
    s2: "#5A0E24",
    s3: "#473472",
  };

  const [page, setPage] = useState(0);

  const pagedJobs = edu_data.slice(
    page * itemsPerPage,
    page * itemsPerPage + itemsPerPage,
  );

  const data = {
    labels: pagedJobs.map((j) => j.job_function_group),
    datasets: levels.map((level) => ({
      label: level.toUpperCase(),
      data: pagedJobs.map((j) => j[level]),
      backgroundColor: LEVEL_COLORS[level],
      borderRadius: 6,
    })),
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  const totalPages = Math.ceil(edu_data.length / itemsPerPage);

  return (
    <>
      <div className="w-full h-[400px] px-5 ">
        <Bar data={data} options={options} />
      </div>

      <Paging
        page={page}
        totalPages={totalPages}
        next={() => setPage((p) => Math.max(p - 1, 0))}
        prev={() => setPage((p) => Math.min(p + 1, totalPages - 1))}
      />
    </>
  );
}

const Paging = ({ page, totalPages, next, prev }) => {
  return (
    <div className="flex justify-around gap-2 items-center border-t-2 border-t-(--primary) mx-6 py-2 ">
      <CircleArrowLeft
        className="w-6 h-6 md:w-10 md:h-10 cursor-pointer text-(--primary) "
        onClick={next}
        disabled={page === 0}
      />

      <p className="font-bold text-(--primary)">
        Page {page + 1} / {totalPages}
      </p>

      <CircleArrowRight
        className="w-6 h-6 md:w-10 md:h-10 cursor-pointer text-(--primary) "
        onClick={prev}
        disabled={page === 0}
      />
    </div>
  );
};
