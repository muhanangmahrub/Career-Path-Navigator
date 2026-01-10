import { useState } from "react";
import SkillBarChart from "../components/SkillBarChart";
import { TabComponent } from "../components/Tab";
import { OverviewComponent } from "../components/Overview";

export const OverviewSection = () => {
  const tabs = [
    {
      key: "1",
      label: "Ringkasan",
      title: "Ringkasan Sistem",
      content: <OverviewComponent />,
    },
    {
      key: "2",
      label: "Analisis Keterampilan",
      title: "Distribusi 20 Keterampilan Dominan",
      content: <SkillBarChart />,
    },
    {
      key: "3",
      label: "Analisis Pendidikan",
      title: "Distribusi Tingkat Pendidikan",
      content: <EmptyField />,
    },
  ];

  const [activeTab, setActiveTab] = useState(tabs[0].key);
  const content = tabs.find((tab) => tab.key === activeTab);

  return (
    <section className="min-h-screen bg-white/50 p-4" id="overview">
      <div
        className="
    flex flex-col gap-4
    md:flex-row md:items-center md:justify-between
    px-4 md:px-8 mb-5
    border-b-2 border-(--primary)
  "
      >
        <TabComponent
          tabs={tabs}
          activeTab={activeTab}
          setActiveTab={setActiveTab}
        />

        <h2
          className="
      text-lg md:text-2xl font-bold
      text-(--primary)
      text-left md:text-right
      mb-0
    "
        >
          {content.title}
        </h2>
      </div>

      <div className="flex items-center justify-center">
        <div
          className="w-full max-w-6xl bg-white/80 rounded-2xl shadow-lg
        min-h-[400px]
        md:min-h-[450px]
      "
        >
          {content.content}
        </div>
      </div>
    </section>
  );
};

const EmptyField = () => {
  return (
    <div className="flex items-center justify-center h-full font-bold text-3xl pt-32">
      Belum ada data
    </div>
  );
};
