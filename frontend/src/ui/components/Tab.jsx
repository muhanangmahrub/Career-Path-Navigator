export const TabComponent = ({ tabs, activeTab, setActiveTab }) => {
  return (
    <ul className="flex text-sm font-bold">
      {tabs.map((tab) => (
        <li key={tab.key} className="me-2">
          <button
            onClick={() => setActiveTab(tab.key)}
            className={`p-4 rounded-t-lg transition cursor-pointer 

                ${
                  activeTab === tab.key
                    ? "bg-(--primary) text-white"
                    : "bg-transparent hover:bg-(--light) hover:text-white text-(--primary)"
                }`}
          >
            {tab.label}
          </button>
        </li>
      ))}
    </ul>
  );
};
